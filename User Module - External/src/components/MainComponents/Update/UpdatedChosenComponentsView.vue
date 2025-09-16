<template>
  <div class="main-container">
    <h2>Updated Main Components</h2>

    <div class="instructions">
      <p><strong>Instructions:</strong></p>
      <p>
        If you have more than one item in a component (e.g., 2 Runways), fill in all info for the first item and click <strong>SAVE</strong>. Then click <strong>Add Next</strong> and select the same component again to add the second one.
      </p>
    </div>

    <label for="component-select">Select a Main Component:</label>
    <select v-model="selectedComponent" @change="goToComponentPage" id="component-select">
      <option disabled value="">-- Please select a component --</option>
      <option v-for="component in components" :key="component.key" :value="component.key">
        {{ component.label }}
      </option>
    </select>

    <div v-if="selectedComponent" class="placeholder-message">
      <p>You selected: <strong>{{ getLabel(selectedComponent) }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentMap: {
        runway: 'Runway',
        taxiway: 'Taxiway',
        apron: 'Apron',
        airtrafficcontroltower: 'Air Traffic Control Tower',
        radartower: 'Radar Tower',
        hanger: 'Hanger',
        other: 'Other'
      },
      components: [],
      selectedComponent: ''
    };
  },
  mounted() {
    const rawQuery = this.$route.query.components || '';
    const keys = rawQuery.split(',').map(c => c.trim()).filter(Boolean);
    this.components = keys.map(key => ({
      key,
      label: this.componentMap[key] || key
    }));
  },
  methods: {
    normalize(text) {
      return text.replace(/[^a-zA-Z]/g, '').toLowerCase();
    },
    goToComponentPage() {
      const routeMap = {
        runway: 'RunwayComponentUpdate',
        taxiway: 'TaxiwayComponentUpdate',
        apron: 'ApronComponentUpdate',
        airtrafficcontroltower: 'AirTrafficControlComponentUpdate',
        radartower: 'RadarTowerComponentUpdate',
        hanger: 'HangerComponentUpdate',
        other: 'OtherComponentUpdate'
      };

      const key = this.normalize(this.selectedComponent);
      if (routeMap[key]) {
        this.$router.push({ name: routeMap[key] });
      } else {
        alert('Unknown component selected.');
      }
    },
    getLabel(key) {
      return this.componentMap[key] || key;
    }
  }
};
</script>

<style scoped>
.main-container {
  padding: 30px;
  font-family: Arial, sans-serif;
}

.instructions {
  background: #f9f9f9;
  padding: 15px;
  border-left: 4px solid #007BFF;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 10px;
}

select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.placeholder-message {
  margin-top: 20px;
  background: #eef6ff;
  padding: 15px;
  border-left: 4px solid #0b5ed7;
}
</style>
