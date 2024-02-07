import {PatientsRegister} from './patientsRegister';
import {Patient} from './patient'
import { DeadState, DiabetesState, FeverState, HealthyState, State, TuberculosisState } from './state';

export enum Drug {
    Aspirin = 'As',
    Antibiotic = 'An',
    Insulin = 'I',
    Paracetamol = 'P',
}

export class Quarantine {

    private patients : Patient[] = []

    constructor(patients: PatientsRegister) {
        this.patients = []
        for (const key in patients) {
            if (patients.hasOwnProperty(key) && patients[key] > 0) {
                this.patients.push(new Patient(this.resolveStateKey(key), patients[key]))
            }
        }
    }

    public setDrugs(drugs: Array<string>): void {
        this.patients.forEach(p => p.drugs = drugs.map((drug) => drug as Drug))
    }

    public wait40Days(): void {
        this.patients.forEach(p => p.applyDrugs())
    }

    public report(): PatientsRegister {
        const report : PatientsRegister = {F: 0, H: 0, D: 0, T: 0, X: 0}
        this.patients.forEach(p => {
            if(report[p.state.code] !== undefined) {
                report[p.state.code] += p.count
            }
        })
        return report
    }

    private resolveStateKey(key: string): State {
        let state : State
        switch (key) {
            case 'F':
                state = new FeverState()
                break
            case 'H':
                state = new HealthyState()
                break
            case 'D':
                state = new DiabetesState()
                break
            case 'T':
                state = new TuberculosisState()
                break
            case 'X':
                state = new DeadState()
                break
        }
        return state
    }
}
