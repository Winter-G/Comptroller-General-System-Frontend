<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 other-structures-card" @submit.prevent="submitForm">

      <!-- Institution Name -->
      <div class="form-row">
        <label><b>Institution Name:</b></label>
        <input type="text" v-model="formData.institutionName" class="form-control" disabled />
      </div>

      <!-- Institutional Sector -->
      <div class="form-row mt-2">
        <label><b>Institutional Sector:</b></label>
        <input type="text" v-model="formData.institutionalSector" class="form-control" disabled />
      </div>

      <!-- Notice -->
      <div class="alert alert-info my-3">
        Before proceeding, please check whether your Institution Name and the Institutional Sector shown here are correct.
      </div>

      <!-- Assets Code -->
      <div class="form-row">
        <label for="assetsCode"><b>Assets Code:</b></label>
        <select id="assetsCode" v-model="formData.assetsCode" class="form-control" required>
          <option disabled value="">Select Assets Code</option>
          <option value="6111307 - Structures Associated with Mining Minerales and Subsoil assets">6111307 - Structures Associated with Mining Minerales and Subsoil assets</option>
          <option value="6111312 - Structures related with Farms and Agriculture">6111312 - Structures related with Farms and Agriculture</option>
          <option value="6111316 - Structures for Farming and Agricultural activities">6111316 - Structures for Farming and Agricultural activities</option>
          <option value="6111317 - Other not specified above">6111317 - Other not specified above</option>
        </select>
      </div>

      <!-- Type of the Structure -->
      <div class="form-row">
        <label for="structureType"><b>Type of the Structure:</b></label>
        <select id="structureType" v-model="formData.structureType" class="form-control" required>
          <option disabled value="">Select Type of Structure</option>
          <option value="Fence">Fence</option>
          <option value="Wall">Wall</option>
          <option value="Cages">Cages</option>
          <option value="Ancient Statue">Ancient Statue</option>
          <option value="Clock Tower">Clock Tower</option>
          <option value="Name Board">Name Board</option>
          <option value="Light Tower">Light Tower</option>
          <option value="Den">Den</option>
          <option value="Trench">Trench</option>
          <option value="Cemetery">Cemetery</option>
          <option value="Artificial Water Fall">Artificial Water Fall</option>
          <option value="Car Park">Car Park</option>
          <option>Other (Please Specify)</option>
        </select>

        <!-- Show input only if 'Other' is selected -->
        <input
          v-if="formData.structureType === 'Other (Please Specify)'"
          type="text"
          placeholder="Please specify"
          maxlength="50"
          class="form-control"
          v-model="formData.otherType"
          required
        />
      </div>

      <!-- Identification Name or No -->
      <div class="form-row mt-2">
        <label for="nameId"><b>Identification Name or No</b></label>
        <input type="text" id="nameId" maxlength="50" v-model="formData.nameId" class="form-control" required />
      </div>

      <!-- Description of the Structure -->
      <div class="form-row">
        <label><b>Description of the Structure:</b></label>
        <input type="text" v-model="formData.description" class="form-control" maxlength="200" required />
      </div>

      <!-- Location (Start) -->
      <div class="location-section">
        <label class="section-label"><b>Location (Start)</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.locationStart.district" class="form-select" required>
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationStart.dsDivision" class="form-select" required>
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationStart.gnDivision" class="form-select" required>
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationStart.coordinates" class="form-select">
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

      <!-- Location (End) -->
      <div class="location-section">
        <label class="section-label"><b>Location (End)</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.locationEnd.district" class="form-select" required>
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationEnd.dsDivision" class="form-select" required>
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationEnd.gnDivision" class="form-select" required>
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationEnd.coordinates" class="form-select">
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

      <!-- Purpose of Usage -->
      <div class="form-row">
        <label><b>Purpose of Usage:</b></label>
        <input type="text" v-model="formData.purposeOfUsage" class="form-control" maxlength="100" required />
      </div>

      <!-- Measurements -->
      <div class="form-row">
        <label for="areaKm2"><b>Area (Km²)</b></label>
        <input id="areaKm2" class="form-control" type="text" v-model="formData.areaKm2" @input="validateDecimal($event, 'areaKm2')" />
      </div>

      <div class="form-row">
        <label for="lengthKm"><b>Length (Km)</b></label>
        <input id="lengthKm" class="form-control" type="text" v-model="formData.lengthKm" @input="validateDecimal($event, 'lengthKm')" />
      </div>

      <div class="form-row">
        <label for="avgHeight"><b>Average Height (m)</b></label>
        <input id="avgHeight" class="form-control" type="text" v-model="formData.avgHeight" @input="validateDecimal($event, 'avgHeight')" />
      </div>

      <div class="form-row">
        <label for="avgDepth"><b>Average Depth (m)</b></label>
        <input id="avgDepth" class="form-control" type="text" v-model="formData.avgDepth" @input="validateDecimal($event, 'avgDepth')" />
      </div>

      <div class="form-row">
        <label for="avgWidth"><b>Average Width (m)</b></label>
        <input id="avgWidth" class="form-control" type="text" v-model="formData.avgWidth" @input="validateDecimal($event, 'avgWidth')" />
      </div>

      <!-- Submit Button -->
      <div class="button-container">
        <button type="submit" class="btn-save">SAVE</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        institutionName: "",
        institutionalSector: "",
        assetsCode: "",
        structureType: "",
        otherType: "",
        nameId: "",
        locationStart: { district: "", dsDivision: "", gnDivision: "", coordinates: "" },
        locationEnd: { district: "", dsDivision: "", gnDivision: "", coordinates: "" },
        description: "",
        purposeOfUsage: "",
        areaKm2: "",
        lengthKm: "",
        avgHeight: "",
        avgDepth: "",
        avgWidth: "",
      },
    };
  },
  methods: {
    validateDecimal(event, field) {
      let value = typeof event === "string" ? event : event.target.value;
      const regex = /^\d*\.?\d{0,2}$/;
      value = value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("");
      if (value !== "" && !regex.test(value)) value = value.slice(0, -1);
      this.formData[field] = value;
    },

    submitForm() {
      const requiredFields = [
        "assetsCode",
        "structureType",
        "nameId",
        "description",
        "purposeOfUsage",
      ];

      const locationFields = ["district", "dsDivision", "gnDivision"];

      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }

      for (const field of locationFields) {
        if (!this.formData.locationStart[field]) {
          alert("Please fill all required fields in Location (Start)!");
          return;
        }
        if (!this.formData.locationEnd[field]) {
          alert("Please fill all required fields in Location (End)!");
          return;
        }
      }

      this.$router.push({ name: "ConstructionStatus" });
    },
  },
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
.location-section {
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

