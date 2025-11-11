<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 sewerage-treatment-plant-card" @submit.prevent="submitForm">

      <div class="centered-fields">
        <!-- Name or Identification Number -->
        <div class="form-row">
          <label for="nameId"><b>Name or Identification No</b><span class="text-danger">*</span></label>
          <input
            type="text"
            id="nameId"
            maxlength="50"
            v-model="formData.nameId"
            class="form-control"
            required
          />
        </div>
        <p v-if="errors.nameId" class="error-text">{{ errors.nameId }}</p>

        <!-- Location -->
        <div class="location-section">
          <label class="section-label"><b>Location</b><span class="text-danger">*</span></label>
          <div class="inline-labels compact">
            <span>District<span class="text-danger">*</span></span>
            <span>DS Division<span class="text-danger">*</span></span>
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
        <p v-if="errors.location" class="error-text">{{ errors.location }}</p>

        <!-- Average Capacity (m3 /Per day) -->
        <div class="form-row">
          <label for="avgCapacity"><b>Average Capacity (m3 /Per day)</b><span class="text-danger">*</span></label>
          <input id="avgCapacity" class="form-control" type="text"
                 v-model="formData.avgCapacity" @input="validateDecimal($event, 'avgCapacity')" required/>
        </div>
        <p v-if="errors.avgCapacity" class="error-text">{{ errors.avgCapacity }}</p>

        <!-- Land Area + Ownership -->
        <div class="land-section">
          <label class="section-label"><b>Land Area</b><span class="text-danger">*</span></label>
          <div class="inline-labels compact">
            <span>Measurement Unit<span class="text-danger">*</span></span>
            <span>Area<span class="text-danger">*</span></span>
            <span>Area (km²)</span>
            <span>Ownership<span class="text-danger">*</span></span>
            <span v-if="formData.treatmentPlant.landOwnership === 'Own by Other Party'">Land Owner<span class="text-danger">*</span></span>
          </div>
          <div class="inline-fields">
            <!-- Unit -->
            <select v-model.trim="formData.treatmentPlant.unit" @change="convertToKm2" required>
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

            <!-- Area -->
            <input
              v-model.trim="formData.treatmentPlant.area"
              @input="onAreaInput"
              required
            />

            <!-- Area (km²) -->
            <input :value="formData.treatmentPlant.areaKm" readonly disabled />

            <!-- Ownership -->
            <select v-model.trim="formData.treatmentPlant.landOwnership" required>
              <option disabled value="">Select Ownership</option>
              <option>Own</option>
              <option>Own by Other Party</option>
            </select>

            <!-- Land Owner (only if required) -->
            <input
              v-if="formData.treatmentPlant.landOwnership === 'Own by Other Party'"
              v-model.trim="formData.treatmentPlant.landOwner"
              placeholder="Enter Land Owner"
              required
            />
          </div>
        </div>
        <p v-if="errors.landArea" class="error-text">{{ errors.landArea }}</p>
      </div>

      <!-- NEXT button -->
      <div class="next-btn-container">
        <button type="submit" class="btn btn-primary">NEXT</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nameId: "",
        location: { district: "", dsDivision: "", gnDivision: "", coordinates: "" },
        avgCapacity: "",
        treatmentPlant: {
          capacity: "",
          unit: "",
          area: "",
          areaKm: "",
          landOwnership: "",
          landOwner: ""
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
    onAreaInput() {
      let val = this.formData.treatmentPlant.area.replace(/[^0-9.]/g, "");
      const parts = val.split(".");
      if (parts.length > 2) val = parts[0] + "." + parts.slice(1).join("");
      this.formData.treatmentPlant.area = val;
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.formData.treatmentPlant.area);
      if (isNaN(area)) {
        this.formData.treatmentPlant.areaKm = "";
        return;
      }
      const conversionRates = {
        "Square Meters (m²)": 1e-6,
        "Square Kilometers (km²)": 1,
        "Square Miles (mi²)": 2.58999,
        "Square Yards (yd²)": 0.000000836127,
        "Square Feet (ft²)": 0.000000092903,
        "Hectares (Ha)": 0.01,
        "Acres (ac)": 0.00404686,
        "Perches": 0.0000636
      };
      this.formData.treatmentPlant.areaKm = (
        area * (conversionRates[this.formData.treatmentPlant.unit] || 0)
      ).toFixed(6);
    },
    submitForm() {
      if (!this.formData.nameId || !this.formData.avgCapacity) {
        alert("Please fill all required fields!");
        return;
      }
      if (!this.formData.location.district || !this.formData.location.dsDivision) {
        alert("Please fill all required fields in Location!");
        return;
      }
      if (
        !this.formData.treatmentPlant.unit ||
        !this.formData.treatmentPlant.area ||
        !this.formData.treatmentPlant.landOwnership
      ) {
        alert("Please fill all required fields in Land Area section!");
        return;
      }
      if (
        this.formData.treatmentPlant.landOwnership === "Own by Other Party" &&
        !this.formData.treatmentPlant.landOwner
      ) {
        alert("Please fill 'Land Owner'!");
        return;
      }
      this.$router.push({ name: "ConstructionStatus" });
    }
  }
};
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}
.form-row label {
  min-width: 220px;
  font-weight: bold;
}
.form-row input,
.form-row select {
  flex: 1;
}
.text-danger {
  color: #dc3545 !important;
}
.error-text {
  color: #dc3545;
  font-size: 0.9em;
  margin-top: -6px;
  margin-bottom: 10px;
}
.location-section,
.land-section {
  margin-bottom: 20px;
}
.inline-labels {
  display: flex;
  justify-content: space-between;
  font-weight: normal;
  margin-bottom: 6px;
}
.inline-labels.compact {
  margin-top: 4px;
}
.inline-labels span {
  flex: 1;
  text-align: center;
}
.inline-fields {
  display: flex;
  gap: 12px;
}
.inline-fields select,
.inline-fields input {
  flex: 1;
}
.next-btn-container {
  margin-top: 20px;
  text-align: right;
}
</style>


