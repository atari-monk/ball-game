import { Environment } from 'atari-monk-ball-game-client'
import { FactoryVersion, IAppConfig } from './IAppConfig'

const defaultConfig: IAppConfig = {
  environment: Environment.Development,
  factoryVersion: FactoryVersion.SimpleFactory,
}

const configFile = 'config.json'

export async function fetchConfig(): Promise<IAppConfig> {
  try {
    const response = await fetch(configFile)
    if (!response.ok) {
      throw new Error('Failed to fetch config file.')
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to load config file. Using default configuration.')
    return defaultConfig
  }
}

export async function updateConfig(
  environment: Environment,
  factoryVersion: FactoryVersion
): Promise<void> {
  try {
    const config = await fetchConfig()
    config.environment = environment
    config.factoryVersion = factoryVersion

    const response = await fetch(configFile, {
      method: 'PUT',
      body: JSON.stringify(config),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to update config file.')
    }

    console.log('Configuration updated successfully.')
  } catch (error) {
    console.error('Failed to update config file:', error)
  }
}
