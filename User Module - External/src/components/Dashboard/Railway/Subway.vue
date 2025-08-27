<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 railwayline-card">

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
      <div class="alert alert-info my-3">
        Please select the Railway Track, where the relevant Subway is located.
      </div>

      <!-- Identification -->
      <div class="form-row align-start">
        <label><b>Identification:</b></label>
        <div class="identification-fields">
          <div class="field-group">
            <label class="inline-labels">Railway Line Name</label>
            <select v-model="formData.identification.railwayLineName" class="form-select" required>
              <option disabled value="">Select Railway Line Name</option>
              <option value="Main Line">Main Line</option>
            </select>
          </div>

          <div class="field-group">
            <label class="inline-labels">Section</label>
            <select v-model="formData.identification.section" class="form-select" required>
              <option disabled value="">Select Section</option>
              <option value="Ragama - Rambukkana">Ragama - Rambukkana</option>
            </select>
          </div>

          <div class="field-group">
            <label class="inline-labels">Track No</label>
            <select v-model="formData.identification.trackNo" class="form-select" required>
              <option disabled value="">Select Track No</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Name of the Subway -->
      <div class="form-row">
        <label for="name"><b>Name of the Subway</b></label>
        <input type="text" id="name" maxlength="50" v-model="formData.name" class="form-control" required />
      </div>

      <!-- Identification Number of the Subway -->
      <div class="form-row">
        <label for="identificationNumber"><b>Identification Number of the Subway</b></label>
        <input type="text" id="identificationNumber" maxlength="20" v-model="formData.identificationNumber" class="form-control"/>
      </div>

      <!-- Type of the Subway -->
      <div class="form-row">
        <label for="type"><b>Type of the Subway</b></label>
        <input type="text" id="type" maxlength="20" v-model="formData.type" class="form-control"/>
      </div>

      <!-- Location (Start) -->
      <div class="location-section">
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

      <!-- Location (End) -->
      <div class="location-section">
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

      <!-- Length (m) -->
      <div class="form-row length-field">
        <label for="lengthM"><b>Length (m)</b></label>
        <input id="lengthM" class="form-control" type="text" v-model="formData.lengthM" @input="validateDecimal($event, 'lengthM')" required />
      </div>

      <!-- Width (m) -->
      <div class="form-row">
        <label for="widthM"><b>Width (m)</b></label>
        <input id="widthM" class="form-control" type="text" v-model="formData.widthM" @input="validateDecimal($event, 'widthM')" required />
      </div>

      <!-- Maximum Height (m) -->
      <div class="form-row">
        <label for="maxHeightM"><b>Maximum Height (m)</b></label>
        <input id="maxHeightM" class="form-control" type="text" v-model="formData.maxHeightM" @input="validateDecimal($event, 'maxHeightM')" required />
      </div>

      <!-- Construction Cost Included -->
      <div class="form-row">
        <label><b>Construction cost of the Subway included in Railway Track cost</b></label>
        <select class="form-control" v-model="formData.constructionCost" required>
          <option disabled value="">Select Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <!-- Conditional Rendering -->
      <div v-if="showExtraFields">
        <UsageInfo v-if="formData.constructionCost === 'Yes'" />
        <ConstructionStatusModal v-else-if="formData.constructionCost === 'No'" />
      </div>

    </form>
  </div>
</template>

<script>
import UsageInfo from "@/components/Construction/UsageInfo.vue";
import ConstructionStatusModal from "@/components/Construction/ConstructionStatusModal.vue";

export default {
  components: { UsageInfo, ConstructionStatusModal },
  data() {
    return {
      formData: {
        institutionName: '',
        institutionalSector: '',
        assetsCode: '6111304 – Railway (Subway)',
        identification: { railwayLineName: '', section:'', trackNo:'' },
        name: '',
        identificationNumber:'',
        type:'',
        locationStart: { district: '', dsDivision: '', gnDivision: '', coordinates: '', kmPost: '' },
        locationEnd: { district: '', dsDivision: '', gnDivision: '', coordinates: '', kmPost: '' },
        lengthM: '',
        widthM:'',
        maxHeightM:'',
        constructionCost:''
      },
      showExtraFields: false
    }
  },
  watch: {
    'formData.constructionCost'(newValue) {
      if (newValue === 'Yes' || newValue === 'No') {
        const requiredFields = [
          'name',
          'lengthM',
          'widthM',
          'maxHeightM',
          'identification.railwayLineName',
          'identification.section',
          'identification.trackNo',
          'locationStart.district',
          'locationStart.dsDivision',
          'locationStart.gnDivision',
          'locationEnd.district',
          'locationEnd.dsDivision',
          'locationEnd.gnDivision'
        ];

        const isValid = requiredFields.every(fieldPath => {
          const keys = fieldPath.split('.');
          let value = this.formData;
          keys.forEach(k => value = value[k]);
          return value && value.toString().trim() !== '';
        });

        if (!isValid) {
          alert("Please fill all required fields before proceeding!");
          this.formData.constructionCost = '';
          this.showExtraFields = false;
        } else {
          this.showExtraFields = true;
        }
      } else {
        this.showExtraFields = false;
      }
    }
  },
  methods: {
    validateDecimal(event, field) {
      let value = typeof event === 'string' ? event : event.target.value;
      value = value.replace(/[^0-9.]/g, ''); 
      const regex = /^\d*\.?\d{0,2}$/;
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      if (value !== '' && !regex.test(value)) value = value.slice(0, -1);
      this.formData[field] = value;
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
.identification-fields {
  display: flex;
  flex: 1;
  gap: 12px;
}
.field-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.form-row.length-field {
  margin-top: 20px; 
}
</style>








