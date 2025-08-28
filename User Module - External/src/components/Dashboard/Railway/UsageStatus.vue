<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 usage-status-card">
      <div class="form-row align-items-center mb-3">
        <label class="col-md-4">Status of Usage:</label>
        <div class="col-md-8">
          <select v-model="status" class="form-select" required>
            <option disabled value="">Select</option>
            <option>Utilize / In Operation / Open</option>
            <option>Not in Operation / Unutilized / Closed</option>
            <option>Abandoned</option>
          </select>
        </div>
      </div>

      <p class="info-text1">
        Not in operation / unutilized / Closed – Not in use for more than one year
      </p>
      <p class="info-text2">
        Abandoned – Not in use for more than Five Years
      </p>

      <div class="form-row center mt-3">
        <button @click="saveData" class="save-btn">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "",
    };
  },
  methods: {
    saveData() {
      if (!this.status) {
        alert("Please select a usage status.");
        return;
      }

      console.log("Usage Status saved:", { status: this.status });

      // redirect logic
      // this.$router.push("/next-route");
    },
  },
};
</script>

<style scoped>
.usage-status-card {
  background-color: #f7f7fb;
  border-radius: 12px;
  font-family: "Segoe UI", sans-serif;
  padding: 20px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.form-row {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.form-row label {
  width: 220px;
  font-weight: bold;
}

.form-row select,
.form-row input {
  flex: 1;
  padding: 6px 10px;
}

.center {
  display: flex;
  justify-content: center;
}

.info-text1,
.info-text2 {
  font-size: 0.9em;
  color: #555;
  background-color: #a8b1ce;
  margin-left: 220px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.save-btn {
  background-color: #5c6bc0;
  color: white;
  padding: 8px 30px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #3f51b5;
}
</style>


