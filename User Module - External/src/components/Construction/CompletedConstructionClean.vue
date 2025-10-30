<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content man-hole-construction-container">
      <span class="close-button" @click="closeModal">&times;</span>

      <div class="form-group-row">
        <label>Started Year</label>
        <select v-model="startedYearStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="startedYearStatus === 'Known'"
          type="text"
          v-model="startedYear"
          maxlength="4"
          @input="validateYear('startedYear')"
          placeholder="e.g., 2020"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Completed Year</label>
        <select v-model="completedYearStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="completedYearStatus === 'Known'"
          type="text"
          v-model="completedYear"
          maxlength="4"
          @input="validateYear('completedYear')"
          placeholder="e.g., 2023"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Construction Cost (Rs. Million)</label>
        <select v-model="costStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="costStatus === 'Known'"
          type="text"
          v-model="constructionCost"
          @input="formatCost"
          placeholder="e.g., 1,000.000"
          class="short-input"
        />
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

      
      <div class="form-group-row">
        <label>Name of the Contractors</label>
        <input
          type="text"
          v-model="contractors"
          maxlength="100"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Name of the Consultants</label>
        <input
          type="text"
          v-model="consultants"
          maxlength="100"
          class="short-input"
        />
      </div>

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
        startedYearStatus: "",
        startedYear: "",
        completedYearStatus: "",
        completedYear: "",
        costStatus: "",
        constructionCost: "",
        contractors: "",
        consultants: "",
      yearsList: [],
      fundingList: [{ source: "", type: "", amount: "", agency: "" }],
    };
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
    closeModal() {
      this.showModal = false;
    },
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
    validateYear(field) {
      this[field] = this[field].replace(/[^0-9]/g, "").slice(0, 4);
    },
    formatCost() {
      let val = this.constructionCost.replace(/[^0-9.]/g, "");
      const parts = val.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
      }
      this.constructionCost = parts.join(".");
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

.completed-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.short-select,
.short-input {
  max-width: 400px;
  flex: none;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
