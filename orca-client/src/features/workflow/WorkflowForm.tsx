import { NewTasksRequest, NewTasksSchema, Task, useCreateTaskMutation, useDeleteTasksMutation, useSaveTasksMutation, useUpdateTaskMutation } from 'app/services/task';
import { User, useGetUsersQuery } from 'app/services/user';
import { fieldSizes } from "app/services/workflow";
import { MultilineTextInput, InputCell } from "features/ui";
import {ActionDropDown} from 'features/ui/ActionMenu';
import {SelectInput} from 'features/ui/shared';
import { TableCell, ActionButtonCell } from 'features/ui/table';
import { Fragment, useState } from 'react';
import { SinglelineInput } from 'features/ui/shared';
import { getID, getPrefix } from 'utils/formFields';
import { PlusIcon } from 'features/ui/shared/PlusIcon';
import { UseFormHandleSubmit, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateDependenciesMutation } from 'app/services/dependencies';

type Props = {
  workflowID: number,
  tasks: Task[]
}

export type FormValues =   NewTasksRequest;
export type SaveTaskFields = UseFormHandleSubmit<FormValues, undefined>
export type DeleteTask = ({ taskID, index }: {
  taskID: number;
  index: number;
}) => void;


const getDisplayUsers = (users: User[]) => users.map((user) => ({
  value: user.userID , displayValue: user.name
}))

const getDisplayDependencies = (deps: Task[]) => deps.map((task) => ({
  value: task.taskID.toString(), displayValue:  task.name
}))
 

