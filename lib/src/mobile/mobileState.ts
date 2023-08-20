import { IMobileFlags } from 'atari-monk-ball-game-lib-api'

export const mobileState: IMobileFlags = {
  mobile: true,
  portrait: false,
  landscape: true,
  logState() {
    console.log('Mobile:', this.mobile)
    console.log('Portrait:', this.portrait)
    console.log('Landscape:', this.landscape)
  },
  setFlags(mobile: boolean, portrait: boolean, landscape: boolean) {
    this.mobile = mobile
    this.portrait = portrait
    this.landscape = landscape
    this.logState()
  },
}
