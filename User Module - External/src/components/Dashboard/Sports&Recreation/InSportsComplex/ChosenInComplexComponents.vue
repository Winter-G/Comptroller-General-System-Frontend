<template>
  <div class="main-container">
    <h2>Main Components</h2>

    <div class="instructions">
      <p><strong>Instructions:</strong></p>
      <p>
        If you have more than one item in a Component given here, please add all information in each item of that Component separately. Selecting the same item again
        Ex- If you have 02 Swimming Pool, fill all information of No.01 Swimming Pool and <strong>Click SAVE</strong>, and then <strong>Add Next</strong> and then Select Swimming Pool Again and fill all information of No.02 Swimming Pool and Click <strong>SAVE</strong>
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
        indoorStadium: 'Indoor Stadium',
        outdoorStadium: 'Outdoor Stadium',
        playground: 'Play Ground',
        swimmingPool: 'Swimming Pool',
        joggingPath: 'Jogging Path',
        linearPath: 'Linear Path',
        gymnasiumStrengthHallFitnessHall: 'Gymnasium/Strength Hall/Fitness Hall',
        park: 'Park',
        other: 'Other'
      },
      routeMap: {
        indoorStadium: 'IndoorStadium',
        outdoorStadium: 'OutdoorStadium',
        playground: 'PlayGround',
        swimmingPool: 'SwimmingPool',
        joggingPath: 'JoggingPath',
        linearPath: 'LinearPath',
        gymnasiumStrengthHallFitnessHall: 'GymnasiumStrengthHallFitnessHall',
        park: 'Park',
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

