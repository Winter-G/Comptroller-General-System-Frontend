<template>
  <div class="main-container">
    <div class="card">
      <h2>Tower</h2>
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

        <!-- Type -->
        <div class="form-row">
          <label for="type"><b>Type</b></label>
          <div class="type-inline">
            <select id="type" v-model="formData.type" class="form-control" required>
              <option disabled value="">Select Type</option>
              <option>Four Pole  (Self Supported)</option>
              <option>Single Pole</option>
              <option>Single Pole (Guy Cable)</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <!-- Height -->
        <div class="form-row">
          <label for="heightM"><b>Height (m)</b></label>
          <input
            id="heightM"
            class="form-control"
            type="text"
            maxlength="10"
            v-model="formData.heightM"
            @input="validateDecimal($event, 2)"
            required
          />
        </div>

        <!-- Base Area -->
        <div class="form-row mt-2">
          <label for="baseArea"><b>Base Area (m²)</b></label>
          <input
            id="baseArea"
            class="form-control"
            type="text"
            v-model="formData.baseArea"
            @input="validateDecimal($event, 3)"
          />
        </div>

        <!-- Maximum Weight of Antennas -->
        <div class="form-row">
          <label for="maxWeight"><b>Maximum Weight of Antennas (kg)</b></label>
          <input
            id="maxWeight"
            class="form-control"
            type="text"
            maxlength="10"
            v-model="formData.maxWeight"
            @input="validateDecimal($event, 2)"
            required
          />
        </div>

        <!-- Ownership -->
        <div class="form-row">
          <label><b>Land Ownership</b></label>
          <select v-model="formData.tower.ownership" class="form-select" required>
            <option disabled value="">Select Land Ownership</option>
            <option>Own</option>
            <option>Own by Other Party</option>
          </select>

          <input
            v-if="formData.tower.ownership === 'Own by Other Party'"
            type="text"
            v-model="formData.tower.owner"
            class="form-control"
            :required="formData.tower.ownership === 'Own by Other Party'"
            placeholder="Enter Owner Name"
          />
        </div>

        <!-- Basis of the Usage -->
        <div class="form-row">
          <label for="usage"><b>Basis of the Usage</b></label>
          <div class="type-inline">
            <select
              id="usage"
              v-model="formData.tower.usage"
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
              v-if="formData.tower.usage === 'Other (Please Specify)'"
              type="text"
              placeholder="Please specify"
              maxlength="50"
              class="form-control"
              v-model="formData.otherUsage"
              required
            />
          </div>
        </div>

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
        type: "",
        heightM: "",
        baseArea: "",
        maxWeight: "",
        tower: {
          ownership: "",
          owner: "",
          usage: "",
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
      } else if (e.target.id in this.formData.tower) {
        this.formData.tower[e.target.id] = value;
      }
    },
    handleSubmit() {
      if (!this.formData.nameId.trim()) {
        alert("Name or Identification No is required.");
        return;
      }
      if (!this.formData.type.trim()) {
        alert("Type is required.");
        return;
      }
      if (!this.formData.heightM.trim()) {
        alert("Height is required.");
        return;
      }
      if (!this.formData.maxWeight.trim()) {
        alert("Maximum Weight is required.");
        return;
      }
      if (!this.formData.tower.ownership.trim()) {
        alert("Ownership is required.");
        return;
      }
      if (!this.formData.tower.usage.trim()) {
        alert("Usage is required.");
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
  justify-content: center; 
  margin-bottom: 15px;
  gap: 15px;
}

label {
  min-width: 200px;  
  font-weight: bold;
  text-align: right;
}

input,
select {
  flex: 1;
  max-width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.type-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
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



