<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 sewerage-outlets-card" @submit.prevent="submitForm">

      <!-- Identification Name or No -->
      <div class="form-row">
        <label><b>Identification Name or No</b></label>
        <input type="text" v-model="formData.identificationName" maxlength="50" class="form-control" required />
      </div>

      <!-- Location -->
      <div class="location-section">
        <label class="section-label"><b>Location</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
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

      <!-- Category of  Outlets -->
      <div class="form-row">
        <label><b>Category of  Outlets</b></label>
        <select id="category" v-model="formData.category" class="form-control" required>
          <option disabled value="">Select Category</option>
          <option value="Sea">Sea</option>
          <option value="River">River</option>
          <option value="Other (Pls. Specify)">Other (Pls. Specify)</option>
        </select>

        <!-- Show input only if 'Other' is selected -->
        <input
           v-if="formData.category === 'Other (Pls. Specify)'"
           type="text"
           placeholder="Please specify"
           maxlength="50"
           class="form-control"
           v-model="formData.otherCategory"
           required
           />
      </div>

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
        category: '',
        otherCategory: '',
      },
    }
  },
  methods: {
    submitForm() {
      // Required base fields
      const requiredFields = ["identificationName", "category"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }

      // Location validation
      const locationFields = ["district", "dsDivision"];
      for (const field of locationFields) {
        if (!this.formData.location[field]) {
          alert("Please fill all required fields in Location!");
          return;
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
