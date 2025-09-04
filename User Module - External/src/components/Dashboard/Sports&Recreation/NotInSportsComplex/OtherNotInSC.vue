<template>
  <div class="main-container">
    <div class="card">
      <h2>Other</h2>
      <form @submit.prevent="submitForm">

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

      <!-- Location -->
      <div class="location-section">
        <label class="section-label"><b>Location</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.location.district" class="form-select" required>
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.dsDivision" class="form-select" required>
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.gnDivision" class="form-select">
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.coordinates" class="form-select">
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

        <!-- Area -->
        <div class="form-row">
          <label for="otherArea"><b>Land Area</b></label>
          <div class="inline-fields">
            <div class="form-inline-group">
              <label for="unit">Measurement Unit</label>
              <select id="unit" v-model.trim="formData.other.unit" @change="convertToKm2" required>
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
                v-model.trim="formData.other.area"
                @input="onAreaInput"
                required
              />

              <span class="error-message" v-if="errors.area">{{ errors.area }}</span>
            </div>

            <div class="form-inline-group">
              <label for="areaKm">Area (km²)</label>
              <input id="areaKm" :value="formData.other.areaKm" disabled />
            </div>

            <div class="form-inline-group">
              <label for="ownership">Ownership</label>
              <select id="ownership" v-model.trim="formData.other.landOwnership" required>
                <option disabled value="">Select Ownership</option>
                <option>Own</option>
                <option>Own by Other Party</option>
              </select>
              <span class="error-message" v-if="errors.landOwnership">{{ errors.landOwnership }}</span>
            </div>

            <div class="form-inline-group" v-if="formData.other.landOwnership === 'Own by Other Party'">
              <label for="landOwner">Land Owner</label>
              <input id="landOwner" v-model.trim="formData.other.landOwner" required/>
              <span class="error-message" v-if="errors.landOwner">{{ errors.landOwner }}</span>
            </div>
          </div>
        </div>

      <!-- Notice -->
      <div class="alert alert-info mt-4 mb-4">
        Own (Transfer in) = Structure Constructed by another Institution and Transferred free of charge to your Institution<br/>
        Own (Transfer out) = Structure Constructed by your Institution and transferred to another Institution free of charge
      </div>

      <!-- Ownership -->
      <div class="form-row">
        <label><b>Ownership</b></label>
        <select v-model="formData.ownership" class="form-control" required>
          <option disabled value="">Select Ownership</option>
          <option>Own</option>
          <option>Own (Transfer in)</option>
          <option>Own (Transfer out)</option>
          <option>Leased</option>
          <option>Rented</option>
          <option>Leased out</option>
          <option>Rented out</option>
        </select>
      </div>

      <!-- Conditional Sections -->
      <div v-if="formData.ownership === 'Own (Transfer in)'" class="form-row">
        <label>From Whom</label>
        <input type="text" v-model="formData.fromWhom" maxlength="50" class="form-control" required />
      </div>

      <div v-if="formData.ownership === 'Own (Transfer out)'" class="form-row">
        <label>To Whom</label>
        <input type="text" v-model="formData.toWhom" maxlength="50" class="form-control" required />
      </div>

      <div v-if="['Leased', 'Rented'].includes(formData.ownership)">
        <div class="form-row">
          <label>From Whom</label>
          <input type="text" v-model="formData.fromWhom" maxlength="50" class="form-control" required />
        </div>
        <div class="form-row">
          <label>Period</label>
          <div class="d-flex gap-2">
            <div>From <input type="month" v-model="formData.periodFrom" class="form-control" required /></div>
            <div>To <input type="month" v-model="formData.periodTo" class="form-control" required /></div>
          </div>
        </div>
        <div class="form-row">
          <label>Payment Method</label>
          <select v-model="formData.paymentMethod" class="form-select" required>
            <option disabled value="">Select Method</option>
            <option>One time payment</option>
            <option>Yearly payment</option>
            <option>Monthly payment</option>
          </select>
        </div>
        <div class="form-row">
          <label>Payment (Rs. Million)</label>
          <input type="text" v-model="formData.payment" @input="validateMoney($event, 'payment')" class="form-control" required />
        </div>
      </div>

      <div v-if="['Leased out', 'Rented out'].includes(formData.ownership)">
        <div class="form-row">
          <label>To Whom</label>
          <input type="text" v-model="formData.toWhom" maxlength="50" class="form-control" required />
        </div>
        <div class="form-row">
          <label>Period</label>
          <div class="d-flex gap-2">
            <div>From <input type="month" v-model="formData.periodFrom" class="form-control" required /></div>
            <div>To <input type="month" v-model="formData.periodTo" class="form-control" required /></div>
          </div>
        </div>
        <div class="form-row">
          <label>Payment Method</label>
          <select v-model="formData.paymentMethod" class="form-select" required>
            <option disabled value="">Select Method</option>
            <option>One time payment</option>
            <option>Yearly payment</option>
            <option>Monthly payment</option>
          </select>
        </div>
        <div class="form-row">
          <label>Income (Rs. Million)</label>
          <input type="text" v-model="formData.income" @input="validateMoney($event, 'income')" class="form-control" required />
        </div>
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
              v-model.trim="formData.other.capacity"
              @input="validateCapacity"
              class="form-control"
              style="max-width: 200px;"
            />
            <span class="error-message" v-if="errors.capacity">{{ errors.capacity }}</span>
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
        location: {
          district: "",
          dsDivision: "",
          gnDivision: "",
          coordinates: "",
        },
        lengthM: "",
        heightM: "",
        widthM: "",
        depthM: "",
        avgWidthM: "",
        weightKg: "",
        ownership: '',
        fromWhom: '',
        toWhom: '',
        periodFrom: '',
        periodTo: '',
        paymentMethod: '',
        payment: '',
        income: '',
        other: {
          capacity: "",
          unit: "",
          area: "",
          areaKm: "",
          landOwnership: '',
          landOwner: ''
        }
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
    validateMoney(event, field) {
      let value = typeof event === 'string' ? event : event.target.value;
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      if (value !== '' && !/^\d*\.?\d{0,3}$/.test(value)) value = value.slice(0, -1);
      this.formData[field] = value;
    },
    onAreaInput() {
      this.formData.other.area = this.formData.other.area.replace(/[^0-9.]/g, '');
      if (!this.formData.other.area.trim()) {
        this.errors.area = 'Area is required';
      } else {
        this.errors.area = '';
      }
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.formData.other.area);
      if (isNaN(area)) {
        this.formData.other.areaKm = '';
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
      this.formData.other.areaKm = (area * (conversionRates[this.formData.other.unit] || 0)).toFixed(6);
    },
    validateCapacity() {
      const regex = /^[0-9]+(\.[0-9]{1,2})?[a-zA-Z]*$/;
      this.errors.capacity = !regex.test(this.formData.other.capacity) ? "Invalid capacity format" : "";
    },
   submitForm() {
     // Required base fields
      if (!this.formData.nameId || !this.formData.description || !this.formData.ownership) {
        alert("Please fill all required fields!");
        return;
    }
     // Location validation
      if (!this.formData.location.district || !this.formData.location.dsDivision) {
        alert("Please fill all required fields in Location!");
        return;
    }
    
    // Land Area validation 
     if (!this.formData.other.unit || !this.formData.other.area || !this.formData.other.landOwnership) {
        alert("Please fill all required fields in Land Area section!");
        return;
    }
    if (this.formData.other.landOwnership === "Own by Other Party" && !this.formData.other.landOwner) {
        alert("Please fill 'Land Owner'!");
        return;
    }
    
    // Ownership conditional fields
     if (this.formData.ownership === "Own (Transfer in)" && !this.formData.fromWhom) {
        alert("Please fill 'From Whom'!");
        return;
    }
    if (this.formData.ownership === "Own (Transfer out)" && !this.formData.toWhom) {
        alert("Please fill 'To Whom'!");
        return;
    }
    
     this.$router.push({ name: "ConstructionStatus" });
    }

  }
}
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

.centered-fields .form-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  gap: 15px;
}

input,
select {
  flex: 1;
  max-width: 200px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.location-section { 
  margin-bottom: 20px; 
}
.inline-labels {
  display: flex;
  justify-content: center; 
  gap: 12px;
  font-weight: normal;
  margin-bottom: 6px;
}

.inline-labels span {
  flex: 1;
  text-align: center;
  max-width: 200px; 
}

.inline-fields {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.form-inline-group {
  display: flex;
  flex-direction: column; 
  align-items: center;  
  max-width: 200px;       
  flex: 1;
}

.form-inline-group label {
  text-align: center;
  margin-bottom: 4px;
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