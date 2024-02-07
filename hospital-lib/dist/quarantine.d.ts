import { PatientsRegister } from './patientsRegister';
export declare enum Drug {
    Aspirin = "As",
    Antibiotic = "An",
    Insulin = "I",
    Paracetamol = "P"
}
export declare class Quarantine {
    private patients;
    constructor(patients: PatientsRegister);
    setDrugs(drugs: Array<string>): void;
    wait40Days(): void;
    report(): PatientsRegister;
    private resolveStateKey;
}
