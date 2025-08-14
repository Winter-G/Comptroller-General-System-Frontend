<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 transfer-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="title">Transfer</h3>
        <button class="btn btn-primary btn-sm">Add</button>
      </div>

      <!-- Identification -->
      <div class="form-group row align-items-center mb-3">
        <label class="col-md-4 text-black p-2">
          Identification of Main Assets / Main Components
        </label>
        <div class="col-md-8">
          <select class="form-control" v-model="selectedAsset" required>
            <option disabled value="">Select a main asset or component</option>
            <!-- options -->
          </select>
        </div>
      </div>

      <!-- Transferee -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Transferee</label>
        <div class="col-md-8">
          <select class="form-control" v-model="selectedTransferee" @change="handleTransfereeChange" required>
            <option disabled value="">Select a transferee</option>
            <option value="public">Public Sector Institute</option>
            <option value="other">Other Institute</option>
          </select>
        </div>
      </div>

      <!-- Other Institute -->
      <div class="form-group row align-items-center mb-4" v-if="selectedTransferee === 'other'">
        <label class="col-md-4 font-weight-bold p-2">Other Institute Name</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="otherInstitute" />
        </div>
      </div>

      <!-- Reason to Transfer -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Reason to Transfer</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="reasonToTransfer" required/>
        </div>
      </div>

      <!-- PDF Upload -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">
          Transferor and the Transferee Agreed Document Uploaded by the Transferor (PDF only)
        </label>
        <div class="col-md-8">
          <input type="file" class="form-control" @change="validatePDF" accept="application/pdf" required/>
          <small v-if="fileError" class="text-danger">{{ fileError }}</small>
        </div>
      </div>

      <!-- Transfer Effective Date -->
      <div class="form-group row align-items-center mb-3">
        <label for="transferEffectiveDate" class="col-md-4 text-black p-2">
          Transfer Effective Date
        </label>
        <div class="col-md-8">
          <input
            type="date"
            id="transferEffectiveDate"
            class="form-control"
            v-model="transferEffectiveDate"
            required
          />
        </div>
      </div>

      <!-- Remarks -->
      <div class="form-group row align-items-center mb-4">
        <label class="col-md-4 font-weight-bold p-2">Remarks</label>
        <div class="col-md-8">
          <input type="text" maxlength="100" class="form-control" v-model="remarks"/>
        </div>
      </div>

      <!-- Save -->
      <div class="text-end">
        <button class="btn btn-success btn-sm" @click="saveForm">SAVE</button>
      </div>
    </div>

    <!-- NFAMS Entity Selection Modal -->
    <div v-if="showEntityModal" class="modal-overlay">
      <div class="modal-content">
        <h5>Select Public Sector Institute</h5>
        <ul class="list-group">
          <li 
            v-for="entity in nfamsEntities" 
            :key="entity.id" 
            class="list-group-item list-group-item-action"
            @click="selectEntity(entity.name)"
          >
            {{ entity.name }}
          </li>
        </ul>
        <button class="btn btn-secondary btn-sm mt-3" @click="showEntityModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferForm',
  data() {
    return {
      selectedAsset: '',
      selectedTransferee: '',
      selectedEntity: '',
      otherInstitute: '',
      reasonToTransfer: '',
      transferEffectiveDate: '',
      remarks: '',
      fileError: '',
      showEntityModal: false,
      nfamsEntities: [
        { id: 1, name: 'Entity A' },
        { id: 2, name: 'Entity B' },
        { id: 3, name: 'Entity C' }
      ]
    };
  },
  methods: {
    handleTransfereeChange() {
      if (this.selectedTransferee === 'public') {
        this.showEntityModal = true;
      }
    },
    selectEntity(name) {
      this.selectedEntity = name;
      this.showEntityModal = false;
    },
    validatePDF(event) {
      const file = event.target.files[0];
      if (file && file.type !== "application/pdf") {
        this.fileError = "Only PDF files are allowed.";
        event.target.value = "";
      } else {
        this.fileError = "";
      }
    },
    saveForm() {
      if (this.fileError) return;
      console.log({
        selectedAsset: this.selectedAsset,
        transfereeType: this.selectedTransferee,
        selectedEntity: this.selectedEntity,
        otherInstitute: this.otherInstitute,
        reasonToTransfer: this.reasonToTransfer,
        transferEffectiveDate: this.transferEffectiveDate,
        remarks: this.remarks
      });
    }
  }
};
</script>

<style scoped>
.transfer-card {
  background-color: #f7f7fb;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
.form-control {
  border-radius: 6px;
  font-size: 14px;
}
.btn-sm {
  padding: 4px 12px;
  font-size: 14px;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
.list-group-item {
  cursor: pointer;
}
.list-group-item:hover {
  background-color: #f0f0f0;
}
</style>
