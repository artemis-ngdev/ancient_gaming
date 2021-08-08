import db from "../models";
import { ADataService } from "./ADataService";

export class UserDataService extends ADataService<typeof db.User> {
	constructor(em: typeof db) {
	  super(em, db.User)
	}
  }
  