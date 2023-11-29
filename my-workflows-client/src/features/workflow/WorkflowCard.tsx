import { yupResolver } from '@hookform/resolvers/yup';
import { TaskDependenciesRequest, TasksDependenciesRequest, useUpdateDependenciesMutation } from 'app/services/dependencies';
import { Task, useDeleteTaskMutation, EditTasksRequest, NewTasksRequest, NewTasksSchema, useSaveTasksMutation, EditTaskRequest } from 'app/services/task';
import { User } from 'app/services/user';
import { EditWorkflowRequest, EditWorkflowSchema, Workflow, fieldSizes, useEditWorkflowMutation} from "app/services/workflow";
import { SubmitButton, TableCard, MultilineTextInput, InputCell, InlineButton } from "features/ui";
import {ActionDropDown} from 'features/ui/ActionMenu';
import {SelectInput} from 'features/ui/shared';
import Table from 'features/ui/shared/Table';
import ColumnHeader from 'features/ui/table/ColumnHeader';
import TableCell from 'features/ui/table/TableCell';
import { Fragment } from 'react';
import { useFieldArray, useForm } from "react-hook-form";

const actions = [
  {
    action: 'edit',
    to: '/workflow'
  },
  {
    action: 'copy',
    to: '/workflow'
  },
  {
    action: 'delete',
    fn: ()=> null
  },
  {
    action: 'deploy',
    to: '/workflow'
  },
]

type Props = {
  workflow?: Workflow,
  users: User[]
}

type FormState = EditWorkflowRequest &  NewTasksRequest;

const getDisplayUsers = (users: User[]) => users.map((user) => ({
  value: user.userID , displayValue: user.name
}))

const getDisplayDependencies = (deps: Task[]) => deps.map((task) => ({
  value: task.taskID.toString(), displayValue:  task.name
}))

