<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 other-drainage-card" @submit.prevent="submitForm">

      <!-- Notice -->
       <div class="alert alert-info my-3">
          To be filled as applicable.
        </div>

      <!-- Identification Name or No -->
      <div class="form-row">
        <label><b>Identification Name or No</b></label>
        <input type="text" v-model="formData.identificationName" maxlength="50" class="form-control" required />
      </div>

      <!-- Description -->
      <div class="form-row">
        <label><b>Description</b></label>
        <input type="text" v-model="formData.description" maxlength="100" class="form-control" required />
      </div>

      <!-- Length (m) -->
      <div class="form-row">
        <label for="lengthM"><b>Length (m)</b></label>
        <input id="lengthM" class="form-control" type="text"
                 v-model="formData.lengthM" @input="validateDecimal($event, 'lengthM')" />
      </div>

      <!-- Average Height (m) -->
      <div class="form-row">
        <label for="avgHeightM"><b>Average Height (m)</b></label>
        <input id="avgHeightM" class="form-control" type="text"
                 v-model="formData.avgHeightM" @input="validateDecimal($event, 'avgHeightM')" />
      </div>

      <!-- Average Depth (m) -->
      <div class="form-row">
        <label for="avgDepthM"><b>Average Depth (m)</b></label>
        <input id="avgDepthM" class="form-control" type="text"
                 v-model="formData.avgDepthM" @input="validateDecimal($event, 'avgDepthM')" />
      </div>

      <!-- Average Width (m) -->
      <div class="form-row">
        <label for="avgWidthM"><b>Average Width (m)</b></label>
        <input id="avgWidthM" class="form-control" type="text"
                 v-model="formData.avgWidthM" @input="validateDecimal($event, 'avgWidthM')" />
      </div>

      <!-- Weight (kg) -->
      <div class="form-row">
        <label for="weightKg"><b>Weight (kg)</b></label>
        <input id="weightKg" class="form-control" type="text"
                 v-model="formData.weightKg" @input="validateDecimal($event, 'weightKg')"/>
      </div>

      <!-- Capacity with measuring Unit (Ex – 15kW) -->
      <div class="form-row">
        <label><b>Capacity with measuring Unit (Ex – 15kW)</b></label>
        <input type="text" v-model="formData.capacityWithUnit" class="form-control" />
      </div>

      <!-- Area -->
      <div class="location-section">
        <label class="section-label"><b>Area</b></label>
        <div class="inline-labels compact">
          <span>Measurement Unit</span>
          <span>Area</span>
          <span>Area (km²)</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.otherDrainage.unit" @change="convertToKm2" class="form-select">
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
            v-model="formData.otherDrainage.area"
            @input="onAreaInput"
            class="form-control"
          />

          <input
            type="text"
            :value="formData.otherDrainage.areaKm"
            readonly
            disabled
            class="form-control"
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

export default {
  data() {
    return {
      formData: {
        identificationName: '',
        description: '',
        lengthM: '',
        avgHeightM: '',
        avgDepthM: '',
        avgWidthM: '',
        weightKg: '',
        capacityWithUnit: '',
        otherDrainage: { unit: '', area: '', areaKm: ''},
      },
    }
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

    onAreaInput(event) {
      let value = event.target.value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      this.formData.otherDrainage.area = value;
      this.convertToKm2();
    },

    convertToKm2() {
      const area = parseFloat(this.formData.otherDrainage.area);
      if (isNaN(area) || !this.formData.otherDrainage.unit) {
        this.formData.otherDrainage.areaKm = '';
        return;
      }
      let km2 = 0;
      switch (this.formData.otherDrainage.unit) {
        case 'Square Meters (m²)': km2 = area / 1e6; break;
        case 'Square Kilometers (km²)': km2 = area; break;
        case 'Square Miles (mi²)': km2 = area * 2.58999; break;
        case 'Square Yards (yd²)': km2 = area * 0.000000836127; break;
        case 'Square Feet (ft²)': km2 = area * 0.000000092903; break;
        case 'Hectares (Ha)': km2 = area * 0.01; break;
        case 'Acres (ac)': km2 = area * 0.00404686; break;
        case 'Perches': km2 = area * 0.0000252929; break;
      }
      this.formData.otherDrainage.areaKm = km2.toFixed(6);
    },

    submitForm() {
      // Required base fields
      const requiredFields = ["identificationName", "description"];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }

      console.log("Form submitted:", this.formData);
      this.$router.push({ name: "ConstructionStatus" });
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
