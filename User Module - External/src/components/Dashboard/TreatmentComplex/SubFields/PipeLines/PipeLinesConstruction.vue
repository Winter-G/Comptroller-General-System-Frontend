<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content pipe-lines-construction-container">
      <span class="close-button" @click="closeModal">&times;</span>

      <!-- Year of Cost Incurred -->
      <div class="form-group-row">
        <label>Year of Cost incurred</label>
        <select v-model="yearOfCostIncurred" class="short-select">
          <option disabled value="">Select Year</option>
          <option v-for="year in yearsList" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <!-- Funding Table -->
      <table>
        <thead>
          <tr>
            <th>Source of Funding</th>
            <th>Type of Funding</th>
            <th>Amount (Rs. Million)</th>
            <th>Foreign Funding – Agency /Country /Local Funding - Institution</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fund, index) in fundingList" :key="index">
            <td></td>
            <td>
              <select v-model="fund.type">
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
              <input
                type="text"
                v-model="fund.amount"
                @input="validateDecimal(fund)"
              />
            </td>
            <td>
              <input
                v-if="showAgencyField(fund.type)"
                v-model="fund.agency"
                maxlength="50"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2"><strong>Total (Rs. Million)</strong></td>
            <td colspan="2">
              <input type="text" :value="totalAmount" readonly />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add Row -->
      <button class="add-btn" @click="addFundingRow">Add</button>

      <!-- NEXT button -->
      <div class="next-btn-container">
        <button type="submit" class="btn btn-primary">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
      yearOfCostIncurred: "",
      yearsList: [],
      fundingList: [{ source: "", type: "", amount: "", agency: "" }],
    };
  },
  created() {
    for (let y = 1950; y <= 2100; y++) {
      this.yearsList.push(y);
    }
  },
  computed: {
    totalAmount() {
      return this.fundingList
        .reduce((sum, fund) => {
          const amount = parseFloat(fund.amount);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0)
        .toFixed(3);
    },
  },
  methods: {
    validateDecimal(fund) {
      fund.amount = fund.amount
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1");
      const parts = fund.amount.split(".");
      if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 3);
        fund.amount = parts[0] + "." + parts[1];
      }
    },
    addFundingRow() {
      this.fundingList.push({ source: "", type: "", amount: "", agency: "" });
    },
    showAgencyField(type) {
      return [
        "Foreign Funding (Grant)",
        "Foreign Funding (Loan)",
        "Local Funding (Loan)",
        "Local Funding (Grant)",
        "Other (Pls. specify)",
      ].includes(type);
    },
    saveAndRedirect() {
      console.log("Form submitted:", this.fundingList);
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 1200px;
  overflow-y: auto;
  max-height: 90vh;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 26px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
}

.form-group-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.form-group-row label {
  font-weight: bold;
  min-width: 200px;
}

.short-select {
  max-width: 200px;
}

table {
  width: 95%;
  margin: auto;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th,
td {
  border: 1px solid #aaa;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #e0e0e0;
}
.add-btn {
  width: fit-content;
  padding: 8px 16px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.add-btn:hover {
  background-color: #3f51b5;
}
.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
</style>
