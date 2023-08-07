import { Container } from 'inversify';
import { AppFactory } from '../app/AppFactory';
import { ServiceFactory } from '../service/ServiceFactory';
import { PlayerFactory } from '../player/PlayerFactory';
import { PlayerNpcFactory } from '../player-npc/PlayerNpcFactory';
import { BallFactory } from '../ball/BallFactory';
import { ObjectManagerCreator } from '../game-obj/ObjectManagerCreator';
import { FieldFactory } from '../field/FieldFactory';

export function configureContainer(container: Container): AppFactory {
  const appFactory = new AppFactory(container);
  appFactory.register();

  const serviceFactory = new ServiceFactory(container);
  serviceFactory.register();

  const playerFactory = new PlayerFactory(container);
  playerFactory.register();

  const playerNpcFactory = new PlayerNpcFactory(container);
  playerNpcFactory.register();

  const ballFactory = new BallFactory(container);
  ballFactory.register();

  const fieldFactory = new FieldFactory(container);
  fieldFactory.register();

  container.resolve(ObjectManagerCreator).create();

  return appFactory;
}
