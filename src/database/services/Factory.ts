import { BetDataService } from "./Bet";
import { UserDataService } from "./User";

 
export class DataServiceFactory {
  private _userDS: UserDataService
  private _betDS: BetDataService

constructor(private readonly db: any) {
}

  public getUserDS(): UserDataService {
    this._userDS = this._userDS ?? new UserDataService(this.db)
    return this._userDS
  }

  public getBetDS(): BetDataService {
    this._betDS = this._betDS ?? new BetDataService(this.db)
    return this._betDS
  }
 
}
