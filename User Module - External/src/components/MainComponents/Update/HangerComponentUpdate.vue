<template>
  <div class="main-container">
    <h2>Hanger - Update</h2>

    <form class="form-wrapper" @submit.prevent="saveHanger">
      <div class="form-group">
        <label for="idName">Identification Name or No:</label>
        <input
          type="text"
          id="idName"
          v-model="hanger.id"
          maxlength="50"
          required
        />
      </div>

      <div class="form-group">
        <label for="hangerType">Type of Hanger:</label>
        <input
          type="text"
          id="hangerType"
          v-model="hanger.hangerType"
          maxlength="50"
          required
        />
      </div>

      <div class="inline-fields">
        <div class="form-inline-group">
          <label for="unit">Measurement Unit</label>
          <select id="unit" v-model="hanger.unit" @change="convertToKm2" required>
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
        </div>

        <div class="form-inline-group">
          <label for="area">Area</label>
          <input
            type="text"
            id="area"
            v-model="hanger.area"
            @input="onAreaInput"
            required
          />
        </div>

        <div class="form-inline-group">
          <label for="areaKm">Area (km²)</label>
          <input
            type="text"
            id="areaKm"
            :value="hanger.areaKm"
            readonly disabled
          />
        </div>

        <div class="form-inline-group">
          <label for="ownership">Ownership</label>
          <select id="ownership" v-model="hanger.ownership" required>
            <option disabled value="">Select Ownership</option>
            <option>Own</option>
            <option>Own by Other Party</option>
          </select>
        </div>

        <div
          class="form-inline-group"
          :class="{ hidden: hanger.ownership !== 'Own by Other Party' }">
          <label for="landOwner">Land Owner</label>
          <input
            type="text"
            id="landOwner"
            v-model="hanger.landOwner"
            :required="hanger.ownership === 'Own by Other Party'"
          />
        </div>
      </div>

      <div class="button-container">
        <button type="submit">NEXT</button>
      </div>
    </form>

    <ConstructionStatusModal
      v-if="showStatusModal"
      @close="showStatusModal = false"
    />
    <!-- <ConstructionStatusUpdate 
     v-if="showStatusModal" 
     @close="showStatusModal = false" /> -->
  </div>
</template>

<script>
import ConstructionStatusModal from "@/components/Construction/ConstructionStatusModal.vue";
// import ConstructionStatusUpdate from "@/components/Asset/Structure/Construction/Update/ConstructionStatusUpdateModal.vue";

class Hanger {
  constructor() {
    this.id = '';
    this.hangerType = '';
    this.unit = '';
    this.area = '';
    this.areaKm = '';
    this.ownership = '';
    this.landOwner = '';
  }
}

export default {
  data() {
    return {
      hanger: new Hanger()
    };
  },
  methods: {
    onAreaInput() {
      this.hanger.area = this.hanger.area.replace(/[^0-9.]/g, '');
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.hanger.area);
      if (isNaN(area)) {
        this.hanger.areaKm = '';
        return;
      }

      const unit = this.hanger.unit;
      const conversionRates = {
        'Square Meters (m²)': 1e-6,
        'Square Kilometers (km²)': 1,
        'Square Miles (mi²)': 2.58999,
        'Square Yards (yd²)': 0.000000836127,
        'Square Feet (ft²)': 0.000000092903,
        'Hectares (Ha)': 0.01,
        'Acres (ac)': 0.00404686,
        'Perches': 0.0000636
      };

      this.hanger.areaKm = (area * (conversionRates[unit] || 0)).toFixed(6);
    },
    saveHanger() {
      const allFilled =
        this.hanger.id &&
        this.hanger.hangerType &&
        this.hanger.unit &&
        this.hanger.area &&
        this.hanger.areaKm &&
        this.hanger.ownership &&
        (this.hanger.ownership === 'Own' ||
          (this.hanger.ownership === 'Own by Other Party' &&
            this.hanger.landOwner));

      if (!allFilled) {
        alert("Please fill all fields.");
        return;
      }

      this.goToStatusView();
    },
    goToStatusView() {
      this.$router.push({ name: 'ConstructionStatusUpdate' });
    }
  }
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
}

.form-group input,
.form-group select {
  width: 250px;
  padding: 6px;
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
