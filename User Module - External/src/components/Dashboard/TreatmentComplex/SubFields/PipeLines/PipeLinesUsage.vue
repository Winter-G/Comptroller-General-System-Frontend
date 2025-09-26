<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 drainage-canal-card" @submit.prevent="submitForm">
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
                @input="validateDecimal(pipeUsageList[index])"
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
  validateDecimal(item) {
    let value = item.amount.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) value = parts[0] + "." + parts[1];
    if (parts[1] && parts[1].length > 2) parts[1] = parts[1].substring(0, 2);
    item.amount = parts.join(".");
  },
  submitForm() {
    this.$router.push('/pipe-lines/construction');
  },
},

};
</script>

<style scoped>
.section-title {
  font-weight: bold;
  margin-bottom: 5px; 
  margin-left: 50px; 
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

.next-btn-container {
  margin-top: 20px;
  text-align: right;
}

input {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
</style>
