import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/Framework/Home.vue";
import Login from "./components/UserManagement/Login.vue";
import Register from "./components/UserManagement/Register.vue";
import completeProfile from "./components/UserManagement/CompleteProfile.vue";
import completeProfileView from "./components/UserManagement/CompleteProfileView.vue";
import completeProfileEdit from "./components/UserManagement/CompleteProfileEdit.vue";
import completeUserPassWord from "./components/UserManagement/CompleteUserPassword.vue";
import accountRejected from "./components/UserManagement/AccountRejected.vue";
import pageNotFound from "./components/Framework/PageNotFound.vue";

import loginLog from "./components/LoginLogManagement/LoginLog.vue";

import entityManagement from "./components/EntityManagement/EntityManagementExternal.vue";
import childentityManagementUpdate from "./components/EntityManagement/EntityAssignChildUpdate.vue";
import entityAssetManagementVehicle from "./components/EntityManagement/EntityAssetManagement-Vehicle.vue";

import assetManagement from "./components/Asset/Asset_management.vue";
import assetManagementView from "./components/Asset/Asset_managementView.vue";


import structureType from "./components/Structure/StructureType.vue";
import AirFieldRunway from "./components/Structure/AirFieldRunway.vue";
import AirFieldRunwayForm from "./components/Structure/AirFieldRunwayForm.vue";

//gaini
import ConstructionStatusModal from "./components/Construction/ConstructionStatusModal.vue";
import CompletedConstruction from "./components/Construction/CompletedConstructionModal.vue";
import UsageInfo from "./components/Construction/UsageInfo.vue";
import UsageInfo1 from "./components/Construction/UsageInfo1.vue";
import NotCompletedConstruction from "./components/Construction/NotCompletedConstructionModel.vue";
import StructuresVerification from "./components/DvFirstRole/StructuresVerification.vue";

import MainComponentsView from "./components/MainComponents/MainComponentsView.vue";
import ChosenComponentsView from "./components/MainComponents/ChosenComponentsView.vue";
import RunwayComponent from "./components/MainComponents/RunwayComponent.vue";
import TaxiwayComponent from "./components/MainComponents/TaxiwayComponent.vue";
import ApronComponent from "./components/MainComponents/ApronComponent.vue";
import AirTrafficControlComponent from "./components/MainComponents/AirTrafficControlComponent.vue";
import RadarTowerComponent from "./components/MainComponents/RadarTowerComponent.vue";
import HangerComponent from "./components/MainComponents/HangerComponent.vue";
import OtherComponent from "./components/MainComponents/OtherComponent.vue";
import SummeryOfComponents from "./components/MainComponents/SummeryOfComponents.vue";
//update
import MainComponentsUpdateView from "./components/MainComponents/Update/MainComponentsUpdateView.vue";
import UpdatedChosenComponentsView from "./components/MainComponents/Update/UpdatedChosenComponentsView.vue";
import RunwayComponentUpdate from "./components/MainComponents/Update/RunwayComponentUpdate.vue";
import TaxiwayComponentUpdate from "./components/MainComponents/Update/TaxiwayComponentUpdate.vue";
import ApronComponentUpdate from "./components/MainComponents/Update/ApronComponentUpdate.vue";
import AirTrafficControlComponentUpdate from "./components/MainComponents/Update/AirTrafficControlComponentUpdate.vue";
import HangerComponentUpdate from "./components/MainComponents/Update/HangerComponentUpdate.vue";
import OtherComponentUpdate from "./components/MainComponents/Update/OtherComponentUpdate.vue";

import AirFieldDashboard from "./components/Dashboard/AirFieldRunway/ToDoList/AirFieldDashboard.vue";
import ViewDetails from "./components/Dashboard/AirFieldRunway/ToDoList/ViewDetails.vue";
import ToDoList from "./components/Dashboard/AirFieldRunway/ToDoList/ToDoList.vue";

