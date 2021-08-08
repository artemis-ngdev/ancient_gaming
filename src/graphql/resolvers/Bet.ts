import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql"
import { IGraphqlContext } from ".."
// import Bet, { BetUpsertParams } from "../../models/Bet"
// import User from "../../models/User"
import {Model, Sequelize} from 'sequelize-typescript';
import db from "../../database/models";
import { BetUpsertParams } from "../../database/models/Bet";
import { calculateOdd, generateResult, getBet } from "../../utils/common";
// import { getBet } from "../../utils/common";


@Resolver(() => db.Bet)
export class BetResolver {
  @Query((returns) => [db.Bet], {description: 'Get all bets'})
  async getBetList(@Ctx() ctx: IGraphqlContext): Promise<Model< typeof db.Bet, typeof db.Bet>[]> {
     const {dsFactory} = ctx
     return await dsFactory.getBetDS().getMany()
   }

  @Query((returns) => db.Bet, {description: 'Get one bet'})
  async getBet(@Arg('id', type => Int, {nullable: false}) id: number, @Ctx() ctx: IGraphqlContext): Promise<Model<typeof db.Bet, typeof db.Bet>>{
    const {dsFactory} = ctx
    return await dsFactory.getBetDS().getById(id)    
  }

  @Query((returns) => [db.Bet], {description: 'Return a distinct list of the best bet each user has made'})
  async getBestBetPerUser(@Arg('limit',type => Int, {nullable: true}) limit: number,  @Ctx() ctx: IGraphqlContext) :Promise<Model<typeof db.Bet, typeof db.Bet>[]>{
    const {dsFactory } = ctx
    const clause =  {  
          attributes: [
            "userId", "win","payout", "id",
            [Sequelize.fn('MAX', Sequelize.col('betAmount')), 'betAmount'],
            // [Sequelize.fn('MAX', Sequelize.col('payout')), 'payout'],
            [Sequelize.fn('MAX', Sequelize.col('chance')), 'chance'],
            ],
           where: {
            win: true,
            },
           limit,
           group: ["userId", "win", "payout", "id"],
      }       
    const result = await dsFactory.getBetDS().getMany(clause) 
    return  result
  }

  @Mutation((returns) => db.Bet)
  async createBet(
   @Arg('userId' ,type => Int, {nullable: false}) userId: number,
   @Arg('chance', {nullable: false}) chance: number, 
   @Arg('betAmount', {nullable: false}) betAmount: number, 
   @Ctx() ctx: IGraphqlContext)  {
    const {dsFactory} = ctx
    const params:BetUpsertParams = {
        userId,
        chance,
        betAmount,  
        win: false      
    }
    const user = await dsFactory.getUserDS().getById(userId)
    if (user.getDataValue('balance') < betAmount) {
      throw Error('You do not have enough credits to place this bet!')
    }
     const userBet = Math.floor(Math.random() * 6) + 1;
     const betResult = generateResult(chance, userBet) 

     if (betResult === userBet) {
        params.win = true
     }
     if ( params.win ) {
      const odd = calculateOdd(chance)
      params.payout = params.betAmount * odd
     }
   
    
    return dsFactory.getBetDS().createBet({...params}).then(async (bet) => {
      if (bet) {
        // update balance 
        await user.update(
          {
            balance: user.getDataValue('balance') - betAmount
          },
          { where: { id: userId } }
        ).then(() => {})
      }
      if (bet && bet.getDataValue('win') === true) {
        // update balance since is a win
        await user.update(
          {
            balance: user.getDataValue('balance') + params.payout
          },
          { where: { id: userId } }
        ).then(() => {})
      }
      return bet
    })

    
    
  }

 
  @FieldResolver(() => db.User)
  async user(@Root() bet: typeof db.Bet, @Ctx() ctx: IGraphqlContext): Promise<Model<typeof db.User, typeof db.User>> {
    const {dsFactory} = ctx
    const user = await dsFactory.getUserDS().getById(bet.userId)!
    return user
  }

}