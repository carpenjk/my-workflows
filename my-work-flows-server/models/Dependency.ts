import { Model } from 'sequelize'
import { sequelize } from '../adapters/sequelize';

export class Dependency extends Model { }

Dependency.init({
}, {
  sequelize,
  timestamps: true,
  modelName: 'Task_Dependency'
})