import BasicInfo from "./components/Dashboard/Roads/DataVerificationOfficer/BasicInfo/BasicInfo.vue"; //Road
import Revaluation from "./components/Dashboard/Roads/DataVerificationOfficer/Revaluation.vue";
import OngoingConstruction from "./components/Dashboard/Roads/DataVerificationOfficer/OngoingConstruction.vue";
import OngoingConstructionCont from "./components/Dashboard/Roads/DataVerificationOfficer/OngoingConstructionCont.vue";
import Maintenance from "./components/Dashboard/Roads/DataVerificationOfficer/Maintenance.vue";
import Improvement from "./components/Dashboard/Roads/DataVerificationOfficer/Improvement.vue";
import Abandon from "./components/Dashboard/Roads/DataVerificationOfficer/Abandon.vue";
import OwnershipChange from "./components/Dashboard/Roads/DataVerificationOfficer/OwnershipChange.vue";
import Transfer from "./components/Dashboard/Roads/DataVerificationOfficer/Transfer.vue";
import Disposal from "./components/Dashboard/Roads/DataVerificationOfficer/Disposal.vue";
import RoadsNotCompletedConstructionModal from "./components/Dashboard/Roads/RoadsNotCompletedConstructionModal.vue";

import Dashboard from "./components/Dashboard/Railway/Dashboard.vue"; //Railway
import RailwayLine from "./components/Dashboard/Railway/RailwayLine.vue";
import SectionsModal from "./components/Dashboard/Railway/SectionsModal.vue";
import DummyConstruction from "./components/Dashboard/Railway/DummyConstruction.vue";
import Subway from "./components/Dashboard/Railway/Subway.vue";
import MonoRail from "./components/Dashboard/Railway/MonoRail.vue";
import RailwaySignal from "./components/Dashboard/Railway/RailwaySignal.vue";

import SignalInfo from "./components/Dashboard/Railway/SignalInfo.vue";
import UsageStatus from "./components/Dashboard/Railway/UsageStatus.vue";

import SportsDashboard from "./components/Dashboard/Sports&Recreation/SportsDashboard.vue";  //Sports and Recreation Facility
import InSportsComplex from "./components/Dashboard/Sports&Recreation/InSportsComplex/InSportsComplex.vue";
import InComplexComponents from "./components/Dashboard/Sports&Recreation/InSportsComplex/InComplexComponents.vue";
import ChosenInComplexComponents from "./components/Dashboard/Sports&Recreation/InSportsComplex/ChosenInComplexComponents.vue";
import IndoorStadium from "./components/Dashboard/Sports&Recreation/InSportsComplex/IndoorStadium.vue";
import OutdoorStadium from "./components/Dashboard/Sports&Recreation/InSportsComplex/OutdoorStadium.vue";
import PlayGround from "./components/Dashboard/Sports&Recreation/InSportsComplex/PlayGround.vue";
import SwimmingPool from "./components/Dashboard/Sports&Recreation/InSportsComplex/SwimmingPool.vue";
import JoggingPath from "./components/Dashboard/Sports&Recreation/InSportsComplex/JoggingPath.vue";
import LinearPath from "./components/Dashboard/Sports&Recreation/InSportsComplex/LinearPath.vue";
import GymnasiumStrengthHallFitnessHall from "./components/Dashboard/Sports&Recreation/InSportsComplex/GymnasiumStrengthHallFitnessHall.vue";
import Park from "./components/Dashboard/Sports&Recreation/InSportsComplex/Park.vue";
import Other from "./components/Dashboard/Sports&Recreation/InSportsComplex/Other.vue";

import NotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/NotInSportsComplex.vue";
import IndoorStadiumNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/IndoorStadiumNotInSC.vue";
import OutdoorStadiumNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/OutdoorStadiumNotInSC.vue";
import PlayGroundNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/PlayGroundNotInSC.vue";
import SwimmingPoolNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/SwimmingPoolNotInSC.vue";
import JoggingPathNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/JoggingPathNotInSC.vue";
import LinearPathNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/LinearPathNotInSC.vue";
import FitnessFacilitiesNotInSC from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/FitnessFacilitiesNotInSC.vue";
import ParkNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/ParkNotInSC.vue";
import OtherNotInSportsComplex from "./components/Dashboard/Sports&Recreation/NotInSportsComplex/OtherNotInSC.vue";

