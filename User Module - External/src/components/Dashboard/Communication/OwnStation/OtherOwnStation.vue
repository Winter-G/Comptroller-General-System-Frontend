<template>
  <div class="main-container">
    <div class="card">
      <h2>Other</h2>
      <form @submit.prevent="handleSubmit">

       <!-- Notice -->
       <div class="alert alert-info my-3 text-center">
          To be filled as applicable.
        </div>

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

        <!-- Weight -->
        <div class="form-row">
          <label for="weightKg"><b>Weight (kg)</b></label>
          <input id="weightKg" class="form-control" type="text" maxlength="6"
                 v-model="formData.weightKg" @input="validateDecimal($event, 'weightKg')" />
        </div>

        <!-- Capacity -->
        <div class="form-row">
          <label for="capacity"><b>Capacity (Ex – 15kW)</b></label>
          <input
            id="capacity"
            type="text"
            maxlength="10"
            v-model.trim="formData.otherOwnStation.capacity"
            @input="validateCapacity"
            class="form-control"
            style="max-width: 200px;"
          />
          <span class="error-message" v-if="errors.capacity">{{ errors.capacity }}</span>
        </div>

        <!-- Area -->
        <div class="form-row">
          <label for="otherArea"><b>Area</b></label>
          <div class="area-inline">
            <div class="area-group">
              <label for="unit">Measurement Unit</label>
              <select id="unit" v-model.trim="formData.otherOwnStation.unit" @change="convertToKm2" required>
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

            <div class="area-group">
              <label for="area">Area</label>
              <input
                id="area"
                v-model.trim="formData.otherOwnStation.area"
                @input="onAreaInput"
                required
              />
              <span class="error-message" v-if="errors.area">{{ errors.area }}</span>
            </div>

            <div class="area-group">
              <label for="areaKm">Area (km²)</label>
              <input id="areaKm" :value="formData.otherOwnStation.areaKm" disabled />
            </div>
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
        description:"",
        lengthM:"",
        heightM:"",
        depthM:"",
        widthM:"",
        weightKg: "",
        otherOwnStation: {
          capacity: "",
          unit:"",
          area: "",
          areaKm: ""
        },
      },
      errors: {
        capacity: "",
        unit: "",
        area: ""
      }
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
      this.formData.otherOwnStation.area = this.formData.otherOwnStation.area.replace(/[^0-9.]/g, '');
      if (!this.formData.otherOwnStation.area.trim()) {
        this.errors.area = 'Area is required';
      } else {
        this.errors.area = '';
      }
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.formData.otherOwnStation.area);
      if (isNaN(area)) {
        this.formData.otherOwnStation.areaKm = '';
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
      this.formData.otherOwnStation.areaKm = (area * (conversionRates[this.formData.otherOwnStation.unit] || 0)).toFixed(6);
    },
    validateCapacity() {
      const regex = /^[0-9]+(\.[0-9]{1,2})?[a-zA-Z]*$/;
      this.errors.capacity = !regex.test(this.formData.otherOwnStation.capacity) ? "Invalid capacity format" : "";
    },
    handleSubmit() {
      if (!this.formData.nameId.trim()) {
        alert("Name or Identification No is required.");
        return;
      }
      if (!this.formData.description.trim()) {
        alert("Description is required.");
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
  max-width: 1100px;
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
select,
textarea {
  flex: 1;
  max-width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

.type-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
}

.section-separator {
  margin: 20px 0;
  border: none;
  border-top: 2px solid #ccc;
}

.alert.text-center {
  text-align: center;
}

.area-inline {
  display: flex;
  gap: 15px;
  flex: 1;
  align-items: flex-end;
}

.area-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-row label {
  min-width: 200px;
  text-align: right;
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