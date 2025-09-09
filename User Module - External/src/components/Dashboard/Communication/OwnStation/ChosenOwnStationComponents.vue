<template>
  <div class="main-container">
    <h2>Main Components</h2>

    <div class="instructions">
      <p><strong>Instructions:</strong></p>
      <p>
        If you have more than one item in a Component given here, please add all information in each item of that Component separately Selecting same item again.
        Ex- If you have 02 Towers, fill all information of No.01 Tower and <strong>Click SAVE</strong>, and then <strong>Add Next</strong> and then Select Tower Again and fill all information of No.02 Tower and <strong>Click SAVE</strong>
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
        tower: 'Tower',
        antenna: 'Antenna',
        transmitter: 'Transmitter',
        other: 'Other'
      },
      routeMap: {
        tower: 'OwnStationTower',
        antenna: 'OwnStationAntenna',
        transmitter: 'OwnStationTransmitter',
        other: 'OtherOwnStation'
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
    goToComponentPage() {
      if (!this.selectedComponent) return;

      const routeName = this.routeMap[this.selectedComponent];
      if (routeName) {
        this.$router.push({ name: routeName });
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