import CommunicationDashboard from "./components/Dashboard/Communication/CommunicationDashboard.vue"; //Communication
import OwnStationBasicInfo from "./components/Dashboard/Communication/OwnStation/BasicInfo.vue"; //Own Station
import OwnStationComponents from "./components/Dashboard/Communication/OwnStation/OwnStationComponents.vue";
import ChosenOwnStationComponents from "./components/Dashboard/Communication/OwnStation/ChosenOwnStationComponents.vue";
import Tower from "./components/Dashboard/Communication/OwnStation/Tower.vue";
import Antenna from "./components/Dashboard/Communication/OwnStation/Antenna.vue";
import Transmitter from "./components/Dashboard/Communication/OwnStation/Transmitter.vue";
import OtherOwnStation from "./components/Dashboard/Communication/OwnStation/OtherOwnStation.vue";
import StationFacilitiesOutsourcedBasicInfo from "./components/Dashboard/Communication/StationFacilitiesOutsourced/BasicInfo.vue";
//Treatment Complex
import TreatmentComplexDashboard from "./components/Dashboard/TreatmentComplex/TreatmentComplexDashboard.vue"; //Treatment Complex
import WaterBasicInfo from "./components/Dashboard/TreatmentComplex/Water/WaterBasicInfo.vue";
import TreatmentPlant from "./components/Dashboard/TreatmentComplex/Water/TreatmentPlant.vue";
import WaterTransmission from "./components/Dashboard/TreatmentComplex/Water/WaterTransmission.vue";
import PipeLinesNoModal from "./components/Dashboard/TreatmentComplex/Water/PipeLinesNoModal.vue";


// import assetManagementAddStructure from "./components/Asset/Structure/AddStructure.vue";
// import assetManagementAddVehicle from "./components/Asset/Vehicle/AddVehicle.vue";
// import assetManagementUpdateVehicle from "./components/Asset/Vehicle/UpdateVehicle.vue";
// import assetManagementVehicleList from "./components/Asset/Vehicle/ListOfVehicles.vue";
// import assetManagementViewVehicleData from "./components/Asset/Vehicle/ViewVehicle.vue";
// import assetManagementViewVehicleDataFirstTime from "./components/Asset/Vehicle/ViewVehicle.vue";

// import addVehicleInsurance from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleInsurance.vue";
// import addVehicleAccidentCostRecovery from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleAccidentCostRecovery.vue";
// import addVehicleDispose from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleDispose.vue";
// import addVehicleTransfer from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleTransfer.vue";
// import addVehicleFuel from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleFuel.vue";
// import addVehicleMaintainance from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleMaintainance.vue";
// import addVehicleValuation from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleValuation.vue";
// import viewVehicleInsurance from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleInsurance.vue";
// import viewVehicleAccidentCostRecovery from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleAccident.vue";
// import viewVehicleDispose from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleDispose.vue";
// import viewVehicleTransfer from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleTransfer.vue";
// import viewVehicleFuel from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleFuel.vue";
// import viewVehicleMaintainance from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleMaintainance.vue";
// import viewVehicleValuation from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleValuation.vue";

