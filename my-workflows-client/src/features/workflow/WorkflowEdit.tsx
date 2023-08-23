import { yupResolver } from '@hookform/resolvers/yup';
import { CreateWorkflowRequest, CreateWorkflowSchema, useCreateWorkflowMutation } from "app/services/workflow";
import { InlineLink, SubmitButton, TableCard, MultilineTextInput } from "features/ui";
import Table from 'features/ui/shared/Table';
import { useForm } from "react-hook-form";

const WorkflowEdit = () => {
  const [saveWorkflow, status] = useCreateWorkflowMutation();
  const { register, handleSubmit, formState: {errors: inputErrors }, getValues } = useForm<CreateWorkflowRequest>( {resolver: yupResolver(CreateWorkflowSchema)});

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
                <div className="flex flex-col items-start w-full p-2 mb-4 sm:mb-6 lg:w-fit bg-primary-95 dark:bg-dk-primary-9">
                  <MultilineTextInput
                    id="name"
                    label="Name"
                    labelClasses=" mb-1 text-sm"
                    className='text-sm border border-solid shadow-inner border-primary-9 bg-transparent sm:w-fit sm:min-w-[11rem] sm:ml-2'
                    placeholder="Employee Onboarding"
                    {...register("name",  { required: true }) }
                  />
                </div>
                <div className="relative flex items-center justify-start w-full min-h-[56px] pt-2 pb-2 px-3 mb-4 border border-solid rounded-sm shadow-inner border-primary-8 bg-primary-9 sm:mb-6 lg:w-full dark:bg-dk-primary-9">
                  <MultilineTextInput
                    id="description"
                    label="Description:"
                    labelClasses=""
                    placeholder="New employee onboarding tasks"
                    maxLength={50}
                    {...register("description",  { required: true }) }
                    className='sm:w-[250px] sm:ml-2'
                  />
                </div>
                <div className="relative flex flex-col items-start w-full p-2 mb-4 sm:w-fit sm:mb-6 bg-primary-9 dark:bg-dk-primary-9">
                  <MultilineTextInput
                    id="owner"
                    label="Owner"
                    labelClasses="mb-2 sm:mb-1 sm:mr-2 text-sm" 
                    placeholder="John Smith"
                    {...register("ownerID",  { required: true }) }
                    className='text-sm sm:w-[300px] sm:min-w-[12rem] sm:ml-2'
                    maxLength={50}
                  />
                </div>
              </div>
              <Table>
                <div>table here</div>
              </Table>
              <div className="flex items-center justify-end w-full mt-10 space-x-6">
              <SubmitButton >Save</SubmitButton>
              </div>
            </form>
      </div>
    </TableCard>
   );
}
 
export default WorkflowEdit;