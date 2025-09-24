<template>
  <div class="container">
    <div class="navigation-section">
      <div class="nav-menu">
        <div class="nav-item">Dashboard</div>
        <div class="nav-item">Institution Details</div>
        <div class="nav-item">Add Asset Information</div>
        <div class="nav-item">View Assets Information</div>
        <div class="nav-item">Report Generation</div>
      </div>
    </div>

    <div class="main-content">
      <h2 class="centered-title">Main Components</h2>
      <p class="centered-text">Please Confirm the availability of the Main Components in the Structure</p>

      <div class="components-grid">
        <div class="component-row" v-for="(pair, index) in componentPairs" :key="index">
          <div class="component-item" v-for="component in pair" :key="component.key">
            <span class="label-ellipse" v-html="component.label"></span>
            <div class="radio-group">
              <label><input type="radio" :name="component.key" value="yes" v-model="components[component.key]"> Yes</label>
              <label><input type="radio" :name="component.key" value="no" v-model="components[component.key]"> No</label>
            </div>
          </div>
        </div>
      </div>

      <div class="next-button">
        <button @click="saveAndProceed">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      components: {
        pumpingstation: 'no',
        opendrain: 'no',
        closedrain: 'no',
        pipelines: 'no',
        gulliesandmanholes: 'no',
        drainagecanal: 'no',
        culvertnotinroad: 'no',
        other: 'no',
      },
      componentList: [
        { key: 'pumpingstation', label: 'Drainage Pumping Station' },
        { key: 'opendrain', label: 'Open Drain' },
        { key: 'closedrain', label: 'Close Drain' },
        { key: 'pipelines', label: 'Drainage Pipe Lines' },
        { key: 'gulliesandmanholes', label: 'Drainage Gullies and Man Holes' },
        { key: 'drainagecanal', label: 'Drainage Canal' },
        { key: 'culvertnotinroad', label: 'Drainage Culvert - Not in Road' },
        { key: 'other', label: 'Drainage Other' }
      ]
    };
  },
  computed: {
    componentPairs() {
      const rows = [];
      for (let i = 0; i < this.componentList.length; i += 2) {
        rows.push(this.componentList.slice(i, i + 2));
      }
      return rows;
    }
  },
  methods: {
    saveAndProceed() {
      const selected = Object.entries(this.components)
        .filter(([_, value]) => value === 'yes')
        .map(([key]) => key);

      if (selected.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'To proceed',
          text: 'At least one component should be selected as “Yes”.',
          confirmButtonText: 'Okay',
        });
        return;
      }

      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, I Confirm This!',
        cancelButtonText: 'No, Cancel!',
        reverseButtons: true,
        customClass: {
          confirmButton: 'swal2-confirm-blue',
          cancelButton: 'swal2-cancel-black',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            const query = selected.join(',');
            this.$router.push({ path: '/water-drainage/components/chosen', query: { components: query } });
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.navigation-section {
  width: 200px;
  background-color: #1a1a4a;
  color: white;
  padding: 20px;
}

.nav-item {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

.centered-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}

.centered-text {
  text-align: center;
  margin-bottom: 20px;
}

.components-grid {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.component-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.component-item {
  width: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
}

.radio-group {
  display: flex;
  gap: 15px;
}

.label-ellipse {
  background-color: #1a1a4a;
  color: white;
  padding: 6px 18px;
  border-radius: 999px;
  font-size: 14px;
  white-space: normal;   
  text-align: center;  
  line-height: 1.3;     
}

.next-button {
  text-align: right;
  margin-top: 20px;
}

.next-button button {
  background-color: black;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
}

.swal2-confirm-blue {
  background-color: #4c59b0 !important;
  color: white !important;
  font-weight: bold;
  border-radius: 8px;
}

.swal2-cancel-black {
  background-color: #666 !important;
  color: white !important;
  font-weight: bold;
  border-radius: 8px;
}
</style>

