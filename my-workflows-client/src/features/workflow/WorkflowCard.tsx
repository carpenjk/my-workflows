import { yupResolver } from '@hookform/resolvers/yup';
import { CreateWorkflowRequest, CreateWorkflowSchema, EditWorkflowRequest, EditWorkflowSchema, Task, Workflow, useCreateWorkflowMutation, useGetWorkflowQuery, useGetWorkflowsQuery } from "app/services/workflow";
import { InlineLink, SubmitButton, TableCard, MultilineTextInput, InputCell } from "features/ui";
import { ActionMenu } from 'features/ui/ActionMenu';
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
  workflow?: Workflow
}

const WorkflowCard = ({workflow}: Props) => {
  console.log("🚀 ~ file: WorkflowCard.tsx:36 ~ WorkflowCard ~ workflow:", workflow)
  const [saveWorkflow, status] = useCreateWorkflowMutation();
  const { register, handleSubmit, formState: {errors: inputErrors }, getValues, control } = 
    useForm<EditWorkflowRequest>({
      resolver: yupResolver(EditWorkflowSchema),
      defaultValues: {
        name: workflow?.name,
        description: workflow?.description,
        ownerID: workflow?.workflowOwner.userID,
      }
    });
    const { fields, append, prepend, remove, replace, swap, move, insert } = useFieldArray({
      control, 
      name: "tasks",
    });

  const [tasks, setTasks] = useState<Task[]>([]);
  
  const handleSave = async () => {
    try{
      await  saveWorkflow(getValues());
    } catch(e) {
      console.log(e);
    } finally {

    }
  }
  
  function getErrors(){
    return null;
  }


  useEffect(() => {
    if(workflow){
      console.log("🚀 ~ file: WorkflowCard.tsx:71 ~ useEffect ~ workflow:", workflow)
      setTasks(workflow.tasks)
      replace(workflow.tasks);
    } 
  },[workflow, replace])


  return ( 
    <TableCard
          title="Create New"
          actionComponent={
            <InlineLink to={'/workflow/new'} className="absolute right-4 sm:right-20">
               New Task
            </InlineLink>}
          loadMore={()=> {}}
    >
      <div>
      <form className="w-full" onSubmit={handleSubmit(handleSave)}>
        <div className='relative flex flex-col items-stretch w-full xl:w-fit xl:flex-row xl:items-center xl:justify-between xl:space-x-4'>
        <InputCell className='sm:w-fit' >
          <MultilineTextInput
            id="name"
            label="Name"
            className='sm:w-[11rem] sm:ml-2'
            placeholder="Employee Onboarding"
            control={control}
            {...register("name",  { required: true }) }
          />
        </InputCell>
        <InputCell className='sm:w-fit' >
          <MultilineTextInput
            id="description"
            label="Description:"
            placeholder="New employee onboarding tasks"
            maxLength={50}
            control={control}
            {...register("description",  { required: true }) }
            className='sm:w-[250px] sm:ml-2'
          />
        </InputCell>
        <InputCell className='sm:w-fit' >
          <MultilineTextInput
            id="ownerID"
            label="Owner"
            placeholder="John Smith"
            {...register("ownerID",  { required: true }) }
            control={control}
            className='sm:w-[100px] sm:ml-2'
            maxLength={50}
          />
        </InputCell>
        </div>
        <Table>
          <div className={`grid w-fit min-h-[288px]
            grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(9rem,13rem)_minmax(5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)]
            lg:grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)] 
            content-start
          `}>
            <div className=""></div>
            <ColumnHeader>Name</ColumnHeader>
            <ColumnHeader>Description</ColumnHeader>
            <ColumnHeader>Dependencies</ColumnHeader>
            <ColumnHeader>Due Day</ColumnHeader>
            <ColumnHeader>Owner</ColumnHeader>
            {fields.map((task) => {
              return (
                <Fragment key={task.taskID}>
                  <TableCell><ActionMenu actions={actions}/></TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${task.taskID}.name`}
                        placeholder="Enter name"
                        {...register(`tasks.${task.taskID}.name`, {required: true})}
                        control={control}
                        defaultValue={task.name}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${task.taskID}.description`}
                        placeholder="Enter description"
                        {...register(`tasks.${task.taskID}.description`, {required: true})}
                        control={control}
                        defaultValue={task.description}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${task.taskID}.dependencies`}
                        placeholder="Enter dependencies"
                        {...register(`tasks.${task.taskID}.dependencies`, {required: true})}
                        control={control}
                        defaultValue={task.dependencies?.toString()}
                      />
                    </InputCell>  
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${task.taskID}.dueDay`}
                        placeholder="Enter due day"
                        {...register(`tasks.${task.taskID}.dueDay`, {required: true})}
                        control={control}
                        defaultValue={task.dueDay}
                      />
                    </InputCell>
                  </TableCell>
                  <TableCell>
                    <InputCell>
                      <MultilineTextInput
                        id={`tasks.${task.taskID}.taskOwner.name`}
                        placeholder="Enter owner"
                        {...register(`tasks.${task.taskID}.taskOwner.name`, {required: true})}
                        control={control}
                        defaultValue={task.taskOwner.name}
                      />
                    </InputCell>
                  </TableCell>
                </Fragment>
              ) 
            })}
          </div>
        </Table>
        <div className="flex items-center justify-end w-full mt-10 space-x-6">
        <SubmitButton >Save</SubmitButton>
        </div>
      </form>
      </div>
    </TableCard>
   );
}
 
export default WorkflowCard;