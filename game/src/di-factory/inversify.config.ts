import { Container } from 'inversify';
import { configureContainer as libConfigureContainer } from "atari-monk-ball-game-lib";
import { configureContainer as clientConfigureContainer } from "atari-monk-ball-game-client";

export function configureContainer(container: Container) {
  const appFactory = libConfigureContainer(container);
  clientConfigureContainer(container);
  appFactory.create();
}
