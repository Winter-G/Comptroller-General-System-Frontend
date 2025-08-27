<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 railwayline-card" @submit.prevent="goNext">

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

      <!-- Notice -->
      <div class="alert alert-info mt-4 mb-4">
        Own (Transfer in) = Structure Constructed by another Institution and Transferred free of charge to your Institution<br/>
        Own (Transfer out) = Structure Constructed by your Institution and transferred to another Institution free of charge
      </div>

      <!-- Ownership Section -->
      <div class="form-row mt-3">
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

      <!-- Conditional Fields -->
      <div v-if="formData.ownership === 'Own (Transfer in)'" class="form-row mt-2">
        <label>From Whom</label>
        <input type="text" v-model="formData.fromWhom" maxlength="50" class="form-control" required />
      </div>

      <div v-if="formData.ownership === 'Own (Transfer out)'" class="form-row mt-2">
        <label>To Whom</label>
        <input type="text" v-model="formData.toWhom" maxlength="50" class="form-control" required />
      </div>

      <div v-if="['Leased', 'Rented'].includes(formData.ownership)">
        <div class="form-row mt-2">
          <label>From Whom</label>
          <input type="text" v-model="formData.fromWhom" maxlength="50" class="form-control" required />
        </div>
        <div class="form-row mt-2">
          <label>Period</label>
          <div class="d-flex gap-2">
            <div>From <input type="month" v-model="formData.periodFrom" class="form-control" required /></div>
            <div>To <input type="month" v-model="formData.periodTo" class="form-control" required /></div>
          </div>
        </div>
        <div class="form-row mt-2">
          <label>Payment Method</label>
          <select v-model="formData.paymentMethod" class="form-control" required>
            <option disabled value="">Select Method</option>
            <option>One time payment</option>
            <option>Yearly payment</option>
            <option>Monthly payment</option>
          </select>
        </div>
        <div class="form-row mt-2">
          <label>Payment (Rs. Million)</label>
          <input type="text" v-model="formData.payment" @input="validateMoney($event, 'payment')" class="form-control" required />
        </div>
      </div>

      <div v-if="['Leased out', 'Rented out'].includes(formData.ownership)">
        <div class="form-row mt-2">
          <label>To Whom</label>
          <input type="text" v-model="formData.toWhom" maxlength="50" class="form-control" required />
        </div>
        <div class="form-row mt-2">
          <label>Period</label>
          <div class="d-flex gap-2">
            <div>From <input type="month" v-model="formData.periodFrom" class="form-control" required /></div>
            <div>To <input type="month" v-model="formData.periodTo" class="form-control" required /></div>
          </div>
        </div>
        <div class="form-row mt-2">
          <label>Payment Method</label>
          <select v-model="formData.paymentMethod" class="form-control" required>
            <option disabled value="">Select Method</option>
            <option>One time payment</option>
            <option>Yearly payment</option>
            <option>Monthly payment</option>
          </select>
        </div>
        <div class="form-row mt-2">
          <label>Income (Rs. Million)</label>
          <input type="text" v-model="formData.income" @input="validateMoney($event, 'income')" class="form-control" required />
        </div>
      </div>

      <!-- Name of Mono Rail -->
      <div class="form-row mt-3">
        <label for="name"><b>Name of the Mono Rail</b></label>
        <input type="text" id="name" maxlength="50" v-model="formData.name" class="form-control" required />
      </div>

      <!-- Identification Number -->
      <div class="form-row mt-2">
        <label for="identificationNumber"><b>Identification Number of the Mono Rail</b></label>
        <input type="text" id="identificationNumber" maxlength="20" v-model="formData.identificationNumber" class="form-control"/>
      </div>

      <!-- Type -->
      <div class="form-row mt-2">
        <label for="type"><b>Type of the Mono Rail</b></label>
        <input type="text" id="type" maxlength="20" v-model="formData.type" class="form-control"/>
      </div>

      <!-- Location Start & End -->
      <div class="location-section mt-3">
        <label class="section-label"><b>Location (Start)</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
          <span>Km Post</span>
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
          <input type="text" v-model="formData.locationStart.kmPost" class="form-control"/>
        </div>
      </div>

      <div class="location-section mt-3">
        <label class="section-label"><b>Location (End)</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
          <span>Km Post</span>
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
          <input type="text" v-model="formData.locationEnd.kmPost" class="form-control"/>
        </div>
      </div>

      <!-- Length, Width, Height -->
      <div class="form-row length-field mt-3">
        <label for="lengthM"><b>Length (m)</b></label>
        <input id="lengthM" class="form-control" type="text" v-model="formData.lengthM" @input="validateDecimal($event, 'lengthM')" required />
      </div>
      <div class="form-row mt-2">
        <label for="widthM"><b>Width (m)</b></label>
        <input id="widthM" class="form-control" type="text" v-model="formData.widthM" @input="validateDecimal($event, 'widthM')" required />
      </div>
      <div class="form-row mt-2">
        <label for="maxHeightM"><b>Maximum Height (m)</b></label>
        <input id="maxHeightM" class="form-control" type="text" v-model="formData.maxHeightM" @input="validateDecimal($event, 'maxHeightM')" required />
      </div>

      <!-- NEXT button -->
      <div class="next-btn-container mt-3">
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
        assetsCode: '6111304 – Railway (Mono Rail)',
        ownership: '',
        fromWhom: '',
        toWhom: '',
        periodFrom: '',
        periodTo: '',
        paymentMethod: '',
        payment: '',
        income: '',
        name: '',
        identificationNumber:'',
        type:'',
        locationStart: { district: '', dsDivision: '', gnDivision: '', coordinates: '', kmPost: '' },
        locationEnd: { district: '', dsDivision: '', gnDivision: '', coordinates: '', kmPost: '' },
        lengthM: '',
        widthM:'',
        maxHeightM:'',
      },
      nextClicked: false
    }
  },
  methods: {
    goNext() {
      this.nextClicked = true;
    },
    validateDecimal(event, field) {
      let value = typeof event === 'string' ? event : event.target.value;
      value = value.replace(/[^0-9.]/g, ''); 
      const regex = /^\d*\.?\d{0,2}$/;
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
.form-row input, 
.form-row select, 
.form-row span {
  flex: 1;
}
.inline-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
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
.form-row.align-start {
  align-items: flex-start;
}
.form-row.length-field {
  margin-top: 20px; 
}
.next-btn-container { 
  margin-top: 20px; 
  text-align: right; 
}
</style>

