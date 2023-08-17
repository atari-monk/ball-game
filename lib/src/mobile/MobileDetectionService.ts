import { injectable } from 'inversify'
import { IMobileDetectionService } from 'atari-monk-ball-game-api'
import isMobile from 'is-mobile'

@injectable()
export class MobileDetectionService implements IMobileDetectionService {
  isMobileDevice(): boolean {
    return isMobile()
  }
}
