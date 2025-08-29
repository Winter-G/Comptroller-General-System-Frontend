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

      <!-- Name -->
      <div class="form-row">
        <label for="name"><b>Name</b></label>
        <select id="name" v-model="formData.name" class="form-control" required>
          <option disabled value="">Select Name</option>
          <option value="Railway Line 1">Sugathadasa National Sports Complex</option>
          <option value="Railway Line 2">Diyagama Mahinda Rajapaksa Sports Complex</option>
        </select>
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

      <!-- Land Area -->
      <div class="location-section">
        <label class="section-label"><b>Land Area</b></label>
        <div class="inline-labels compact">
          <span>Measurement Unit</span>
          <span>Area</span>
          <span>Area (km²)</span>
          <span>Ownership</span>
          <span v-if="formData.inSportsComplex.landOwnership === 'Own by Other Party'">Land Owner</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.inSportsComplex.unit" @change="convertToKm2" class="form-select" required>
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

          <input
            type="text"
            v-model="formData.inSportsComplex.area"
            @input="onAreaInput"
            class="form-control"
            required
          />

          <input
            type="text"
            :value="formData.inSportsComplex.areaKm"
            readonly disabled
            class="form-control"
          />

          <select v-model="formData.inSportsComplex.landOwnership" class="form-select" required>
            <option disabled value="">Select Ownership</option>
            <option>Own</option>
            <option>Own by Other Party</option>
          </select>

          <input
            v-if="formData.inSportsComplex.landOwnership === 'Own by Other Party'"
            type="text"
            v-model="formData.inSportsComplex.landOwner"
            class="form-control"
            :required="formData.inSportsComplex.landOwnership === 'Own by Other Party'"
          />
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
      formData: {
        institutionName: '',
        institutionalSector: '',
        assetsCode: '6111309 – Sport and Recreation Facility',
        name: '',
        location: { district: '', dsDivision: '', gnDivision: '', coordinates: '' },
        inSportsComplex: {
          unit: '',
          area: '',
          areaKm: '',
          landOwnership: '',
          landOwner: ''
        },
        ownership: '',
        fromWhom: '',
        toWhom: '',
        periodFrom: '',
        periodTo: '',
        paymentMethod: '',
        payment: '',
        income: ''
      },
      nextClicked: false
    }
  },
  methods: {
    goNext() {
      this.nextClicked = true;
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
      this.formData.inSportsComplex.area = value;
      this.convertToKm2();
    },

    convertToKm2() {
      const area = parseFloat(this.formData.inSportsComplex.area);
      if (!isNaN(area)) {
        const unit = this.formData.inSportsComplex.unit;
        let km2 = 0;
        switch (unit) {
          case 'Square Meters (m²)': km2 = area / 1e6; break;
          case 'Square Kilometers (km²)': km2 = area; break;
          case 'Square Miles (mi²)': km2 = area * 2.58999; break;
          case 'Square Yards (yd²)': km2 = area * 0.000000836127; break;
          case 'Square Feet (ft²)': km2 = area * 0.000000092903; break;
          case 'Hectares (Ha)': km2 = area * 0.01; break;
          case 'Acres (ac)': km2 = area * 0.00404686; break;
          case 'Perches': km2 = area * 0.0000252929; break;
        }
        this.formData.inSportsComplex.areaKm = km2.toFixed(6);
      }
    },

    submitForm() {
      // Required base fields
      const requiredFields = ["name", "ownership"];
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
          alert("Please fill all required fields in Location (Start)!");
          return;
        }
      }

      // inSportsComplex validation
      const inSC = this.formData.inSportsComplex;
      if (!inSC.unit || !inSC.area || !inSC.landOwnership || (inSC.landOwnership === 'Own by Other Party' && !inSC.landOwner)) {
        alert("Please fill all required fields in Sports Complex section!");
        return;
      }

      // Conditional ownership validation
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


