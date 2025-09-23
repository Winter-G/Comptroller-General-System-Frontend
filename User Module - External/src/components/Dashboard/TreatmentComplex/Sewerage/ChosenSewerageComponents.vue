<template>
  <div class="main-container">
    <h2>Main Components</h2>

    <div class="instructions">
      <p><strong>Instructions:</strong></p>
      <p>
        If you have more than one item in a Component given here, please add all information in each item of that Component separately, <strong>Selecting same item again</strong>
        Ex- If you have 02 Sewerage Treatment plants, fill all information of No.01 Sewerage Treatment plants  and <strong>Click SAVE</strong>, and then <strong>Add Next</strong> and then Select Water Tanks Again and fill all information of No.02 Sewerage Treatment plants and <strong>Click SAVE</strong>.
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
        treatmentplant: 'Sewerage Treatment Plant',
        pumpingstation: 'Sewerage Pumping Station',
        outlets: 'Sewerage Outlets',
        pipelinesforcemain: 'Sewerage Pipe Lines - Force Main',
        pipelinesgravitysewer: 'Sewerage Pipe Lines - Gravity Sewer',
        manholes: 'Sewerage Man Holes',
        other: 'Sewerage Other'
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
        treatmentplant: 'SewerageTreatmentPlantComponent',
        pumpingstation: 'SeweragePumpingStationComponent',
        outlets: 'SewerageOutletsComponent',
        pipelinesforcemain: 'PipeLinesForceMainComponent',
        pipelinesgravitysewer: 'PipeLinesGravitySewerComponent',
        manholes: 'SewerageManHolesComponent',
        other: 'OtherSewerageComponent'
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
