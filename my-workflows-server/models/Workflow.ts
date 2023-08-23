import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { Task } from './Task';
import { User } from './User';
import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({timestamps: true, modelName: 'Workflow'})
export class Workflow extends Model<InferAttributes<Workflow>, InferCreationAttributes<Workflow>> {

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: { msg: 'workflowID must be an integer' }
    }
  })
  declare workflowID: CreationOptional<bigint>;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
    validate: {
      min: 1,
      max: 25,
    }
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      min: 1,
      max: 50,
    }
  })
  declare description: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    validate: {
      min: 1,
      max: 15,
    }
  })
  declare status: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
    validate: {
      min: 1,
      max: 15,
    }
  })
  declare duration: CreationOptional<string| null>;

  @ForeignKey(()=> User) @Column({type: DataType.INTEGER.UNSIGNED}) declare ownerID: bigint;
  @BelongsTo(()=> User,{as: 'workflowOwner'})
  declare owner: CreationOptional<User>;

  @HasMany(()=> Task,{as: 'tasks'})
  declare task: CreationOptional<Task[]>

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}
