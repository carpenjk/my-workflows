import { InferAttributes, InferCreationAttributes, CreationOptional, VIRTUAL } from 'sequelize'
import { Task } from './Task';
import { User } from './User';
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { BadRequestError } from '../errors/badRequestError';

@Scopes(() => ({
  withTasks: {
    include: [
      {
        model: Task,
        as: 'tasks',
        separate:true, //appears to be a bug that does let you order from outside query
        attributes: {exclude: ['ownerID']},
        order: [['dueDay', 'asc']],
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
      }
    ],
  },
}))
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
    type: DataType.STRING(20),
    allowNull: true,
    validate: {
      min: 1,
      max: 20,
    }
  })
  declare duration: CreationOptional<string| null>;

  @AllowNull(false)
  @ForeignKey(()=> User) 
  @Column({type: DataType.INTEGER.UNSIGNED})
  declare ownerID: bigint;

  @BelongsTo(()=> User,{as: 'workflowOwner'})
  declare owner: CreationOptional<User>;

  @HasMany(()=> Task,{as: 'tasks', onDelete: 'CASCADE'})
  declare task: CreationOptional<Task[]>

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  

}
