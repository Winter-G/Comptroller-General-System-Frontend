<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 revaluation-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Revaluation</h3>
        <button class="btn btn-primary btn-sm">Add</button>
      </div>

      <!-- Instruction -->
      <div class="instruction-banner text-white p-2 mb-3 rounded">
        Please select the Main Asset or the Component which has already been verified by clicking the dropdown list and enter relevant details.
      </div>

      <!-- Identification -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Identification of Main Assets / Main Components
        </label>
        <div class="col-md-8">
          <select class="form-control" v-model="formData.selectedAsset">
            <option disabled value="">Select a main asset or component</option>
            <option v-for="asset in assets" :key="asset.id" :value="asset.id">
              {{ asset.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Updated Valuation Value -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Updated Valuation Value (Rs. Million)
        </label>
        <div class="col-md-4">
          <input
            class="form-control"
            type="text"
            v-model="formData.updatedValuation"
            @input="validateDecimal('updatedValuation')"
          />
        </div>

        <!-- Date of Valuation -->
        <label class="col-md-2 text-black p-2">
          Date of Valuation
        </label>
        <div class="col-md-2">
          <select class="form-control" v-model="formData.valuationYear">
            <option disabled value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <small class="text-muted">As at 31 December</small>
        </div>
      </div>

      <!-- Remarks -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Remarks (If any)</label>
        <div class="col-md-8">
          <input
            type="text"
            maxlength="100"
            class="form-control"
            v-model="formData.remarks"
          />
        </div>
      </div>

      <!-- Save -->
      <div class="text-end">
        <button class="btn btn-success btn-sm" @click="saveForm">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RevaluationForm',
  data() {
    return {
      years: Array.from({ length: 2100 - new Date().getFullYear() + 1 }, (_, i) => new Date().getFullYear() + i),
      formData: {
        selectedAsset: '',
        updatedValuation: '',
        valuationYear: '',
        remarks: ''
      }
    };
  },
  methods: {
    validateDecimal(field) {
      const regex = /^\d{0,9}(\.\d{0,3})?$/;
      let value = this.formData[field];
      if (!regex.test(value)) {
        value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        const parts = value.split('.');
        if (parts[1] && parts[1].length > 3) {
          parts[1] = parts[1].slice(0, 3);
        }
        this.formData[field] = parts.join('.');
      }
    },
    saveForm() {
    }
  }
};
</script>

<style scoped>
.revaluation-card {
  background-color: #f7f7fb;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.instruction-banner {
  background-color: #6ca6f7;
  font-size: 14px;
}

.form-control {
  border-radius: 6px;
  font-size: 14px;
}

.btn-sm {
  padding: 4px 12px;
  font-size: 14px;
}
</style>
