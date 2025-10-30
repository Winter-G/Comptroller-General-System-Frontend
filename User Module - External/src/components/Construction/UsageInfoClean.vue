<template>
    <div class="form-container">
    <div class="form-row">
      <label>Status of Usage:</label>
      <select v-model="status" required>
        <option disabled value="">-- Select --</option>
        <option>Utilize / In Operation / Open</option>
        <option>Not in Operation / Unutilized / Closed</option>
        <option>Abandoned</option>
      </select>
    </div>
    <p class="info-text1">
      Not in operation / unutilized / Closed – Not in use for more than one year
    </p>
    <p class="info-text2">Abandoned – Not in use for more than Five Years</p>
        
      <!-- Valuation -->
    <div class="form-row">
      <label>Valuation:</label>
      <select v-model="valuation" required @change="handleValuationChange">
        <option disabled value="">-- Select --</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </div>

      <!-- Valuation Value (Rs. Million) -->
    <div class="form-row">
      <label>Valuation Value (Rs. Million):</label>
      <input type="number" v-model="valuationValue" required />
    </div>

      <!-- Date of Valuation -->
    <div class="form-row">
      <label>Date of Valuation:</label>
      <input type="date" v-model="valuationDate" required />
    </div>

      <!-- Remarks (if any) -->
    <div class="form-row">
      <label>Remarks (if any):</label>
      <input type="text" v-model="remarks" maxlength="60" placeholder="" />
    </div>

      <!-- NEXT button -->
      <div class="form-row center">
         <button @click="saveData" class="next-button">NEXT</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "",
      valuation: "",
      valuationValue: "",
      valuationDate: "",
      remarks: "",
    };
  },
  methods: {
    handleValuationChange() {
      if (this.valuation === "No") {
        this.valuationValue = 1;
        const today = new Date().toISOString().split("T")[0];
        this.valuationDate = today;
      } else {
        this.valuationValue = "";
        this.valuationDate = "";
      }
    },
    saveData() {
      if (
        !this.status ||
        !this.valuation ||
        !this.valuationValue ||
        !this.valuationDate
      ) {
        alert("Please fill all required fields!");
        return;
      }

      const formData = {
        status: this.status,
        valuation: this.valuation,
        valuationValue: this.valuationValue,
        valuationDate: this.valuationDate,
        remarks: this.remarks,
      };

      console.log("Form submitted:", formData);
      this.$router.push("/components/summery");
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: auto;
}
.form-row {
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.form-row label {
  width: 220px;
  font-weight: bold;
}
.form-row select,
.form-row input {
  flex: 1;
  padding: 6px 10px;
}
.center {
  display: flex;
  justify-content: center;
}
.info-text1 {
  font-size: 0.9em;
  color: #555;
  background-color: #a8b1ce;
  margin-left: 220px;
  margin-top: -10px;
  margin-bottom: 5px;
}
.info-text2 {
  font-size: 0.9em;
  color: #555;
  background-color: #a8b1ce;
  margin-left: 220px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.next-button {
  background-color: black;
  color: white;
  padding: 8px 30px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}
.next-button:hover {
  background-color: #333;
}
</style>
