import { TaskDependenciesRequest, TasksDependenciesRequest, useUpdateDependenciesMutation } from "app/services/dependencies";
import { EditTaskRequest, EditTasksRequest, NewTaskRequest, NewTasksRequest, Task, useDeleteTaskMutation, useSaveTasksMutation } from "app/services/task";
import { EditWorkflowRequest, useEditWorkflowMutation } from "app/services/workflow";
import {FieldNamesMarkedBoolean} from 'react-hook-form';

type TaskWithoutDependencies = Omit<Task, "TaskDependencies" | "dependencies">

export type FormValues = EditWorkflowRequest &  NewTasksRequest;

export const useWorkflow = () => {
  let taskDependencies: TaskDependenciesRequest[] = [];
  let tasksWithoutDependencies: NewTaskRequest[] = [];
  let deletedDependencies: TaskDependenciesRequest[] = [];

  const [saveWorkflow, workflowStatus] = useEditWorkflowMutation();
  const [saveTasks, saveTaskStatus] = useSaveTasksMutation();
  const [deleteTasks, deleteTaskStatus] = useDeleteTaskMutation();
  const [saveDependencies, saveDependenciesStatus] = useUpdateDependenciesMutation();


  function processTasks(tasks: NewTaskRequest[]) {
    let deps: TaskDependenciesRequest[] = [];
    let splitTasks: Omit<NewTaskRequest, 'dependencies'>[] = [];

    tasks.forEach(task=> {
      const {workflowID, taskID, dependencies, ...taskProps} = task;
      // let depsWithDeletions: TaskDependenciesRequest[] = [];
      splitTasks.push({taskID, workflowID, ...taskProps})
      if(dependencies && taskID){
        deps.push(...dependencies.reduce<TaskDependenciesRequest[]>((records, dep)=> {
          if(dep !== undefined ){
            return ([...records, { taskID: taskID, dependencies: dep }]);
          }
          return [...records];
        } ,[]))
      }
      
      let dependencyDeleted = false;

      
      if(dependencyDeleted){
        //add to deleted dependencies
      }

      // deps.push({
      //   workflowID,
      //   taskID,
      //   ownerID: task.taskOwner.userID,
      //    ...taskProps
      // });
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
        if(dependencies?.length > 0){
          await saveDependencies({workflowID: workflow.workflowID, dependencies});
        }
      }


    } catch(e){
      console.log(e);
    }     
  }
  return ({
    saveWorkflow: _saveWorkflow,
  })
}