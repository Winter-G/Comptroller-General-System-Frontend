<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 disposal-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Disposal</h3>
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

      <!-- Method -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Method</label>
        <div class="col-md-8">
          <input type="text" maxlength="20" class="form-control" v-model="method"/>
        </div>
      </div>

      <!-- Reason -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Reason</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="reason"/>
        </div>
      </div>

      <!-- Date -->
      <div class="form-group row align-items-center mb-3">
        <label for="dateOfDisposal" class="col-md-4 text-black p-2">
          Date
        </label>
        <div class="col-md-8">
          <input
            type="date"
            id="dateOfDisposal"
            class="form-control"
            v-model="date"
            required
          />
        </div>
      </div>

      <!-- Cost -->
      <div class="form-group row align-items-center mb-4">
        <label for="cost" class="col-md-4 text-black p-2">
          Cost (Rs. Million)
        </label>
        <div class="col-md-8">
          <input
            id="cost"
            class="form-control"
            v-model.trim="disposal.cost"
            @input="validateDecimalInput('cost')"
            required
          />
        </div>
      </div>

      <!-- Income -->
      <div class="form-group row align-items-center mb-4">
        <label for="income" class="col-md-4 text-black p-2">
          Income (Rs. Million)
        </label>
        <div class="col-md-8">
          <input
            id="income"
            class="form-control"
            v-model.trim="disposal.income"
            @input="validateDecimalInput('income')"
            required
          />
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
  name: 'DisposalForm',
  data() {
    return {
      selectedAsset: '',
      method: '',
      reason: '',
      date: '',
      disposal: {
        cost: '',
        income: ''
      }
    };
  },
  methods: {
    validateDecimalInput(field) {
      let value = this.disposal[field];
      value = value.replace(/[^0-9.]/g, "");
      const firstDotIndex = value.indexOf(".");
      if (firstDotIndex !== -1) {
        value =
          value.substring(0, firstDotIndex + 1) +
          value.substring(firstDotIndex + 1).replace(/\./g, "");
      }
      value = value.replace(/^(\d*\.\d{0,3}).*$/, "$1");
      this.disposal[field] = value;
    }
  }
};
</script>

<style scoped>
.disposal-card {
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
