<template>
  <div class="form-container">
    <!-- Display SIN Number from Airfield Runway Form -->
    <div class="form-row">
      <label>SIN Number:</label>
      <input
        type="text"
        v-model="sinNumber"
        readonly
        class="sin-display"
        placeholder="SIN Number will appear here"
      />
    </div>

    <div class="form-row">
      <label>Status of Usage:</label>
      <select v-model="status" required>
        <option disabled value="">-- Select --</option>
        <option>Utilize / In Operation / Open</option>
        <option>Not in Operation / Unutilized / Closed</option>
        <option>Abandoned</option>
      </select>
    </div>
    <p class="info-text1">
      Not in operation / unutilized / Closed – Not in use for more than one year
    </p>
    <p class="info-text2">Abandoned – Not in use for more than Five Years</p>

    <div class="form-row">
      <label>Valuation:</label>
      <select v-model="valuation" required @change="handleValuationChange">
        <option disabled value="">-- Select --</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </div>

    <div class="form-row">
      <label>Valuation Value (Rs. Million):</label>
      <input
        type="number"
        v-model="valuationValue"
        required
        step="0.001"
        min="0"
        placeholder="Enter valuation value"
      />
    </div>

    <div class="form-row">
      <label>Date of Valuation:</label>
      <input type="date" v-model="valuationDate" required />
    </div>

    <div class="form-row">
      <label>Remarks (if any):</label>
      <input
        type="text"
        v-model="remarks"
        maxlength="60"
        placeholder="Optional remarks"
      />
    </div>

    <div class="form-row center">
      <button @click="saveData" class="next-button" :disabled="isSaving">
        {{ isSaving ? "SAVING..." : "NEXT" }}
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "UsageInfo",
  props: {
    sinNumber: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      sinNumber: "",
      status: "",
      valuation: "",
      valuationValue: "",
      valuationDate: "",
      remarks: "",
      isSaving: false,
    };
  },
  mounted() {
    this.getSinFromSession();
  },
  methods: {
    getSinFromSession() {
      this.sinNumber =
        this.sinNumber ||
        sessionStorage.getItem("airfieldSinNumber") ||
        sessionStorage.getItem("sinCode") ||
        sessionStorage.getItem("sinNumber") ||
        sessionStorage.getItem("generatedSinCode") ||
        localStorage.getItem("airfieldSinNumber") ||
        localStorage.getItem("sinCode") ||
        localStorage.getItem("sinNumber") ||
        localStorage.getItem("generatedSinCode") ||
        "";

      console.log(
        "Retrieved SIN number from airfield runway form:",
        this.sinNumber
      );

      if (!this.sinNumber) {
        Swal.fire({
          icon: "warning",
          title: "SIN Number Not Found",
          text: "No SIN number found from the airfield runway form. Please complete the airfield form first.",
          confirmButtonText: "Go to Airfield Form",
          confirmButtonColor: "#4c59b0",
        }).then(() => {
          this.$router.push("/structure/airfield-runway");
        });
      }
    },
    handleValuationChange() {
      if (this.valuation === "No") {
        this.valuationValue = 1;
        this.valuationDate = new Date().toISOString().split("T")[0];
      } else {
        this.valuationValue = "";
        this.valuationDate = "";
      }
    },
    async saveData() {
      if (
        !this.status ||
        !this.valuation ||
        !this.valuationValue ||
        !this.valuationDate
      ) {
        Swal.fire({
          icon: "warning",
          title: "Missing Required Fields",
          text: "Please fill all required fields before proceeding.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the usage information?",
        icon: "question",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#4c59b0",
        cancelButtonColor: "#666",
        confirmButtonText: "Yes, Save!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          this.isSaving = true;

          const usageData = {
            sinCode: this.sinNumber,
            usageStatus: this.status,
            valuationPerformed: this.valuation,
            valuationValue: parseFloat(this.valuationValue),
            valuationDate: this.valuationDate,
            remarks: this.remarks || "",
            submissionDate: new Date().toISOString().split("T")[0],
          };

          console.log(
            "Sending usage data:",
            JSON.stringify(usageData, null, 2)
          );

          const headers = {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha3RoYXIiLCJpYXQiOjE3NTM3NjM4NTAsImV4cCI6MTc1Mzg1MDI1MH0.FEyyc65-Faf-QY2tPDpSz5Pn-EO9mCz3GE5zQhEdgpSY9HJFmVibOLNah14qeEH6GklO1h_jKSS7fBlyOz_BGw",
            "Content-Type": "application/json",
            Accept: "application/json",
          };

          const response = await axios.post(
            "http://192.168.231.62/cgoconstructionnotcomplete/api/projects",
            usageData,
            { headers, timeout: 30000 }
          );

          console.log("API Response:", response.data);

          Swal.fire({
            icon: "success",
            title: "Usage Information Saved Successfully!",
            text: `SIN Number: ${this.sinNumber}`,
            confirmButtonText: "Continue",
            confirmButtonColor: "#4c59b0",
          });

          this.$router.push("/components/summery");
        } catch (error) {
          console.error("Error saving usage information:", error);

          let errorTitle = "Error saving usage information";
          let errorMessage = "Something went wrong. Please try again.";

          if (error.response?.status === 409) {
            errorTitle = "Data Conflict";
            errorMessage =
              error.response.data?.message ||
              "This SIN number already has usage information recorded.";
          } else if (error.response?.status === 401) {
            errorTitle = "Authentication Error";
            errorMessage = "Your session has expired. Please login again.";
          } else if (error.response?.status === 400) {
            errorTitle = "Invalid Data";
            errorMessage =
              error.response.data?.message ||
              error.response.data?.error ||
              "Please check your form data and try again.";
          } else if (error.response?.status === 403) {
            errorTitle = "Access Denied";
            errorMessage = "You don't have permission to perform this action.";
          } else if (error.response?.status >= 500) {
            errorTitle = "Server Error";
            errorMessage = "Server error occurred. Please try again later.";
          } else if (error.code === "ECONNABORTED") {
            errorTitle = "Request Timeout";
            errorMessage =
              "The request took too long. Please check your connection.";
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }

          Swal.fire({
            icon: "error",
            title: errorTitle,
            text: errorMessage,
            confirmButtonText: "Okay",
            confirmButtonColor: "#4c59b0",
          });
        } finally {
          this.isSaving = false;
        }
      }
    },
  },
};
</script>

<style scoped>

.form-container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
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
  border: 1px solid #ddd;
  border-radius: 4px;
}
.sin-display {
  background-color: #f5f5f5;
  border: 2px solid #4c59b0 !important;
  font-weight: bold;
  color: #333;
  cursor: not-allowed;
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
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
}
.next-button {
  background-color: black;
  color: white;
  padding: 8px 30px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}
.next-button:hover:not(:disabled) {
  background-color: #333;
}
.next-button:disabled {
  background-color: #666;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
  .form-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .form-row label {
    width: 100%;
    margin-bottom: 5px;
  }
  .info-text1,
  .info-text2 {
    margin-left: 0;
  }
}
</style>
