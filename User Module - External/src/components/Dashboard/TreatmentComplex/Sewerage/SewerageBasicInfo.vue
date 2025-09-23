<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 water-card" @submit.prevent="submitForm">

      <!-- Institution Name -->
      <div class="form-row">
        <label><b>Institution Name:</b></label>
        <input type="text" v-model="formData.institutionName" class="form-control" disabled />
      </div>

      <!-- Institutional Sector -->
      <div class="form-row mt-2">
        <label><b>Institutional Sector:</b></label>
        <input type="text" v-model="formData.institutionalSector" class="form-control" disabled />
      </div>

      <!-- Notice -->
      <div class="alert alert-info my-3">
        Before proceeding, please check whether your Institution Name and the Institutional Sector shown here are correct.
      </div>

      <!-- Assets Code -->
      <div class="form-row">
        <label><b>Assets Code:</b></label>
        <select id="assetsCode" v-model="formData.assetsCode" class="form-control">
          <option disabled value="">6111310 – Sewerage System</option>
        </select>
      </div>

      <!-- Sewerage System Covered Area -->
      <div class="form-row">
        <label><b>Sewerage System Covered<br>Area (Ex – Dehiwala)</br></b></label>
        <input type="text" v-model="formData.sewerageArea" maxlength="50" class="form-control" required />
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
        institutionName: '',
        institutionalSector: '',
        assetsCode: '',
        sewerageArea: '',
      },
    }
  },
  methods: {
    submitForm() {
      // Required base field
      const requiredFields = ["sewerageArea"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }

      console.log("Form submitted:", this.formData);
      this.$router.push({ name: "SewerageMainComponents" });
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

