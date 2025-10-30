<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>

      <div class="modal-body">
        <div class="form-row">
          <label>Reason for Not Completion:</label>
          <input type="text" v-model="reason" :maxlength="100" required />
        </div>

        <div class="form-row">
          <label>Total Estimated Construction Cost (Rs. Million):</label>
          <select v-model="estimatedCostKnown" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <input
            v-if="estimatedCostKnown === 'Known'"
            type="text"
            v-model="estimatedCost"
            @input="validateDecimalInput($event, 'estimatedCost')"
            @keydown="restrictToDecimal"
            placeholder="Cost"
          />
        </div>

        <div class="form-row">
          <label>Cost Incurred:</label>
          <select v-model="costKnownStatus" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <template v-if="costKnownStatus === 'Known'">
            <input
              type="text"
              v-model="costIncurred"
              @input="validateDecimalInput($event, 'costIncurred')"
              @keydown="restrictToDecimal"
              placeholder="Cost (Rs. Million)"
            />
            <input type="date" v-model="costDate" />
          </template>
        </div>

        <div class="form-row">
          <label>Construction Started Year:</label>
          <select v-model="startedYearKnown" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <input
            v-if="startedYearKnown === 'Known'"
            type="text"
            v-model="startedYear"
            @input="validateYearInput($event, 'startedYear')"
            maxlength="4"
            placeholder="YYYY"
          />
        </div>

        <div class="form-row">
          <label>Expected Year of Completion:</label>
          <select v-model="completionYearKnown" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <input
            v-if="completionYearKnown === 'Known'"
            type="text"
            v-model="completionYear"
            @input="validateYearInput($event, 'completionYear')"
            maxlength="4"
            placeholder="YYYY"
          />
        </div>

        <div class="form-row">
          <label>Physical Progress %:</label>
          <input
            type="text"
            v-model="physicalProgress"
            @input="validatePercentageInput($event, 'physicalProgress')"
            @keydown="restrictToNumeric"
          />
        </div>

        <div class="form-row">
          <label>Financial Progress %:</label>
          <input
            type="text"
            v-model="financialProgress"
            @input="validatePercentageInput($event, 'financialProgress')"
            @keydown="restrictToNumeric"
            required
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Source of Funding</th>
              <th>Type of Funding</th>
              <th>Amount (Rs. Million)</th>
              <th>Foreign/Local Funding Agency</th>
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
                  @input="validateDecimalFunding(fund, index)"
                  @keydown="restrictToDecimal"
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

        <button @click="addFundingRow">Add</button>

        <div class="form-row">
          <label>Need any Additional Funding:</label>
          <select v-model="AdditionalFundingNeeded" required>
            <option>Yes</option>
            <option>No</option>
          </select>
          <input
            v-if="AdditionalFundingNeeded === 'Yes'"
            type="text"
            v-model="AdditionalFundingAmount"
            @input="validateDecimalAdditionalFunding"
            @keydown="restrictToDecimal"
            placeholder="Estimated Amount (Rs. Million)"
          />
        </div>

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
      </div>

      <div class="modal-footer">
        <button @click="saveAndRedirect" class="save-btn">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
      reason: "",
      estimatedCostKnown: "",
      estimatedCost: "",
      costKnownStatus: "",
      costIncurred: "",
      costDate: "",
      startedYearKnown: "",
      startedYear: "",
      completionYearKnown: "",
      completionYear: "",
      physicalProgress: "",
      financialProgress: "",
      fundingList: [{ type: "", amount: "", agency: "" }],
      AdditionalFundingNeeded: "",
      AdditionalFundingAmount: "",
      contractors: "",
      consultants: "",
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
    restrictToDecimal(e) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
      ];
      const isNumber = /[0-9]/.test(e.key);
      const isDot = e.key === "." && !e.target.value.includes(".");
      if (!isNumber && !allowedKeys.includes(e.key) && !isDot) {
        e.preventDefault();
      }
    },
    restrictToNumeric(e) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
      ];
      const isNumber = /[0-9]/.test(e.key);
      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    },
    validateDecimalInput(event, field) {
      let value = event.target.value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts[1];
      if (parts[1] && parts[1].length > 3) parts[1] = parts[1].slice(0, 3);
      this[field] = parts.join(".");
    },
    validateDecimalFunding(fund, index) {
      let val = fund.amount.replace(/[^0-9.]/g, "");
      const parts = val.split(".");
      if (parts.length > 2) val = parts[0] + "." + parts[1];
      if (parts[1] && parts[1].length > 3) parts[1] = parts[1].slice(0, 3);
      this.$set(this.fundingList, index, { ...fund, amount: parts.join(".") });
    },
    validateDecimalAdditionalFunding(event) {
      let value = event.target.value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts[1];
      if (parts[1] && parts[1].length > 3) parts[1] = parts[1].slice(0, 3);
      this.AdditionalFundingAmount = parts.join(".");
    },
    validateYearInput(event, field) {
      this[field] = event.target.value.replace(/\D/g, "").slice(0, 4);
    },
    validatePercentageInput(event, field) {
      let value = event.target.value.replace(/\D/g, "");
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        this[field] = value;
      } else if (num > 100) {
        this[field] = "100";
      }
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
        "Other (Pls. specify)",
      ].includes(type);
    },
    saveAndRedirect() {
      
      if (
    !this.reason ||
    !this.estimatedCostKnown ||
    (this.estimatedCostKnown === "Known" && !this.estimatedCost) ||
    !this.costKnownStatus ||
    (this.costKnownStatus === "Known" &&
      (!this.costIncurred || !this.costDate)) ||
    !this.startedYearKnown ||
    (this.startedYearKnown === "Known" && !this.startedYear) ||
    !this.completionYearKnown ||
    (this.completionYearKnown === "Known" && !this.completionYear) ||
    !this.financialProgress ||
    !this.AdditionalFundingNeeded ||
    (this.AdditionalFundingNeeded === "Yes" && !this.AdditionalFundingAmount)
  ) {
    alert("Please fill in all required fields before saving.");
    return;
  }

  console.log("Form submitted:", {
    reason: this.reason,
    estimatedCostKnown: this.estimatedCostKnown,
    estimatedCost: this.estimatedCost,
    costKnownStatus: this.costKnownStatus,
    costIncurred: this.costIncurred,
    costDate: this.costDate,
    startedYearKnown: this.startedYearKnown,
    startedYear: this.startedYear,
    completionYearKnown: this.completionYearKnown,
    completionYear: this.completionYear,
    physicalProgress: this.physicalProgress,
    financialProgress: this.financialProgress,
    fundingList: this.fundingList,
    AdditionalFundingNeeded: this.AdditionalFundingNeeded,
    AdditionalFundingAmount: this.AdditionalFundingAmount,
    contractors: this.contractors,
    consultants: this.consultants,
  });

  this.$router.push({ name: "UsageInfoClean" });
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-height: 90vh;
  width: 90%;
  max-width: 950px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-body {
  padding: 30px;
  overflow-y: auto;
  flex-grow: 1;
  max-height: calc(90vh - 80px);
}

.modal-footer {
  padding: 15px 30px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
}

.save-btn {
  width: auto;
  padding: 10px 20px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.save-btn:hover {
  background-color: #3f51b5;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 26px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  z-index: 1000;
}

.form-row,
.form-group-row {
  display: flex;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
  gap: 10px;
}

.form-row label,
.form-group-row label {
  width: 300px;
  font-weight: bold;
}

.form-row select,
.form-row input[type="text"],
.form-row input[type="date"],
.short-input {
  padding: 6px 10px;
  flex: 1;
  min-width: 150px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
</style>
