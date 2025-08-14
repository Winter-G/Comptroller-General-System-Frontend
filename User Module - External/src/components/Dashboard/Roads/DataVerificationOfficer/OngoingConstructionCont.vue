<template>
  <div class="container mt-4">
    <div class="card">
      <h2>Funding Information</h2>

      <!-- Funding Table -->
      <table>
        <thead>
          <tr>
            <th>Source of Funding</th>
            <th>Type of Funding</th>
            <th>Amount (Rs. Million)</th>
            <th>Foreign/Local Funding Institution</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fund, index) in fundingList" :key="index">
            <td><input v-model="fund.source" maxlength="50" /></td>
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
                @input="validateDecimal(fund, index)"
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
              <input
                type="text"
                :value="totalAmount"
                readonly
                class="freeze-field"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add Funding Row Button -->
      <button @click="addFundingRow">Add</button>

      <!-- Financial Progress -->
      <div class="form-inline">
        <label>Financial Progress %</label>
        <input
          type="text"
          v-model="financialProgress"
          @input="validatePercentage('financialProgress')"
          maxlength="6"
          required
        />
      </div>

      <!-- Physical Progress -->
      <div class="form-inline">
        <label>Physical Progress %</label>
        <input
          type="text"
          v-model="physicalProgress"
          @input="validatePercentage('physicalProgress')"
          maxlength="3"
          required
        />
      </div>

      <!-- Delay Reason-->
      <div class="form-group">
        <label>If Completion of construction is further delayed, Please mention the Reason</label>
        <textarea v-model="delayReason" maxlength="100" rows="2"></textarea>
      </div>

      <!-- Remarks -->
      <div class="form-group">
        <label>Remarks</label>
        <textarea v-model="remarks" maxlength="100" rows="2"></textarea>
      </div>

      <!-- Save -->
      <div class="save-btn">
        <button @click="saveData">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fundingList: [
        {
          source: '',
          type: '',
          amount: '',
          agency: '',
        },
      ],
      financialProgress: '',
      physicalProgress: '',
      delayReason: '',
      remarks: '',
    };
  },
  computed: {
    totalAmount() {
      return this.fundingList.reduce((total, fund) => {
        const value = parseFloat(fund.amount);
        return total + (isNaN(value) ? 0 : value);
      }, 0).toFixed(3);
    },
  },
  methods: {
    addFundingRow() {
      this.fundingList.push({
        source: '',
        type: '',
        amount: '',
        agency: '',
      });
    },
    validateDecimal(fund, index) {
      fund.amount = fund.amount
        .replace(/[^0-9.]/g, '') 
        .replace(/(\..*?)\..*/g, '$1'); 
      const parts = fund.amount.split('.');
      if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 3);
        fund.amount = parts[0] + '.' + parts[1];
      }
    },
    validatePercentage(field) {
      let value = this[field]
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1');
      const num = parseFloat(value);
      if (!isNaN(num) && num <= 100) {
        const parts = value.split('.');
        if (parts.length === 2) {
          parts[1] = parts[1].slice(0, 2);
          value = parts[0] + '.' + parts[1];
        }
        this[field] = value;
      } else {
        this[field] = value.slice(0, -1);
      }
    },
    showAgencyField(type) {
      return (
        type.includes('Foreign Funding') ||
        type.includes('Local Funding') ||
        type === 'Other (Pls. specify)'
      );
    },
    saveData() {
      console.log('Saving data...');
      // logic to save data
    },
  },
};
</script>

<style scoped>
.card {
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
input,
select,
textarea {
  width: 100%;
  padding: 0.4rem;
  font-size: 1rem;
}
textarea {
  resize: vertical;
}
.form-inline {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.form-inline label {
  width: 200px;
  margin-right: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
.freeze-field {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: not-allowed;
  color: #333;
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
.save-btn {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.save-btn button {
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
}
</style>