const WorkflowForm = ({workflowID, tasks}: Props) => {

    const [deletedTasks, setDeletedTasks] = useState<number[]>([]);
    const [updateTask, updateTaskStatus] = useUpdateTaskMutation();
    const [createTask, createTaskStatus] = useCreateTaskMutation();
    const [deleteTasks, deleteTaskStatus] = useDeleteTasksMutation();
    const [saveDependencies, saveDependenciesStatus] = useUpdateDependenciesMutation(); 
    const {data: users } = useGetUsersQuery();

    const { register, handleSubmit, formState, getValues, control } = 
    useForm<FormValues>({
      resolver: yupResolver(NewTasksSchema),
      defaultValues: {
        tasks: tasks?.map((task)=> {
          const {taskOwner, taskDependencies, updatedAt, createdAt, ...taskFields} = task;
          return({
          ...taskFields, ownerID: taskOwner?.userID
        })})
      },
    });

    const { fields: taskFields, append, prepend, remove, replace, swap, move, insert } = useFieldArray({
      control, 
      name: "tasks",
    });

    
    const _updateTask = async (e: React.FocusEvent) => {
      console.log("🚀 ~ const_updateTask= ~ e:", e)
      const idAry = e.target.id.split('.');
      console.log("🚀 ~ const_updateTask= ~ idAry:", idAry)

      if("name" in e.target) {
        // updateTask({taskID: Number(idAry[1]), workflowID: workflowID, [idAry[2]]: getValues(e.target.name as string)})
      }

      
    }

    const copyTask = (index: number)=> {
      const {taskID, ...copyFields} = taskFields[index];
      createTask(copyFields);
    }
    // ! update this
    const deleteTask = ({taskID, index}: {taskID: number, index: number})=>{}


    const newRowIndex = taskFields.length;
    const newIDPrefix = getPrefix('tasks', newRowIndex);
    const newNameID = getID(newIDPrefix, 'name');
    const newDescriptionID = getID(newIDPrefix, 'description');
    const newDependenciesID = getID(newIDPrefix, 'dependencies');;
    const newDueDayID = getID(newIDPrefix, 'dueDay');
    const newTaskOwnerID = getID(newIDPrefix, 'ownerID');
  
  return ( 
    

      <form className="contents" onSubmit={() => {}}>
        {taskFields.map((task, index) => {
          const idPrefix = getPrefix('tasks',task.taskID ?? "NEW");
          const nameID = getID(idPrefix, 'name');
          const descriptionID = getID(idPrefix, 'description');
          const dependenciesID = getID(idPrefix, 'dependencies');;
          const dueDayID = getID(idPrefix, 'dueDay');
          const taskOwnerID = getID(idPrefix, 'ownerID');
          
          return (
            <Fragment key={task.id}>
              <ActionButtonCell >
                <ActionDropDown actions={[
                  {
                    action: 'edit',
                    to: '/workflow'
                  },
                  {
                    action: 'copy',
                    fn: ()=> copyTask(index),
                  },
                  {
                    action: 'delete',
                    fn: ()=> deleteTask({ taskID: Number(task.taskID), index: index }),
                  },
                  {
                    action: 'deploy',
                    to: '/workflow'
                  },
                ]}/>
              </ActionButtonCell>
              <InputCell inputName={nameID}>
                <TableCell>
                  <MultilineTextInput
                    id={nameID}
                    {...register(`tasks.${index}.name`, 
                      {required: true,
                        onBlur: _updateTask
                      })}
                    control={control}
                    maxLength={fieldSizes.workflow.name}
                  />
                </TableCell>
              </InputCell>
              <InputCell inputName={descriptionID}>
                <TableCell>
                  <MultilineTextInput
                    id={descriptionID}
                    {...register(`tasks.${index}.description`, {required: true})}
                    control={control}
                    maxLength={fieldSizes.workflow.description}
                  />
                </TableCell>
              </InputCell>
              <InputCell inputName={dependenciesID}>
                <TableCell>
                  <SelectInput
                    id={dependenciesID}
                    {...register(`tasks.${index}.dependencies`, {required: true})}
                    control={control}
                    values={getDisplayDependencies(tasks ?? [])}
                    multiple={true}
                    defaultValue={task.dependencies?.map(dep => dep.toString()) ?? []}
                  />
                </TableCell>
              </InputCell>  
              <InputCell inputName={dueDayID}>
                <TableCell>
                  <SinglelineInput
                    id={dueDayID}
                    {...register(`tasks.${index}.dueDay`, {required: true})}
                    defaultValue={task.dueDay === 0 ? undefined : task.dueDay.toString()}
                    pattern="\d*"
                    maxLength={fieldSizes.task.dueDay}
                    max={"9999"}
                    control={control}
                  />
                </TableCell>
              </InputCell>
              <InputCell inputName={taskOwnerID} focusOnEsc>
                <TableCell>
                  <SelectInput
                    id={taskOwnerID}
                    {...register(`tasks.${index}.ownerID`, {required: true})}
                    control={control}
                    values={users ? getDisplayUsers(users) : []}
                    defaultValue={task.ownerID ?? []} // needed to prevent change from uncontrolled to controlled error
                  />
                </TableCell>
              </InputCell>
            </Fragment>
          )
        })}
        <Fragment key={taskFields.length -1}>
          <TableCell>
            <PlusIcon/>
          </TableCell>
          <InputCell inputName={newNameID}>
            <TableCell>
              <MultilineTextInput
                id={newNameID}
                {...register(`tasks.${newRowIndex}.name`, {required: true})}
                control={control}
                maxLength={fieldSizes.workflow.name}
              />
            </TableCell>
          </InputCell>
          <InputCell inputName={newDescriptionID}>
            <TableCell>
              <MultilineTextInput
                id={newDescriptionID}
                {...register(`tasks.${newRowIndex}.description`, {required: true})}
                control={control}
                maxLength={fieldSizes.workflow.description}
              />
            </TableCell>
          </InputCell>
          <InputCell inputName={newDependenciesID}>
            <TableCell>
              <SelectInput
                id={newDependenciesID}
                {...register(`tasks.${newRowIndex}.dependencies`, {required: true})}
                control={control}
                values={getDisplayDependencies(tasks ?? [])}
                multiple={true}
                defaultValue={[]}
              />
            </TableCell>
          </InputCell>  
          <InputCell inputName={newDueDayID}>
            <TableCell>
              <SinglelineInput
                id={newDueDayID}
                {...register(`tasks.${newRowIndex}.dueDay`, {required: true})}
                defaultValue={ undefined}
                pattern="\d*"
                maxLength={fieldSizes.task.dueDay}
                max={"9999"}
                control={control}
              />
            </TableCell>
          </InputCell>
          <InputCell inputName={newTaskOwnerID} focusOnEsc>
            <TableCell>
              <SelectInput
                id={newTaskOwnerID}
                {...register(`tasks.${newRowIndex}.ownerID`, {required: true})}
                control={control}
                values={users ? getDisplayUsers(users) : []}
                defaultValue={[]} // needed to prevent change from uncontrolled to controlled error
              />
            </TableCell>
          </InputCell>
        </Fragment>
        </form>
   );
}
 
export default WorkflowForm;