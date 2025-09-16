<template>
  <div class="main-container">
    <h2>Other - Update</h2>

    <form class="form-wrapper" @submit.prevent="goToStatusView">
      <div class="form-group">
        <label for="idName">Identification Name or No:</label>
        <input
          id="idName"
          v-model.trim="form.id"
          maxlength="50"
          @input="validateId"
          required
        />
        <span class="error-message" v-if="errors.id">
          {{ errors.id }}
        </span>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <input
          id="description"
          v-model.trim="form.description"
          maxlength="100"
          @input="validateDescription"
          required
        />
        <span class="error-message" v-if="errors.description">
          {{ errors.description }}
        </span>
      </div>

      <div class="dimensional-fields">
        <div
          class="form-inline-group"
          v-for="(label, key) in dimensions"
          :key="key"
        >
          <label :for="key">{{ label }}</label>
          <input
            :id="key"
            v-model="form[key]"
            @input="validateNumber(key)"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="capacity">Capacity with Unit (e.g., 15kW):</label>
        <input id="capacity" v-model="form.capacity" />
      </div>

      <div class="inline-fields">
        <div class="form-inline-group">
          <label for="unit">Measurement Unit</label>
          <select id="unit" v-model="form.unit" @change="convertArea">
            <option disabled value="">Select Unit</option>
            <option v-for="unit in Object.keys(conversionRates)" :key="unit">
              {{ unit }}
            </option>
          </select>
        </div>

        <div class="form-inline-group">
          <label for="area">Area</label>
          <input id="area" v-model="form.area" @input="onAreaInput" />
        </div>

        <div class="form-inline-group">
          <label for="areaKm">Area (km²)</label>
          <input id="areaKm" :value="form.areaKm" disabled />
        </div>
      </div>

      <div class="button-container">
        <button type="submit">NEXT</button>
      </div>
    </form>

    <ConstructionStatusModal v-if="showStatusModal" @close="showStatusModal = false" />
    <!-- <ConstructionStatusUpdate 
     v-if="showStatusModal" 
     @close="showStatusModal = false" /> -->
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
      form: {
        id: '',
        description: '',
        length: '',
        height: '',
        depth: '',
        width: '',
        weight: '',
        capacity: '',
        unit: '',
        area: '',
        areaKm: '',
      },
      dimensions: {
        length: 'Length (m)',
        height: 'Height (m)',
        depth: 'Depth (m)',
        width: 'Width (m)',
        weight: 'Weight (kg)',
      },
      conversionRates: {
        'Square Meters (m²)': 1e-6,
        'Square Kilometers (km²)': 1,
        'Square Miles (mi²)': 2.58999,
        'Square Yards (yd²)': 0.000000836127,
        'Square Feet (ft²)': 0.000000092903,
        'Hectares (Ha)': 0.01,
        'Acres (ac)': 0.00404686,
        'Perches': 0.0000636,
      },
      showStatusModal: false,
      errors: {
        id: '',
        description: '',
      },
    };
  },
  methods: {
    validateId() {
      if (!this.form.id.trim()) {
        this.errors.id = 'Identification is required';
      } else {
        this.errors.id = '';
      }
    },
    validateDescription() {
      if (!this.form.description.trim()) {
        this.errors.description = 'Description is required';
      } else {
        this.errors.description = '';
      }
    },
    validateNumber(field) {
      this.form[field] = this.form[field].replace(/[^0-9.]/g, '');
    },
    onAreaInput() {
      this.form.area = this.form.area.replace(/[^0-9.]/g, '');
      this.convertArea();
    },
    convertArea() {
      const area = parseFloat(this.form.area);
      const rate = this.conversionRates[this.form.unit];

      if (isNaN(area) || !rate) {
        this.form.areaKm = '';
        return;
      }

      this.form.areaKm = (area * rate).toFixed(6);
    },
    goToStatusView() {
        if (!this.form.id.trim()) {
        alert("Identification Name or Number is required.");
        return;
      }
      if (!this.form.description.trim()) {
        alert("Description is required.");
        return;
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
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.form-group,
.dimensional-fields .form-inline-group {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 520px;
  flex-wrap: wrap;
}

.form-group label,
.dimensional-fields .form-inline-group label {
  width: 250px;
  text-align: right;
  margin-right: 10px;
  white-space: nowrap;
}

.form-group input,
.form-group select,
.dimensional-fields .form-inline-group input {
  width: 250px;
  padding: 6px;
  box-sizing: border-box;
}

.error-message {
  color: #d93333;
  font-size: 0.9em;
  margin-top: 4px;
  display: block;
  text-align: center;
  width: 100%;
}

.dimensional-fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.inline-fields {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 0 10px;
}

.button-container {
  margin-top: 30px;
}

button {
  padding: 10px 30px;
  background-color: black;
  color: white;
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
