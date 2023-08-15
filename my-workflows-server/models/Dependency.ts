import {  InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { Column, ForeignKey, Table, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript';
import { Task } from './Task';

@Table({timestamps: true, modelName: 'Dependency'})
export class Dependency extends Model<InferAttributes<Dependency>, InferCreationAttributes<Dependency>> {
  
  @PrimaryKey
  @ForeignKey(()=> Task)
  @Column({type: DataType.INTEGER.UNSIGNED})
  declare taskID: bigint;

  @PrimaryKey
  @ForeignKey(()=> Task)
  @Column({type: DataType.INTEGER.UNSIGNED})
  declare dependencies: bigint;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
 }
