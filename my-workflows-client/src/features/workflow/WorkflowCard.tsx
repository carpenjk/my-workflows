import { yupResolver } from '@hookform/resolvers/yup';
import { CreateWorkflowRequest, CreateWorkflowSchema, EditWorkflowRequest, EditWorkflowSchema, Task, Workflow, fieldSizes, useCreateWorkflowMutation, useGetWorkflowQuery, useGetWorkflowsQuery } from "app/services/workflow";
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
  const [saveWorkflow, status] = useCreateWorkflowMutation();
  const { register, handleSubmit, formState: {errors: inputErrors }, getValues, control } = 
    useForm<EditWorkflowRequest>({
      resolver: yupResolver(EditWorkflowSchema),
      defaultValues: {
        name: workflow?.name,
        description: workflow?.description,
        ownerID: workflow?.workflowOwner.userID,
        tasks: workflow?.tasks
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
      console.log("🚀 ~ file: WorkflowCard.tsx:71 ~ useEffect ~ workflow.tasks:", workflow.tasks)
      setTasks(workflow.tasks)
      replace(workflow.tasks);
    } 
  },[workflow, replace])




  return ( 
    <TableCard
          title={`Edit Workflow: ${workflow?.workflowID ?? "New Workflow"}`}
          actionComponent={
            <InlineLink to={'/workflow/new'} className="absolute right-4 sm:right-20">
               New Task
            </InlineLink>}
          loadMore={()=> {}}
    >
      <div>
      <form className="w-full" onSubmit={handleSubmit(handleSave)}>
        <div className='relative flex flex-col items-stretch w-full mx-auto mb-8 center xl:max-w-[calc(100%-4rem)] xl:flex-row xl:items-center xl:justify-between xl:space-x-4'>
          <InputCell className='mb-3 xl:mb-0 lg:w-fit ' >
            <MultilineTextInput
              id="name"
              label="Name"
              className=' lg:w-[11rem] ml-2'
              placeholder="Employee Onboarding"
              {...register("name",  { required: true }) }
              control={control}
              singleLine={{"0":true, 'lg': false}}
              maxLength={fieldSizes.workflow.name}
            />
          </InputCell>
          <InputCell className='mb-3 xl:mb-0 lg:w-fit' >
            <MultilineTextInput
              id="description"
              label="Description:"
              className='lg:w-[250px] ml-2'
              placeholder="New employee onboarding tasks"
              {...register("description",  { required: true }) }
              control={control}
              singleLine={{"0":true, 'lg': false}}
              maxLength={fieldSizes.workflow.description}
            />
          </InputCell>
          <InputCell className='mb-3 xl:mb-0 lg:w-fit' >
            <MultilineTextInput
              id="ownerID"
              label="Owner"
              className='lg:w-[100px] ml-2'
              placeholder="John Smith"
              {...register("ownerID",  { required: true }) }
              control={control}
              singleLine={{"0":true, 'lg': false}}
            />
          </InputCell>
        </div>
        <Table title='Tasks'>
          <div className={`grid w-full min-h-[288px]
            grid-cols-[3.5rem_minmax(11.5rem,1fr)_minmax(16rem,1fr)_minmax(12rem,1fr)_minmax(5.75rem,_1fr)_minmax(7.5rem,1fr)] 
            content-start
          `}>
            <div className=""></div>
            <ColumnHeader>Name</ColumnHeader>
            <ColumnHeader>Description</ColumnHeader>
            <ColumnHeader>Dependencies</ColumnHeader>
            <ColumnHeader>Due Day</ColumnHeader>
            <ColumnHeader>Owner</ColumnHeader>
            {fields.map((task, index) => {
              console.log("🚀 ~ file: WorkflowCard.tsx:136 ~ {fields.map ~ task:", task)
              return (
                <Fragment key={task.id}>
                  <TableCell><ActionMenu actions={actions}/></TableCell>
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
                          dark:text-dk-text-normal px-0 py-1 border-none break-words shadow-none`}
                        placeholder="Enter due day"
                        {...register(`tasks.${index}.dueDay`, {required: true})}
                        // control={control}
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
                      <MultilineTextInput
                        id={`tasks.${index}.taskOwner.name`}
                        
                        placeholder="Enter owner"
                        {...register(`tasks.${index}.taskOwner.name`, {required: true})}
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
        <div className="flex items-center justify-end w-full mt-6 space-x-6">
        <SubmitButton >Save</SubmitButton>
        </div>
      </form>
      </div>
    </TableCard>
   );
}
 
export default WorkflowCard;