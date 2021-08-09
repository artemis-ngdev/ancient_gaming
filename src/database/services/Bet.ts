import { Sequelize } from "sequelize-typescript";
import db from "../models";
import { BetUpsertParams } from "../models/Bet";
import { ADataService } from "./ADataService";

export class BetDataService extends ADataService<typeof db.Bet> {
	constructor(em: Sequelize) {
	  super(em, db.Bet)
	}

	public async createBet(params:BetUpsertParams) {
		const betObject = await this.repository.create({
		  ...params
		})
		return betObject.save().then(async (savedBet) => {
			return savedBet
		}) 
	}
 	 
  }
  