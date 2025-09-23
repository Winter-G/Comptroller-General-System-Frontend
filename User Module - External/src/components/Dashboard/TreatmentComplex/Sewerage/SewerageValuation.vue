<!--redo styles-->


<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 sewerage-pumping-station-card" @submit.prevent="submitForm">

      <!-- Valuation -->
      <div class="form-row">
        <label>Valuation:</label>
        <select v-model="formData.valuation" required @change="handleValuationChange">
          <option disabled value="">-- Select --</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <!-- Valuation Value (Rs. Million) -->
      <div class="form-row">
        <label>Valuation Value (Rs. Million):</label>
        <input 
          type="number" 
          v-model="formData.valuationValue" 
          :readonly="formData.valuation === 'No'" 
          required 
          step="0.001" 
          min="0" 
          placeholder="Enter valuation value"/>
      </div>

      <!-- Date of Valuation -->
      <div class="form-row">
        <label>Date of Valuation:</label>
        <input 
          type="date" 
          v-model="formData.valuationDate" 
          :readonly="formData.valuation === 'No'" 
          required />
      </div>

      <!-- Remarks (if any) -->
      <div class="form-row">
        <label>Remarks (if any):</label>
        <input type="text" v-model="formData.remarks" maxlength="60"/>
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
        // Set Value = 1 Rs.
        this.formData.valuationValue = 1;
        // Set today's date
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
.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
</style>

