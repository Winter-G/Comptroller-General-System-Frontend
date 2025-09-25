<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 drainage-canal-card" @submit.prevent="submitForm">

      <!-- Identification Name or No -->
      <div class="form-row">
        <label><b>Identification Name or No</b></label>
        <input type="text" v-model="formData.identificationName" maxlength="50" class="form-control" required />
      </div>

      <!-- Start Point -->
      <div class="location-section">
        <label class="section-label"><b>Start Point</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.startPoint.district" class="form-select" required>
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.startPoint.dsDivision" class="form-select" required>
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.startPoint.gnDivision" class="form-select">
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.startPoint.coordinates" class="form-select">
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

      <!-- End Point -->
      <div class="location-section">
        <label class="section-label"><b>End Point</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.endPoint.district" class="form-select" required>
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.endPoint.dsDivision" class="form-select" required>
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.endPoint.gnDivision" class="form-select">
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.endPoint.coordinates" class="form-select">
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

      <!-- Length (Km) -->
      <div class="form-row">
        <label for="lengthKm"><b>Length (Km)</b></label>
        <input id="lengthKm" class="form-control" type="text" 
                v-model="formData.lengthKm" @input="validateDecimal($event, 'lengthKm')" required />
      </div>

      <!-- Average Width (m) -->
      <div class="form-row">
        <label for="avgWidthM"><b>Average Width (m)</b></label>
        <input id="avgWidthM" class="form-control" type="text" 
               v-model="formData.avgWidthM" @input="validateDecimal($event, 'avgWidthM')" required />
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
        startPoint: { district: '', dsDivision: '', gnDivision: '', coordinates: '' },
        endPoint: { district: '', dsDivision: '', gnDivision: '', coordinates: '' },
        lengthKm: '',
        avgWidthM: '',
      },
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
      const requiredFields = ["identificationName", "lengthKm", "avgWidthM"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }

      // Start Point validation
      const startPointFields = ["district", "dsDivision"];
      for (const field of startPointFields) {
        if (!this.formData.startPoint[field]) {
          alert("Please fill all required fields in Start Point!");
          return;
        }
      }

      // End Point validation
      const endPointFields = ["district", "dsDivision"];
      for (const field of endPointFields) {
        if (!this.formData.endPoint[field]) {
          alert("Please fill all required fields in End Point!");
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

