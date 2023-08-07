import { Server } from 'socket.io';
import { LogicManagerGeneric } from './../logic/LogicManagerGeneric';
import { IServerLogicUnit } from "atari-monk-ball-game-api";

export class ServerLogicManager extends LogicManagerGeneric<IServerLogicUnit> {
  public initializeServer(server: Server): void {
    this.logicUnits.forEach((unit) => {
      unit.initializeServer(server);
    });
  }
}
