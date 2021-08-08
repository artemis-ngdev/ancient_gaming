import fs from 'fs'
import dotenv from 'dotenv'
import {ConfigSchema} from './schema'
import path from 'path'
 
const CURRENT_FOLDER = path.basename(path.join(__dirname, '..'))
const BASE_PATH = `${CURRENT_FOLDER}`
 
export class AppConfig {
  private readonly _env: Record<string, string>
  constructor(envFilePath?: string) {
    const envExists = envFilePath && fs.existsSync(envFilePath)
    envExists && dotenv.config({path: envFilePath})
    const {value, error} = ConfigSchema.validate(process.env, {allowUnknown: true, stripUnknown: true})
    if (error) {
      throw new Error(`Missing Required Environment Variables | ${error.message}`)
    }
    this._env = value
  }

  public get port(): number {
    return +this._env.PORT
  }


  public get environment(): string {
    return this._env.NODE_ENV
  }

 
 
}

let ENV = process.env.NODE_ENV
if (!ENV || ENV.indexOf('dev') > -1) {
  ENV = 'local'
}
const ENV_FILE_PATH = `.env.${ENV}`

export default new AppConfig(ENV_FILE_PATH)
