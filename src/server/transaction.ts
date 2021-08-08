import {NextFunction, Response, Request} from 'express'
import onFinished from 'on-finished'
import db from '../database/models'
import { DataServiceFactory } from '../database/services/Factory'
 
export const useTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // req.trxContext = db
    req.dsFactory = new DataServiceFactory(db)
    onFinished(res, async (err: any) => {
		try {
		  if (!req.trxContext) return;
		  if (err) {
			await req.trxContext.rollback();
		  } else {
			await req.trxContext.commit();
		  }
		} finally {
    		//   await db.releaseConnection()
    	}
	  });
    next()
  } catch (error) {
    next(error)
  }
}
