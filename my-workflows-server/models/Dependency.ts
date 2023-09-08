import {  InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { Column, ForeignKey, Table, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, AllowNull } from 'sequelize-typescript';
import { Task } from './Task';

@Table({timestamps: true, modelName: 'Dependency'})
export class Dependency extends Model<InferAttributes<Dependency>, InferCreationAttributes<Dependency>> {
  
  @AllowNull(false)
  @PrimaryKey
  @ForeignKey(()=> Task)
  @Column({type: DataType.INTEGER.UNSIGNED})
  declare taskID: bigint;

  @AllowNull(false)
  @PrimaryKey
  @ForeignKey(()=> Task)
  @Column({type: DataType.INTEGER.UNSIGNED})
  declare dependencies: bigint;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
 }
