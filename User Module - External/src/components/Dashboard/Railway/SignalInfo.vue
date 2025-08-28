<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 signal-info-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Signal Information </h3>
        <button class="btn btn-primary btn-sm">Add</button>
      </div>

      <!-- Identification -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Identification Name or No of the Signal
        </label>
        <div class="col-md-8">
          <input type="text" maxlength="20" v-model="identification" class="form-control" />
        </div>
      </div>

       <!-- Location -->
      <div class="location-section">
        <label class="section-label"><b>Location (Start)</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
          <span>Railway Station</span>
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
          <select v-model="formData.location.gnDivision" class="form-select" required>
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.coordinates" class="form-select" required>
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
          <input type="text" v-model="formData.location.railwayStation" class="form-control" required />
        </div>
      </div>

      <!-- Type of Signal -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Type of Signal
        </label>
       <div class="col-md-8">
          <input type="text" maxlength="20" v-model="type" class="form-control" />
        </div>
      </div>

      <!-- Funding Table -->
      <table>
        <thead>
          <tr>
            <th>Source of Funding</th>
            <th>Type of Funding</th>
            <th>Amount (Rs. Million)</th>
            <th>Foreign Funding – Agency / Country / Local Funding - Institution</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fund, index) in fundingList" :key="index">
            <td></td>
            <td>
              <select v-model="fund.type" required>
                <option disabled value="">Select</option>
                <option>Consolidated Fund</option>
                <option>Foreign Funding (Grant)</option>
                <option>Foreign Funding (Loan)</option>
                <option>Local Funding (Self)</option>
                <option>Local Funding (Loan)</option>
                <option>Local Funding (Grant)</option>
                <option>Provincial Council Funding</option>
                <option>Other (Pls. specify)</option>
              </select>
            </td>
            <td>
              <input type="text" v-model="fund.amount" @input="validateAmount(index)" required />
            </td>
            <td>
              <input
                v-if="showAgencyField(fund.type)"
                v-model="fund.agency"
                maxlength="50"
                required
              />
            </td>
          </tr>
          <tr>
            <td colspan="2"><strong>Total (Rs. Million)</strong></td>
            <td><input type="text" :value="totalAmount" readonly /></td>
            <td></td>
          </tr>
          <tr>
            <td><strong>Name of the Contractors</strong></td>
            <td colspan="3">
              <input type="text" v-model="contractors" maxlength="100" />
            </td>
          </tr>
          <tr>
            <td><strong>Name of the Consultants</strong></td>
            <td colspan="3">
              <input type="text" v-model="consultants" maxlength="100" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add Row Button -->
      <div class="mt-2">
        <button type="button" @click="addFundingRow">Add</button>
      </div>

      <!-- Save -->
      <div class="modal-footer">
        <button @click="saveAndRedirect" class="save-btn">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignalInfoForm",
  data() {
    return {
      identification: "",
      formData: {
        location: { district: '', dsDivision: '', gnDivision: '', coordinates: '', railwayStation: '' },
      },
      type: "",
      contractors: "",
      consultants: "",
      fundingList: [{ type: "", amount: "", agency: "" }]
    };
  },
  methods: {
    validateAmount(index) {
      let value = this.fundingList[index].amount;
      value = value.replace(/[^0-9.]/g, "");
      this.fundingList[index].amount = value;
    },
    addFundingRow() {
      this.fundingList.push({ type: "", amount: "", agency: "" });
    },
    showAgencyField(type) {
      return [
        "Foreign Funding (Grant)",
        "Foreign Funding (Loan)",
        "Local Funding (Loan)",
        "Local Funding (Grant)",
        "Other (Pls. specify)"
      ].includes(type);
    },
    saveAndRedirect() {
  const invalidFund = this.fundingList.some(f => 
    !f.type || 
    !f.amount || 
    (this.showAgencyField(f.type) && !f.agency)
  );

  if (invalidFund) {
    alert("Please fill all required funding fields!");
    return;
  }

  console.log("Form Saved:", {
    identification: this.identification,
    location: this.formData.location,
    type: this.type,
    contractors: this.contractors,
    consultants: this.consultants,
    fundingList: this.fundingList
  });

  // Redirect to Usage Status page
  this.$router.push({ name: 'UsageStatus' });
}

  },
  computed: {
    totalAmount() {
      return this.fundingList
        .reduce((sum, fund) => sum + (parseFloat(fund.amount) || 0), 0)
        .toFixed(3);
    }
  }
};
</script>

<style scoped>
.improvement-card {
  background-color: #f7f7fb;
  border-radius: 12px;
  font-family: "Segoe UI", sans-serif;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
.instruction-banner {
  background-color: #6ca6f7;
  font-size: 14px;
}
.form-control {
  border-radius: 6px;
  font-size: 14px;
}
.btn-sm {
  padding: 4px 12px;
  font-size: 14px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #aaa;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #e0e0e0;
  font-weight: normal !important; 
}
td strong {
  font-weight: normal !important; 
}
button {
  width: fit-content;
  padding: 8px 16px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #3f51b5;
}
label {
  font-weight: bold !important;
}
label[for="unit"],
label[for="area"],
label[for="areaKm"] {
  font-weight: normal !important;
}
.mt-2 {
  margin-bottom: 2rem;
}
.form-group.row.mb-4:last-of-type {
  margin-top: 2rem;
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
</style>


