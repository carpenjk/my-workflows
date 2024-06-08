import { yupResolver } from "@hookform/resolvers/yup";
import { TaskDependenciesRequest, useUpdateDependenciesMutation } from "app/services/dependencies";
import { NewTaskRequest, NewTasksRequest, NewTasksSchema, useDeleteTasksMutation, useSaveTasksMutation } from "app/services/task";
import { EditWorkflowRequest, EditWorkflowSchema, Workflow, useEditWorkflowMutation } from "app/services/workflow";
import { useState } from "react";
import {Control, FieldNamesMarkedBoolean, FormState, UseFormGetValues, FieldArrayWithId, UseFormHandleSubmit, UseFormRegister, useFieldArray, useForm} from 'react-hook-form';

export type FormValues = EditWorkflowRequest &  NewTasksRequest;
export type SaveWorkflow = UseFormHandleSubmit<FormValues, undefined>
export type DeleteTask = ({ taskID, index }: {
  taskID: number;
  index: number;
}) => void;

export type UseWorkflowReturn = {
  register: UseFormRegister<FormValues>,
  control: Control<FormValues, any>,
  formState: FormState<FormValues>,
  taskFields: FieldArrayWithId<FormValues, "tasks", "id">[],
  getValues: UseFormGetValues<FormValues>,
  saveWorkflow: () => React.FormEventHandler<HTMLFormElement> | undefined,
  createNewTask:  () => void,
  deleteTask: DeleteTask,
  copyTask: (index: number) => void
}

export const useWorkflow = (workflow?: Workflow): UseWorkflowReturn => {
console.log("🚀 ~ useWorkflow ~ workflow:", workflow)

  const { register, handleSubmit, formState, getValues, control } = 
    useForm<FormValues>({
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

    const { fields: taskFields, append, prepend, remove, replace, swap, move, insert } = useFieldArray({
      control, 
      name: "tasks",
    });

  
    const createNewTask = (values: NewTaskRequest) => {
      append(values);
    }

    const handleNewTask = () =>{
      if(!workflow) return;
      
      const defaultDueDate = taskFields[taskFields.length - 1].dueDay; 
      createNewTask({
        name: '',
        description: '',
        dependencies: undefined,
        dueDay: defaultDueDate,
        ownerID: 0,
        workflowID: workflow?.workflowID,
      });
    } 

    const copyTask = (index: number)=> {
      const {taskID, ...copyFields} = taskFields[index];
      createNewTask(copyFields);
    }

  
  const {dirtyFields, isDirty} = formState;
  

  const [deletedTasks, setDeletedTasks] = useState<number[]>([]);
  const [saveWorkflow, workflowStatus] = useEditWorkflowMutation();
  const [saveTasks, saveTaskStatus] = useSaveTasksMutation();
  const [deleteTasks, deleteTaskStatus] = useDeleteTasksMutation();
  const [saveDependencies, saveDependenciesStatus] = useUpdateDependenciesMutation();
  

  function processTasks(tasks: NewTaskRequest[]) {
    let deps: TaskDependenciesRequest[] = [];
    let splitTasks: Omit<NewTaskRequest, 'dependencies'>[] = [];

    tasks.forEach(task=> {
      const {workflowID, taskID, dependencies, ...taskProps} = task;
      splitTasks.push({taskID, workflowID, ...taskProps})
      if(dependencies && taskID){
        deps.push(...dependencies.reduce<TaskDependenciesRequest[]>((records, dep)=> {
          if(dep !== undefined ){
            return ([...records, { taskID: taskID, dependencies: dep }]);
          }
          return [...records];
        } ,[]))
      }
    });
    return {tasks: splitTasks, dependencies: deps};
  }
  async function _saveWorkflow(values: FormValues, dirtyFields:  Partial<Readonly<FieldNamesMarkedBoolean<FormValues>>>){
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

    const {tasks, ...workflow} = values;
    const {tasks: dirtyTasks, ...dirtyWorkflowFields} = dirtyFields;
    const workflowUpdated = containsDirtyFields(dirtyWorkflowFields);
    const tasksUpdated = dirtyTasks ? containsDirtyFields(dirtyTasks) : false;

    try{
      
      if(workflowUpdated){
        await  saveWorkflow(workflow);
      }
      if(tasksUpdated){
        const {tasks: tasksWithoutDependencies, dependencies} = processTasks(tasks);
        await saveTasks({workflowID: workflow.workflowID, tasks: tasksWithoutDependencies})
        if(deletedTasks.length > 0 ){
          deleteTasks({taskID: deletedTasks, workflowID: workflow.workflowID})
        }
        if(dependencies?.length > 0){
          await saveDependencies({workflowID: workflow.workflowID, dependencies});
        }
      }

    } catch(e){
      console.log(e);
    }     
  }

  const handleSave = async () =>{
    if(!isDirty) return;
    await _saveWorkflow(getValues(), dirtyFields)
  }


  const _deleteTask = ({taskID, index}: {taskID: number, index: number}) => {
    remove(index)
    setDeletedTasks(prev => [...prev, taskID]);
  }

  return ({
    register: register,
    control: control,
    formState: formState,
    getValues: getValues,
    taskFields: taskFields,
    saveWorkflow: ()=> handleSubmit(handleSave),
    createNewTask: handleNewTask,
    copyTask: copyTask,
    deleteTask: _deleteTask,
  })
}