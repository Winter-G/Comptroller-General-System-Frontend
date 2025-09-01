<template>
  <div class="main-container">
    <div class="card">
      <h2>Play Ground</h2>
      <form @submit.prevent="handleSubmit">

        <!-- Name or Identification Number -->
        <div class="form-row">
          <label for="nameId"><b>Name or Identification No</b></label>
          <input type="text" id="nameId" maxlength="20" v-model="formData.nameId" class="form-control" required />
        </div>

        <!-- Sport/s -->
        <div class="form-row">
          <label for="sport"><b>Sport/s</b></label>
          <input type="text" id="sport" maxlength="100" v-model="formData.sport" class="form-control" required />
        </div>

        <!-- Seating Capacity -->
        <div class="form-row">
          <label for="seating"><b>Seating Capacity (as relevant)</b></label>
          <input id="seating" type="text" class="form-control" v-model="formData.seating" @input="validateNumberOnly" />
        </div>

        <!-- Play Area -->
        <div class="form-row">
          <label for="playArea"><b>Play Area (as relevant) (m²)</b></label>
          <input id="playArea" type="text" class="form-control" v-model="formData.playArea" @input="validateDecimal" required />
        </div>

        <!-- Save Button -->
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
        playArea: ""
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
      if (!this.formData.nameId.trim()) { alert("Name or Identification No is required."); return; }
      if (!this.formData.sport.trim()) { alert("Sport/s is required."); return; }
      if (!this.formData.playArea.trim()) { alert("Play Area is required."); return; }
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
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 700px;
}

h2 { 
  text-align: center; 
  margin-bottom: 30px; 
  color: #333; 
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

label { 
  width: 250px; 
  font-weight: bold; 
  text-align: right; 
}
input { 
  flex: 1; 
  max-width: 200px; 
  padding: 6px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
}

.button-container { 
  margin-top: 25px; 
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
  transition: 0.3s; 
}
button:hover { 
  background-color: #333; 
}
</style>
