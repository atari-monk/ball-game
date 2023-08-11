import { Environment } from './Environment'

export interface ISocketConfig {
  environment: Environment
  localUri: string
  prodUri: string
}
