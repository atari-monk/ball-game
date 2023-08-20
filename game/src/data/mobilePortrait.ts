import { IFieldParams, IScreenSize } from 'atari-monk-ball-game-lib-api'
import { Vector2d } from 'atari-monk-ball-game-lib'

const veryLightGreen = 0xccffcc

const screenSize: IScreenSize = {
  width: 300,
  height: 500,
}

const fieldParams: IFieldParams = {
  position: new Vector2d(screenSize.width / 2, screenSize.height / 2),
  size: new Vector2d(250, 500),
  color: veryLightGreen,
}

export const mobilePortrait = {
  fieldParams,
}
