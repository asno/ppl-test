interface QuarantineDataset {
    admission: Date,
    inpatients: Record<string, number> | null | undefined
    drugs: string[] | null | undefined
    releasedPatients: Record<string, number>
}

export default QuarantineDataset