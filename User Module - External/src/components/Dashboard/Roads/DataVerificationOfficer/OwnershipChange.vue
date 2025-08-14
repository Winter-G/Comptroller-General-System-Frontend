<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 ownershipChange-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Subsequent Changes in Ownership</h3>
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

      <!-- Notice -->
      <div class="alert alert-info custom-notice mt-4 mb-4">
        Own (Transfer in) = Structure Constructed by another Institution and Transferred free of charge to your Institution <br>
        Own (Transfer Out) = Structure Constructed by your Institution and transferred to another Institution free of charge
      </div>

      <!-- Ownership Sections -->
      <div v-for="section in ['previous', 'current']" :key="section" class="mb-4">
        <div class="form-group row align-items-center mb-3">
          <label class="col-md-4 text-black fw-bold p-2">
            {{ section === 'previous' ? 'Previous Ownership' : 'Current Ownership' }}
          </label>
          <div class="col-md-4">
            <select class="form-control" v-model="formData[section + 'Ownership']">
              <option disabled value="">Select Ownership</option>
              <option>Own</option>
              <option>Own (Transfer in)</option>
              <option>Own (Transfer out)</option>
              <option>Leased</option>
              <option>Rented</option>
              <option>Leased out</option>
              <option>Rented out</option>
            </select>
          </div>
        </div>

        <!-- Own (Transfer in/out) -->
        <div v-if="formData[section + 'Ownership'] === 'Own (Transfer in)'" class="form-group row mb-3">
          <label class="col-md-4 text-black p-2">From Whom</label>
          <div class="col-md-8">
            <input type="text" class="form-control" v-model="formData[section + 'FromWhom']" maxlength="50" />
          </div>
        </div>
        <div v-if="formData[section + 'Ownership'] === 'Own (Transfer out)'" class="form-group row mb-3">
          <label class="col-md-4 text-black p-2">To Whom</label>
          <div class="col-md-8">
            <input type="text" class="form-control" v-model="formData[section + 'ToWhom']" maxlength="50" />
          </div>
        </div>

        <!-- Leased / Rented -->
        <div v-if="['Leased', 'Rented'].includes(formData[section + 'Ownership'])">
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">From Whom</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="formData[section + 'FromWhom']" maxlength="50" />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">Period</label>
            <div class="col-md-4">From
              <input type="month" class="form-control" v-model="formData[section + 'PeriodFrom']" />
            </div>
            <div class="col-md-4">To
              <input type="month" class="form-control" v-model="formData[section + 'PeriodTo']" />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">Payment Method</label>
            <div class="col-md-8">
              <select class="form-control" v-model="formData[section + 'PaymentMethod']">
                <option disabled value="">Select Method</option>
                <option>One time payment</option>
                <option>Yearly payment</option>
                <option>Monthly payment</option>
              </select>
            </div>
          </div>
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">Payment (Rs. Million)</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="formData[section + 'Payment']" @blur="validateDecimal(section + 'Payment')" />
            </div>
          </div>
        </div>

        <!-- Leased out / Rented out -->
        <div v-if="['Leased out', 'Rented out'].includes(formData[section + 'Ownership'])">
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">To Whom</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="formData[section + 'ToWhom']" maxlength="50" />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">Period</label>
            <div class="col-md-4">From
              <input type="month" class="form-control" v-model="formData[section + 'PeriodFrom']" />
            </div>
            <div class="col-md-4">To
              <input type="month" class="form-control" v-model="formData[section + 'PeriodTo']" />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">Payment Method</label>
            <div class="col-md-8">
              <select class="form-control" v-model="formData[section + 'PaymentMethod']">
                <option disabled value="">Select Method</option>
                <option>One time payment</option>
                <option>Yearly payment</option>
                <option>Monthly payment</option>
              </select>
            </div>
          </div>
          <div class="form-group row mb-3">
            <label class="col-md-4 text-black p-2">Income (Rs. Million)</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="formData[section + 'Income']" @blur="validateDecimal(section + 'Income')" />
            </div>
          </div>
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
  name: 'OwnershipChangeForm',
  data() {
    return {
      selectedAsset: '',
      formData: {
        previousOwnership: '',
        previousFromWhom: '',
        previousToWhom: '',
        previousPeriodFrom: '',
        previousPeriodTo: '',
        previousPaymentMethod: '',
        previousPayment: '',
        previousIncome: '',
        currentOwnership: '',
        currentFromWhom: '',
        currentToWhom: '',
        currentPeriodFrom: '',
        currentPeriodTo: '',
        currentPaymentMethod: '',
        currentPayment: '',
        currentIncome: ''
      }
    };
  },
  methods: {
    validateDecimal(field) {
      if (!this.formData[field]) return;
      const regex = /^\d{0,9}(\.\d{0,3})?$/;
      if (!regex.test(this.formData[field])) {
        this.formData[field] = this.formData[field]
          .replace(/[^0-9.]/g, '')
          .replace(/(\..*)\./g, '$1');
        const parts = this.formData[field].split('.');
        if (parts[1] && parts[1].length > 3) {
          parts[1] = parts[1].slice(0, 3);
          this.formData[field] = parts.join('.');
        }
      }
    }
  }
};
</script>

<style scoped>
.ownershipChange-card {
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

.custom-notice {
  background-color: #6ca6f7 !important;
  border: none;
  color: #fff;
}

.fw-bold {
  font-weight: bold;
}
</style>
