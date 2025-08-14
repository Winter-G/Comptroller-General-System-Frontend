<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 maintenance-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Maintenance</h3>
        <button class="btn btn-primary btn-sm">Add</button>
      </div>

      <!-- Notice -->
      <div class="instruction-banner text-white p-2 mb-3 rounded">
        Please select the Main Asset or the Component which already verified by clicking the dropdown list and enter relevant details.
      </div>

      <!-- Identification -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Identification of Main Assets / Main Components
        </label>
        <div class="col-md-8">
          <select class="form-control" v-model="selectedAsset">
            <option disabled value="">Select a main asset or component</option>
          </select>
        </div>
      </div>

      <!-- Maintenance Done by -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Maintenance Done by</label>
        <div class="col-md-8">
          <select class="form-control" v-model="doneBy">
            <option disabled value="">Select</option>
            <option>Own Institution</option>
            <option>Other Public Sector Institution</option>
            <option>Other Institution</option>
          </select>
        </div>
      </div>

      <!-- Date -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Date</label>
        <div class="col-md-8">
          <input type="date" class="form-control" v-model="date" />
        </div>
      </div>

      <!-- Description -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Description</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="description" />
        </div>
      </div>

      <!-- Type of Repair -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Type of Repair</label>
        <div class="col-md-8">
          <select class="form-control" v-model="repairType">
            <option disabled value="">Select</option>
            <option>Major Repair</option>
            <option>Minor Repair</option>
          </select>
        </div>
      </div>

      <!-- Type of Expenditure -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Type of Expenditure</label>
        <div class="col-md-8">
          <select class="form-control" v-model="expenditureType">
            <option disabled value="">Select</option>
            <option>Recurrent</option>
            <option>Capital</option>
          </select>
        </div>
      </div>

      <!-- Cost Incurred -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Cost Incurred (Rs. Million)</label>
        <div class="col-md-4">
          <input
            class="form-control"
            v-model.trim="cost"
            @input="validateDecimalInput('cost')"
            placeholder="E.g. 123.456"
          />
        </div>
      </div>

      <!-- Remarks -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 text-black p-2">Remarks</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="remarks" />
        </div>
      </div>

      <!-- Save -->
      <div class="text-end">
        <button class="btn btn-success btn-sm">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceForm',
  data() {
    return {
      selectedAsset: '',
      doneBy: '',
      date: '',
      description: '',
      repairType: '',
      expenditureType: '',
      cost: '',
      remarks: ''
    };
  },
  methods: {
    validateDecimalInput(field) {
      let value = this[field];
      value = value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("");
      value = value.replace(/^(\d*\.\d{0,3}).*$/, "$1");
      this[field] = value;
    }
  }
};
</script>

<style scoped>
.maintenance-card {
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
