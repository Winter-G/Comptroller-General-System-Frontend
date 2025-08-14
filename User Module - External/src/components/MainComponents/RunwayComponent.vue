<template>
  <div class="main-container">
    <h2>Runway</h2>

    <form class="form-wrapper" @submit.prevent="goToStatusView">
      <div class="form-group">
        <label for="runwayId">Identification Name or Number:</label>
        <input
          id="runwayId"
          v-model.trim="runway.id"
          maxlength="50"
          required
        />
      </div>

      <div class="form-group">
        <label for="runwayLength">Length (m):</label>
        <input
          id="runwayLength"
          v-model.trim="runway.length"
          @input="validateNumber('length')"
          required
        />
      </div>

      <div class="form-group">
        <label for="runwayWidth">Width (m):</label>
        <input
          id="runwayWidth"
          v-model.trim="runway.width"
          @input="validateNumber('width')"
          required
        />
      </div>

      <div class="button-container">
        <button type="submit">
          NEXT
        </button>
      </div>
    </form>

    <ConstructionStatusModal
      v-if="showStatusModal"
      @close="showStatusModal = false"
    />
  </div>
</template>

<script>
import ConstructionStatusModal from "@/components/Construction/ConstructionStatusModal.vue";

export default {
  components: {
    ConstructionStatusModal,
  },
  data() {
    return {
      runway: {
        id: '',
        length: '',
        width: '',
      },
      showStatusModal: false,
    };
  },
  methods: {
    validateNumber(field) {
      this.runway[field] = this.runway[field].replace(/[^0-9]/g, '');
    },
    goToStatusView() {
      if (!this.runway.id.trim()) {
        alert("Identification Name or Number is required.");
        return;
      }
      if (!this.runway.length.trim()) {
        alert("Length is required.");
        return;
      }
      if (!this.runway.width.trim()) {
        alert("Width is required.");
        return;
      }

      this.showStatusModal = true;
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  max-width: 100%;
}

h2 {
  margin-bottom: 30px;
  color: #333;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  width: 200px;
  font-weight: bold;
  text-align: right;
}

input {
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  margin-top: 30px;
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


