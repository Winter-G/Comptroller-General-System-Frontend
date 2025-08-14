<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 abandon-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Abandon</h3>
        <button class="btn btn-primary btn-sm">Add</button>
      </div>

      <!-- Identification -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Identification of Main Assets / Main Components
        </label>
        <div class="col-md-8">
          <select class="form-control" v-model="selectedAsset">
            <option disabled value="">Select a main asset or component</option>
            <!-- Options -->
          </select>
        </div>
      </div>

      <!-- Reason -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Reason</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="reason"/>
        </div>
      </div>

      <!-- Date / Known / Unknown -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Date</label>
        <div class="col-md-4">
          <select class="form-control" v-model="dateType">
            <option disabled value="">Select</option>
            <option>Known</option>
            <option>Unknown</option>
          </select>
        </div>

        <!-- Calendar shows if 'Known' is selected -->
        <div class="col-md-4" v-if="dateType === 'Known'">
          <input type="date" class="form-control" v-model="knownDate"/>
        </div>
      </div>

      <!-- Remarks -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Remarks</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="remarks"/>
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
  name: 'AbandonForm',
  data() {
    return {
      selectedAsset: '',
      reason: '',
      dateType: '',
      knownDate: '',
      remarks: ''
    };
  }
};
</script>

<style scoped>
.abandon-card {
  background-color: #f7f7fb;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
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