import dashboard from "./components/Dashboard/Dashboard.vue";
// import vehicleDashboard from "./components/Dashboard/Vehicle/VehicleDashboard.vue";
// import vehicleDashboardAlertlist_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/AlertAndReminders.vue"
// import vehicleDashboardtodolist_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/ToDoList.vue"
// import vehicleDashboardtodolistEditAllowed_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/Vehicles/EditAllowedList.vue"
// import vehicleDashboardtodolistValuation_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/Vehicles/ValuationCompleteList.vue"
// import vehicleDashboardtodolist_dv from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/ToDoList.vue"
// import vehicleDashboardtodolist_dv_ItemsInProgress from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsInProgress.vue"
// import vehicleDashboardtodolist_dv_ItemsEditBlocked from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsEditBlocked.vue"
// import vehicleDashboardtodolist_dv_ItemsAccident from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsAccident.vue"
// import vehicleDashboardtodolist_dv_ItemsDispose from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsDispose.vue"
// import vehicleDashboardtodolist_dv_ItemsFuel from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsFuel.vue"
// import vehicleDashboardtodolist_dv_ItemsInsurance from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsInsurance.vue"
// import vehicleDashboardtodolist_dv_ItemsMaintenance from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsMaintenance.vue"
// import vehicleDashboardtodolist_dv_ItemsValuation from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsValuation.vue"
// import vehicleDashboardtodolist_dv_TransferApprovals from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsTranferApprovals.vue"
import Report from "./components/ReportGeneration/Report_management.vue";
import reportManagementVehicle from "./components/ReportGeneration/AssetReports/VehicleReport.vue";

// import AirFieldRunwayForm1 from "./components/Structure/AirFieldRunwayForm1.vue";
// import AirFieldRunwayForm2 from "./components/Structure/AirFieldRunwayForm2.vue";
// import reportManagementStructure from "./components/ReportGeneration/AssetReports/StructureReport.vue";
// import reportManagementBuilding from "./components/ReportGeneration/AssetReports/BuildingReport.vue";
// import reportManagementLand from "./components/ReportGeneration/AssetReports/LandReport.vue";
// import reportManagementFurniture from "./components/ReportGeneration/AssetReports/FurnitureReport.vue";
// import reportManagementMachinary from "./components/ReportGeneration/AssetReports/MachinaryReport.vue";

