<template>
  <div class="main-container">
    <h2>Apron - Update</h2>

    <form class="form-wrapper" @submit.prevent="saveApron">
      <div class="form-group">
        <label for="idName">Identification Name or Number:</label>
        <input
          id="idName"
          v-model.trim="apron.id"
          maxlength="50"
          @input="validateId"
          required
        />
        <span class="error-message" v-if="errors.id">
          {{ errors.id }}
        </span>
      </div>

      <div class="inline-fields">
        <div class="form-inline-group">
          <label for="unit">Measurement Unit</label>
          <select id="unit" v-model.trim="apron.unit" @change="convertToKm2">
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
          <span class="error-message" v-if="errors.unit">
            {{ errors.unit }}
          </span>
        </div>

        <div class="form-inline-group">
          <label for="area">Area</label>
          <input
            id="area"
            v-model.trim="apron.area"
            @input="onAreaInput"
            required
          />
          <span class="error-message" v-if="errors.area">
            {{ errors.area }}
          </span>
        </div>

        <div class="form-inline-group">
          <label for="areaKm">Area (km²)</label>
          <input id="areaKm" :value="apron.areaKm" disabled />
        </div>

        <div class="form-inline-group">
          <label for="ownership">Ownership</label>
          <select id="ownership" v-model.trim="apron.ownership">
            <option disabled value="">Select Ownership</option>
            <option>Own</option>
            <option>Own by Other Party</option>
          </select>
          <span class="error-message" v-if="errors.ownership">
            {{ errors.ownership }}
          </span>
        </div>

        <div
          class="form-inline-group"
          :class="{ hidden: apron.ownership !== 'Own by Other Party' }">
          <label for="landOwner">Land Owner</label>
          <input id="landOwner" v-model.trim="apron.landOwner" />
          <span class="error-message" v-if="errors.landOwner">
            {{ errors.landOwner }}
          </span>
        </div>
      </div>

      <div class="form-group capacity-center">
        <label for="capacity">Capacity (Maximum No of Aircrafts):</label>
        <input
          id="capacity"
          v-model.trim="apron.capacity"
          @input="validateCapacity"
          required
        />
        <span class="error-message" v-if="errors.capacity">
          {{ errors.capacity }}
        </span>
      </div>

      <div class="button-container">
        <button type="submit">
          Save
        </button>
      </div>
    </form>

    <ConstructionStatusModal v-if="showStatusModal" @close="showStatusModal = false" />
    <!-- <ConstructionStatusUpdate v-if="showStatusModal" @close="showStatusModal = false" /> -->
  </div>
</template>

<script>
import ConstructionStatusModal from "@/components/Construction/ConstructionStatusModal.vue";
// import ConstructionStatusUpdate from "@/components/Asset/Structure/Construction/Update/ConstructionStatusUpdateModal.vue";

export default {
  components: {
    ConstructionStatusModal,
    // ConstructionStatusUpdate,
  },
  data() {
    return {
      apron: {
        id: '',
        unit: '',
        area: '',
        areaKm: '',
        ownership: '',
        landOwner: '',
        capacity: '',
      },
      showStatusModal: false,
      errors: {
        id: '',
        unit: '',
        area: '',
        ownership: '',
        landOwner: '',
        capacity: '',
      },
    };
  },
  methods: {
    validateId() {
      if (!this.apron.id.trim()) {
        this.errors.id = 'Identification is required';
      } else {
        this.errors.id = '';
      }
    },
    validateCapacity() {
      this.apron.capacity = this.apron.capacity.replace(/[^0-9]/g, '');
      if (!this.apron.capacity.trim()) {
        this.errors.capacity = 'Capacity is required';
      } else {
        this.errors.capacity = '';
      }
    },
    onAreaInput() {
      this.apron.area = this.apron.area.replace(/[^0-9.]/g, '');
      if (!this.apron.area.trim()) {
        this.errors.area = 'Area is required';
      } else {
        this.errors.area = '';
      }
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.apron.area);
      if (isNaN(area)) {
        this.apron.areaKm = '';
        return;
      }

      const conversionRates = {
        'Square Meters (m²)': 1e-6,
        'Square Kilometers (km²)': 1,
        'Square Miles (mi²)': 2.58999,
        'Square Yards (yd²)': 0.000000836127,
        'Square Feet (ft²)': 0.000000092903,
        'Hectares (Ha)': 0.01,
        'Acres (ac)': 0.00404686,
        'Perches': 0.0000636,
      };

      this.apron.areaKm = (area * (conversionRates[this.apron.unit] || 0)).toFixed(6);
    },
    validateForm() {
      let isValid = true;

      if (!this.apron.id.trim()) {
        this.errors.id = 'Identification is required';
        isValid = false;
      }
      if (!this.apron.unit.trim()) {
        this.errors.unit = 'Measurement Unit is required';
        isValid = false;
      }
      if (!this.apron.area.trim()) {
        this.errors.area = 'Area is required';
        isValid = false;
      }
      if (!this.apron.ownership.trim()) {
        this.errors.ownership = 'Ownership is required';
        isValid = false;
      }
      if (this.apron.ownership === 'Own by Other Party' &&
          !this.apron.landOwner.trim()) {
        this.errors.landOwner = 'Land Owner is required';
        isValid = false;
      }
      if (!this.apron.capacity.trim()) {
        this.errors.capacity = 'Capacity is required';
        isValid = false;
      }

      return isValid;
    },
    saveApron() {
      if (!this.validateForm()) {
        return false;
      }
        this.showStatusModal = true;
    },
  },
};

</script>

<style scoped>
.main-container {
  max-width: 1000px;
  margin: auto;
  padding: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 25px;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.form-group label {
  width: 250px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 250px;
  padding: 6px;
}

.error-message {
  color: #d93333;
  font-size: 0.9em;
  margin-bottom: 10px;
  display: block;
}

.inline-fields {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 25px;
  overflow-x: auto;
  padding: 0 10px;
}

.form-inline-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
  flex: 1;
}

.form-inline-group label {
  margin-bottom: 5px;
  text-align: center;
  white-space: nowrap;
}

.form-inline-group input,
.form-inline-group select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

.hidden {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
}

.capacity-center {
  align-self: center;
}

.button-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
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
