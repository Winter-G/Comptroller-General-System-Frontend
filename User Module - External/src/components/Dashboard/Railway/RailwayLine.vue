<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 railwayline-card" @submit.prevent="submitForm">

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

      <!-- Railway Line Name -->
      <div class="form-row">
        <label for="name"><b>Railway Line Name</b></label>
        <input type="text" id="name" maxlength="50" v-model="formData.name" class="form-control" required />
      </div>

      <!-- Location (Start) -->
      <div class="location-section">
        <label class="section-label"><b>Location (Start)</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
          <span>Railway Station</span>
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
          <select v-model="formData.locationStart.coordinates" class="form-select" required>
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
          <input type="text" v-model="formData.locationStart.railwayStation" class="form-control" required />
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
          <span>Railway Station</span>
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
          <select v-model="formData.locationEnd.coordinates" class="form-select" required>
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
          <input type="text" v-model="formData.locationEnd.railwayStation" class="form-control" required />
        </div>
      </div>

      <!-- Length (Km) -->
      <div class="form-row">
        <label for="lengthKm"><b>Length (Km)</b></label>
        <input id="lengthKm" class="form-control" type="text" v-model="formData.lengthKm" @input="validateDecimal($event, 'lengthKm')" required />
      </div>

      <!-- Total Length of Loop Lines -->
      <div class="form-row">
        <label for="totalLengthKm"><b>Total Length of Loop Lines (Km)</b></label>
        <input id="totalLengthKm" class="form-control" type="text" v-model="formData.totalLengthKm" @input="validateDecimal($event, 'totalLengthKm')" required />
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
          <select v-model="formData.paymentMethod" class="form-control" required>
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
          <select v-model="formData.paymentMethod" class="form-control" required>
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

      <!-- NEXT button -->
      <div class="next-btn-container">
        <button type="submit" class="btn btn-primary">NEXT</button>
      </div>
    </form>

    <!-- Popup Modal -->
    <div v-if="showSectionsPopup" class="popup-overlay">
      <div class="popup-content">
        <SectionsModal :formData="formData" @close="closeSectionsPopup" />
      </div>
    </div>
  </div>
</template>

<script>
import SectionsModal from "@/components/Dashboard/Railway/SectionsModal.vue";

export default {
  components: { 
    SectionsModal 
  },
  data() {
    return {
      showSectionsPopup: false,
      formData: {
        institutionName: '',
        institutionalSector: '',
        assetsCode: '6111304 – Railway Line',
        name: '',
        locationStart: { district: '', dsDivision: '', gnDivision: '', coordinates: '', railwayStation: '' },
        locationEnd: { district: '', dsDivision: '', gnDivision: '', coordinates: '', railwayStation: '' },
        lengthKm: '',
        totalLengthKm: '',
        ownership: '',
        fromWhom: '',
        toWhom: '',
        periodFrom: '',
        periodTo: '',
        paymentMethod: '',
        payment: '',
        income: ''
      }
    }
  },
  methods: {
    openSectionsPopup() { this.showSectionsPopup = true; },
    closeSectionsPopup() { this.showSectionsPopup = false; },

    validateDecimal(event, field) {
      let value = typeof event === 'string' ? event : event.target.value;
      const regex = /^\d*\.?\d{0,2}$/;
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      if (value !== '' && !regex.test(value)) value = value.slice(0, -1);
      this.formData[field] = value;
    },

    validateMoney(event, field) {
      let value = typeof event === 'string' ? event : event.target.value;
      const regex = /^\d*\.?\d{0,3}$/;
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      if (value !== '' && !regex.test(value)) value = value.slice(0, -1);
      this.formData[field] = value;
    },

    submitForm() {
      // base required fields
      const requiredFields = [
         "name", "lengthKm", "totalLengthKm", "ownership"
      ];
      const locationFields = ["district", "dsDivision", "gnDivision", "coordinates", "railwayStation"];

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

      // conditional validation
      if (this.formData.ownership === "Own (Transfer in)" && !this.formData.fromWhom) {
        alert("Please fill 'From Whom'!");
        return;
      }
      if (this.formData.ownership === "Own (Transfer out)" && !this.formData.toWhom) {
        alert("Please fill 'To Whom'!");
        return;
      }
      if (["Leased", "Rented"].includes(this.formData.ownership)) {
        if (!this.formData.fromWhom || !this.formData.periodFrom || !this.formData.periodTo ||
            !this.formData.paymentMethod || !this.formData.payment) {
          alert("Please fill all required lease/rent details!");
          return;
        }
      }
      if (["Leased out", "Rented out"].includes(this.formData.ownership)) {
        if (!this.formData.toWhom || !this.formData.periodFrom || !this.formData.periodTo ||
            !this.formData.paymentMethod || !this.formData.income) {
          alert("Please fill all required lease/rent out details!");
          return;
        }
      }

      console.log("Form submitted:", this.formData);
      this.openSectionsPopup();
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
.popup-overlay {
  position: fixed; 
  top: 0; left: 0; 
  width: 100%; 
  height: 100%;
  background: rgba(0,0,0,0.5); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 9999;
}
.popup-content {
  background: #fff; 
  padding: 20px; 
  border-radius: 10px;
  min-width: 60%; 
  max-height: 80vh; 
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}
.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
</style>
