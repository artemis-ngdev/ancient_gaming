import {NextFunction, Response, Request} from 'express'
import onFinished from 'on-finished'
import db from '../database/models'
import { DataServiceFactory } from '../database/services/Factory'
 
export const useTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.dsFactory = new DataServiceFactory(db)
    next()
  } catch (error) {
    next(error)
  }
}
