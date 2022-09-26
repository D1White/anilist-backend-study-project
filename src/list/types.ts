export interface IList {
  id: number;
  user_id: number;
  current: number[];
  planning: number[];
  completed: number[];
  paused: number[];
  dropped: number[];
}

export enum ListsEnum {
  current = 'current',
  planning = 'planning',
  completed = 'completed',
  paused = 'paused',
  dropped = 'dropped',
}
