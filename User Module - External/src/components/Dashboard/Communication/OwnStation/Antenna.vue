<template>
  <div class="main-container">
    <div class="card">
      <h2>Antenna</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Name or Identification Number -->
        <div class="form-row mt-2">
          <label for="nameId"><b>Name or Identification No</b></label>
          <input
            type="text"
            id="nameId"
            maxlength="50"
            v-model="formData.nameId"
            class="form-control"
            required
          />
        </div>

        <!-- Capacity (kw) -->
        <div class="form-row">
          <label for="capacityKw"><b>Capacity (kw)</b></label>
          <input
            id="capacityKw"
            class="form-control"
            type="text"
            maxlength="10"
            v-model="formData.capacityKw"
            @input="validateDecimal($event, 2)"
            required
          />
        </div>

        <!-- Cost (Rs. Million) -->
        <div class="form-row mt-2">
          <label for="cost"><b>Cost (Rs. Million)</b></label>
          <input
            id="cost"
            class="form-control"
            type="text"
            v-model="formData.cost"
            @input="validateDecimal($event, 3)"
          />
        </div>

        <!-- Weight (kg) -->
        <div class="form-row">
          <label for="weightKg"><b>Weight (kg)</b></label>
          <input
            id="weightKg"
            class="form-control"
            type="text"
            maxlength="10"
            v-model="formData.weightKg"
            @input="validateDecimal($event, 2)"
            required
          />
        </div>

        <!-- Ownership -->
        <div class="form-row">
          <label><b>Land Ownership</b></label>
          <select v-model="formData.antenna.ownership" class="form-select" required>
            <option disabled value="">Select Land Ownership</option>
            <option>Own</option>
            <option>Own by Other Party</option>
          </select>

          <input
            v-if="formData.antenna.ownership === 'Own by Other Party'"
            type="text"
            v-model="formData.antenna.owner"
            class="form-control"
            :required="formData.antenna.ownership === 'Own by Other Party'"
            placeholder="Enter Owner Name"
          />
        </div>

        <!-- Basis of the Usage -->
        <div class="form-row">
          <label for="usage"><b>Basis of the Usage</b></label>
          <div class="type-inline">
            <select
              id="usage"
              v-model="formData.antenna.usage"
              class="form-control"
              required
            >
              <option disabled value="">Select Usage</option>
              <option>Own</option>
              <option>Free of Charge</option>
              <option>Lease/ Rent</option>
              <option>Leased Out/ Rented Out</option>
              <option>Other (Please Specify)</option>
            </select>

            <!-- Show input only if 'Other' is selected -->
            <input
              v-if="formData.antenna.usage === 'Other (Please Specify)'"
              type="text"
              placeholder="Please specify"
              maxlength="50"
              class="form-control"
              v-model="formData.otherUsage"
              required
            />
          </div>
        </div>

        <!-- Separator line -->
        <hr class="section-separator" />

        <!-- Show only if ownership = Own -->
        <template v-if="formData.antenna.ownership === 'Own'">
          <!-- Valuation / Status of usage -->
          <div class="form-row">
            <label>Status of Usage:</label>
            <select v-model="formData.antenna.status" required>
              <option disabled value="">-- Select --</option>
              <option>Utilize / In Operation / Open</option>
              <option>Not in Operation / Unutilized / Closed</option>
              <option>Abandoned</option>
            </select>
          </div>

          <!-- Notice -->
          <div class="alert alert-info my-3">
          <p class="info-text1">
            Not in operation / unutilized / Closed – Not in use for more than one year
          </p>
          <p class="info-text2">Abandoned – Not in use for more than Five Years</p>
          </div>

          <div class="form-row">
            <label>Valuation:</label>
            <select v-model="formData.antenna.valuation" required @change="handleValuationChange">
              <option disabled value="">-- Select --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div class="form-row">
            <label>Valuation Value (Rs. Million):</label>
            <input
              type="number"
              v-model="formData.antenna.valuationValue"
              :disabled="formData.antenna.valuation === 'No'"
              required
              step="0.001"
              min="0"
              placeholder="Enter valuation value"
            />
          </div>

          <div class="form-row">
            <label>Date of Valuation:</label>
            <input
              type="date"
              v-model="formData.antenna.valuationDate"
              :disabled="formData.antenna.valuation === 'No'"
              required
            />
          </div>

          <div class="form-row">
            <label>Remarks (if any):</label>
            <input
              type="text"
              v-model="formData.antenna.remarks"
              maxlength="60"
            />
          </div>
        </template>

        

        <template v-else-if="formData.antenna.ownership === 'Own by Other Party'">

        <!-- Separator line -->
        <hr class="section-separator" />
            
          <!-- Remarks -->
          <div class="form-row">
            <label for="remarks"><b>Remarks</b></label>
            <textarea
              id="remarks"
              v-model="formData.antenna.remarks"
              rows="3"
              maxlength="60"
              class="form-control"
              placeholder="Enter remarks"
              required
            ></textarea>
          </div>
        </template>

        <!-- Submit Button -->
        <div class="button-container">
          <button type="submit">SAVE</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nameId: "",
        capacityKw: "",
        cost: "",
        weightKg: "",
        antenna: {
          ownership: "",
          owner: "",
          usage: "",
          status: "",
          valuation: "",
          valuationValue: "",
          valuationDate: "",
          remarks: "",
        },
        otherUsage: "",
      },
    };
  },
  methods: {
    validateDecimal(e, decimals) {
      let value = e.target.value.replace(/[^0-9.]/g, ""); 
      const parts = value.split(".");
      if (parts.length > 2) {
        value = parts[0] + "." + parts[1]; 
      }
      if (parts[1] && parts[1].length > decimals) {
        parts[1] = parts[1].substring(0, decimals);
        value = parts.join(".");
      }
      e.target.value = value;

      if (e.target.id in this.formData) {
        this.formData[e.target.id] = value;
      } else if (e.target.id in this.formData.antenna) {
        this.formData.antenna[e.target.id] = value;
      }
    },
    handleValuationChange() {
      if (this.formData.antenna.valuation === "No") {
        this.formData.antenna.valuationValue = "1";
        this.formData.antenna.valuationDate = new Date().toISOString().split("T")[0];
      } else {
        this.formData.antenna.valuationValue = "";
        this.formData.antenna.valuationDate = "";
      }
    },
    handleSubmit() {
      if (!this.formData.nameId.trim()) {
        alert("Name or Identification No is required.");
        return;
      }
      if (!this.formData.capacityKw.trim()) {
        alert("Capacity is required.");
        return;
      }
      if (!this.formData.weightKg.trim()) {
        alert("Weight is required.");
        return;
      }
      if (!this.formData.antenna.ownership.trim()) {
        alert("Ownership is required.");
        return;
      }
      if (
        this.formData.antenna.ownership === "Own" &&
        !this.formData.antenna.usage.trim()
      ) {
        alert("Usage is required for Own ownership.");
        return;
      }

      this.$router.push({ name: "ConstructionStatus" });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
}

.card {
  background: #fff;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 900px;
}

h2 {
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

label {
  min-width: 250px;
  font-weight: bold;
  text-align: right;
}

input,
select,
textarea {
  flex: 1;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.type-inline {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.section-separator {
  margin: 20px 0;
  border: none;
  border-top: 2px solid #ccc;
}

.button-container {
  margin-top: 30px;
  text-align: center;
}

button {
  background-color: black;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333;
}
</style>



