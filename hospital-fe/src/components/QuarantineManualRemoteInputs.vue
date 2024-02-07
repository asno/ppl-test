<template>
    <button @click="handleRetrieve()" :disabled="retrieveButtonDisabled" class="center-button">Retrieve patients and drugs</button>
    <p class="centered-text">Inpatients : {{ quarantineDataset.inpatients }}</p>
    <p class="centered-text">Drugs : {{ quarantineDataset.drugs }}</p>
    <button @click="handleAdminister()" :disabled="administerButtonDisabled" class="centered-button">Administer the drugs</button>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DataService } from '@/DataService'
import QuarantineDataset from '@/types/QuarantineDataset'

export default defineComponent({
    name: 'QuarantineManualRemoteInputs',
    emits: ['inputDataFetched'],
    setup(_, { emit }) {
        const quarantineDataset = ref<QuarantineDataset>({admission: new Date(), inpatients: null, drugs: null, releasedPatients: {}})
        const administerButtonDisabled = ref(true)
        const retrieveButtonDisabled = ref(false)

        const handleRetrieve = () => {
            DataService.fetchPatients((result) => {
                quarantineDataset.value.inpatients = result
                if (result === null) {
                    return;
                }
            })
            DataService.fetchDrugs((result) => {
                quarantineDataset.value.drugs = result
                if (result === null) {
                    return;
                }
            })
            administerButtonDisabled.value = false
            retrieveButtonDisabled.value = true
        }
        const handleAdminister = () => {
            administerButtonDisabled.value = true
            retrieveButtonDisabled.value = false

            emit('inputDataFetched', {...quarantineDataset.value})

            quarantineDataset.value.inpatients = null
            quarantineDataset.value.drugs = null
        }

        return {
            quarantineDataset,
            retrieveButtonDisabled,
            administerButtonDisabled,
            handleRetrieve,
            handleAdminister,
        }
    },
});
</script>
  
<style scoped>
.centered-button {
  margin: 10px;
}

.centered-text {
  margin: 10px;
}
</style>
  