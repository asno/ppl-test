import {Patient} from './patient';
import { Drug } from './quarantine';

// Base class for Patient states
export abstract class State {
    
    constructor() {}
  
    readonly abstract code : string
    protected abstract applySpecificDrugs(patient: Patient): void

    applyDrugs(patient: Patient): void
    {
        if (patient.hasDrug(Drug.Aspirin) && patient.hasDrug(Drug.Paracetamol)) {
            patient.setState(new DeadState())
        } else {
            this.applySpecificDrugs(patient)
        }
    }
}
  
// Derived classes for specific states
export class FeverState extends State {
    code = 'F'
    applySpecificDrugs(patient: Patient): void {
        if (patient.hasDrug(Drug.Aspirin) || patient.hasDrug(Drug.Paracetamol)) {
            patient.setState(new HealthyState())
        }
    }
}
  
export class HealthyState extends State {
    code = 'H'
    applySpecificDrugs(patient: Patient): void {
        if (patient.hasDrug(Drug.Insulin) && patient.hasDrug(Drug.Antibiotic)) {
            patient.setState(new FeverState())
        }
    }
}

export class DiabetesState extends State {
    code = 'D'
    applySpecificDrugs(patient: Patient): void {
        if (!patient.hasDrug(Drug.Insulin)) {
            patient.setState(new DeadState())
        }
    }
}

export class TuberculosisState extends State {
    code = 'T'
    applySpecificDrugs(patient: Patient): void {
        if (patient.hasDrug(Drug.Antibiotic)) {
            patient.setState(new HealthyState())
        }
    }
}

export class DeadState extends State {
    code = 'X'
    applySpecificDrugs(_patient: Patient): void {
    }
}