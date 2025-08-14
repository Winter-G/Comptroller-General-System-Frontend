<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 improvement-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Improvement</h3>
        <button class="btn btn-primary btn-sm">Add</button>
      </div>

      <!-- Identification -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Identification of Main Assets / Main Components
        </label>
        <div class="col-md-8">
          <select class="form-control">
            <option disabled selected>Select a main asset or component</option>
            <!-- Options -->
          </select>
        </div>
      </div>

      <!-- Improvement Done By -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">Improvement Done by</label>
        <div class="col-md-8">
          <select class="form-control">
            <option disabled selected>Select</option>
            <option>Own Institution</option>
            <option>Other Public sector Institution</option>
            <option>Other Institution</option>
          </select>
        </div>
      </div>

      <!-- Date -->
      <div class="form-group row align-items-center mb-3">
        <label for="date" class="col-md-4 text-black p-2">Date</label>
        <div class="col-md-8">
          <input type="date" id="date" class="form-control" v-model="date" />
        </div>
      </div>

      <!-- Description -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Description</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" />
        </div>
      </div>

      <!-- Instructions -->
      <div class="instruction-banner text-white p-2 mb-4 rounded">
        Please make sure to provide the Relevant Information as Applicable.
      </div>

      <!-- Capacity -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">
          Capacity with measuring Unit (Ex – 15kW)
        </label>
        <div class="col-md-8">
          <input
            type="text"
            maxlength="20"
            class="form-control"
            v-model="capacity"
            @input="validateDecimalInput('capacity')"
          />
        </div>
      </div>

      <!-- Expansion -->
      <div class="form-group row align-items-start mb-4">
        <label class="col-md-2 font-weight-bold p-2">Expansion</label>

        <!-- Measurement Unit -->
        <div class="col-md-4">
          <label for="unit" class="form-label">Measurement Unit</label>
          <select
            id="unit"
            class="form-control"
            v-model.trim="improvement.unit"
            @change="convertToKm2"
          >
            <option disabled value="">Select Unit</option>
            <option>Square Meters (m²)</option>
            <option>Square Kilometers (km²)</option>
            <option>Square Miles (mi²)</option>
            <option>Square Yards (yd²)</option>
            <option>Square Feet (ft²)</option>
            <option>Hectares (Ha)</option>
            <option>Acres (ac)</option>
            <option>Perches</option>
          </select>
        </div>

        <!-- Area -->
        <div class="col-md-3">
          <label for="area" class="form-label">Area</label>
          <input
            id="area"
            class="form-control"
            v-model.trim="improvement.area"
            @input="validateDecimalInput('improvement.area', true)"
            required
          />
        </div>

        <!-- Area in km² -->
        <div class="col-md-3">
          <label for="areaKm" class="form-label">Area (km²)</label>
          <input id="areaKm" class="form-control" :value="improvement.areaKm" disabled />
        </div>
      </div>

      <!-- Other Measurements -->
      <div class="row g-3 mb-4">
        <div class="col-md-3" v-for="field in otherMeasurements" :key="field.id">
          <label :for="field.id" class="form-label">{{ field.label }}</label>
          <input
            :id="field.id"
            class="form-control"
            v-model.trim="improvement[field.model]"
            @input="validateDecimalInput2(field.model)"
            required
          />
        </div>
      </div>

      <!-- Date of Completion -->
      <div class="form-group row align-items-center mb-3">
        <label for="dateOfCompletion" class="col-md-4 text-black p-2">
          Date of Completion
        </label>
        <div class="col-md-8">
          <input
            type="date"
            id="dateOfCompletion"
            class="form-control"
            v-model="date"
            required
          />
        </div>
      </div>

      <!-- Cost Incurred -->
      <div class="form-group row align-items-center mb-4">
        <label for="costIncurred" class="col-md-4 text-black p-2">
          Total Cost Incurred (Rs. Million)
        </label>
        <div class="col-md-8">
          <input
            id="costIncurred"
            class="form-control"
            v-model.trim="improvement.costIncurred"
            @input="validateDecimalInput3('costIncurred')"
            required
          />
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
            <td>
            </td>
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
              <input type="text" v-model="fund.amount" @input="validateAmount(index)" />
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

      <!-- Remarks -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Remarks</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" />
        </div>
      </div>

      <!-- Save -->
      <div class="text-end mt-3">
        <button class="btn btn-success btn-sm">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImprovementForm",
  data() {
    return {
      date: "",
      capacity: "",
      contractors: "",
      consultants: "",
      improvement: {
        unit: "",
        area: "",
        areaKm: "",
        height: "",
        averageWidth: "",
        length: "",
        depth: "",
        capacity: "",
        weight: "",
        costIncurred: ""
      },
      fundingList: [{ source: "", type: "", amount: "", agency: "" }],
      otherMeasurements: [
        { id: "height", label: "Height (m)", model: "height" },
        { id: "averageWidth", label: "Average Width (m)", model: "averageWidth" },
        { id: "length", label: "Length (m)", model: "length" },
        { id: "depth", label: "Depth (m)", model: "depth" },
        { id: "capacity", label: "Capacity (m³)", model: "capacity" },
        { id: "weight", label: "Weight (kg)", model: "weight" }
      ]
    };
  },
  methods: {
    validateDecimalInput(field, isImprovementArea = false) {
      let value = isImprovementArea ? this.improvement.area : this[field];
      value = value.replace(/[^0-9]/g, "").replace(/^(\d*)(\d{0,3})$/, "$1.$2").replace(/\.$/, "");
      if (isImprovementArea) {
        this.improvement.area = value;
        this.convertToKm2();
      } else {
        this[field] = value;
      }
    },
    validateDecimalInput2(field) {
      let value = this.improvement[field];
      value = value.replace(/[^0-9]/g, "").replace(/^(\d*)(\d{0,3})$/, "$1.$2").replace(/\.$/, "");
      this.improvement[field] = value;
    },
    validateDecimalInput3(field) {
      let value = this.improvement[field];
      value = value.replace(/[^0-9]/g, "").replace(/^(\d*)(\d{0,3})$/, "$1.$2").replace(/\.$/, "");
      this.improvement[field] = value;
    },
    validateAmount(index) {
      let value = this.fundingList[index].amount;
      value = value.replace(/[^0-9]/g, "").replace(/^(\d*)(\d{0,3})$/, "$1.$2").replace(/\.$/, "");
      this.fundingList[index].amount = value;
    },
    convertToKm2() {
      const area = parseFloat(this.improvement.area);
      if (isNaN(area) || !this.improvement.unit) {
        this.improvement.areaKm = "";
        return;
      }
      let km2Value = 0;
      switch (this.improvement.unit) {
        case "Square Meters (m²)": km2Value = area / 1_000_000; break;
        case "Square Kilometers (km²)": km2Value = area; break;
        case "Square Miles (mi²)": km2Value = area * 2.58999; break;
        case "Square Yards (yd²)": km2Value = area * 0.000000836127; break;
        case "Square Feet (ft²)": km2Value = area * 0.000000092903; break;
        case "Hectares (Ha)": km2Value = area / 100; break;
        case "Acres (ac)": km2Value = area * 0.00404686; break;
        case "Perches": km2Value = area * 0.0000252929; break;
      }
      this.improvement.areaKm = km2Value.toFixed(3);
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
        "Other (Pls. specify)"
      ].includes(type);
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

</style>
