import { yupResolver } from '@hookform/resolvers/yup';
import { User, useGetUsersQuery } from 'app/services/user';
import { EditWorkflowRequest, EditWorkflowSchema, Task, Workflow, fieldSizes, useCreateWorkflowMutation, useGetWorkflowQuery, useGetWorkflowsQuery } from "app/services/workflow";
import { SubmitButton, TableCard, MultilineTextInput, InputCell, InlineButton } from "features/ui";
import { ActionMenu } from 'features/ui/ActionMenu';
import ActionDropDown from 'features/ui/ActionMenu/ActionDropDown';
import SelectInput from 'features/ui/shared/SelectInput';
import Table from 'features/ui/shared/Table';
import ColumnHeader from 'features/ui/table/ColumnHeader';
import TableCell from 'features/ui/table/TableCell';
import { Fragment, useEffect, useState } from 'react';
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

const getDisplayUsers = (users: User[]) => users.map((user) => (
  {value: user.userID , displayValue: user.name})
)

const WorkflowCard = ({workflow, users = []}: Props) => {
  const [saveWorkflow, status] = useCreateWorkflowMutation();
  const { register, handleSubmit, formState: {errors: inputErrors }, getValues, control } = 
    useForm<EditWorkflowRequest>({
      resolver: yupResolver(EditWorkflowSchema),
      defaultValues: {
        name: workflow?.name,
        description: workflow?.description,
        ownerID: workflow?.workflowOwner.userID,
        tasks: workflow?.tasks
      },
    });
    const { fields: taskFields, append, prepend, remove, replace, swap, move, insert } = useFieldArray({
      control, 
      name: "tasks",
    });
  
  
  

    useEffect(()=>{
      console.log('users:', users)
    }, [users])

  const handleSave = async () => {
    try{
      await  saveWorkflow(getValues());
    } catch(e) {
      console.log(e);
    } finally {

    }
  }

  const handleNewTask = () =>{
    append({
      taskID: 0,
      name: '',
      description: '',
      dependencies: undefined,
      dueDay: 0,
      taskOwner: {
        userID: 0,
        name: "",
        email: ""
      }
    })
  }
  
  function getErrors(){
    return null;
  }

  useEffect(() => {
    if(workflow){
      replace(workflow.tasks);
    } 
  },[workflow, replace])

  return ( 
    <TableCard
          title={`Edit Workflow: ${workflow?.workflowID ?? "New Workflow"}`}
    >
        <form className="w-full" onSubmit={handleSubmit(handleSave)}>
          <div className='relative flex flex-col items-stretch w-full mx-auto mb-4 md:mb-8 center xl:max-w-[calc(100%-4rem)] xl:flex-row xl:items-center xl:justify-between xl:space-x-4'>
            <InputCell className='mb-3 xl:mb-0 md:w-[352px] lg:w-[364px] xl:w-fit' >
              <MultilineTextInput
                id="name"
                label="Name"
                className=' xl:w-[11rem] ml-2'
                textAreaClasses="h-4 lg:h-5 xl:h-full"
                placeholder="Employee Onboarding"
                {...register("name",  { required: true }) }
                control={control}
                maxLength={fieldSizes.workflow.name}
              />
            </InputCell>
            <InputCell className='mb-3 xl:mb-0 md:w-[352px] lg:w-[364px] xl:w-fit' >
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
              grid-cols-[3.5rem_minmax(11.5rem,1fr)_minmax(16rem,1fr)_minmax(12rem,1fr)_minmax(5.75rem,_1fr)_minmax(7.5rem,1fr)] 
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
              return (
                <Fragment key={task.id}>
                  <TableCell><ActionDropDown actions={actions}/></TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${index}.name`}
                        placeholder="Enter name"
                        {...register(`tasks.${index}.name`, {required: true})}
                        control={control}
                        defaultValue={task.name}
                        maxLength={fieldSizes.workflow.name}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${index}.description`}
                        placeholder="Enter description"
                        {...register(`tasks.${index}.description`, {required: true})}
                        control={control}
                        defaultValue={task.description}
                        maxLength={fieldSizes.workflow.description}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${index}.dependencies`}
                        placeholder="Enter dependencies"
                        {...register(`tasks.${index}.dependencies`, {required: true})}
                        control={control}
                        defaultValue={task.dependencies?.toString()}
                      />
                    </InputCell>  
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <input
                        id={`tasks.${index}.dueDay`}
                        className={` relative flex flex-wrap items-center justify-start 
                            w-full max-w-full h-full font-maven text-sm bg-transparent text-text-normal
                          dark:text-dk-text-normal px-0 py-1 border-none break-words shadow-none focus:ring-0`}
                        placeholder="Enter due day"
                        {...register(`tasks.${index}.dueDay`, {required: true})}
                        defaultValue={task.dueDay}
                        type='text'
                        pattern="/d"
                        maxLength={fieldSizes.task.dueDay}
                        max={"9999"}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <SelectInput
                        id={`tasks.${index}.taskOwner.userID`}
                        placeholder="Enter owner"
                        {...register(`tasks.${index}.taskOwner.userID`, {required: true})}
                        control={control}
                        defaultValue={task.taskOwner.userID}
                        values={getDisplayUsers(users)}
                      />
                    </InputCell>
                  </TableCell>
                </Fragment>
              ) 
            })}
          </Table>
          <div className="flex items-center justify-end w-full mt-3 space-x-6 lg:mt-6">
          <SubmitButton >Save</SubmitButton>
          </div>
        </form>
    </TableCard>
   );
}
 
export default WorkflowCard;