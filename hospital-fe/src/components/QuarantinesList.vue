<template>
    <div class="grid-container">
        <ul>
            <div class="grid-header">
                <div class="header-cell">Admission</div>
                <div class="header-cell">Inpatients</div>
                <div class="header-cell">Drugs</div>
                <div class="header-cell">Released Patients</div>
            </div>
            <li v-for="(quarantine, index) in displayedQuarantines" :key="index" class="grid-row" :class="{ 'alternate-row': index % 2 !== 0 }">
                <div class="grid-cell">{{ quarantine ? Math.floor((nextReleaseDate.getTime() - quarantine.admission.getTime()) / (1000 * 60 * 60 * 24)) + ' days ago' : '' }}</div>
                <div class="grid-cell">{{ quarantine ? quarantine.inpatients  : '' }}</div>
                <div class="grid-cell">{{ quarantine ? quarantine.drugs : ''}}</div>
                <div class="grid-cell">{{ quarantine ? quarantine.releasedPatients : '' }}</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuarantineDataset from '@/types/QuarantineDataset'

export default defineComponent({
    name: 'QuarantinesList',
    props: {
        quarantines: {
            required: true,
            type: Array as PropType<QuarantineDataset[]>
        },
        nextReleaseDate: {
            required: true,
            type: Date
        }
    },
    computed: {
        displayedQuarantines(): QuarantineDataset[] {
            Math.min()
            const lastTenQuarantines = this.quarantines.slice(-10).reverse();
            const emptyQuarantines = new Array(Math.max(10 - lastTenQuarantines.length, 0)).fill(undefined)
            return [...lastTenQuarantines, ...emptyQuarantines];
        }
    }
})
</script>

<style scoped>
.header-cell, .grid-cell {
  padding-left: 8px;
  border: 1px solid #ccc;
  flex: 1;
  min-height: 2em; /* Set a minimum height for cells */
  display: flex;
  align-items: center;
}

.grid-container {
    width: 60%;
    margin: 0 auto;
    padding: 0 20%;
}

.grid-header {
    display: flex;
    font-weight: bold;
}

.grid-row {
  display: flex;
}

.alternate-row {
  background-color: #f0f0f0;
}

</style>@/types/QuarantineDataset