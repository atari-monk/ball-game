import { injectable } from 'inversify'
import { IMobileDetectionService } from 'atari-monk-ball-game-api'
import isMobile from 'is-mobile'

@injectable()
export class MobileDetectionService implements IMobileDetectionService {
  isMobileDevice(): boolean {
    return isMobile()
  }

  isPortrait(): boolean {
    return window.matchMedia('(orientation: portrait)').matches
  }

  isLandscape(): boolean {
    return window.matchMedia('(orientation: landscape)').matches
  }

  addOrientationChangeListeners(callback: () => void): void {
    window.addEventListener('orientationchange', callback)
  }

  removeOrientationChangeListeners(callback: () => void): void {
    window.removeEventListener('orientationchange', callback)
  }
}
