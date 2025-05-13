export interface Nano {

}

export enum ClientStatus {
  UNINITIALIZED,
  INITIALIZING,
  INITIALIZED,
}

export class Client {
  public initialized: ClientStatus = ClientStatus.UNINITIALIZED

  public constructor(
    public readonly nano: Nano
  ) { }

  public bootstrap() { }

  public require() { }
}

export function createNano(nano: Nano): Client {
  return new Client(nano);
}