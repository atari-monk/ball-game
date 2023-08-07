import { IBall } from "atari-monk-ball-game-api";
import {
    Ball,
    BallModel,
    BallRenderer,
    BasicRenderer,
    ballParams,
} from "atari-monk-ball-game-lib";
import EventEmitter from 'eventemitter3';

export class BallFactory {
  private _ball: IBall;

  public get ball() {
    return this._ball;
  }

  constructor(eventEmitter: EventEmitter) {
    try {
      this._ball = new Ball(
        new BallModel(ballParams),
        new BallRenderer(new BasicRenderer()),
        eventEmitter
      );
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
