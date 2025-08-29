<template>
  <div class="main-container">
    <div class="card">
      <h2>Indoor Stadium</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Name or Identification Number -->
        <div class="form-row mt-2">
          <label for="nameId"><b>Name or Identification No</b></label>
          <input
            type="text"
            id="nameId"
            maxlength="20"
            v-model="formData.nameId"
            class="form-control"
            required
          />
        </div>

        <!-- Sport/s -->
        <div class="form-row mt-2">
          <label for="sport"><b>Sport/s</b></label>
          <input
            type="text"
            id="sport"
            maxlength="100"
            v-model="formData.sport"
            class="form-control"
            required
          />
        </div>

        <!-- Seating Capacity -->
        <div class="form-row mt-2">
          <label for="seating"><b>Seating Capacity</b></label>
          <input
            id="seating"
            class="form-control"
            type="text"
            v-model="formData.seating"
            @input="validateNumberOnly"
            required
          />
        </div>

        <!-- Play Area (m2) -->
        <div class="form-row mt-2">
          <label for="playArea"><b>Play Area (m²)</b></label>
          <input
            id="playArea"
            class="form-control"
            type="text"
            v-model="formData.playArea"
            @input="validateDecimal"
            required
          />
        </div>

        <!-- Submit Button -->
        <div class="button-container">
          <button type="submit">SAVE</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nameId: "",
        sport: "",
        seating: "",
        playArea: "",
      },
    };
  },
  methods: {
    validateNumberOnly(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      this.formData.seating = e.target.value;
    },
    validateDecimal(e) {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
      if ((e.target.value.match(/\./g) || []).length > 1) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
      }
      const parts = e.target.value.split(".");
      if (parts[1] && parts[1].length > 3) {
        parts[1] = parts[1].substring(0, 3);
        e.target.value = parts.join(".");
      }
      this.formData.playArea = e.target.value;
    },
    handleSubmit() {
      if (!this.formData.nameId.trim()) {
        alert("Name or Identification No is required.");
        return;
      }
      if (!this.formData.sport.trim()) {
        alert("Sport/s is required.");
        return;
      }
      if (!this.formData.seating.trim()) {
        alert("Seating Capacity is required.");
        return;
      }
      if (!this.formData.playArea.trim()) {
        alert("Play Area is required.");
        return;
      }

      this.$router.push({ name: "ConstructionStatus" });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
}

.card {
  background: #fff;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 600px;
}

h2 {
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

label {
  width: 220px;
  font-weight: bold;
  text-align: right;
}

input {
  flex: 1;
  max-width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  margin-top: 30px;
  text-align: center;
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


