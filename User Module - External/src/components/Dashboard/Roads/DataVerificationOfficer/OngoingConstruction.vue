<template>
  <div class="container mt-4">
    <div class="card">
      <div class="d-flex justify-content-between align-items-center mb-3 px-3 pt-3">
        <h3 class="title">Details of Ongoing Construction</h3>
        <button class="btn btn-primary btn-sm">Add</button>
      </div>

      <div class="card-header custom-blue">
        <h5 class="mb-0">Under Construction / Construction ongoing Phases</h5>
      </div>

      <!-- Phase Details -->
      <div class="card-body">
        <div class="form-group row align-items-center">
          <label for="noOfPhases" class="col-sm-5 col-form-label">No of Phases - Under Construction/Construction ongoing Phases</label>
          <div class="col-sm-7">
            <input
              type="text"
              id="noOfPhases"
              class="form-control"
              :value="underConstructionDetails.phaseCount"
              readonly
            />
          </div>
        </div>

        <!-- Phase Identification Nos -->
        <div class="form-group row align-items-center">
          <label for="phaseIds" class="col-sm-5 col-form-label">Under Construction / Construction ongoing Phase identification Nos</label>
          <div class="col-sm-7">
            <input
              type="text"
              id="phaseIds"
              class="form-control"
              :value="underConstructionDetails.phaseIds[0]"
              placeholder="Ex- CE-002, CE-005"
              readonly
            />
          </div>
        </div>

        <!-- Select Phase -->
        <div class="form-group row align-items-center">
          <label for="selectedPhase" class="col-sm-5 col-form-label">Under Construction / Construction ongoing Phase No</label>
          <div class="col-sm-7">
            <select
              id="selectedPhase"
              class="form-control"
              v-model="selectedPhase"
            >
              <option disabled value="">Select Phase</option>
              <option
                v-for="id in underConstructionDetails.phaseIds"
                :key="id"
                :value="id"
              >
                {{ id }}
              </option>
            </select>
          </div>
        </div>

        <!-- Selected Phase Information -->
        <div
          v-if="selectedPhase === 'CE-002' && selectedPhaseInfo"
          class="freeze-fields mt-3 border p-3 rounded bg-light"
        >
          <p><strong>Location (Start):</strong> {{ selectedPhaseInfo.locationStart }}</p>
          <p><strong>Location (End):</strong> {{ selectedPhaseInfo.locationEnd }}</p>
          <p><strong>Coordinates (Start):</strong> {{ selectedPhaseInfo.coordinatesStart }}</p>
          <p><strong>Coordinates (End):</strong> {{ selectedPhaseInfo.coordinatesEnd }}</p>
          <p><strong>Estimated Cost:</strong> Rs. {{ selectedPhaseInfo.estimatedCost }} Million</p>
          <p><strong>Start Year / Expected Start Year:</strong> {{ selectedPhaseInfo.startYear }}</p>
          <p><strong>End Year / Expected End Year:</strong> {{ selectedPhaseInfo.endYear }}</p>
          <p><strong>Source of Funding:</strong> {{ selectedPhaseInfo.fundingSource }}</p>
        </div>

        <!-- Revised Cost -->
        <div class="form-group row align-items-center mt-3">
          <label for="revisedCost" class="col-sm-5 col-form-label">Total Estimated Construction Cost (Rs. Million) (If Revised)</label>
          <div class="col-sm-7">
            <input
              type="text"
              id="revisedCost"
              class="form-control"
              v-model="revisedCost"
              @input="validateCost"
            />
          </div>
        </div>

        <!-- Revised Completion Year -->
        <div class="form-group row align-items-center">
          <label for="expectedCompletionYear" class="col-sm-5 col-form-label">Expected Year of Completion (If Revised)</label>
          <div class="col-sm-7">
            <input
              type="text"
              id="expectedCompletionYear"
              class="form-control"
              v-model="revisedCompletionYear"
              @input="validateYear"
              maxlength="4"
            />
          </div>
        </div>

        <!-- Cost Incurred - Date -->
        <div class="form-group row align-items-center mt-4">
          <label for="incurredDate" class="col-sm-5 col-form-label">Cost Incurred - Date</label>
          <div class="col-sm-7">
            <input
              type="date"
              id="incurredDate"
              class="form-control"
              v-model="incurredDate"
            />
          </div>
        </div>

        <!-- Cost Incurred - Amount -->
        <div class="form-group row align-items-center">
          <label for="incurredAmount" class="col-sm-5 col-form-label">Cost Incurred - Amount (Rs. Million)</label>
          <div class="col-sm-7">
            <input
              type="text"
              id="incurredAmount"
              class="form-control"
              v-model="incurredAmount"
              @input="validateIncurredAmount"
            />
          </div>
        </div>
        
        <!-- Next -->
        <div class="d-flex justify-content-end mt-4">
          <button class="btn btn-success" @click="goToNext">NEXT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      underConstructionDetails: {
        phaseCount: 2,
        phaseIds: ['CE-002', 'CE-005'],
        phaseInfo: {
          'CE-002': {
            locationStart: '',
            locationEnd: '',
            coordinatesStart: '',
            coordinatesEnd: '',
            estimatedCost: '',
            startYear: '',
            endYear: '',
            fundingSource: '',
          },
        },
      },
      selectedPhase: '',
      revisedCost: '',
      revisedCompletionYear: '',
      incurredDate: '',
      incurredAmount: '',
    };
  },
  computed: {
    selectedPhaseInfo() {
      return this.underConstructionDetails.phaseInfo[this.selectedPhase] || null;
    },
  },
  methods: {
    goToNext() {
      this.$router.push({ name: 'OngoingConstructionCont' });
    },
    validateCost() {
      this.revisedCost = this.revisedCost.replace(/[^0-9]/g, '');
    },
    validateYear() {
      this.revisedCompletionYear = this.revisedCompletionYear.replace(/[^0-9]/g, '').slice(0, 4);
    },
    validateIncurredAmount() {
      const clean = this.incurredAmount
        .replace(/[^\d.]/g, '')     
        .replace(/^(\d*\.\d{0,3}).*$/, '$1'); 
      this.incurredAmount = clean;
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
.form-group {
  margin-bottom: 1rem;
}
.freeze-fields p {
  margin: 0.3rem 0;
}
.custom-blue {
  background-color: #6ca6f7;
  color: #000;
}
</style>
