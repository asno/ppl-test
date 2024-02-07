<template>
  <div class="patient-counts">
    <div v-for="(count, state) in patientCounts" :key="state" class="patient-count">
      <label :for="`state${state}`">{{ state }}:</label>
      <input type="number" :id="`state${state}`" v-model="patientCounts[state]" @input="handleInput(state)" />
    </div>
  </div>
  <div>
    <label for="drugAs">Aspirin:</label>
    <input type="checkbox" id="drugAs" v-model="selectedDrugs.As" />
  </div>
  <div>
    <label for="drugAn">Antibiotic:</label>
    <input type="checkbox" id="drugAn" v-model="selectedDrugs.An" />
  </div>
  <div>
    <label for="drugI">Insulin:</label>
    <input type="checkbox" id="drugI" v-model="selectedDrugs.I" />
  </div>
  <div>
    <label for="drugP">Paracetamol:</label>
    <input type="checkbox" id="drugP" v-model="selectedDrugs.P" />
  </div>
  <button @click="handleSubmit()" :disabled="submitDisabled">Submit</button>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import QuarantineDataset from '@/types/QuarantineDataset'

export default defineComponent({
  name: 'QuarantineUserInputs',
  emits: ['inputDataFetched'],
  setup(_, { emit }) {
    const quarantineDataset = ref<QuarantineDataset>({admission: new Date(), inpatients: {}, drugs: [], releasedPatients: {}})
    const patientCounts = ref<Record<string, number>>({
      F: 0,
      H: 0,
      D: 0,
      T: 0,
      X: 0
    })
    const selectedDrugs = ref<Record<string, boolean>>({
      As: false,
      An: false,
      I: false,
      P: false
    })
    const submitDisabled = ref(true)

    const handleInput = (state: string) => {
      if (patientCounts.value[state] > 9 || patientCounts.value[state] < 0) {
        patientCounts.value[state] = 0
      }
    }

    const handleSubmit = () => {
      quarantineDataset.value.inpatients = patientCounts.value
      quarantineDataset.value.drugs = Object.keys(selectedDrugs.value).filter((drug: keyof typeof selectedDrugs.value) => selectedDrugs.value[drug])
      emit('inputDataFetched', {...quarantineDataset.value})
    }

    const watchFields = () => {
      submitDisabled.value = !(Object.values(patientCounts.value).some(count => count > 0) || Object.values(selectedDrugs.value).some(value => value === true))
    }


    watch(() => patientCounts.value, watchFields, { deep: true })
    watch(() => selectedDrugs.value, watchFields, { deep: true })

    return {
      patientCounts,
      selectedDrugs,
      submitDisabled,
      handleInput,
      handleSubmit
    }
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  margin-right: 10px;
}

input[type="checkbox"], input[type="number"] {
  margin-bottom: 10px;
}

.patient-counts {
  display: flex;
  justify-content: space-evenly;
  width: 20%;
}

.patient-count {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="number"] {
  width: 30px;
}
</style>
