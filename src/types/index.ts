export type MouthState = 
  | 'Open'
  | 'Closed'

export type EggGuyMode =
  | 'up'
  | 'down'
  | 'eating'

export type LegState = 
  | 'Up'
  | 'Down'

export interface LocalStorageDevOverrides {
  min: number;
  max: number;
}