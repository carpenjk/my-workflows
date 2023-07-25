import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { Workflow } from "../models/Workflow";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { NotFoundError } from "../errors/notFoundError";

export const getWorkflows = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const workflows = await Workflow.findAll({
    where: {
      completedDate: { [Op.eq]: null }
    }
  })
  if (workflows.length === 0) {
    return next(new NotFoundError('No workflows found.'));
  }
  res.send(workflows);
})

export const createWorkflow = asyncWrapper(async (req: Request, res: Response) => {
  const { workflowID, ...colsToCreate } = req.body;
  await Workflow.create({
    ...colsToCreate
  });
  res.json({ msg: 'Workflow created!' });
});

export const updateWorkFlow = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { workflowID } = req.params;
  const workflow = await Workflow.update(
    { ...req.body },
    { where: { workflowID: workflowID } }
  )
  if (workflow[0] === 0) {
    return next(new NotFoundError('The workflow does not exist to update.'));
  }
  res.send({ msg: 'Workflow updated!' });
})

export const deleteWorkFlow = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { workflowID } = req.params;
  const workflow = await Workflow.destroy({ where: { workflowID: workflowID } });
  if (workflow === 0) {
    return next(new NotFoundError('The workflow does not exist to delete.'))
  }
  res.send({ msg: `Workflow ${workflowID} has been deleted.` });
})