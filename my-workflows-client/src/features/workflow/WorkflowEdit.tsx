import { yupResolver } from '@hookform/resolvers/yup';
import { CreateWorkflowRequest, CreateWorkflowSchema, useCreateWorkflowMutation } from "app/services/workflow";
import { InlineLink, SubmitButton, TableCard, TextInput } from "features/ui";
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
              <div className='flex flex-col items-stretch w-full xl:w-fit xl:flex-row xl:items-center xl:justify-between xl:space-x-4'>
                <div className="flex flex-col items-start w-full mh-[64] p-2 mb-4 lg:items-center lg:flex-row lg:w-fit sm:mb-6 bg-primary-9 dark:bg-dk-primary-9">
                  <TextInput
                    id="name"
                    label="Name"
                    labelClasses="mb-2 sm:mb-0 sm:mr-2 text-sm"
                    className='text-sm bg-transparent sm:w-40'
                    placeholder="Employee Onboarding"
                    {...register("name",  { required: true }) }
                  />
                </div>
                <div className="flex flex-col items-start w-full p-2 mb-4 lg:items-center lg:flex-row lg:w-fit sm:mb-6 bg-primary-9 dark:bg-dk-primary-9">
                  <TextInput
                    id="description"
                    label="Description"
                    labelClasses="text-sm mb-2 sm:mb-0 sm:mr-2"
                    placeholder="description"
                    {...register("description",  { required: true }) }
                    className='text-sm sm:w-56'
                  />
                </div>
                <div className="flex flex-col items-start w-full mh-[64] p-2 mb-4 lg:items-center lg:flex-row lg:w-fit sm:mb-6 bg-primary-9 dark:bg-dk-primary-9">
                  <TextInput
                    id="owner"
                    label="Owner"
                    labelClasses="mb-2 sm:mb-0 sm:mr-2 text-sm"
                    placeholder="owner"
                    {...register("ownerID",  { required: true }) }
                    className='text-sm sm:w-28'
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