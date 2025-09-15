<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 station-facilities-outsourced-card" @submit.prevent="submitForm">

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
        <label><b>Assets Code:</b></label>
        <input type="text" v-model="formData.assetsCode" class="form-control" disabled />
      </div>

      <!-- Name of the Station Facilities Outsourced -->
      <div class="form-row">
        <label for="name"><b>Name of the Station Facilities Outsourced</b></label>
        <div class="type-inline">
          <!-- Dropdown -->
          <select 
            v-if="!isAddingNewStation" 
            id="name" 
            v-model="formData.name" 
            class="form-control" 
            required
            @change="checkAddNew"
          >
            <option disabled value="">Select Name</option>
            <option value="Head Office - ITN">Head Office - ITN</option>
            <option value="Yatiyanthota - ITN">Yatiyanthota - ITN</option>
            <option value="Hunnasgiriya - ITN">Hunnasgiriya - ITN</option>
            <option value="Karagahathenna - ITN">Karagahathenna - ITN</option>
            <option value="Deniyaya - ITN">Deniyaya - ITN</option>
            <option value="Suriyakanda - ITN">Suriyakanda - ITN</option>
            <option value="Nayabedda - ITN">Nayabedda - ITN</option>
            <option value="Modolsima - ITN">Modolsima - ITN</option>
            <option value="Head Office - SLRC">Head Office - SLRC</option>
            <option value="Piduruthalagala - SLRC">Piduruthalagala - SLRC</option>
            <option value="Deniyaya - SLRC">Deniyaya - SLRC</option>
            <option value="Suriyakanda - SLRC">Suriyakanda - SLRC</option>
            <option value="Namunukula - SLRC">Namunukula - SLRC</option>
            <option value="Kandy Primross - SLRC">Kandy Primross - SLRC</option>
            <option value="Head Office - SLBC">Head Office - SLBC</option>
            <option value="Yatiyanthota - SLBC">Yatiyanthota - SLBC</option>
            <option value="Karagahathenna - SLBC">Karagahathenna - SLBC</option>
            <option value="Nayabedda - SLBC">Nayabedda - SLBC</option>
            <option value="Hunnasgiriya - SLBC">Hunnasgiriya - SLBC</option>
            <option value="Radella - SLBC">Radella - SLBC</option>
            <option value="ADD NEW">ADD NEW</option>
          </select>

          <!-- Input -->
          <input
            v-else
            type="text"
            placeholder="Enter New Station Name"
            class="form-control"
            v-model="formData.name"
            required
          />
        </div>
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

      <!-- Facility Taken -->
      <div class="form-row">
        <label for="facilityTaken"><b>Facility Taken</b></label>
        <div class="type-inline same-line">
          <select id="facilityTaken" v-model="formData.facilityTaken" class="form-control" required>
            <option disabled value="">Select Facility</option>
            <option>Tower</option>
            <option>Transmitter</option>
            <option>Antenna</option>
            <option>Other (Please Specify)</option>
          </select>

          <input
            v-if="formData.facilityTaken === 'Other (Please Specify)'"
            type="text"
            placeholder="Please specify"
            maxlength="50"
            class="form-control"
            v-model="formData.otherFacility"
            required
          />
        </div>
      </div>

      <!-- Basis of Usage -->
      <div class="form-row">
        <label><b>Basis of Usage</b></label>
        <div class="type-inline same-line">
          <select v-model="formData.usage" class="form-control" required>
            <option disabled value="">Select Usage</option>
            <option>Leased</option>
            <option>Rented</option>
            <option>Leased – Shared</option>
            <option>Rented – Shared</option>
            <option>Free of Charge</option>
            <option>Free of Charge - Shared</option>
            <option>Other (Please Specify)</option>
          </select>

          <input
            v-if="formData.usage === 'Other (Please Specify)'"
            type="text"
            placeholder="Please specify"
            maxlength="50"
            class="form-control"
            v-model="formData.otherUsage"
            required
          />
        </div>
      </div>

      <!-- Conditional Sections -->
      <div v-if="['Leased', 'Rented', 'Leased – Shared', 'Rented – Shared'].includes(formData.usage)">
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

      <!-- NEXT button -->
      <div class="next-btn-container">
        <button type="submit" class="btn btn-primary">NEXT</button>
      </div>
    </form>

    <!-- Render ConstructionStatusModal when nextClicked -->
    <ConstructionStatusModal v-if="nextClicked" />
  </div>
</template>


<script>
import ConstructionStatusModal from "@/components/Construction/ConstructionStatusModal.vue";

export default {
  components: { ConstructionStatusModal },
  data() {
    return {
      isAddingNewStation: false, 
      formData: {
        institutionName: '',
        institutionalSector: '',
        assetsCode: '6111308 – Communication – Own Station(Tower, Antenna, Transmitter, etc.)',
        name: '',
        location: { district: '', dsDivision: '', gnDivision: '', coordinates: '' },
        facilityTaken: '',
        usage: '',
        fromWhom: '',
        periodFrom: '',
        periodTo: '',
        paymentMethod: '',
        payment: '',
        otherFacility: '',
        otherUsage: ''
      },
      nextClicked: false
    }
  },
  methods: {
    checkAddNew() {
      if (this.formData.name === "ADD NEW") {
        this.isAddingNewStation = true;
        this.formData.name = ""; 
      }
    },

    validateMoney(event, field) {
      let value = typeof event === 'string' ? event : event.target.value;
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      if (value !== '' && !/^\d*\.?\d{0,3}$/.test(value)) value = value.slice(0, -1);
      this.formData[field] = value;
    },

    submitForm() {
      // Required base fields
      const requiredFields = ["name", "facilityTaken", "usage"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }

      // Location validation
      const locationFields = ["district", "dsDivision"];
      for (const field of locationFields) {
        if (!this.formData.location[field]) {
          alert("Please fill all required fields in Location!");
          return;
        }
      }

      // Conditional usage validation
      if (["Leased", "Rented", "Leased – Shared", "Rented – Shared"].includes(this.formData.usage)) {
        if (!this.formData.fromWhom || !this.formData.periodFrom || !this.formData.periodTo ||
            !this.formData.paymentMethod || !this.formData.payment) {
          alert("Please fill all required lease/rent details!");
          return;
        }
      }

      console.log("Form submitted:", this.formData);
      this.nextClicked = true;
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
</style>


