import * as PIXI from 'pixi.js'
import { injectable, inject } from 'inversify'
import {
  IBall,
  IBallModel,
  IBallRenderer,
  IVectorData,
  BallTypes,
  SharedTypes,
} from 'atari-monk-ball-game-lib-api'
import { GameObject } from '../game-obj/GameObject'
import { Vector2d } from '../model/Vector2d'
import EventEmitter from 'eventemitter3'

@injectable()
export class Ball extends GameObject implements IBall {
  private VelocityEvent = 'ball-vel-upd'
  private PositionEvent = 'ball-pos-upd'
  private timeoutId: number | null = null

  public get model(): IBallModel {
    return this._model
  }

  constructor(
    @inject(BallTypes.Model)
    private readonly _model: IBallModel,
    @inject(BallTypes.Renderer)
    private readonly renderer: IBallRenderer,
    @inject(SharedTypes.EventEmitter)
    private readonly emitter: EventEmitter
  ) {
    super()
    this.startEmitPositionTimeout()
  }

  private startEmitPositionTimeout() {
    this.timeoutId = window.setInterval(() => {
      this.emitPosition()
    }, 50)
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.draw(stage, this.model)
  }

  public update(deltaTime: number): void {
    this._model.position.x += this._model.velocity.x * deltaTime
    this._model.position.y += this._model.velocity.y * deltaTime
  }

  private emitPosition() {
    if (this._model.velocity.x === 0 && this._model.velocity.y === 0) return
    const data: IVectorData = {
      clientId: this._model.clientId,
      newVector: this._model.position,
    }
    this.emitter.emit(this.PositionEvent, data)
  }

  public bounce() {
    const currentVelocity = this._model.velocity
    const reversedVelocity = new Vector2d(
      -currentVelocity.x,
      -currentVelocity.y
    )
    this._model.velocity = reversedVelocity
    this.emittVelocity()
  }

  public emittVelocity() {
    const data: IVectorData = {
      clientId: '0',
      newVector: this._model.velocity,
    }
    this.emitter.emit(this.VelocityEvent, data)
  }

  toString(): string {
    return this.model.toString()
  }
}
