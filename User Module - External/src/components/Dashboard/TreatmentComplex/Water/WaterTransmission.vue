<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 transmission-card" @submit.prevent="submitForm">

      <!-- Name of the Water Treatment Plant -->
      <div class="form-row">
        <label><b>Name of the  Water Treatment Plant​​</b></label>
        <select v-model="formData.treatmentPlantName" class="form-control" required>
          <option disabled value="">Select Water Treatment Plant</option>
          <option value="Name 1">Name 1</option>
        </select>
      </div>

      <!-- Transmission Line Name ​ -->
      <div class="form-row">
        <label for="transmissionLine-name"><b>Transmission Line Name​</b></label>
        <input type="text" id="transmissionLine-name" maxlength="50" v-model="formData.transmissionLineName" class="form-control" placeholder="Ex – Abathale - Dehiwala​" required>
      </div>

      <!-- Location of the Distribution Tank ​ -->
      <div class="location-section">
        <label class="section-label"><b>Location of the Distribution Tank</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
          <span>Distance from the Treatment Plant (km)​</span>
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
          <input type="text" v-model="formData.location.distanceFromTreatmentPlant" class="form-control" @input="validateDecimal($event, 'distanceFromTreatmentPlant')" required />
        </div>
      </div>

      <!-- Land Reservation Area​ -->
      <div class="form-row">
        <label><b>Land Reservation Area​</b></label>
        <select v-model="formData.landReservationArea" class="form-control" required>
          <option disabled value="">Select Land Reservation Area</option>
          <option value="Yes - (Land Reservation Area Known)">Yes - (Land Reservation Area Known)</option>
          <option value="Yes - (Land Reservation Area Unknown)">Yes - (Land Reservation Area Unknown)</option>
          <option value="No">No</option>
        </select>

        <input
            v-if="formData.landReservationArea === 'Yes - (Land Reservation Area Known)'"
            type="text"
            v-model="formData.areaWidth"
            class="form-control"
            placeholder="Enter Land Reservation Area – Width (m)​"
            :required="formData.landReservationArea === 'Yes - (Land Reservation Area Known)'" @input="validateDecimal($event, 'areaWidth')"
            />
      </div>      
      
      <!-- Popup Modal -->
      <div v-if="showNoOfPipeLinesPopup" class="popup-overlay">
        <div class="popup-content">
            <PipeLinesNoModal :formData="formData" @close="closeNoOfPipeLinesPopup" />
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
import PipeLinesNoModal from "@/components/Dashboard/TreatmentComplex/Water/PipeLinesNoModal.vue";

export default {
  components: { 
    PipeLinesNoModal
  },
  data() {
    return {
      showNoOfPipeLinesPopup: false,
      formData: {
        treatmentPlantName: '',
        transmissionLineName: '',
        location: { district: '', dsDivision: '', gnDivision: '', coordinates: '', distanceFromTreatmentPlant: '' },
        landReservationArea: '',
        areaWidth: '',
        pipeLines: [
          { diameter: '', length: '' }
        ]
      },
    }
  },
  methods: {
    openNoOfPipeLinesPopup() { 
      this.showNoOfPipeLinesPopup = true; 
    },
    closeNoOfPipeLinesPopup() { 
      this.showNoOfPipeLinesPopup = false; 
    },

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

    onAreaInput(event) {
      let value = event.target.value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      this.formData.treatmentPlant.area = value;
      this.convertToKm2();
    },

    convertToKm2() {
      const area = parseFloat(this.formData.treatmentPlant.area);
      if (isNaN(area) || !this.formData.treatmentPlant.unit) {
        this.formData.treatmentPlant.areaKm = '';
        return;
      }
      let km2 = 0;
      switch (this.formData.treatmentPlant.unit) {
        case 'Square Meters (m²)': km2 = area / 1e6; break;
        case 'Square Kilometers (km²)': km2 = area; break;
        case 'Square Miles (mi²)': km2 = area * 2.58999; break;
        case 'Square Yards (yd²)': km2 = area * 0.000000836127; break;
        case 'Square Feet (ft²)': km2 = area * 0.000000092903; break;
        case 'Hectares (Ha)': km2 = area * 0.01; break;
        case 'Acres (ac)': km2 = area * 0.00404686; break;
        case 'Perches': km2 = area * 0.0000252929; break;
      }
      this.formData.treatmentPlant.areaKm = km2.toFixed(6);
    },

    submitForm() {
      // Required base fields
      const requiredFields = ["treatmentPlantName", "transmissionLineName", "landReservationArea"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }
        // Land Reservation Area - Width validation
        if (this.formData.landReservationArea === 'Yes - (Land Reservation Area Known)' && !this.formData.areaWidth) {
            alert("Please fill the Land Reservation Area – Width!");
            return;
        }

      // Location validation
      const locationFields = ["district", "dsDivision", "distanceFromTreatmentPlant"];
      for (const field of locationFields) {
        if (!this.formData.location[field]) {
          alert("Please fill all required fields in Location!");
          return;
        }
      }

      console.log("Form submitted:", this.formData);
      this.openNoOfPipeLinesPopup();
    }
  }
}
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
.form-row input, .form-row select {
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
.inline-fields select, .inline-fields input { 
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
  background-color: rgba(0,0,0,0.5); 
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

</style>
