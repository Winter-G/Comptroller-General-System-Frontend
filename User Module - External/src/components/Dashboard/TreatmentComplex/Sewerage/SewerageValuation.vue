<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 sewerage-valuation-card" @submit.prevent="submitForm">

      <!-- Valuation -->
      <div class="form-row">
        <label><b>Valuation</b></label>
        <select v-model="formData.valuation" class="form-select" required @change="handleValuationChange">
          <option disabled value="">-- Select --</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <!-- Valuation Value (Rs. Million) -->
      <div class="form-row">
        <label><b>Valuation Value (Rs. Million)</b></label>
        <input 
          type="number" 
          v-model="formData.valuationValue" 
          :readonly="formData.valuation === 'No'" 
          required 
          step="0.001" 
          min="0" 
          placeholder="Enter valuation value"
          class="form-control"
        />
      </div>

      <!-- Date of Valuation -->
      <div class="form-row">
        <label><b>Date of Valuation</b></label>
        <input 
          type="date" 
          v-model="formData.valuationDate" 
          :readonly="formData.valuation === 'No'" 
          required 
          class="form-control"
        />
      </div>

      <!-- Remarks (if any) -->
      <div class="form-row">
        <label><b>Remarks (if any)</b></label>
        <input 
          type="text" 
          v-model="formData.remarks" 
          maxlength="60" 
          class="form-control"
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
        valuation: '',
        valuationValue: '',
        valuationDate: '',
        remarks: '',
      },
    }
  },
  methods: {
    handleValuationChange() {
      if (this.formData.valuation === "No") {
        this.formData.valuationValue = 1;
        this.formData.valuationDate = new Date().toISOString().split("T")[0];
      } else {
        this.formData.valuationValue = "";
        this.formData.valuationDate = "";
      }
    },
    submitForm() {
      const requiredFields = ["valuation", "valuationValue", "valuationDate"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
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
  justify-content: center;   
  margin-bottom: 12px; 
}

.form-row label { 
  width: 250px;  
  font-weight: bold; 
  text-align: right; 
  margin-right: 12px;
}

.form-row input, 
.form-row select {
  flex: 1; 
  max-width: 400px; 
}

.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
</style>

