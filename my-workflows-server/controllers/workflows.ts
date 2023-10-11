import { NextFunction, Request, Response } from "express";
import { BulkCreateOptions } from "sequelize";
import { Includeable } from "sequelize";
import { Workflow } from "../models/Workflow";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { NotFoundError } from "../errors/notFoundError";
import { TaskArgs, createTasksFromArgs } from "./tasks";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { sequelize } from "../adapters/sequelize";
import { Dependency } from "../models/Dependency";
import { UpdatedAt } from "sequelize-typescript";

interface WorkflowArgs {
  name: string,
  description: string,
  ownerID: bigint,
  tasks?: TaskArgs[]
}

interface UpdateWorkflowArgs extends WorkflowArgs {
  workflowID: bigint
}

export const getWorkflow = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { workflowID } = req.params;
  const workflow = await Workflow.scope('withTasks').findOne({where: {workflowID: Number(workflowID)}})

  if (!workflow) {
    return next(new NotFoundError('No workflows found.'));
  }
  res.send(workflow);
});

export const getWorkflows = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const limit = Number(req.query.limit);
  const getLimit = ()=> limit && Number.isInteger(limit) ? {limit: Number(limit)} : {};
  const workflows = await Workflow.findAll({
    ...getLimit(),
    // where: {
    //   completedDate: { [Op.eq]: null }
    // },
    attributes: {exclude: ['ownerID']},
    include: [
      {
        model: Task,
        as: 'tasks',
        separate:true, //appears to be a bug that does let you order from outside query
        attributes: {exclude: ['ownerID']},
        order: sequelize.col('dueDay'),
        include: [
          {
            model: User,
            as: 'taskOwner',
            attributes: ['userID', 'name', 'email']
          },
          {
            model: Task,
            as: 'taskDependencies',
            attributes: ['taskID', 'name', 'dueDay'],
            through: {attributes: {exclude: ['Dependencies']}},
          }
        ]
      },
      {
        model: User,
        attributes: ['userID', 'name', 'email']
      }],
  })
  if (workflows.length === 0) {
    return next(new NotFoundError('No workflows found.'));
  }
  res.send(workflows);
})

export const createWorkflow = asyncWrapper(async (req: Request<{},{}, WorkflowArgs>, res: Response) => {
  const {tasks, ...summaryFields } = req.body;

  const tasksWithoutID = tasks?.map(task => {
      const {taskID, ...taskWithoutID} = task;
      return taskWithoutID;
  })
  
  function getDuration(): {} | {duration: string} {
    if(tasks){
      const duration = Math.max(...tasks?.map(task=> task.dueDay));
      const durationUnits = duration > 1 ? 'Days' : 'Day';
      return {duration: `${duration} ${durationUnits}` };
    }
    return {};
  }

  const workflow = await Workflow.create({
    ...getDuration(),
    status: 'Draft',
    ...summaryFields,
  });
  console.log("🚀 ~ file: workflows.ts:89 ~ createWorkflow ~ workflow:", workflow)
  console.log("🚀 ~ file: workflows.ts:79 ~ tasksWithoutID ~ tasksWithoutID:", tasksWithoutID)

  if(tasksWithoutID){
    const tasksWithWorkflowID = tasksWithoutID?.map((task) => ({...task, workflowID: BigInt(workflow.dataValues.workflowID)}));
    await createTasksFromArgs(tasksWithWorkflowID)
  }
  res.json({ msg: 'Workflow created!' });
});


function withWorkflowID(tasks: TaskArgs[], workflowID: bigint){
  return tasks.map(task=> ({...task, workflowID: workflowID}));
}

export const updateWorkFlow = asyncWrapper(async (req: Request<{}, {}, UpdateWorkflowArgs>, res: Response, next: NextFunction) => {
  const { workflowID: workflowID, tasks, ...workflowParams } = req.body;
  
  await Workflow.scope('withTasks')
  .update(workflowParams, {where: {workflowID: Number(workflowID)}})
  .then((workflow) => {
    if (!workflow[0]) {
      return next(new NotFoundError('Workflow not found.'));
    }
    
    if (tasks && Array.isArray(tasks)) {
      // createTasksFromArgs(tasks, 
      //   {include: [{model: Task, as: 'taskDependencies', duplicating: true} ], 
      //   updateOnDuplicate: ["name", "description", "taskDependencies", "dueDay", "ownerID", 'UpdatedAt'],
      // })
      const tasksWithoutDeps = tasks.map(task=> {
        const {dependencies, ...taskWithoutDeps} = task;
        return taskWithoutDeps
      });
      console.log("🚀 ~ file: workflows.ts:129 ~ .then ~ tasks:", tasks)
      createTasksFromArgs(withWorkflowID(tasks, BigInt(workflowID)), 
        { updateOnDuplicate: ["name", "description", "taskDependencies", "dueDay", "ownerID", 'UpdatedAt'],
      })
    }
      res.send({ msg: 'Workflow updated!', workflowID: workflow[0] });
    })
})

export const deleteWorkFlow = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { workflowID } = req.params;
  const workflow = await Workflow.destroy({ where: { workflowID: workflowID } });
  if (workflow === 0) {
    return next(new NotFoundError('The workflow does not exist to delete.'))
  }
  res.send({ msg: `Workflow ${workflowID} has been deleted.` });
})

