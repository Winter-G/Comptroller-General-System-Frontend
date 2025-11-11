<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 culvert-not-in-road-card" @submit.prevent="submitForm">

      <!-- Identification Name or No -->
      <div class="form-row">
        <label><b>Identification Name or No</b><span class="text-danger">*</span></label>
        <input type="text" v-model="formData.identificationName" maxlength="50" class="form-control" required />
      </div>
      <p v-if="errors.identificationName" class="error-text">{{ errors.identificationName }}</p>

      <!-- Location -->
      <div class="location-section">
        <label class="section-label"><b>Location</b><span class="text-danger">*</span></label>
        <div class="inline-labels compact">
          <span>District<span class="text-danger">*</span></span>
          <span>DS Division<span class="text-danger">*</span></span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.location.district" class="form-select" required>
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.dsDivision" class="form-select" required>
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.gnDivision" class="form-select">
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.coordinates" class="form-select">
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>
      <p v-if="errors.location" class="error-text">{{ errors.location }}</p>

      <!-- Length (m) -->
      <div class="form-row">
        <label for="lengthM"><b>Length (m)</b><span class="text-danger">*</span></label>
        <input id="lengthM" class="form-control" type="text"
                v-model="formData.lengthM" @input="validateDecimal($event, 'lengthM')" required />
      </div>
      <p v-if="errors.lengthM" class="error-text">{{ errors.lengthM }}</p>

      <!-- Average Height (m) -->
      <div class="form-row">
        <label for="avgHeightM"><b>Average Height (m)</b><span class="text-danger">*</span></label>
        <input id="avgHeightM" class="form-control" type="text"
               v-model="formData.avgHeightM" @input="validateDecimal($event, 'avgHeightM')" required />
      </div>
      <p v-if="errors.avgHeightM" class="error-text">{{ errors.avgHeightM }}</p>

      <!-- Average Width (m) -->
      <div class="form-row">
        <label for="avgWidthM"><b>Average Width (m)</b><span class="text-danger">*</span></label>
        <input id="avgWidthM" class="form-control" type="text" 
               v-model="formData.avgWidthM" @input="validateDecimal($event, 'avgWidthM')" required />
      </div>
      <p v-if="errors.avgWidthM" class="error-text">{{ errors.avgWidthM }}</p>

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
        identificationName: '',
        location: { district: '', dsDivision: '', gnDivision: '', coordinates: '' },
        lengthM: '',
        avgHeightM: '',
        avgWidthM: '',
      },
      errors: {}
    }
  },
  methods: {
      validateDecimal(e, field) {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
      if ((e.target.value.match(/\./g) || []).length > 1) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
      }
      const parts = e.target.value.split(".");
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
        e.target.value = parts.join(".");
      }
      this.formData[field] = e.target.value;
    },

    submitForm() {
      // Required base fields
      const requiredFields = ["identificationName", "lengthM", "avgHeightM", "avgWidthM"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          this.errors[field] = "This field is required.";
        }
      }

      // Location validation
      const locationFields = ["district", "dsDivision"];
      for (const field of locationFields) {
        if (!this.formData.location[field]) {
          this.errors.location = "This field is required.";
        }
      }    

      console.log("Form submitted:", this.formData);
      this.$router.push({ name: "ConstructionStatus" });
    }
  }
}
</script>

<style scoped>
.form-row { 
  display: flex; 
  align-items: center; 
  margin-bottom: 12px; 
  gap: 12px; 
}
.form-row label { 
  min-width: 220px; 
  font-weight: bold; 
}
.form-row input, .form-row select {
   flex: 1; 
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
.type-inline.same-line {
  display: flex;
  gap: 12px;
  flex: 1;
}
.location-section { 
  margin-bottom: 20px; 
}
.inline-labels { 
  display: flex; 
  justify-content: space-between; 
  font-weight: normal; 
  margin-bottom: 6px; 
}
.inline-labels.compact { 
  margin-top: 4px; 
}
.inline-labels span { 
  flex: 1; 
  text-align: center; 
}
.inline-fields { 
  display: flex; 
  gap: 12px; 
}
.inline-fields select, .inline-fields input { 
  flex: 1; 
}
.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
</style>


