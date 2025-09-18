<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 water-card">

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
        <select id="assetsCode" v-model="formData.assetsCode" class="form-control" @change="goToPage">
          <option disabled value="">Select Assets Code</option>
          <option value="/water/treatment-plant">6111310 – Water Treatment Plant</option>
          <option value="/water/water-transmission">6111310 – Water Transmission</option>
          <option value="/water/water-distribution">6111310 -  Water Distribution</option>
        </select>
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
      },
    }
  },
  methods: {
    goToPage() {
      if (this.formData.assetsCode) {
        this.$router.push(this.formData.assetsCode) 
      }
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
