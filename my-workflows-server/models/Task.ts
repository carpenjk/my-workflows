import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { User } from './User';
import { AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, IsNull, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Workflow } from './Workflow';

@Table({timestamps: true, modelName: 'Task'})
export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: { msg: 'taskID must be an integer' }
    }
  })
  declare taskID:  CreationOptional<bigint>;

  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
    allowNull: false,
    // unique: true,
    validate: {
      min: 2,
      max: 50,
    }
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      min: 1,
      max: 100,
    }
  })
  declare description: string;

  @AllowNull(false)
  @ForeignKey(()=> User) 
  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  declare ownerID: bigint;

  @BelongsTo(()=> User,{as: 'taskOwner'})
  declare owner: CreationOptional<User>;
  
  @BelongsToMany(()=> Task, {
    through: 'Dependencies', 
    foreignKey: 'taskID', 
    otherKey:'dependencies', 
    as: 'taskDependencies'
   })
  declare taskDependencies: CreationOptional<Task[]>;


  // declare reviewer: bigint;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: {
        args: new Date().toISOString(),
        msg: 'Due date must be in the future.'
      },
    }
  })
  declare dueDay: number;
  
  @AllowNull(false)
  @ForeignKey(()=> Workflow)
  @Column({type: DataType.INTEGER.UNSIGNED, onDelete: 'CASCADE'})
  declare workflowID: bigint
  
  @BelongsTo(()=> Workflow,{as: 'tasks'})
  declare workflow: CreationOptional<Workflow>;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}
