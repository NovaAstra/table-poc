import { type Nano, createNano } from './client';
import { Loader } from "./loader"

declare global {
  interface Window {
    nano: Nano;
    nanol: Loader;
  }
}


const nano = window.nano || {};
const nanol = new Loader();

window.nanol = nanol;
window.nano = createNano(nano);
