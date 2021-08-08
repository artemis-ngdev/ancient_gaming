'use strict';
import { Field, Float, Int, ObjectType } from "type-graphql";
import {Model} from 'sequelize'
import "reflect-metadata";
import models from ".";
import { Table } from "sequelize-typescript";


export interface BetUpsertParams {
  id?: number
  userId?: number
  betAmount?: number;
  chance?: number;
  payout?: number;
  win?: boolean;
}


module.exports = (sequelize: any, DataTypes: any) => {
  @Table({
    tableName: "Bet",
    modelName: 'Bet',
    freezeTableName: true,
  })
  @ObjectType()
  class Bet extends Model {
    
    @Field(() => Int)
    id: number;

    @Field()
    userId: number

    @Field(() => models.User)
    user: typeof  models.User // do not like this here

    @Field(() => Float, {nullable: true})
    betAmount: number;

    @Field(() => Float,  {nullable: true})
    chance: number;

    @Field(() => Float, {nullable: true})
    payout: number;

    @Field(() => Boolean,  {nullable: true, defaultValue: false})
    win: boolean;

    static associate(models: any) { 

      // Bet.belongsTo(models.User, {as: 'userId'}); // Adds roleId to user rather than userRoleId

      // Bet.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   // as: 'userId'
      // });
    }
  };
  Bet.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    betAmount: DataTypes.FLOAT,
    chance: DataTypes.FLOAT,
    payout: DataTypes.FLOAT,
    win: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bet',
    tableName: 'Bet',
    timestamps: false
  });
  return Bet;
};