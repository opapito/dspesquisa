export type GamePlatform = 'XBOX' | 'PC' | 'PLAYSTATION';


export type Game = {
  id:number;
  title: string;
  platform: GamePlatform;
  label:string;
  value:number;
}

//typing the payload received from backend
export type RecordItem = {
  id: number,
  moment:string,
  name: string,
  age: number,
  gameTitle: string,
  gamePlatform: GamePlatform,
  genreName: string
}

export type PieChartData = {
  x: string;
  y: number
}

export type BarChartData = {
  x: string;
  y: number;
}

export type ExpoIcons = 'checkcircle' | 'closecircleo';