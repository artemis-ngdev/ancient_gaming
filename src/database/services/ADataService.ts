import { Model, Repository, Sequelize} from 'sequelize-typescript'
import db from '../models'

export interface IGetManyQueryArgs<T> {}
export type ID = string | number

export interface IDataService<T> {
	getById(id: ID): Promise<Model<T> |undefined>
	getMany(whereClause?: any): Promise<Model<T>[]> 
}

export abstract class ADataService<T> implements IDataService<T> {
  public readonly repository: Repository<Model<any, any>>


  constructor(protected readonly em: typeof db, private readonly _entity:any) {
    this.repository = _entity
  }


  public async getById(id: ID):  Promise<Model<T> |undefined>  {
    if (!id) throw new Error('Cannot find id')
    const x = await this.repository.findByPk(id)
    return x
  }

  public async getMany(whereClause?: any): Promise<Model<T>[]> {
    const models = await this.repository.findAll(whereClause)
	  return models
  }
 
}
