<template>
  <div class="main-container">
    <div class="card">
      <h2>Other</h2>
      <form @submit.prevent="handleSubmit">

        <!-- Notice -->
       <div class="alert alert-info my-3">
          To be filled as applicable.
        </div>

        <div class="centered-fields">
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

          <!-- Description -->
          <div class="form-row">
            <label for="description"><b>Description</b></label>
            <input
              id="description"
              type="text"
              maxlength="100"
              class="form-control"
              v-model="formData.description"
              required
            />
          </div>

          <!-- Length -->
          <div class="form-row">
            <label for="lengthM"><b>Length (m)</b></label>
            <input id="lengthM" class="form-control" type="text" maxlength="6"
                   v-model="formData.lengthM" @input="validateDecimal($event, 'lengthM')" />
          </div>

          <!-- Height -->
          <div class="form-row">
            <label for="heightM"><b>Height (m)</b></label>
            <input id="heightM" class="form-control" type="text" maxlength="6"
                   v-model="formData.heightM" @input="validateDecimal($event, 'heightM')" />
          </div>

          <!-- Width -->
          <div class="form-row">
            <label for="widthM"><b>Width (m)</b></label>
            <input id="widthM" class="form-control" type="text" maxlength="6"
                   v-model="formData.widthM" @input="validateDecimal($event, 'widthM')" />
          </div>

          <!-- Depth -->
          <div class="form-row">
            <label for="depthM"><b>Maximum Depth (m)</b></label>
            <input id="depthM" class="form-control" type="text" maxlength="6"
                   v-model="formData.depthM" @input="validateDecimal($event, 'depthM')"/>
          </div>

          <!-- Average Width -->
          <div class="form-row">
            <label for="avgWidthM"><b>Average Width (m)</b></label>
            <input id="avgWidthM" class="form-control" type="text" maxlength="6"
                   v-model="formData.avgWidthM" @input="validateDecimal($event, 'avgWidthM')" />
          </div>

          <!-- Weight -->
          <div class="form-row">
            <label for="weightKg"><b>Weight (kg)</b></label>
            <input id="weightKg" class="form-control" type="text" maxlength="6"
                   v-model="formData.weightKg" @input="validateDecimal($event, 'weightKg')" />
          </div>

          <!-- Capacity with measuring Unit -->
          <div class="form-row">
            <label for="capacity"><b>Capacity (Ex – 15kW)</b></label>
            <input
              id="capacity"
              type="text"
              maxlength="10"
              v-model.trim="other.capacity"
              @input="validateCapacity"
              class="form-control"
              style="max-width: 200px;"
            />
            <span class="error-message" v-if="errors.capacity">{{ errors.capacity }}</span>
          </div>

        <!-- Area -->
        <div class="form-row">
          <label for="otherArea"><b>Area </b></label>
          <div class="inline-fields">
            <div class="form-inline-group">
              <label for="unit">Measurement Unit</label>
              <select id="unit" v-model.trim="other.unit" @change="convertToKm2" required>
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
                v-model.trim="other.area"
                @input="onAreaInput"
                required
              />
              <span class="error-message" v-if="errors.area">{{ errors.area }}</span>
            </div>

            <div class="form-inline-group">
              <label for="areaKm">Area (km²)</label>
              <input id="areaKm" :value="other.areaKm" disabled />
            </div>
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
        description: "",
        ownership: '',
        fromWhom: '',
        toWhom: '',
        periodFrom: '',
        periodTo: '',
        paymentMethod: '',
        payment: '',
        income: '',
        lengthM: "",
        heightM: "",
        widthM: "",
        depthM: "",
        avgWidthM: "",
        weightKg: ""
      },
      other: {
        capacity: "",
        unit: "",
        area: "",
        areaKm: "",
        landOwnership: '',
        landOwner: ''
      },
      errors: {
        capacity: "",
        unit: "",
        area: ""
      },
    };
  },
  methods: {
    validateDecimal(e, field) {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
      if ((e.target.value.match(/\./g) || []).length > 1) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
      }
      const parts = e.target.value.split(".");
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
        e.target.value = parts.join(".");
      }
      this.formData[field] = e.target.value;
    },
    onAreaInput() {
      this.other.area = this.other.area.replace(/[^0-9.]/g, '');
      if (!this.other.area.trim()) {
        this.errors.area = 'Area is required';
      } else {
        this.errors.area = '';
      }
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.other.area);
      if (isNaN(area)) {
        this.other.areaKm = '';
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
      this.other.areaKm = (area * (conversionRates[this.other.unit] || 0)).toFixed(6);
    },
    validateCapacity() {
      const regex = /^[0-9]+(\.[0-9]{1,2})?[a-zA-Z]*$/;
      this.errors.capacity = !regex.test(this.other.capacity) ? "Invalid capacity format" : "";
    },
    handleSubmit() {
      this.errors = { capacity: "", unit: "", area: "", ownership: "", landOwner: "" };
      let hasError = false;
      if (!this.formData.nameId.trim()) { hasError = true; alert("Name or Identification No is required."); }
      if (!this.formData.description.trim()) { hasError = true; alert("Description is required."); }
      if (!hasError) this.$router.push({ name: "ConstructionStatus" });
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

.alert {
  text-align: center; 
}

.centered-fields .form-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  gap: 15px;
}

.centered-fields label {
  width: 200px;
  text-align: right;
  font-weight: bold;
}

.inline-fields {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
  align-items: flex-start;
  gap: 10px; 
  padding: 0 10px;
}

.inline-fields.centered-area {
  justify-content: center;
}

input,
select {
  flex: 1;
  max-width: 200px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
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



