<template>
  <div class="container mt-4">
    <h2 class="text-center">Air Field Runway</h2>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card mt-3 p-4 shadow-sm">
          <p><strong>SIN:</strong> {{ asset.sinNumber }}</p>
          <p><strong>Institution Name:</strong> {{ asset.institutionName }}</p>
          <p><strong>Institution Sector:</strong> {{ asset.institutionSector }}</p>
          <p><strong>Asset Code:</strong> {{ asset.assetCode }}</p>
          <p><strong>Type:</strong> {{ asset.type }}</p>
          <p><strong>Name:</strong> {{ asset.name }}</p>
          <p><strong>Location (District):</strong> {{ asset.locationDistrict }}</p>
          <p><strong>Location (DsDivision):</strong> {{ asset.locationDsDivision }}</p>
          <p><strong>Location (GnDivision):</strong> {{ asset.locationGnDivision }}</p>
          <p><strong>Location (Coordinates):</strong> {{ asset.locationCoordinates }}</p>
          <p><strong>Land Area:</strong> {{ asset.landArea }}</p>
          <p><strong>Land Ownership:</strong> {{ asset.landOwnership }}</p>
          <p><strong>Ownership:</strong> {{ asset.ownership }}</p>
          <p><strong>From Whom:</strong> {{ asset.fromWhom }}</p>
          <p><strong>To Whom:</strong> {{ asset.toWhom }}</p>
          <p><strong>Start Period:</strong> {{ asset.startPeriod }}</p>
          <p><strong>End Period:</strong> {{ asset.endPeriod }}</p>
          <p><strong>Payment Method:</strong> {{ asset.paymentMethod }}</p>
          <p><strong>Income or Payment:</strong> {{ asset.incomeOrPayment }}</p>
          <p><strong>Amount:</strong> {{ asset.amount }}</p>
          <p><strong>Air Craft Count:</strong> {{ asset.airCraftCount }}</p>
          <p><strong>Passenger Count:</strong> {{ asset.passengerCount }}</p>
          <p><strong>Measurement Unit:</strong> {{ asset.measurementUnit }}</p>
          <p><strong>Freight MT:</strong> {{ asset.freightMT }}</p>
          <p><strong>States:</strong> {{ asset.states }}</p>
          <p><strong>Square KM:</strong> {{ asset.squareKm }}</p>
          <p><strong>States For Approved/Rejected:</strong> {{ asset.statesForApprovedRejected }}</p>

          <div class="mt-4">
            <h5 class="text-center">UPDATE VERIFICATION STATUS</h5>
            <div class="d-flex justify-content-center gap-2 mt-2">
              <button class="btn-custom btn-sm" @click="confirmVerify">VERIFY</button>
              <button class="btn-custom btn-sm" @click="showReject = true">REJECT</button>
            </div>

            <div v-if="showReject" class="row align-items-center mt-3">
              <div class="col-md-9">
                <label for="reason" class="form-label mb-1">Reason for Reject</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="reason"
                  v-model="reason"
                  placeholder="Enter reason"
                />
              </div>
              <div class="col-md-3 mt-4">
                <button class="btn-custom btn-sm w-100" @click="confirmSaveReason">SAVE</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "AirFieldRunwayViewDetails",
  data() {
    return {
      id: null,
      showReject: false,
      reason: "",
      asset: {
        sinNumber: "",
        institutionName: "",
        institutionSector: "",
        assetCode: "",
        type: "",
        name: "",
        locationDistrict: "",
        locationDsDivision: "",
        locationGnDivision: "",
        locationCoordinates: "",
        landArea: "",
        landOwnership: "",
        ownership: "",
        fromWhom: "",
        toWhom: "",
        startPeriod: "",
        endPeriod: "",
        paymentMethod: "",
        incomeOrPayment: "",
        amount: "",
        airCraftCount: "",
        passengerCount: "",
        measurementUnit: "",
        freightMT: "",
        states: "",
        squareKm: "",
        statesForApprovedRejected: ""
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    // API fetch
  },
  methods: {
    confirmVerify() {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to verify this asset?",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#4c59b0',
        cancelButtonColor: '#333',
        confirmButtonText: 'Yes, I confirm this!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.verifyAsset();
        }
      });
    },
    verifyAsset() {
      Swal.fire("Verified!", "Asset has been verified.", "success");
    },
    confirmSaveReason() {
      if (!this.reason.trim()) {
        Swal.fire("Error", "Please enter a reason before saving.", "warning");
        return;
      }

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this asset?",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#4c59b0',
        cancelButtonColor: '#333',
        confirmButtonText: 'Yes, I confirm this!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.saveReason();
        }
      });
    },
    saveReason() {
      Swal.fire("Saved!", `Reason saved: ${this.reason}`, "success");
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #f9f9f9;
  border-radius: 10px;
}

.btn-custom {
  background-color: #21293e;
  color: white;
  border: none;
  padding: 5px 12px;
  font-size: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-custom:hover {
  background-color: #2e426b;
  cursor: pointer;
}
</style>










