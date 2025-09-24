<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 gullies-and-manholes-card" @submit.prevent="submitForm">

      <!-- Total Number of Gullies and Manholes (km) -->
      <div class="form-row">
        <label for="totalNumber"><b>Total Number of Gullies and Manholes (km)</b></label>
        <input id="totalNumber" class="form-control" type="text"
               v-model="formData.totalNumber" @input="validateDecimal($event, 'totalNumber')" required/>
      </div>
      
      <!-- Notice -->
      <div class="alert alert-info my-3">
        If the Cost of the Gullies and Manholes is unknown fill “0” in both fields.
      </div>

      <!-- Total Construction Cost of the Cost Known Gullies and Manholes -->
      <div class="form-row same-line">
        <label class="section-label">
          <b>Total Construction Cost of the Cost Known Gullies and Manholes</b>
        </label>

        <div class="field-group">
          <span>Number of Gullies and Man Holes</span>
          <input type="text" v-model="formData.construction.count" class="form-control"
                 @input="validateDecimal($event, 'count')" required>
        </div>

        <div class="field-group">
          <span>Cost (Rs.)</span>
          <input type="text" v-model="formData.construction.cost" class="form-control"
                 @input="validateNumber($event, 'cost')" required>
        </div>
      </div>

      <!-- Number of Cost Unknown Gullies and Man Holes (km) -->
      <div class="form-row">
        <label for="lengthOfUnknown"><b>Number of Cost Unknown Gullies and Man Holes (km)</b></label>
        <input id="lengthOfUnknown" class="form-control" type="text"
               v-model="formData.lengthOfUnknown" readonly disabled />
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
        totalNumber: '',
        construction: { number: '', cost: '' },
        lengthOfUnknown: '',
      },
    }
  },
  watch: {
    'formData.totalNumber': 'calculateUnknownCount',
    'formData.construction.count': 'calculateUnknownCount',
  },
  methods: {
    validateNumber(e, field) {
      e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
      this.formData.construction[field] = e.target.value;
    },
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
      if (field in this.formData) {
        this.formData[field] = e.target.value;
      } else if (field in this.formData.construction) {
        this.formData.construction[field] = e.target.value;
      }
    },
    calculateUnknownCount() {
      const A = parseFloat(this.formData.totalNumber) || 0;
      const B = parseFloat(this.formData.construction.count) || 0;
      this.formData.lengthOfUnknown = (A - B >= 0 ? (A - B).toFixed(2) : 0);
    },
    submitForm() {
      const requiredFields = ["totalNumber", "lengthOfUnknown"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }
      const constructionFields = ["count", "cost"];
      for (const field of constructionFields) {
        if (!this.formData.construction[field]) {
          alert("Please fill all required fields in Construction!");
          return;
        }
      }
      console.log("Form submitted:", this.formData);
      this.$router.push({ name: "DrainageValuation" });
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
.form-row.same-line {
  display: flex;
  align-items: flex-start; 
  gap: 20px;
}
.form-row.same-line label {
  flex: 2;
  font-weight: bold;
}
.field-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.field-group span {
  font-size: 0.9rem;
  margin-bottom: 4px;
}
.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
</style>

