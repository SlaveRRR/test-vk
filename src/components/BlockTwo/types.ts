export interface IAgeResponse {
  age: number;
  name: string;
  count: number;
}

export type TForm = Pick<IAgeResponse, 'name'>;