const WorkflowCard = ({workflow, users = []}: Props) => {
  const [saveWorkflow, workflowStatus] = useEditWorkflowMutation();
  const [saveTasks, saveTaskStatus] = useSaveTasksMutation();
  const [deleteTasks, deleteTaskStatus] = useDeleteTaskMutation();
  const [saveDependencies, saveDependenciesStatus] = useUpdateDependenciesMutation();
  const { register, handleSubmit, formState, getValues, control } = 
    useForm<FormState>({
      resolver: yupResolver(EditWorkflowSchema.concat(NewTasksSchema)),
      defaultValues: {
        workflowID: workflow?.workflowID,
        name: workflow?.name,
        description: workflow?.description,
        ownerID: workflow?.workflowOwner.userID,
        tasks: workflow?.tasks.map((task)=> {
          const {taskOwner, taskDependencies, updatedAt, createdAt, ...taskFields} = task;
          return({
          ...taskFields, ownerID: taskOwner?.userID
        })})
      },
    });
    const {isDirty, dirtyFields, defaultValues} = formState;
    const { fields: taskFields, append, prepend, remove, replace, swap, move, insert } = useFieldArray({
      control, 
      name: "tasks",
    });


  const handleSave = async () => {
    if(!isDirty) return;
    const {tasks: dirtyTasks, ...dirtyWorkflowFields} = dirtyFields;

    function containsDirtyFields(fieldNode: object | object[] | boolean): boolean{
      if(typeof fieldNode == 'boolean') return fieldNode;
      if(typeof fieldNode !== 'object') return false;
      if(Array.isArray(fieldNode)) {
        return fieldNode.some(node => containsDirtyFields(node));
      } else {
        for(const key in fieldNode ){
          const _key = key as keyof typeof fieldNode;
          const value =  fieldNode[_key];
          //found a dirty one
          if(value === true) return true;
          if(typeof value === 'object'){
            //look at next node
            return containsDirtyFields(value);
          }
        }
      }
      return false;
    }

    function splitDependencies(tasks: Task[]): EditTasksRequest & {dependencies: TaskDependenciesRequest[]}{
      let taskDependencies: TaskDependenciesRequest[] = [];
      let tasksWithoutDependencies: EditTaskRequest[] = [];
      let deletedDependencies: TaskDependenciesRequest[] = [];

      function dependenciesDeleted(){
        
      }

      tasks.forEach(task=> {
        const {workflowID, taskID, dependencies, ...taskProps} = task;
        let dependencyDeleted = false;

        if(dependencies && dependencies.length > 0){
          taskDependencies?.push({workflowID, taskID, dependencies: dependencies})
        } else if(dependencyDeleted){
          //add to deleted dependencies
        }

        tasksWithoutDependencies.push({
          workflowID,
          taskID,
          ownerID: task.taskOwner.userID,
           ...taskProps
        });
      });
      return ({tasks: tasksWithoutDependencies, dependencies: taskDependencies});
    }

    try{
      const {tasks, ...workflow} = getValues();
      const workflowUpdated = containsDirtyFields(dirtyWorkflowFields);
      const tasksUpdated = dirtyTasks ? containsDirtyFields(dirtyTasks) : false;
      //workflow summary must be saved first
      if(workflowUpdated){
        await  saveWorkflow(workflow);
      }
      if(tasksUpdated){
        // const newTasks = tasks.filter(task=> !task.taskID);

        const tasksWithoutDependencies = tasks.map(task=> {
          const {dependencies,  ...taskWithoutDependencies} = task;
          return taskWithoutDependencies;
        })
        
        type WorkflowID = {workflowID: number}
        let createdTasks: (Task & WorkflowID)[];
        //tasks must be updated and new tasks must be created before asigning dependencies
        if(tasksWithoutDependencies.length > 0){
         createdTasks = await saveTasks({workflowID: workflow.workflowID, tasks: tasksWithoutDependencies}).unwrap();
         debugger
        }
        
        //combine new and updated tasks
        const tasksWithNewID: EditTasksRequest = {tasks: tasksWithoutDependencies.map(task => {
          const {taskID, ...props} = task; 
          return ({
            taskID: taskID ?? createdTasks.find(createdTask=> createdTask.name === task.name)?.taskID,
            ...props
          })
        })} as EditTasksRequest;


        
      }
    } catch(e) {
      console.log(e);
    } finally {

    }
  }

  const handleNewTask = () =>{
    if(!workflow) return;
    const defaultDueDate = taskFields[taskFields.length - 1].dueDay; 
    append({
      name: '',
      description: '',
      dependencies: undefined,
      dueDay: defaultDueDate,
      ownerID: 0,
      workflowID: workflow?.workflowID,
    })
  }
  
  const {ref: nameRef, ...nameFields} = register("name",  { required: true });
  const {ref: descriptionRef, ...descriptionFields} = register("description",  { required: true });
  return ( 
    <TableCard
          title={`Edit Workflow: ${workflow?.workflowID ?? "New Workflow"}`}
    >
        <form className="w-full" onSubmit={handleSubmit(handleSave)}>
          <div className='relative flex flex-col items-stretch w-full mx-auto mb-4 md:mb-8 center xl:max-w-[calc(100%-4rem)] xl:flex-row xl:items-center xl:justify-between xl:space-x-4'>
            <InputCell inputName='name' className='mb-3 xl:mb-0 md:w-[352px] lg:w-[364px] xl:w-fit' >
              <MultilineTextInput
                // ref={nameRef}
                id="name"
                label="Name"
                className=' xl:w-[11rem] ml-2'
                textAreaClasses="h-4 xl:h-5 xl:h-full"
                placeholder="Employee Onboarding"
                {...register("name",  { required: true }) }
                control={control}
                maxLength={fieldSizes.workflow.name}
              />
            </InputCell>
            <InputCell inputName='description' className='mb-3 xl:mb-0 md:w-[352px] lg:w-[364px] xl:w-fit' >
              <MultilineTextInput
                id="description"
                label="Description:"
                className='xl:w-[248px] ml-2'
                textAreaClasses="xs:h-4 md:h-full"
                placeholder="New employee onboarding tasks"
                {...register("description",  { required: true }) }
                control={control}
                maxLength={fieldSizes.workflow.description}
              />
            </InputCell>
            <InputCell className='mb-3 xl:mb-0 md:w-[352px] lg:w-[364px] xl:w-fit' >
              <SelectInput
                id="ownerID"
                label="Owner"
                className='xl:w-[100px] ml-2'
                placeholder="John Smith"
                control={control}
                values={getDisplayUsers(users)}
              />
            </InputCell>
          </div>
          <Table 
            className={`grid w-full
              grid-cols-[3.5rem_minmax(10.5rem,11.5rem)_minmax(15rem,1fr)_minmax(12rem,1fr)_minmax(5rem,_.5fr)_minmax(8.5rem,1fr)] 
              content-start`}
            maxHeightClassName='h-[calc(85vh-332px)] sm:h-[calc(85vh-364px)] lg:h-[calc(85vh-418px)] xl:h-[calc(85vh-266px)]'
            title='Tasks'
            actionComponent={
              <InlineButton type='button' onClick={handleNewTask} className="absolute bottom-3 right-4 sm:right-8">
                New Task
              </InlineButton>
            }
            headers={
              <>
                <ColumnHeader></ColumnHeader>
                <ColumnHeader>Name</ColumnHeader>
                <ColumnHeader>Description</ColumnHeader>
                <ColumnHeader>Dependencies</ColumnHeader>
                <ColumnHeader>Due Day</ColumnHeader>
                <ColumnHeader>Owner</ColumnHeader>
              </>
            }
          >
            {taskFields.map((task, index) => {
              const idPrefix = `tasks.${index}.`;
              const nameID = `${idPrefix}name`;
              const descriptionID = `${idPrefix}description`;
              const dependenciesID = `${idPrefix}dependencies`;
              const dueDayID = `${idPrefix}dueDay`;
              const taskOwnerID = `${idPrefix}ownerID`
              return (
                <Fragment key={task.id}>
                  <TableCell><ActionDropDown actions={actions}/></TableCell>
                  <TableCell>
                    <InputCell inputName={nameID}>
                      <MultilineTextInput
                        id={nameID}
                        placeholder="Enter name"
                        {...register(`tasks.${index}.name`, {required: true})}
                        control={control}
                        maxLength={fieldSizes.workflow.name}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell inputName={descriptionID}>
                      <MultilineTextInput
                        id={descriptionID}
                        placeholder="Enter description"
                        {...register(`tasks.${index}.description`, {required: true})}
                        control={control}
                        maxLength={fieldSizes.workflow.description}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell inputName={dependenciesID}>
                      <SelectInput
                        id={dependenciesID}
                        placeholder="Enter dependencies"
                        {...register(`tasks.${index}.dependencies`, {required: true})}
                        control={control}
                        values={getDisplayDependencies(workflow?.tasks ?? [])}
                        multiple={true}
                        defaultValue={task.dependencies?.map(dep => dep.toString()) ?? []}
                      />
                    </InputCell>  
                  </TableCell>
                  <TableCell>
                    <InputCell inputName={dueDayID}>
                      <input
                        id={dueDayID}
                        className={` relative flex flex-wrap items-center justify-start 
                            w-full max-w-full h-full font-maven text-xs 2xl:text-sm bg-transparent text-text-normal
                          dark:text-dk-text-normal px-0 py-1 border-none break-words shadow-none focus:ring-0`}
                        placeholder="Enter due day"
                        {...register(`tasks.${index}.dueDay`, {required: true})}
                        defaultValue={task.dueDay === 0 ? undefined : task.dueDay.toString()}
                        type='text'
                        pattern="\d*"
                        maxLength={fieldSizes.task.dueDay}
                        max={"9999"}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell inputName={taskOwnerID} focusOnEsc>
                      <SelectInput
                        id={taskOwnerID}
                        placeholder="Enter owner"
                        {...register(`tasks.${index}.ownerID`, {required: true})}
                        control={control}
                        values={getDisplayUsers(users)}
                        defaultValue={task.ownerID ?? []} // needed to prevent change from uncontrolled to controlled error
                      />
                    </InputCell>
                  </TableCell>
                </Fragment>
              )
            })}
          </Table>
          <div className="flex items-center justify-end w-full mt-3 space-x-6 lg:mt-6">
          <SubmitButton disabled={!formState.isDirty}>Save</SubmitButton>
          </div>
        </form>
    </TableCard>
   );
}
 
export default WorkflowCard;