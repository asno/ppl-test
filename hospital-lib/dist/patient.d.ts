import { State } from './state';
import { Drug } from './quarantine';
export declare class Patient {
    state: State;
    count: number;
    drugs: Drug[];
    constructor(initialState: State, count: number);
    applyDrugs(): void;
    hasDrug(drug: Drug): boolean;
    setState(newState: State): void;
}
