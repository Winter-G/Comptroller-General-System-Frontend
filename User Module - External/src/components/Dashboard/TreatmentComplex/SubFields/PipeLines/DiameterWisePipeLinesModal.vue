<template>
  <div class="diameter-wise-pipe-lines-wrapper">
    <button class="close-btn" @click="closePopup">&times;</button>

    <div class="diameter-wise-pipe-lines-modal card shadow p-4">
      <h5><b>Diameter wise Pipe Lines</b></h5>

      <div
        v-for="(pipe, index) in pipeLines"
        :key="index"
        class="pipe-line-block mb-4 border rounded p-3"
      >
        <h6><b>Pipe Line {{ index + 1 }}</b></h6>

        <!-- Inputs in a single row -->
        <div class="form-row-horizontal">
          <!-- Diameter -->
          <div class="form-field">
            <label><b>Diameter (Inches)</b></label>
            <input
              type="text"
              v-model="pipe.diameter"
              maxlength="10"
              class="form-control"
              @input="validateDecimal($event, pipe, 'diameter')"
            />
          </div>

          <!-- Maximum Depth -->
          <div class="form-field">
            <label><b>Maximum Depth (m)</b></label>
            <input
              type="text"
              v-model="pipe.maxDepth"
              class="form-control"
              @input="validateDecimal($event, pipe, 'maxDepth')"
            />
          </div>

          <!-- Length -->
          <div class="form-field">
            <label><b>Length (Km)</b></label>
            <input
              type="text"
              v-model="pipe.length"
              class="form-control"
              @input="validateDecimal($event, pipe, 'length')"
            />
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-success" @click="addNewPipeLine">+ Add New</button>
      </div>

      <!-- Total Length -->
      <div class="total-length-container">
        <label><b>Total Length (Km)</b></label>
        <input type="text" :value="totalLength" readonly class="form-control" />
      </div>

      <div class="d-flex justify-content-end mt-3">
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
      pipeLines: [
        { diameter: "", maxDepth: "", length: "" },
      ],
    };
  },
  computed: {
    totalLength() {
      return this.pipeLines
        .reduce((sum, pipe) => sum + parseFloat(pipe.length || 0), 0)
        .toFixed(2);
    },
  },
  methods: {
    validateDecimal(event, obj, field) {
      let value = event.target.value.replace(/[^0-9.]/g, "");
      if (!value) {
        obj[field] = "";
        return;
      }
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts[1];
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
      }
      obj[field] = parts.join(".");
    },
    addNewPipeLine() {
      this.pipeLines.push({ diameter: "", maxDepth: "", length: "" });
    },
    goToConstruction() {
      this.$emit("updatePipeLines", this.pipeLines);
      this.$router.push({ name: "PipeLinesUsage" });
    },
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.form-row-horizontal {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.form-field {
  display: flex;
  flex-direction: column;
  flex: 1; 
}
.total-length-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.total-length-container input {
  width: 150px;
  text-align: right;
  background-color: #f1f1f1;
  cursor: not-allowed;
}
</style>
