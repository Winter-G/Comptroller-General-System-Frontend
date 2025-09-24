<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 open-drain-card" @submit.prevent="submitForm">

      <!-- Total Length of Open Drain (km) -->
      <div class="form-row">
        <label for="totalLength"><b>Total Length of Open Drain (km)</b></label>
        <input id="totalLength" class="form-control" type="text"
               v-model="formData.totalLength" @input="validateDecimal($event, 'totalLength')" required/>
      </div>
      
      <!-- Notice -->
      <div class="alert alert-info my-3">
        If the Cost of the Open Drain is unknown fill “0” in both fields.
      </div>

      <!-- Total Construction Cost of the Cost Known Open Drain -->
      <div class="form-row same-line">
        <label class="section-label">
          <b>Total Construction Cost of the Cost Known Open Drain</b>
        </label>

        <div class="field-group">
          <span>Length (km)</span>
          <input type="text" v-model="formData.construction.length" class="form-control"
                 @input="validateDecimal($event, 'length')" required>
        </div>

        <div class="field-group">
          <span>Cost (Rs.)</span>
          <input type="text" v-model="formData.construction.cost" class="form-control"
                 @input="validateNumber($event, 'cost')" required>
        </div>
      </div>

      <!-- Length of Cost Unknown Open Drains (km) -->
      <div class="form-row">
        <label for="lengthOfUnknownDrains"><b>Length of Cost Unknown Open Drains (km)</b></label>
        <input id="lengthOfUnknownDrains" class="form-control" type="text"
               v-model="formData.lengthOfUnknownDrains" readonly disabled />
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
        totalLength: '',
        construction: { length: '', cost: '' },
        lengthOfUnknownDrains: '',
      },
    }
  },
  watch: {
    'formData.totalLength': 'calculateUnknownLength',
    'formData.construction.length': 'calculateUnknownLength',
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
    calculateUnknownLength() {
      const A = parseFloat(this.formData.totalLength) || 0;
      const B = parseFloat(this.formData.construction.length) || 0;
      this.formData.lengthOfUnknownDrains = (A - B >= 0 ? (A - B).toFixed(2) : 0);
    },
    submitForm() {
      const requiredFields = ["totalLength", "lengthOfUnknownDrains"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }
      const constructionFields = ["length", "cost"];
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