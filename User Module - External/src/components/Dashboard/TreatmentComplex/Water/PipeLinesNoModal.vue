<template>
  <div class="pipe-lines-no-modal-wrapper">
    <!-- Close Button -->
    <button class="close-btn" @click="closePopup">&times;</button>

    <div class="pipe-lines-no-modal card shadow p-4">
      <!-- No of Pipe Lines -->
      <h5><b>No of Pipe Lines</b></h5>
      <select v-model.number="noOfPipeLines" class="form-select mb-3">
        <option value="">Select</option>
        <option v-for="n in 50" :key="n" :value="n">{{ n }}</option>
      </select>

      <!-- Pipe Line Inputs -->
      <div v-for="(pipe, index) in pipeLines.slice(0, visiblePipeLines)" :key="index" class="pipe-line-block mb-4 border rounded p-3">
        <h6><b>Pipe Line {{ index + 1 }}</b></h6>
        <!-- Diameter -->
        <div class="form-row">
          <label><b>Diameter (Inches)</b></label>
          <input
            type="text"
            v-model="pipe.diameter"
            class="form-control"
            @input="validateDecimal($event, pipe, 'diameter')"
          />
        </div>
        <!-- Length -->
        <div class="form-row">
          <label><b>Length (Km)</b></label>
          <input
            type="text"
            v-model="pipe.length"
            class="form-control"
            @input="validateDecimal($event, pipe, 'length')"
          />
        </div>
      </div>

      <!-- Add New Button -->
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-success" @click="addNewPipeLine" :disabled="visiblePipeLines >= noOfPipeLines">+ Add New</button>
      </div>

      <!-- NEXT Button -->
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary" @click="goToConstruction">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["formData"],
  data() {
    return {
      noOfPipeLines: "",      
      pipeLines: [],          
      visiblePipeLines: 1,    
    };
  },
watch: {
  noOfPipeLines(newVal) {
    if (!newVal || newVal <= 0) return;

    const currentLength = this.pipeLines.length;

    if (newVal > currentLength) {
      // Add empty objects to match the new number
      const extraRows = Array.from({ length: newVal - currentLength }, () => ({
        diameter: "",
        length: "",
      }));
      this.pipeLines = [...this.pipeLines, ...extraRows];
    } else if (newVal < currentLength) {
      // Remove extra rows if newVal is less
      this.pipeLines = this.pipeLines.slice(0, newVal);
    }

    // Adjust visiblePipeLines if it exceeds newVal
    if (this.visiblePipeLines > newVal) this.visiblePipeLines = newVal;
    if (this.visiblePipeLines < 1) this.visiblePipeLines = 1;
  },
},

  methods: {
    validateDecimal(event, obj, field) {
      let value = event.target.value.replace(/[^0-9.]/g, ""); 
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts[1]; 
      if (parts[1] && parts[1].length > 2) parts[1] = parts[1].substring(0, 2);
      obj[field] = parts.join(".");
    },

    addNewPipeLine() {
      // Only increase visiblePipeLines if it's less than chosen number
      if (this.visiblePipeLines < this.noOfPipeLines) {
        this.visiblePipeLines++;
      }
    },

    goToConstruction() {
      console.log("Pipe Lines Data:", this.pipeLines.slice(0, this.visiblePipeLines));
      this.$emit("updatePipeLines", this.pipeLines.slice(0, this.visiblePipeLines));
      this.$router.push({ name: "ConstructionStatus" });
    },

    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
</style>


