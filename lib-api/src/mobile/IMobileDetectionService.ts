export interface IMobileDetectionService {
  isMobileDevice(): boolean
  isPortrait(): boolean
  isLandscape(): boolean
  addOrientationChangeListeners(callback: () => void): void
  removeOrientationChangeListeners(callback: () => void): void
}
