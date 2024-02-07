import { Patient } from './patient';
export declare abstract class State {
    constructor();
    readonly abstract code: string;
    protected abstract applySpecificDrugs(patient: Patient): void;
    applyDrugs(patient: Patient): void;
}
export declare class FeverState extends State {
    code: string;
    applySpecificDrugs(patient: Patient): void;
}
export declare class HealthyState extends State {
    code: string;
    applySpecificDrugs(patient: Patient): void;
}
export declare class DiabetesState extends State {
    code: string;
    applySpecificDrugs(patient: Patient): void;
}
export declare class TuberculosisState extends State {
    code: string;
    applySpecificDrugs(patient: Patient): void;
}
export declare class DeadState extends State {
    code: string;
    applySpecificDrugs(_patient: Patient): void;
}
