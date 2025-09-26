<template>
  <div class="container mt-3">
    <form
      class="card shadow-sm p-4 drainage-canal-card"
      @submit.prevent="submitForm"
    >
      <!-- Type of the Pipe Line -->
      <div class="form-row">
        <label><b>Type of the Pipe Line</b></label>
        <select
          id="typeOfLine"
          v-model="formData.typeOfLine"
          class="form-control"
        >
          <option value="Force Main">Force Main</option>
          <option value="Gravity Sewer">Gravity Sewer</option>
        </select>
      </div>

      <!-- Identification Name or No -->
      <div class="form-row">
        <label><b>Identification Name or No</b></label>
        <input
          type="text"
          v-model="formData.identificationName"
          maxlength="50"
          class="form-control"
        />
      </div>

      <!-- Location Start -->
      <div class="location-section">
        <label class="section-label"><b>Location Start</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.locationStart.district" class="form-select">
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationStart.dsDivision" class="form-select">
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationStart.gnDivision" class="form-select">
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select
            v-model="formData.locationStart.coordinates"
            class="form-select"
          >
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

      <!-- Location End -->
      <div class="location-section">
        <label class="section-label"><b>Location End</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.locationEnd.district" class="form-select">
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationEnd.dsDivision" class="form-select">
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.locationEnd.gnDivision" class="form-select">
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select
            v-model="formData.locationEnd.coordinates"
            class="form-select"
          >
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

      <!-- Total Length (Km) -->
      <div class="form-row">
        <label for="TotalLengthKm"><b>Total Length (Km)</b></label>
        <input
          id="TotalLengthKm"
          class="form-control"
          type="text"
          v-model="formData.TotalLengthKm"
          @input="validateDecimal($event, 'TotalLengthKm')"
        />
      </div>

      <!-- Popup Modal -->
      <div v-if="showDiameterWisePipeLinesModal" class="popup-overlay">
        <div class="popup-content">
          <DiameterWisePipeLinesModal
            :formData="formData"
            @close="closeDiameterWisePipeLinesModal"
            @updatePipeLines="updatePipeLines"
          />
        </div>
      </div>

      <!-- NEXT button -->
      <div class="next-btn-container">
        <button type="submit" class="btn btn-primary">NEXT</button>
      </div>
    </form>
  </div>
</template>

<script>
import DiameterWisePipeLinesModal from "./DiameterWisePipeLinesModal.vue";

export default {
  components: { DiameterWisePipeLinesModal },
  data() {
    return {
      showDiameterWisePipeLinesModal: false,
      formData: {
        typeOfLine: "",
        identificationName: "",
        locationStart: {
          district: "",
          dsDivision: "",
          gnDivision: "",
          coordinates: "",
        },
        locationEnd: {
          district: "",
          dsDivision: "",
          gnDivision: "",
          coordinates: "",
        },
        TotalLengthKm: "",
        pipeLines: [], // store child modal data here
      },
    };
  },
  methods: {
    openDiameterWisePipeLinesModal() {
      this.showDiameterWisePipeLinesModal = true;
    },
    closeDiameterWisePipeLinesModal() {
      this.showDiameterWisePipeLinesModal = false;
    },
    updatePipeLines(pipes) {
      this.formData.pipeLines = pipes;
      console.log("Updated pipelines:", this.formData.pipeLines);
    },
    validateDecimal(e, field) {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
      if ((e.target.value.match(/\./g) || []).length > 1) {
        e.target.value = e.target.value.substring(
          0,
          e.target.value.length - 1
        );
      }
      const parts = e.target.value.split(".");
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
        e.target.value = parts.join(".");
      }
      this.formData[field] = e.target.value;
    },
    submitForm() {
      console.log("Form submitted:", this.formData);
      this.openDiameterWisePipeLinesModal();
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
.type-inline.same-line {
  display: flex;
  gap: 12px;
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
.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.popup-content {
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>



