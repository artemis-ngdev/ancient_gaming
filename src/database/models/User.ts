import { Field, Float, Int, ObjectType } from "type-graphql";
import { BetUpsertParams } from "./Bet";
import {Model} from 'sequelize'
import models from ".";
import { Table } from "sequelize-typescript";


interface UserUpsertParams {
  id?: number
  name?: string
  balance?: number
  bets?: BetUpsertParams[]
}

module.exports = (sequelize:any, DataTypes:any) => {
  @Table({
    tableName: "User",
    modelName: 'User',
    freezeTableName: true,
  })
  @ObjectType()
  class User extends Model {
    
    @Field(() => Int)
    id: number;

    @Field()
    name: string

    @Field(() => Float)
    balance: number;

    @Field(() => [models.Bet])
    bets: typeof models.Bet[]

    static associate(models: any) {
      // define association here
      // User.hasMany(models.Bet);

    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    balance: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: false
  });
  return User;
};