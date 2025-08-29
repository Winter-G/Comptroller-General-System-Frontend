<template>
  <div class="main-container">
    <div class="card">
      <h2>Outdoor Stadium</h2>
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
          <label for="seating"><b>Seating Capacity</b></label>
          <input id="seating" type="text" class="form-control" v-model="formData.seating" @input="validateNumberOnly" />
        </div>

        <!-- Play Area -->
        <div class="form-row">
          <label for="playArea"><b>Play Area (m²)</b></label>
          <input id="playArea" type="text" class="form-control" v-model="formData.playArea" @input="validateDecimal" required />
        </div>

        <!-- Track Information -->
        <div class="form-row track-row">
          <label class="track-label"><b>Track Information</b></label>

          <div class="track-col">
            <span>100m</span>
            <label class="nos-label">Nos</label>
            <select v-model="formData.inSportsComplex.hundredM" class="form-select" required>
              <option disabled value="">Select</option>
              <option v-for="n in 20" :key="'100m-'+n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="track-col">
            <span>200m</span>
            <label class="nos-label">Nos</label>
            <select v-model="formData.inSportsComplex.twoHundredM" class="form-select" required>
              <option disabled value="">Select</option>
              <option v-for="n in 20" :key="'200m-'+n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="track-col">
            <span>400m</span>
            <label class="nos-label">Nos</label>
            <select v-model="formData.inSportsComplex.fourHundredM" class="form-select" required>
              <option disabled value="">Select</option>
              <option v-for="n in 20" :key="'400m-'+n" :value="n">{{ n }}</option>
            </select>
          </div>
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
        playArea: "",
        inSportsComplex: {
          hundredM: "",
          twoHundredM: "",
          fourHundredM: "",
        },
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
      if (!this.formData.inSportsComplex.hundredM ||
          !this.formData.inSportsComplex.twoHundredM ||
          !this.formData.inSportsComplex.fourHundredM) {
        alert("Please complete Track Information."); return;
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
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 700px;
}

h2 { text-align: center; margin-bottom: 30px; color: #333; }

.form-row { display: flex; align-items: center; margin-bottom: 12px; gap: 15px; }
label { width: 220px; font-weight: bold; text-align: right; }
input { flex: 1; max-width: 150px; padding: 6px; border: 1px solid #ccc; border-radius: 5px; }
select { flex: 1; max-width: 70px; padding: 4px; border: 1px solid #ccc; border-radius: 5px; }

.track-row {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  flex-wrap: nowrap;
}

.track-label {
  width: 220px;
  text-align: right;
  font-weight: bold;
  padding-top: 20px; /* vertically aligns with dropdowns */
}

.track-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.nos-label {
  font-size: 12px;
  color: #666;
}

.button-container { margin-top: 25px; text-align: center; }
button { background-color: black; color: white; padding: 10px 30px; border: none; border-radius: 30px; font-size: 16px; cursor: pointer; transition: 0.3s; }
button:hover { background-color: #333; }
</style>




