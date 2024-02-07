import {State} from './state';
import {Drug} from './quarantine'

export class Patient {
    state: State
    count: number
    drugs: Drug[] = []
  
    constructor(initialState: State, count : number) {
      this.state = initialState;
      this.count = count
    }
  
    applyDrugs(): void {
      this.state.applyDrugs(this);
    }
  
    hasDrug(drug: Drug): boolean {
      return this.drugs.indexOf(drug) > -1;
    }
  
    setState(newState: State): void {
      this.state = newState
    }
  }