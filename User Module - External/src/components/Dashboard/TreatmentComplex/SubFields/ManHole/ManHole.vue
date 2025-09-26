<template>
  <div class="container mt-3">
    <form
      class="card shadow-sm p-4 drainage-canal-card"
      @submit.prevent="submitForm">

      <!-- Identification Name or No -->
      <div class="form-row">
        <label><b>Identification Name or No</b></label>
        <input
          type="text"
          v-model="formData.identificationName"
          maxlength="50"
          class="form-control"
        />
      </div>

      <!-- Location -->
      <div class="location-section">
        <label class="section-label"><b>Location</b></label>
        <div class="inline-labels compact">
          <span>District</span>
          <span>DS Division</span>
          <span>GN Division</span>
          <span>Coordinates</span>
        </div>
        <div class="inline-fields">
          <select v-model="formData.location.district" class="form-select">
            <option disabled value="">Select District</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.dsDivision" class="form-select">
            <option disabled value="">Select DS Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select v-model="formData.location.gnDivision" class="form-select">
            <option disabled value="">Select GN Division</option>
            <option value="Colombo">Colombo</option>
          </select>
          <select
            v-model="formData.location.coordinates"
            class="form-select"
          >
            <option disabled value="">Select Coordinates</option>
            <option value="6.9271,79.8612">6.9271, 79.8612</option>
          </select>
        </div>
      </div>

      <!-- Depth (m) -->
      <div class="form-row">
        <label for="DepthM"><b>Depth (m)</b></label>
        <input
          id="DepthM"
          class="form-control"
          type="text"
          v-model="formData.DepthM"
          @input="validateDecimal($event, 'DepthM')"
        />
      </div>

      <!-- Usage -->
      <h6 class="section-title">Usage</h6>

      <table class="usage-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Length of the Pipe Lines (km)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(status, index) in statuses" :key="index">
            <td>{{ status }}</td>
            <td>
              <input
                type="text"
                v-model="pipeUsageList[index].amount"
                @input="validateUsage(pipeUsageList[index])"
              />
            </td>
          </tr>
        </tbody>
      </table>

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
        identificationName: "",
        location: {
          district: "",
          dsDivision: "",
          gnDivision: "",
          coordinates: "",
        },
        DepthM: "",
      },
      statuses: ["In Operation", "Not in Operation", "Abandoned", "Disposed"],
      pipeUsageList: [
        { amount: "" },
        { amount: "" },
        { amount: "" },
        { amount: "" },
      ],
    };
  },
  methods: {
    validateDecimal(e, field) {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
      if ((e.target.value.match(/\./g) || []).length > 1) {
        e.target.value = e.target.value.slice(0, -1);
      }
      const parts = e.target.value.split(".");
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        e.target.value = parts.join(".");
      }
      this.formData[field] = e.target.value;
    },
    validateUsage(item) {
      item.amount = item.amount.replace(/[^0-9.]/g, "");
      const parts = item.amount.split(".");
      if (parts.length > 2) parts.splice(2);
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
      }
      item.amount = parts.join(".");
    },
    submitForm() {
      this.$router.push("/man-hole/construction");
    },
  },
};
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
.form-row select {
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
.inline-fields select,
.inline-fields input {
  flex: 1;
}
.next-btn-container {
  margin-top: 20px;
  text-align: right;
}
.section-title {
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}
.usage-table {
  width: 75%;
  border-collapse: collapse;
  margin: 0 auto 20px auto;
}
.usage-table th,
.usage-table td {
  border: 1px solid #aaa;
  padding: 8px;
  text-align: left;
}
.usage-table th {
  background-color: #e0e0e0;
}
input {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
</style>

