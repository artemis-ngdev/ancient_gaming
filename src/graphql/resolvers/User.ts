import { Model } from "sequelize/types"
import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql"
import { IGraphqlContext } from ".."
import db from "../../database/models"
  
@Resolver(() => db.User)
export class UserResolver {


  @Query((returns) => [db.User], {description: 'Get all users'})
  async getUserList(@Ctx() ctx: IGraphqlContext): Promise<Model<typeof db.User, typeof db.User>[]> {
     const {dsFactory} = ctx
     return await dsFactory.getUserDS().getMany()
   }

  @Query((returns) => db.User, {description: 'Get one user'})
  async getUser(@Arg('id', type => Int,{nullable: false}) id: number, @Ctx() ctx: IGraphqlContext): Promise<Model<typeof db.User, typeof db.User>> {
    const {dsFactory} = ctx
    return await dsFactory.getUserDS().getById(id)    
  }



  @FieldResolver(() => [db.Bet])
  async bets(@Root() user: typeof db.User, @Ctx() ctx: IGraphqlContext): Promise<Model<typeof db.Bet, typeof db.Bet>[]>  {
     const {dsFactory} = ctx
     const bets = await dsFactory.getBetDS().repository.findAll({where: {userId: user.id}})
     return bets
  }

}