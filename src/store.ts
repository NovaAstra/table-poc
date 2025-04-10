import { Model } from "./model"

export interface Store {
  model: Model;
  getItemSize(index: number): number;
  getViewportSize(): number;
}

export class Store {
  public model: Model;

  public constructor() {
    this.model = new Model()
  }
}
