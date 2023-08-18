export interface IMobileFlags {
  mobile: boolean
  portrait: boolean
  landscape: boolean
  logState: () => void
  setFlags: (mobile: boolean, portrait: boolean, landscape: boolean) => void
}
