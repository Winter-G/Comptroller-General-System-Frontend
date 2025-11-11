<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 distribution-card" @submit.prevent="submitForm">

      <!-- Name of the Water Distribution Center above the dropdowns, same row -->
      <div class="center-section">
        <div class="main-label">
          <b>Name of the Water<br>Distribution Center</b><span class="text-danger">*</span>
        </div>
        <div class="inline-fields">
          <div class="field-block">
            <span class="field-label">RSC<span class="text-danger">*</span></span>
            <select v-model="formData.center.rsc" class="form-select" required>
              <option disabled value="">Select RSC</option>
              <option value="RSC">RSC</option>
            </select>
          </div>
          <div class="field-block">
            <span class="field-label">Manager<span class="text-danger">*</span></span>
            <select v-model="formData.center.manager" class="form-select" required>
              <option disabled value="">Select Manager</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div class="field-block">
            <span class="field-label">Area Engineer<span class="text-danger">*</span></span>
            <select v-model="formData.center.areaEngineer" class="form-select" required>
              <option disabled value="">Select Area Engineer</option>
              <option value="Area Engineer">Area Engineer</option>
            </select>
          </div>
          <div class="field-block">
            <span class="field-label">Area OIC<span class="text-danger">*</span></span>
            <select v-model="formData.center.areaOIC" class="form-select" required>
              <option disabled value="">Select Area OIC</option>
              <option value="Area OIC">Area OIC</option>
            </select>
          </div>
        </div>
      </div>
      <p v-if="errors.center" class="error-text">{{ errors.center }}</p>

      <!-- NEXT button -->
      <div class="next-btn-container">
        <button type="submit" class="btn btn-primary">NEXT</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        center: { rsc: '', manager: '', areaEngineer: '', areaOIC: '' },
      },
      errors: {}
    }
  },
  methods: {
    submitForm() {
      const centerFields = ["rsc", "manager", "areaEngineer", "areaOIC"];
      for (const field of centerFields) {
        if (!this.formData.center[field]) {
          this.errors.center = "Please fill all required fields in Center!";
          return;
        }
      }
      console.log("Form submitted:", this.formData);
      this.$router.push({ name: "WaterDistributionComponents" });
    }
  }
}
</script>

<style scoped>
.center-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.main-label {
  min-width: 180px; 
  text-align: left;
}

.text-danger {
  color: #dc3545 !important;
}
.error-text {
  color: #dc3545;
  font-size: 0.9em;
  margin-top: -6px;
  margin-bottom: 10px;
}

.inline-fields {
  display: flex;
  gap: 12px;
  flex: 1;
}

.field-block {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-label {
  text-align: center;
  margin-bottom: 4px;
  font-weight: normal;
}

.inline-fields select {
  width: 100%;
}

.next-btn-container {
  margin-top: 20px;
  text-align: right;
}
</style>


