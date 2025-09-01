<template>
  <div class="main-container">
    <div class="card">
      <h2>Park</h2>
      <form @submit.prevent="handleSubmit">

        <!-- Name or Identification Number -->
        <div class="form-row">
          <label for="nameId"><b>Name or Identification No</b></label>
          <input
            type="text"
            id="nameId"
            maxlength="20"
            v-model="formData.nameId"
            class="form-control"
            required
          />
        </div>

        <!-- Type -->
        <div class="form-row">
          <label for="type"><b>Type</b></label>
          <div class="type-inline">
            <select
              v-if="!isAddingNewType"
              id="type"
              v-model="formData.type"
              class="form-control"
              required
              @change="checkAddNew"
            >
              <option disabled value="">Select Type</option>
              <option>Public Park</option>
              <option>Wetland Park</option>
              <option>Children’s Park</option>
              <option>Urban Agriculture</option>
              <option>Adult's Park</option>
              <option>Urban Forest Park</option>
              <option value="ADD NEW">ADD NEW</option>
            </select>

            <input
              v-else
              type="text"
              placeholder="Enter New Type"
              class="form-control"
              v-model="formData.type"
              required
            />
          </div>
        </div>

        <!-- Maximum Number of Users -->
        <div class="form-row">
          <label for="maxUsers"><b>Maximum Number of Users</b></label>
          <input
            id="maxUsers"
            type="text"
            class="form-control"
            v-model="formData.maxUsers"
            @input="validateNumberOnly($event, 'maxUsers')"
          />
        </div>

        <!-- Description of Facilities Provided -->
        <div class="form-row">
          <label for="facilities"><b>Description of Facilities Provided</b></label>
          <input
            id="facilities"
            type="text"
            maxlength="100"
            class="form-control"
            v-model="formData.facilities"
          />
        </div>

        <!-- Area -->
        <div class="form-row">
          <label for="parkArea"><b>Area </b></label>
          <div class="inline-fields">
            <div class="form-inline-group">
              <label for="unit">Measurement Unit</label>
              <select id="unit" v-model.trim="park.unit" @change="convertToKm2" required>
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
              <span class="error-message" v-if="errors.unit">{{ errors.unit }}</span>
            </div>

            <div class="form-inline-group">
              <label for="area">Area</label>
              <input
                id="area"
                v-model.trim="park.area"
                @input="onAreaInput"
                required
              />
              <span class="error-message" v-if="errors.area">{{ errors.area }}</span>
            </div>

            <div class="form-inline-group">
              <label for="areaKm">Area (km²)</label>
              <input id="areaKm" :value="park.areaKm" disabled />
            </div>

            <div class="form-inline-group">
              <label for="ownership">Ownership</label>
              <select id="ownership" v-model.trim="park.ownership" required>
                <option disabled value="">Select Ownership</option>
                <option>Own</option>
                <option>Own by Other Party</option>
              </select>
              <span class="error-message" v-if="errors.ownership">{{ errors.ownership }}</span>
            </div>

            <div class="form-inline-group" v-if="park.ownership === 'Own by Other Party'">
              <label for="landOwner">Land Owner</label>
              <input id="landOwner" v-model.trim="park.landOwner" />
              <span class="error-message" v-if="errors.landOwner">{{ errors.landOwner }}</span>
            </div>
          </div>
        </div>

        <!-- Save Button -->
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
        maxUsers: "",
        facilities: "",
        areaM: "",
      },
      isAddingNewType: false,
      park: {
        unit: "",
        area: "",
        areaKm: "",
        ownership: "",
        landOwner: "",
      },
      errors: {
        unit: "",
        area: "",
        ownership: "",
        landOwner: "",
      },
    };
  },
  methods: {
    checkAddNew() {
      if (this.formData.type === "ADD NEW") {
        this.isAddingNewType = true;
        this.formData.type = "";
      }
    },
    validateNumberOnly(e, field) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      this.formData[field] = e.target.value;
    },
    onAreaInput() {
      this.park.area = this.park.area.replace(/[^0-9.]/g, '');
      if (!this.park.area.trim()) {
        this.errors.area = 'Area is required';
      } else {
        this.errors.area = '';
      }
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.park.area);
      if (isNaN(area)) {
        this.park.areaKm = '';
        return;
      }
      const conversionRates = {
        'Square Meters (m²)': 1e-6,
        'Square Kilometers (km²)': 1,
        'Square Miles (mi²)': 2.58999,
        'Square Yards (yd²)': 0.000000836127,
        'Square Feet (ft²)': 0.000000092903,
        'Hectares (Ha)': 0.01,
        'Acres (ac)': 0.00404686,
        'Perches': 0.0000636,
      };
      this.park.areaKm = (area * (conversionRates[this.park.unit] || 0)).toFixed(6);
    },
    handleSubmit() {
      this.errors = { unit: "", area: "", ownership: "", landOwner: "" };

      let hasError = false;

      if (!this.formData.nameId.trim()) { hasError = true; alert("Name or Identification No is required."); }
      if (!this.formData.type.trim()) { hasError = true; alert("Type is required."); }
      if (!this.park.unit.trim()) { hasError = true; alert("Unit is required."); }
      if (!this.park.area.trim()) { hasError = true; alert("Area is required."); }
      if (!this.park.ownership.trim()) { hasError = true; alert("Ownership is required."); }
      if (this.park.ownership === "Own by Other Party" && !this.park.landOwner.trim()) {
        hasError = true;
        this.errors.landOwner = "Land Owner is required";
        alert("Land Owner is required.");
      }

      if (!hasError) {
        this.$router.push({ name: "ConstructionStatus" });
      }
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
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 1200px; 
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

label {
  width: 250px;
  font-weight: bold;
  text-align: right;
}

input,
select {
  flex: 1;
  max-width: 200px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.type-inline {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.inline-fields {
  display: flex;
  flex-wrap: wrap; 
  justify-content: flex-start; 
  align-items: flex-start;
  gap: 10px; 
  padding: 0 10px;
}

.form-inline-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px; 
  flex: 1;
}

.form-inline-group label {
  margin-bottom: 5px;
  text-align: center;
  white-space: nowrap;
}

.form-inline-group input,
.form-inline-group select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 2px;
  text-align: center;
}

.button-container {
  margin-top: 25px;
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
  transition: 0.3s;
}
button:hover {
  background-color: #333;
}
</style>




