<template>
  <div class="container">
    <div class="input-mode">
      <label for="inputMode">Input mode</label>
      <select id="inputMode" v-model="selectedOption">
        <option value="manualRemoteInputs">manual remote</option>
        <option value="userInputs">user</option>
      </select>
    </div>
    <component :is="selectedOption === 'manualRemoteInputs' ? 'QuarantineManualRemoteInputs' : 'QuarantineUserInputs'" @inputDataFetched="updateQuarantineDataset"/>
  </div>
  <QuarantinesList :quarantines="quarantines" :nextReleaseDate="nextReleaseDate" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import QuarantineUserInputs from './components/QuarantineUserInputs.vue'
import QuarantineManualRemoteInputs from './components/QuarantineManualRemoteInputs.vue'
import QuarantinesList from './components/QuarantinesList.vue'
import QuarantineDataset from './types/QuarantineDataset'
import { Quarantine, PatientsRegister } from 'hospital-lib'

export default defineComponent({
  name: 'App',
  components: {
    QuarantineUserInputs,
    QuarantineManualRemoteInputs,
    QuarantinesList
  },
  setup() {
    const selectedOption = ref('manualRemoteInputs')
    const quarantines = ref<QuarantineDataset[]>([])
    const nextAdmissionDate = ref<Date>(new Date())
    const nextReleaseDate = ref<Date>(new Date())

    const updateQuarantineDataset = (dataset: QuarantineDataset) => {
      const quarantine : Quarantine = new Quarantine(dataset.inpatients as PatientsRegister)
      quarantine.setDrugs(dataset.drugs as string[])
      quarantine.wait40Days()
      nextAdmissionDate.value.setTime(nextAdmissionDate.value.getTime() + Math.floor((Math.random() * (7 - 1 + 1)) + 1) * 1000 * 60 * 60 * 24)
      dataset.admission = new Date(nextAdmissionDate.value)
      dataset.releasedPatients = quarantine.report()
      quarantines.value.push(dataset)
      nextReleaseDate.value.setTime(nextAdmissionDate.value.getTime() + 40 * 1000 * 60 * 60 * 24)
    }

    return {
      selectedOption,
      quarantines,
      nextReleaseDate,
      updateQuarantineDataset,
    }
  },
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  height: fit-content;
}

.input-mode {
  display: flex;
  align-items: center;
  align-self: flex-start;
}

.input-mode label {
  margin-right: 10px;
}
</style>
