import * as PIXI from 'pixi.js'
import {
  IAppHelper,
  IAppHelperParams,
  IGameLoop,
  IMobileFlags,
} from 'atari-monk-ball-game-lib-api'
import { getCanvas } from '../utils/ui'

export class AppHelper implements IAppHelper {
  private pixiApp!: PIXI.Application<PIXI.ICanvas>
  private _canvas?: HTMLCanvasElement

  private _width: number
  private _height: number
  private _backgroundColor: number
  private _fullScreen: boolean

  get canvas() {
    return this._canvas
  }

  get backgroundColor() {
    return this._backgroundColor
  }

  get fullScreen() {
    return this._fullScreen
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  set backgroundColor(value) {
    this._backgroundColor = value
  }

  set fullScreen(value) {
    this._fullScreen = value
  }

  set width(value) {
    this._width = value
  }

  set height(value) {
    this._height = value
  }

  constructor(
    options: IAppHelperParams,
    private readonly mobileState: IMobileFlags
  ) {
    const { screenSize, backgroundColor, fullScreen } = options
    this._width = screenSize.width
    this._height = screenSize.height
    this._backgroundColor = backgroundColor
    this._fullScreen = fullScreen
    this.setFullScreen()
    try {
      this._canvas = getCanvas('appHelper')
    } catch (error) {
      console.log('Error setting _canvas.')
    }
  }

  private setFullScreen() {
    try {
      if (this._fullScreen) {
        this._width = window.innerWidth
        this._height = window.innerHeight
      }
    } catch (error) {
      console.log('Error setting fullscreen.')
    }
  }

  public initializeApp(pixiApp: PIXI.Application<PIXI.ICanvas>) {
    this.pixiApp = pixiApp
    this.setCanvasStyles()
    this.pixiApp.stage.sortableChildren = true
    this.resizeCanvas()
  }

  private setCanvasStyles() {
    if (!this._canvas) return

    const isFullScreen = this._fullScreen
    const full = '100%'
    const canvasWidth = isFullScreen ? full : `${this._width}px`
    const canvasHeight = isFullScreen ? full : `${this._height}px`
    const canvasBorder = isFullScreen ? 'none' : '1px solid red'
    let style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: canvasWidth,
      height: canvasHeight,
      border: canvasBorder,
      marginBottom: '0',
    }

    if (this.mobileState.mobile && this.mobileState.portrait) {
      style.width = '300px'
      style.height = '400px'
    } else if (this.mobileState.mobile && this.mobileState.landscape) {
      style.width = '400px'
      style.height = '300px'
      style.top = '45%'
    } else {
      style.width = canvasWidth
      style.height = canvasHeight
    }
    console.log('style:', style)
    Object.assign(this._canvas.style, style)
  }

  private resizeCanvas() {
    window.addEventListener('resize', () => {
      if (this._fullScreen) {
        this._width = window.innerWidth
        this._height = window.innerHeight
      }
      this.pixiApp.renderer.resize(this._width, this._height)
    })
  }

  public startAnimationLoop(game: IGameLoop) {
    this.pixiApp.ticker.add((deltaTime) => {
      game.gameLoop(deltaTime)
    })
  }
}
