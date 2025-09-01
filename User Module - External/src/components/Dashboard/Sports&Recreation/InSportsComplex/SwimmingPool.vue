<template>
  <div class="main-container">
    <div class="card">
      <h2>Swimming Pool</h2>
      <form @submit.prevent="handleSubmit">

        <!-- Name or Identification Number -->
        <div class="form-row">
          <label for="nameId"><b>Name or Identification No</b></label>
          <input type="text" id="nameId" maxlength="20" v-model="formData.nameId" class="form-control" required />
        </div>

        <!-- Type -->
        <div class="form-row">
          <label for="type"><b>Type</b></label>
          <select id="type" v-model="formData.type" class="form-control" required>
            <option disabled value="">Select Type</option>
            <option>Swimming Pool</option>
            <option>Diving Pool</option>
            <option>Sub Pool</option>
            <option>Other</option>
          </select>
        </div>

        <!-- Length -->
        <div class="form-row">
          <label for="lengthM"><b>Length (m)</b></label>
          <input id="lengthM" class="form-control" type="text" maxlength="6"
                 v-model="formData.lengthM" @input="validateDecimal($event, 'lengthM')" required />
        </div>

        <!-- Width -->
        <div class="form-row">
          <label for="widthM"><b>Width (m)</b></label>
          <input id="widthM" class="form-control" type="text" maxlength="6"
                 v-model="formData.widthM" @input="validateDecimal($event, 'widthM')" required />
        </div>

        <!-- Maximum Depth -->
        <div class="form-row">
          <label for="maxDepthM"><b>Maximum Depth (m)</b></label>
          <input id="maxDepthM" class="form-control" type="text" maxlength="6"
                 v-model="formData.maxDepthM" @input="validateDecimal($event, 'maxDepthM')" required />
        </div>

        <!-- Seating Capacity -->
        <div class="form-row">
          <label for="seating"><b>Seating Capacity (as relevant)</b></label>
          <input id="seating" type="text" maxlength="6"
                 class="form-control" v-model="formData.seating" @input="validateNumberOnly" />
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
        type: "",
        lengthM: "",
        widthM: "",
        maxDepthM: "",
        seating: "",
      },
    };
  },
  methods: {
    validateNumberOnly(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      this.formData.seating = e.target.value;
    },
    validateDecimal(e, field) {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
      if ((e.target.value.match(/\./g) || []).length > 1) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
      }
      const parts = e.target.value.split(".");
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
        e.target.value = parts.join(".");
      }
      this.formData[field] = e.target.value;
    },
    handleSubmit() {
      if (!this.formData.nameId.trim()) { alert("Name or Identification No is required."); return; }
      if (!this.formData.type.trim()) { alert("Type is required."); return; }
      if (!this.formData.lengthM.trim()) { alert("Length is required."); return; }
      if (!this.formData.widthM.trim()) { alert("Width is required."); return; }
      if (!this.formData.maxDepthM.trim()) { alert("Maximum Depth is required."); return; }
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

input, select { 
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