const routes = [
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: pageNotFound,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/dashboard",
    component: dashboard,
    children: [],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/account/rejected",
    component: accountRejected,
  },
  {
    path: "/complete/profile",
    component: completeProfile,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/complete/profile/view",
    component: completeProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/complete/profile/edit",
    component: completeProfileEdit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/change/password",
    component: completeUserPassWord,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login/logs",
    component: loginLog,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/entity/management/external",
    // You could also have named views at tho top
    component: entityManagement,
    children: [
      {
        path: "child/entity/management",
        components: {
          helper: childentityManagementUpdate,
        },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "entity/asset/management",
        components: {
          helper: entityAssetManagementVehicle,
        },
        meta: {
          requiresAuth: true,
        },
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/external",
    component: assetManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/view/external",
    component: assetManagementView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/report/generation",
    component: Report,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/report/generation/vehicle",
    component: reportManagementVehicle,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/structure/structuretype",
    component: structureType,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/structure/AirFieldRunway",
    component: AirFieldRunway,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/structure/AirFieldRunwayForm",
    component: AirFieldRunwayForm,
    meta: {
      requiresAuth: false,
    },
  },


  {
    //Construction - usage info1
    path: "/construction/usage-info1",
    name: "UsageInfo1",
    component: UsageInfo1,
  },

  {
    //Construction - status
    path: "/construction/status",
    name: "ConstructionStatus",
    component: ConstructionStatusModal,
  },

  {
    //Construction - usage info
    path: "/construction/usage-info",
    name: "UsageInfo",
    component: UsageInfo,
  },

  {
    //Construction - not completed
    path: "/construction/not-completed",
    name: "NotCompletedConstruction",
    component: NotCompletedConstruction,
  },

  {
    //Construction - completed
    path: "/construction/completed",
    name: "CompletedConstruction",
    component: CompletedConstruction,
  },

  ,
  {
    //Structures Verification
    path: "/dvstructures/verification",
    name: "StructuresVerification",
    component: StructuresVerification,
  },

  {
    // Main Components View
    path: "/components/main",
    name: "MainComponentsView",
    component: MainComponentsView,
  },
  {
    //Chosen Components View
    path: "/components/chosen",
    name: "ChosenComponentsView",
    component: ChosenComponentsView,
  },
  {
    //Runway Component
    path: "/components/runway",
    name: "RunwayComponent",
    component: RunwayComponent,
  },
  {
    //Taxiway Component
    path: "/components/taxiway",
    name: "TaxiwayComponent",
    component: TaxiwayComponent,
  },
  {
    //Apron Component
    path: "/components/apron",
    name: "ApronComponent",
    component: ApronComponent,
  },
  {
    //Air Traffic Control Tower Component
    path: "/components/airtrafficcontroltower",
    name: "AirTrafficControlComponent",
    component: AirTrafficControlComponent,
  },
  {
    //Radar Tower Component
    path: "/components/radartower",
    name: "RadarTowerComponent",
    component: RadarTowerComponent,
  },
  {
    //Hanger Component
    path: "/components/hanger",
    name: "HangerComponent",
    component: HangerComponent,
  },
  {
    //Other Component
    path: "/components/other",
    name: "OtherComponent",
    component: OtherComponent,
  },
  {
    //Summery of Components
    path: "/components/summery",
    name: "ComponentsSummery",
    component: SummeryOfComponents,
  },

  //Update
  {
    //Main Components Update
    path: "/components/main-update",
    name: "MainComponentsUpdateView",
    component: MainComponentsUpdateView,
  },
  {
    //Updated Chosen Components
    path: "/components/updated-chosen",
    name: "UpdatedChosenComponentsView",
    component: UpdatedChosenComponentsView,
  },
  {
    //Runway - Update
    path: "/components/runway-update",
    name: "RunwayComponentUpdate",
    component: RunwayComponentUpdate,
  },
  {
    //Taxiway - Update
    path: "/components/taxiway-update",
    name: "TaxiwayComponentUpdate",
    component: TaxiwayComponentUpdate,
  },
  {
    //Apron - Update
    path: "/components/apron-update",
    name: "ApronComponentUpdate",
    component: ApronComponentUpdate,
  },
  {
    //Air Traffic Control Tower Component - Update
    path: "/components/airtrafficcontroltower-update",
    name: "AirTrafficControlComponentUpdate",
    component: AirTrafficControlComponentUpdate,
  },
  {
    //Hanger - Update
    path: "/components/hanger-update",
    name: "HangerComponentUpdate",
    component: HangerComponentUpdate,
  },
  {
    //Other - Update
    path: "/components/other-update",
    name: "OtherComponentUpdate",
    component: OtherComponentUpdate,
  },

  {
    //Air Field Dashboard
    path: "/airfield/dashboard",
    name: "AirFieldDashboard",
    component: AirFieldDashboard,
  },
  {
    //View Details
    path: "/airfield-runway/view/:id",
    name: "AirFieldRunwayView",
    component: ViewDetails,
  },
  {
    //ToDoList - Airfield
    path: "/todo-list-structures",
    name: "ToDoList",
    component: ToDoList,
  },

  //Road
  {
    //BasicInfo
    path: "/data-verification/basic-info",
    name: "BasicInfo",
    component: BasicInfo,
  },
  {
    // Revaluation
    path: '/data-verification/revaluation',
    name: 'Revaluation',
    component: Revaluation
  },
  {
    // Ongoing Construction
    path: '/data-verification/ongoing-construction',
    name: 'OngoingConstruction',
    component: OngoingConstruction
  },
  {
    //Ongoing Construction Cont
    path: '/data-verification/ongoing-construction-cont',
    name: 'OngoingConstructionCont',
    component: OngoingConstructionCont
  },
  {
    //Maintenance
    path: '/data-verification/maintenance',
    name: 'Maintenance',
    component: Maintenance
  },
  {
    //Improvement
    path: '/data-verification/improvement',
    name: 'Improvement',
    component: Improvement
  },
  {  //Abandon
    path: '/data-verification/abandon',
    name: 'Abandon',
    component: Abandon
  },
  {
    //Ownership Change
    path: '/data-verification/ownership-change',
    name: 'OwnershipChange',
    component: OwnershipChange
  },
  {
    //Transfer
    path: '/data-verification/transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    //Disposal
    path: '/data-verification/disposal',
    name: 'Disposal',
    component: Disposal
  },
  {
    // Roads - Not Completed Construction
    path: '/roads/not-completed-construction',
    name: 'RoadsNotCompletedConstruction',
    component: RoadsNotCompletedConstructionModal
  },

  //Railway
  {
    //Dashboard
    path: '/railway/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    //Railway Line
    path: '/railway/line',
    name: 'RailwayLine',
    component: RailwayLine
  },
  {
    //Subway
    path: '/railway/subway',
    name: 'Subway',
    component: Subway
  },
  {
    //MonoRail
    path: '/railway/mono-rail',
    name: 'MonoRail',
    component: MonoRail
  },
  {
    //Railway Signal
    path: '/railway/signal',
    name: 'RailwaySignal',
    component: RailwaySignal
  },
  {
    //Sections Model
    path: '/railway-line/sections',
    name: 'SectionsModal',
    component: SectionsModal
  },
  {
    //Dummy Construction
    path: '/railway-line/dummy-construction',
    name: 'DummyConstruction',
    component: DummyConstruction
  },
  {
    //Signal Information
    path: '/railway/signal-info',
    name: 'SignalInfo',
    component: SignalInfo
  },
  {
    //Usage Status
    path: '/railway/usage-status',
    name: 'UsageStatus',
    component: UsageStatus
  },

  //Sports and Recreation Facility
  {
    //Dashboard
    path: '/sports-recreation/dashboard',
    name: 'SportsRecreationDashboard',
    component: SportsDashboard
  },
  {
    // In Sports Complex
    path: '/sports-recreation/in-sports-complex',
    name: 'InSportsComplex',
    component: InSportsComplex
  },
  {
    // In Complex Components
    path: '/sports-recreation/in-complex-components',
    name: 'InComplexComponents',
    component: InComplexComponents
  },
  {
    // Chosen In Complex Components
    path: '/sports-recreation/chosen-in-complex-components',
    name: 'ChosenInComplexComponents',
    component: ChosenInComplexComponents
  },
  {
    // Indoor Stadium
    path: '/in-sports-complex/indoor-stadium',
    name: 'IndoorStadium',
    component: IndoorStadium
  },
  {
    // Outdoor Stadium
    path: '/in-sports-complex/outdoor-stadium',
    name: 'OutdoorStadium',
    component: OutdoorStadium
  },
  {
    // Play Ground
    path: '/in-sports-complex/play-ground',
    name: 'PlayGround',
    component: PlayGround
  },
  {
    // Swimming Pool
    path: '/in-sports-complex/swimming-pool',
    name: 'SwimmingPool',
    component: SwimmingPool
  },
  {
    //Jogging Path
    path: '/in-sports-complex/jogging-path',
    name: 'JoggingPath',
    component: JoggingPath
  },
  {
    // Linear Path
    path: '/in-sports-complex/linear-path',
    name: 'LinearPath',
    component: LinearPath
  },
  {
    // Gymnasium Strength Hall Fitness Hall
    path: '/in-sports-complex/gymnasium-strength-hall-fitness-hall',
    name: 'GymnasiumStrengthHallFitnessHall',
    component: GymnasiumStrengthHallFitnessHall
  },
  {
    //Park
    path: '/in-sports-complex/park',
    name: 'Park',
    component: Park
  },
  {
    // Other
    path: '/in-sports-complex/other',
    name: 'Other',
    component: Other
  },
  {
    // Not In Sports Complex
    path: '/sports-recreation/not-in-sports-complex',
    name: 'NotInSportsComplex',
    component: NotInSportsComplex
  },
  {
    // Indoor Stadium
    path: '/not-in-sports-complex/indoor-stadium',
    name: 'NotInSportsComplexIndoorStadium',
    component: IndoorStadiumNotInSportsComplex
  },
  {
    // Outdoor Stadium
    path: '/not-in-sports-complex/outdoor-stadium',
    name: 'NotInSportsComplexOutdoorStadium',
    component: OutdoorStadiumNotInSportsComplex
  },
  {
    // Play Ground
    path: '/not-in-sports-complex/playground',
    name: 'NotInSportsComplexPlayGround',
    component: PlayGroundNotInSportsComplex
  },
  {
    // Swimming Pool
    path: '/not-in-sports-complex/swimming-pool',
    name: 'NotInSportsComplexSwimmingPool',
    component: SwimmingPoolNotInSportsComplex
  },
  {
    // Jogging Path
    path: '/not-in-sports-complex/jogging-path',
    name: 'NotInSportsComplexJoggingPath',
    component: JoggingPathNotInSportsComplex
  },
  {
    // Linear Path
    path: '/not-in-sports-complex/linear-path',
    name: 'NotInSportsComplexLinearPath',
    component: LinearPathNotInSportsComplex
  },
  {
    // Fitness Facilities
    path: '/not-in-sports-complex/fitness-facilities',
    name: 'NotInSportsComplexFitnessFacilities',
    component: FitnessFacilitiesNotInSC
  },
  {
    // Park
    path: '/not-in-sports-complex/park',
    name: 'NotInSportsComplexPark',
    component: ParkNotInSportsComplex
  },
  {
    // Other
    path: '/not-in-sports-complex/other',
    name: 'NotInSportsComplexOther',
    component: OtherNotInSportsComplex
  },

  //Communication
  {
    //Dashboard
    path: '/communication/dashboard',
    name: 'CommunicationDashboard',
    component: CommunicationDashboard
  },
  {
    //Own Station Basic Info
    path: '/communication/own-station/basic-info',
    name: 'OwnStationBasicInfo',
    component: OwnStationBasicInfo
  },
  {
    //Main Components
    path: '/communication/own-station/main-components',
    name: 'OwnStationComponents',
    component: OwnStationComponents
  },
  {
    //Chosen Components
    path: '/communication/own-station/chosen-components',
    name: 'ChosenOwnStationComponents',
    component: ChosenOwnStationComponents
  },
  {
    //Tower
    path: '/communication/own-station/tower',
    name: 'OwnStationTower',
    component: Tower
  },
  {
    //Antenna
    path: '/communication/own-station/antenna',
    name: 'OwnStationAntenna',
    component: Antenna
  },
  {
    //Transmitter
    path: '/communication/own-station/transmitter',
    name: 'OwnStationTransmitter',
    component: Transmitter
  },
  {
    //Other
    path: '/communication/own-station/other',
    name: 'OtherOwnStation',
    component: OtherOwnStation
  },
  {
    //Station Facilities Outsourced
    path: '/communication/station-facilities-outsourced',
    name: 'StationFacilitiesOutsourced',
    component: StationFacilitiesOutsourcedBasicInfo
  },

  //Treatment Complex
  {
    //Dashboard
    path: '/treatment-complex/dashboard',
    name: 'TreatmentComplexDashboard',
    component: TreatmentComplexDashboard
  },
  {
    //Water - Basic Info
    path: '/treatment-complex/water',
    name: 'WaterBasicInfo',
    component: WaterBasicInfo
  },
  {
    //Water -  Treatment Plant
    path: '/water/treatment-plant',
    name: 'WaterTreatmentPlant',
    component: TreatmentPlant
  },
  {
    //Water - Transmission
    path: '/water/water-transmission',
    name: 'WaterTransmission',
    component: WaterTransmission
  },
  {
    //Water - Pipe Lines
    path: '/water/transmission/pipe-lines',
    name: 'WaterPipeLines',
    component: PipeLinesNoModal
  }



  // {
  //   path: "/asset/management/report/generation/building",
  //   component: reportManagementBuilding,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/structure",
  //   component: reportManagementStructure,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/land",
  //   component: reportManagementLand,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/furniture",
  //   component: reportManagementFurniture,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/machinary",
  //   component: reportManagementMachinary,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(sessionStorage.getItem('profile'));
    if (!user) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;