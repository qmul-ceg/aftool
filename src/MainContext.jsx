import React, { useState, createContext, useMemo, useEffect, } from 'react'

import { GpSystems } from './enums/GPsystems.js'
import { AFibColumns } from './enums/AFibColumns'
import * as XLSX from 'xlsx'



export const MainContext = createContext()

const MainProvider = ({ children }) => {

   //STATE MANAGEMENT

   const [importedData, setImportedData] = useState([])
   const [relativeRunDate, setRelativeRunDate] = useState("")
   const [isModalOpen, setIsModalOpen] =useState(false)
   const [selectedPatientData, setSelectedPatientData] =useState()
   const [selectedPatientIndex, setSelectedPatientIndex] =useState()
   const [exportCount, setExportCount] = useState(0)
   const [selectedForExport, setSelectedForExport] = useState({})
   const [masterCheckbox, setMasterCheckbox] = useState(false)
   const [gpSystemSelected, setGpSystemSelected] = useState(GpSystems.NotSelected)
   const [confirmListExport, setConfirmListExport] = useState(false)
   const [displayExportListAlert, setDisplayExportListAlert] = useState(false)
   const [exportListType, setExportListType] =useState("")
   const [emptyExportListAlert, setEmptyExportListAlert] = useState(false)
   
   //FILTER STATES
   const defaultFilters ={
      selectedAnti: null,
      selectedAges: [],
      nsaid:"",
      statin: "",
      cvd: { value: "", label: "" },
      selectedBP: [],
      selectedChdValue: [],
      selectedChdDate: "",
      selectedOrbitValue: "",
      selectedOrbitDateRecorded: "",
      selectedOrbit: [],
      medReview:"",
      selectedVulnerabilities: [],
      quickFilter: ""
   }

   const [selectedAnti, setSelectedAnti] = useState(defaultFilters.selectedAnti);
   const [medReview, setMedReview] = useState (defaultFilters.medReview);
   const [selectedVulnerabilities, setSelectedVulnerabilities] = useState (defaultFilters.selectedVulnerabilities);  //Vulnerabilities
   
   const [selectedChdValue, setSelectedChdValue] = useState(defaultFilters.selectedChdValue); //CHA₂DS₂-VASc
   const [selectedChdDate, setSelectedChdDate] = useState(defaultFilters.selectedChdDate);
   const [selectedOrbit, setSelectedOrbit] = useState (defaultFilters.selectedOrbit);
   const [selectedOrbitValue, setSelectedOrbitValue] = useState (defaultFilters.selectedOrbitValue);
   const [selectedOrbitDateRecorded, setSelectedOrbitDateRecorded] = useState (defaultFilters.selectedOrbitDateRecorded);
   const [selectedAges, setSelectedAges] = useState(defaultFilters.selectedAges);
   
   const [nsaid, setNsaid] = useState (defaultFilters.nsaid);
   const [statin, setStatin] = useState(defaultFilters.statin);
   const [cvd, setCvd] = useState (defaultFilters.cvd);
   const [selectedBP, setSelectedBP] = useState(defaultFilters.selectedBP);
   const [quickFilter, setQuickFilter] = useState(defaultFilters.quickFilter);
   

   //MODAL PATIENT CLICK
   const handlePatientClick = (index) =>{
      // console.log("Clicked row index:", index)

      if(data.length > 0 && data[index]){
         const selectedPatientRow = data[index] //Get the index of the the patient selected in imported Data
         setSelectedPatientData(selectedPatientRow) 
         setSelectedPatientIndex(index) //Stores index of the selected patient
         setIsModalOpen(true)  //Opens modal
      
      }
   
   }

   // console.log(selectedPatientData)
   const handleNextPatient = () =>{
      setSelectedPatientIndex((prevIndex) =>{
         const nextIndex = prevIndex + 1 
         const updatedIndex = nextIndex < data.length ? nextIndex : prevIndex;
         setSelectedPatientData(data[updatedIndex])
         return updatedIndex
      })
   }
   
   const handlePreviousPatient = () => {
      setSelectedPatientIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      const updatedIndex = prevIndexValue >= 0 ? prevIndexValue : prevIndex;
      setSelectedPatientData(data[updatedIndex]);  // Update selected patient data
      return updatedIndex;
      });
   };
   

   //FILTER BREADCRUMBS
   //Resetting filters
   //Resets Filters except quick Filters
   const resetFilters = ()=>{
      setSelectedAnti(defaultFilters.selectedAnti);
      setSelectedAges(defaultFilters.selectedAges);
      setNsaid(defaultFilters.nsaid);
      setStatin(defaultFilters.statin);
      setCvd(defaultFilters.cvd);
      setSelectedBP(defaultFilters.selectedBP);
      setSelectedChdDate(defaultFilters.selectedChdDate);

      setSelectedChdValue(defaultFilters.selectedChdValue);

      setSelectedOrbit(defaultFilters.selectedOrbit);
      setSelectedOrbitValue( defaultFilters.selectedOrbitValue);
      setSelectedOrbitDateRecorded(defaultFilters.selectedOrbitDateRecorded);

      setMedReview(defaultFilters.medReview);
      setSelectedVulnerabilities(defaultFilters.selectedVulnerabilities);
      // setQuickFilter(defaultFilters.quickFilter)
   }

   //Resets filters including quick filters used for "Remove all filters" button in filter bar
   const resetAllFilters = () => {
      setSelectedAnti(defaultFilters.selectedAnti);
      setSelectedAges(defaultFilters.selectedAges);
      setNsaid(defaultFilters.nsaid);
      setStatin(defaultFilters.statin);
      setCvd(defaultFilters.cvd);
      setSelectedBP(defaultFilters.selectedBP);
      setSelectedChdDate(defaultFilters.selectedChdDate);

      setSelectedChdValue(defaultFilters.selectedChdValue);

      setSelectedOrbit(defaultFilters.selectedOrbit);
      setSelectedOrbitValue( defaultFilters.selectedOrbitValue);
      setSelectedOrbitDateRecorded(defaultFilters.selectedOrbitDateRecorded);
      
      setMedReview(defaultFilters.medReview);
      setSelectedVulnerabilities(defaultFilters.selectedVulnerabilities);
      setQuickFilter(defaultFilters.quickFilter)

   }


   /////FILTER SELECTIONS

   //Filtering functionality
   const forceSetAntiFilter = (value, label) => {
      setSelectedAnti({value, label})
   }
   const forceSetMedReview = (value) => {
      setMedReview(value)
   }

   const forceSetVulnerabilities = (value, label) => {
      setSelectedVulnerabilities({value, label})
   }

   const forceSetChdValue = (value) => {
      setSelectedChdValue([value])
   }

   const forceSetChdDate = (value) => {
      setSelectedChdDate(value)
   }

   const forceSetOrbitValue = (value) => {
      setSelectedOrbitValue(value)
   }

   const forceSetOrbitDateRecorded = (value) => {
      setSelectedOrbitDateRecorded(value)
   }

   const forceSetStatin= (value) => {
      setStatin(value)
   }

   const forceSetNsaid = (value) =>{
      setNsaid(value)
   }

   const forceSetAges = (value) => {
      setSelectedAges(value)
   }

   const forceSetCvd = (value) => {
      setCvd(value)
   }

   const forceSetBP = (value) => {
      setSelectedBP(value)
   }


   //quickfilter
   //AntiFilter
   const handleAntiFilter =(value, label) => {
 
      if (quickFilter){
         setSelectedAnti({ value, label });
      }
      else {

         if (selectedAnti && selectedAnti.value === value) {
            setSelectedAnti(null);
            
         } else {
            setSelectedAnti({ value, label });
         }
      }
      
   }


   //Age Filters
   const handleAgeSelection = (value, label) =>{
      setSelectedAges((prev) => {
         const exists = selectedAges.some(object => object.value === value)

         if(exists){
            return prev.filter(object => object.value !== value);
         }
         else {
            return [...prev, {value, label}]
         }
         
      })
   }

   //NSAID Filter Logic
   const handleNSAID = (value) => {
      setNsaid((prev) => (prev === value ? "" : value)); // Toggle value off
   };

   const handleStatin = (value) => {
      setStatin((prev) => (prev === value ? "" : value)); // Toggle value off
   };

    //CVD Filter Logic
   const handleCVD = (value, label) => {
      if (cvd && cvd.value === value) {
         setCvd({ value: "", label: "" });
      } else {
         setCvd({ value, label });
      }
   };

   //BP Filters
   const handleBP = (value, label)=>{
      setSelectedBP((prev) => {
         const exists = selectedBP.some(object => object.value === value)

         if(exists){
            return prev.filter(object => object.value !== value);
         }
         else {
            return [...prev, {value, label}]
         }
      })
   }
   
   
   

   //BLOOD PRESSURE FILTER
   const parseBloodPressure = (bp) => {
      if (!bp || typeof bp !== 'string') {
      // If the input is invalid or not a string, return default values
      // console.error('Invalid blood pressure data:', bp);
      return { systolic: null, diastolic: null }; // Default values
      }
   
      const [systolic, diastolic] = bp.split("/").map(Number);
      // const [systolic, diastolic] = bp.split("/").map(value => parseInt(value, 10));

      // Check if the split results are valid numbers
      if (isNaN(systolic) || isNaN(diastolic)) {
      // console.error('Invalid blood pressure values:', bp);
      return { systolic: null, diastolic: null }; // Default values
      }
   
      return { systolic, diastolic };
   };
   // console.log(parseBloodPressure)
   const checkPatientBloodPressure = (systolic, diastolic) => {
      for (let object of selectedBP){
         if(object.value === "lt140-90" && (systolic < 140 && diastolic < 90)){
            return true;
         }
         if(object.value === "gte140-90" && (systolic >= 140 || diastolic >= 90)){
            return true;
         }
         if(object.value === "gte150-90" && (systolic >= 150 && diastolic > 0 )){
            return true;
         }
      }
      return false
   }

   //CHA₂DS₂-VASc Filters
   const handleChdValue = (value) => {
      setSelectedChdValue((prev) => {
         const exists = prev.includes(value)
         // console.log(exists)
         if(exists){
            return prev.filter((item) => item !== value)
            
         }else{
            return [...prev, value]
         }
      })
   }

   const handleChdDate = (value) => {
      if (selectedChdDate === value) {
         setSelectedChdDate("");
      } else {
         setSelectedChdDate(value);
      }
   }

   //ORBIT FILTERS
   const handleOrbitValueSelection = (value) => {
      if(selectedOrbitValue === value){
         setSelectedOrbitValue("")
      } else {
         setSelectedOrbitValue(value) 
      }
   }

   const handleOrbitDateRecordedSelection = (value) => {
      if(selectedOrbitDateRecorded === value){
         setSelectedOrbitDateRecorded("")
      } else {
         setSelectedOrbitDateRecorded(value)
      }
   }

   const handleOrbit = (value, label) => {
      setSelectedOrbit((prev) => {
         const exists = prev.some(object => object.value === value);

         if(exists){
            return prev.filter((object) => object.value !== value)
         }else {
            return [...prev, {value, label}]
         }
      });
   }



   //MedReview
   const handleMedReview = (value) => {
      setMedReview((prev) => (prev === value ? "" : value)); // Toggle value off
   };

   //Vulnerabilities
   const handleVulnerabilitesFilter = (value, label) => {
      setSelectedVulnerabilities((prev) => {
         const exists = prev.some((item) => item.value === value)

         if (exists){
            return prev.filter((item) => item.value !== value)
           
         }else {
            return [...prev, {value, label}]
         };
      })
   }    

   //CONERT DATE TO JS FORMAT
   const convertDate = (dateString) => {
      if (dateString){
         const [day, month, year] = dateString.split('-');
         const months = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };
      
         return `${year}-${months[month]}-${day}`; 
      }
      else return ""
  }

   //CHECK RELATIVE RUN DATE 
   const recordedOverTwelveMonths = (recordedDate, relativeRunDate) => {
      const recorded = new Date(recordedDate); // Convert to Date object
      
      const cutoffDate = new Date(relativeRunDate); // Reference date
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1); // Subtract 12 months
      return recorded <= cutoffDate; // Check if recorded is over 12 months ago
   }

   //CONVERT RELATIVE RUN DATE 
   const convertRelativeRunDate = (dateString) =>{
      if(dateString){
         const [day, month, year] = dateString.split('/');
         return `${year}-${month}-${day}`;
      }
      else return ""
      
   }

   //REMOVE DISPLAY FILTERS
   const removeAntiFilter = ()=>{
      setSelectedAnti(null)
      setQuickFilter("")
   }

   const removeNsaidFilter =()=>{
      handleNSAID("")
      setQuickFilter("")
   }

   const removeStatinFilter =()=>{
      handleStatin("")
      setQuickFilter("")
   }

   const removeCvdFilter =()=>{
      setCvd({ value: "", label: "" })
      setQuickFilter("")
   }

   const removeVulnerabilities = (value) =>{
      setSelectedVulnerabilities((prev) => 
         prev.filter((item) => item.value !== value)
     );
     setQuickFilter("")

   };

   const removeChdValue = (value) =>{
      setSelectedChdValue((prev) => (
         prev.filter((item => item !== value))
      ))
      setQuickFilter("")
   }

   const removeChdDate = () =>{
      setSelectedChdDate(null);
      setQuickFilter("")
   }

   const removeSelectedOrbitValue= () => {
      setSelectedOrbitValue("")
      setQuickFilter("")
   }

   const removeSelectedOrbitDate = () => {
      setSelectedOrbitDateRecorded("")
      setQuickFilter("")
   }

   const removeBP = (value) => {
      setSelectedBP((prev) => (
         prev.filter(object => object.value !== value)
      ))
      setQuickFilter("")

   }

   const removeOrbitDisplay = (value) => {
      setSelectedOrbit((prev) => (
         prev.filter(object => object.value !== value)
      ))
      setQuickFilter("")
   }

   const removeAgeDisplay = (value) => {
      setSelectedAges((prev) => (
         prev.filter(object => object.value !== value)
      ))
      setQuickFilter("")
   }

   // QUICK FILTERS FUNCTIONALITY

   const quickFilterConfig = {
      option_one: { chdValue: 'gte2', chdDate: '<12m', antiFilter: ['no_anticoagulant', 'None'] },
      option_two: { chdValue: 'gte2', chdDate: '≥12m', antiFilter: ['no_anticoagulant', 'None'] },
      option_three: { orbitValue: 'gte4', antiFilter: ['doac_warf', 'DOAC or Warfarin'] },
      option_four: {medReview : 'Yes', antiFilter: ['doac_warf', 'DOAC or Warfarin']},
      option_five: {nsaid: 'Yes', antiFilter: ['doac_warf', 'DOAC or Warfarin']},
      option_six: {antiFilter: ['dual', 'Dual therapy'], medReview: 'Yes'}
    };

   const handleQuickFilter = (value) =>{

      if ( quickFilter && quickFilter === value){
         resetFilters();
         setQuickFilter("");
         return;
      }
      resetFilters()
      setQuickFilter(value)
      

      setTimeout(() => {
        const config =  quickFilterConfig[value]

        if (!config) return; // Just in case no config found

         if (config.chdValue) {
            forceSetChdValue(config.chdValue)
            // handleChdValue(config.chdValue);
         }
         if (config.chdDate) {
            forceSetChdDate(config.chdDate)
            // handleChdDate(config.chdDate);
         }
         if (config.antiFilter) {
            forceSetAntiFilter(config.antiFilter[0], config.antiFilter[1])
            // handleAntiFilter(config.antiFilter[0], config.antiFilter[1]);
         }
         if (config.orbitValue) {
            forceSetOrbitValue(config.orbitValue)
            // handleOrbitValueSelection(config.orbitValue);
         }
         if (config.medReview) {
            forceSetMedReview(config.medReview)
            // handleMedReview(config.medReview);
         }
         if (config.nsaid) {
            forceSetNsaid(config.nsaid)
            // handleNSAID(config.nsaid);
         }
      }, 10)
     
   } 
   
   






   const handleContinueListExport = (listType)=> {
      // console.log("hi")
      // console.log(listType)
      if (listType == "excel"){
         exportExcel(selectedForExport, data);
      }
      else if (listType == "accurx"){
         exportAccuRxList(selectedForExport, data, gpSystemSelected)
      }
      else if(listType == "nhs_list"){
         exportNHS_list(selectedForExport, data)
      }
   }

   const getRandomNumbers = () => {
      let dateObj = new Date()
      let dateTime = dateObj.getHours() + '' + dateObj.getMinutes() + '' + dateObj.getSeconds();
   
      return dateTime + '' + Math.floor((Math.random().toFixed(2)*100));
   }

   const exportExcel = (selectedForExportList, data) => {
      setDisplayExportListAlert(false)
      if (Object.keys(selectedForExportList).length > 0){
         const exportData = Object.keys(selectedForExportList).map((patient)=>{
            const patientInfo = data.find((patientDetails) => patientDetails[AFibColumns.NHS_Number] === patient);
   
            return{
               Name : patientInfo[AFibColumns.FullName],
               Age: patientInfo[AFibColumns.Age],
               Gender: patientInfo[AFibColumns.Gender],
               "Patient reference" : patientInfo[AFibColumns.PatientReference],
               "CHA₂DS₂-VASc - Value" : patientInfo[AFibColumns.CHADSVAScValue],     
               "CHA₂DS₂-VASc - Date": patientInfo[AFibColumns.CHADSVAScDate],
               "ORBIT - Value": patientInfo[AFibColumns.ORBIT_Value],
               "ORBIT - Date": patientInfo[AFibColumns.ORBIT_Date],
               "Anticoagulant issued (6m)" : patientInfo[AFibColumns.OnAnticoagulant],
               "Aspirin / antiplatelet issued (6m)" : patientInfo[AFibColumns.OnAspirinAntiplatelet],
               NSAID: patientInfo[AFibColumns.OnNSAID],
               "Statin issued": patientInfo[AFibColumns.OnStatin],
               CVD: patientInfo[AFibColumns.CVD],
               BP: patientInfo[AFibColumns.BP],
               "Medication Review Date": patientInfo[AFibColumns.MedsReviewDate]
            }
         })
         const date = new Date()
         
         let worksheet = XLSX.utils.json_to_sheet(exportData, {origin: "A4"})
         XLSX.utils.sheet_add_aoa(worksheet, 
            [["CEG Atrial Fibrillation Tool"]], 
            
            {origin: "A1"});  
            
            
         XLSX.utils.sheet_add_aoa(worksheet,
            [["Patient Data Export", date, `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`]],
            {origin: "A2"}
         );
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, worksheet, "Patients")
   
         XLSX.writeFile(workbook, "Patients.xlsx")
         setExportListType("")
      }
   };

   const exportAccuRxList = (selectedForExport, data, selGpSystem) => {
      setDisplayExportListAlert(false)
      if (Object.keys(selectedForExport).length > 0){
         let outputContent = "";
         if(selGpSystem == GpSystems.EMIS_Web){
            outputContent += "EMIS Web, NHS Number"

            const patientsList = Object.keys(selectedForExport).map(key => {
               // const patientsToExport = data.find(patients => patients[0] === key) 
               const patientsToExport = data.find(patients => patients[AFibColumns.NHS_Number] === key) 
               outputContent += "\n" + patientsToExport[AFibColumns.PatientReference] + "," + patientsToExport[AFibColumns.NHS_Number];
            })
         }
         else if(selGpSystem == GpSystems.SystmOne){
            outputContent = "NHS Number, Date of Birth, Mobile telephone";

            const patientsList = Object.keys(selectedForExport).map(key => {
               // const patientsToExport = data.find(patients => patients[0] === key) 
               const patientsToExport = data.find(patients => patients[AFibColumns.NHS_Number] === key) 
               outputContent += "\n" + patients[AFibColumns.NHS_Number] + "," + patients[AFibColumns.DateOfBirth] + "," + patient[AFibColumns.MobileTelephone];
            })
         }
         const file = new Blob([outputContent], { type : "text/plain"});
         const url = URL.createObjectURL(file)

         const link = document.createElement("a");
         link.href = url;
         link.download = "AccuRx_AF_patients_list_" + getRandomNumbers() + ".csv";

         document.body.appendChild(link)
         link.click();
         document.body.removeChild(link)
         setTimeout(()=>URL.revokeObjectURL(url), 1000)
         setExportListType("")
      }
   }

   const exportNHS_list = (selectedForExportList, data) =>{
      setDisplayExportListAlert(false)
      if(Object.keys(selectedForExportList).length > 0){
         const patientsList = Object.keys(selectedForExportList).map(key => {
            // const patientsToExport = data.find(patients => patients[0] === key) 
            const patientsToExport = data.find(patients => patients[AFibColumns.NHS_Number] === key) 
            return patientsToExport[AFibColumns.NHS_Number]   
         })
         setDisplayExportListAlert(false)
         if(patientsList.length == 0){
            alert("No patient statisfied current filter selection, or patient count is '0'")
            return;
         }
         
   
         const listToExport = patientsList.join("\n");
         const file = new Blob([listToExport], { type : "text/plain"});
         const url = URL.createObjectURL(file)
   
         const link = document.createElement("a");
         link.href = url;
         link.download = "AFib_patients_NHS_number_" + getRandomNumbers() + ".txt";
   
         document.body.appendChild(link)
         link.click();
         document.body.removeChild(link)
         setTimeout(()=>URL.revokeObjectURL(url), 1000)
         setExportListType("")
      }
   }  
   // console.log(importedData[AFibColumns.MedsReviewDate])
   
   //FILTER LOGIC
   const getFilteredPatients = () =>{
      return importedData.filter((patient) =>{

         //none, doac_warf, doac, warf, antiplatelets, dual
         const doacWarf = selectedAnti && selectedAnti.value === "doac_warf";
         const doac = selectedAnti && selectedAnti.value === "doac";
         const warfarin = selectedAnti && selectedAnti.value === "warf";
         const antiplatelets = selectedAnti && selectedAnti.value === "antiplatelets";
         const none = selectedAnti && selectedAnti.value === "no_anticoagulant";
         const dualTherapy = selectedAnti && selectedAnti.value === "dual";


         const antiFilterControl = 
            selectedAnti === null ||
            (doacWarf && 
               (patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") || 
                (patient[AFibColumns.OnAnticoagulant].includes("YES - Warf")))) ||
            (doac && 
               (patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC"))) ||
            (warfarin && 
               (patient[AFibColumns.OnAnticoagulant].includes("YES - Warf"))) ||
            (antiplatelets && 
               (patient[AFibColumns.OnAspirinAntiplatelet] === "YES") &&
               !patient[AFibColumns.OnAnticoagulant].includes("YES"))
// (patient[AFibColumns.OnAnticoagulant] != "YES"))  
               ||
            (dualTherapy && 
                  (patient[AFibColumns.OnAspirinAntiplatelet] === "YES") && 
                   (patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") ||
                   (patient[AFibColumns.OnAnticoagulant].includes("YES - Warf")))) ||
            (none && 
               (!patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC")) &&
               (!patient[AFibColumns.OnAnticoagulant].includes("YES - Warf")))
               // (patient[AFibColumns.OnAnticoagulant] != "YES - Warf"))
            
         const ageFilter = 
            (selectedAges.some(item => item.value === "<65") && patient[AFibColumns.Age] < 65) ||
            (selectedAges.some(item => item.value === "65-79") && patient[AFibColumns.Age] >= 65 && patient[AFibColumns.Age] <= 79) ||
            (selectedAges.some(item => item.value === "80+") && patient[AFibColumns.Age] >= 80) ||
            selectedAges.length === 0;
      
         const nsaidFilter =
            nsaid === "Yes" && patient[AFibColumns.OnNSAID] ==="YES" ||
            nsaid === "No" && patient[AFibColumns.OnNSAID] === "NO" ||
            !nsaid;

         const statinFilter = 
            statin === "Yes" && patient[AFibColumns.OnStatin] ==="YES" ||
            statin === "No" && patient[AFibColumns.OnStatin] === "NO" ||
            !statin;

         const cvdFilter =
            (cvd.value === "Yes" && patient[AFibColumns.CVD]  ==="YES") ||
            (cvd.value === "No" && patient[AFibColumns.CVD]  === "NO") ||
            cvd.value==="";
         

         const { systolic, diastolic } = parseBloodPressure(patient[AFibColumns.BP] );
         const bloodPressureFilter = selectedBP.length === 0 || checkPatientBloodPressure(systolic, diastolic);
         

         // CHADVASC FILTER
         //Value variables

         const getChdValueSelection = () => {
            const gteTwo = selectedChdValue.includes('gte2') && patient[AFibColumns.CHADSVAScValue] >= 2;
            const equalToOne = selectedChdValue.includes('1') && patient[AFibColumns.CHADSVAScValue] === "1";
            const equalToZero = selectedChdValue.includes("0") && patient[AFibColumns.CHADSVAScValue]  === "0";

            return {gteTwo, equalToOne, equalToZero}
         }

         const getChdDateSelection = ( ) => {
            const overTwelveMonths = (selectedChdDate && selectedChdDate === "≥12m" && recordedOverTwelveMonths(patient[AFibColumns.CHADSVAScDate], convertRelativeRunDate(relativeRunDate)));
            const notRecorded = (selectedChdDate && selectedChdDate === "not_recorded" 
               && (!convertDate(patient[AFibColumns.CHADSVAScDate]) || convertDate(patient[AFibColumns.CHADSVAScDate]).trim() === ""));
            const lessThanTwelveMonths = (selectedChdDate && selectedChdDate === "<12m" && 
               !recordedOverTwelveMonths(patient[AFibColumns.CHADSVAScDate], convertRelativeRunDate(relativeRunDate)) && 
               convertDate(patient[AFibColumns.CHADSVAScDate]) && 
               convertDate(patient[AFibColumns.CHADSVAScDate]).trim() !== "");

            return {overTwelveMonths, notRecorded, lessThanTwelveMonths}
         }

         const applyChdFilter = () => {
            // console.log("hi")
            const {gteTwo, equalToOne, equalToZero} = getChdValueSelection();
            const {overTwelveMonths, notRecorded, lessThanTwelveMonths} = getChdDateSelection();

            const chdFilter = 
               //When nothing is selected
               (selectedChdValue.length === 0 && !selectedChdDate ) ||

               // When only value is selected and no date is selected
               (selectedChdValue.length > 0 && !selectedChdDate && (gteTwo || equalToOne || equalToZero)) ||

               // (gteTwo && !selectedChdDate) ||
               // (equalToOne && !selectedChdDate) ||
               // (equalToZero && !selectedChdDate) ||

               // When only the date is selected
               (selectedChdValue.length === 0 && (overTwelveMonths || notRecorded || lessThanTwelveMonths)) ||

               // Value and date combination
               (gteTwo && (overTwelveMonths || notRecorded || lessThanTwelveMonths)) ||
               (equalToOne && (overTwelveMonths || notRecorded || lessThanTwelveMonths)) ||
               (equalToZero && (overTwelveMonths || notRecorded || lessThanTwelveMonths)) 
            
            return chdFilter 
         }


         //ORBIT FILTER
         const isOrbitValueSelected = selectedOrbitValue === "gte4" && patient[AFibColumns.ORBIT_Value] >= 4
         

         const getOrbitRecordedDateSelection = () =>{
            //This function checks and gets the Orbit Recorded date value selected by the user. 
            //The function checks whatever value is selected by the user and maps them to our data 
            const overTwelveMonths = selectedOrbitDateRecorded === "≥12m" && 
               recordedOverTwelveMonths(patient[AFibColumns.ORBIT_Date], convertRelativeRunDate(relativeRunDate))
            const withinTwelveMonths = (selectedOrbitDateRecorded === "<12m" && 
               !recordedOverTwelveMonths(patient[AFibColumns.ORBIT_Date], convertRelativeRunDate(relativeRunDate)) &&
               convertDate(patient[AFibColumns.ORBIT_Date]) && convertDate(patient[AFibColumns.ORBIT_Date]).trim() !== "")
            const notRecorded = selectedOrbitDateRecorded === "not_recorded" 
               && (!convertDate(patient[AFibColumns.ORBIT_Date]) || convertDate(patient[AFibColumns.CHADSVAScDate]).trim() === "")
            
               return {overTwelveMonths, withinTwelveMonths, notRecorded}
         }

         const applyOrbitFilter = () => {

            const {overTwelveMonths, withinTwelveMonths, notRecorded} = getOrbitRecordedDateSelection();

            const orbitFilter = 
               //Neither Value or date is selected 
               (!selectedOrbitValue && !selectedOrbitDateRecorded) ||
               //Value is selected and date is not selected
               (selectedOrbitValue && isOrbitValueSelected && !selectedOrbitDateRecorded ) ||
               //Value is not selected but date is selected 
               (!selectedOrbitValue && (overTwelveMonths || withinTwelveMonths || notRecorded)) ||
               (selectedOrbitValue && isOrbitValueSelected && (overTwelveMonths || withinTwelveMonths || notRecorded))
            return orbitFilter
         }

         
         const orbitFilter = 
            selectedOrbit.length === 0 ||
            selectedOrbit.some(object => object.value === "gte4") && patient[AFibColumns.ORBIT_Value] >=4 ||
            selectedOrbit.some(object => object.value === "≥12m") && 
               recordedOverTwelveMonths(patient[AFibColumns.ORBIT_Date], convertRelativeRunDate(relativeRunDate)) ||
            selectedOrbit.some(object => object.value === "not_recorded") && (!convertDate(patient[AFibColumns.ORBIT_Date]) || convertDate(patient[AFibColumns.ORBIT_Date]).trim() === "")
            
         
         const medReviewFilter = 
            !medReview ||
            (medReview === "Yes" && 
               (!patient[AFibColumns.MedsReviewDate] 
                  || 
               recordedOverTwelveMonths(
                  convertDate(patient[AFibColumns.MedsReviewDate]), 
                  convertRelativeRunDate(relativeRunDate)
               ))) || 
            (medReview === "No" && 
               patient[AFibColumns.MedsReviewDate] && 
               !recordedOverTwelveMonths(
                  convertDate(patient[AFibColumns.MedsReviewDate]), 
                  convertRelativeRunDate(relativeRunDate)
               ));

         const vulnerabFilter = 
            selectedVulnerabilities.length === 0 ||
            (selectedVulnerabilities.some(item => item.value === "smi") && patient[AFibColumns.SMI_Concept].trim() !== "") ||
            (selectedVulnerabilities.some(item => item.value === "learning_disability") && patient[AFibColumns.LD_Concept].trim() !== "") ||
            (selectedVulnerabilities.some(item => item.value === "dementia") && patient[AFibColumns.DementiaConcept].trim() !== "") ||
            (selectedVulnerabilities.some(item => item.value === "housebound") && patient[AFibColumns.HouseboundConcept].trim() !== "");
            
         return   ageFilter && nsaidFilter && cvdFilter && bloodPressureFilter &&  
                  orbitFilter && medReviewFilter && antiFilterControl && vulnerabFilter && statinFilter
                  && applyChdFilter() && applyOrbitFilter();
         });   
   }


   //TABLE DATA AND SORTING
   const [sortChdValue, setSortChdValue] = useState("desc")
   const [data, setData] = useState([])
   const [dataCount, setDataCount] = useState()
  
   // const filteredPatients = getFilteredPatients()
   const filteredPatients = React.useMemo(() => {
      return getFilteredPatients();  // Only recompute when dependencies (filters) change
   }, [importedData, selectedAnti, selectedAges, nsaid, statin, cvd, selectedBP, selectedChdValue, selectedChdDate, selectedOrbit, selectedOrbitValue, selectedOrbitDateRecorded, medReview, relativeRunDate, selectedVulnerabilities]);

   // console.log(filteredPatients)
   const handleSortClick = () => {
      setSortChdValue(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
   }

   const sortedPatients = () => {
      return [...filteredPatients].sort((a,b) => { 
         // console.log(typeof(a[AFibColumns.CHADSVAScValue]))
         let valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) ;
         let valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) ;

         if(isNaN(valueA)) valueA = -Infinity;
         if(isNaN(valueB)) valueB = -Infinity;
         return valueB - valueA;
        
      })
      
   };

   React.useEffect(() => {
      const sortedData = sortedPatients();
      setData(sortedData);
      setDataCount(sortedData.length)
   }, [ filteredPatients, sortChdValue ]);

   

//LIST EXPORTING FUNCTIONALITY 
   const toggleSelectedPatient = (patient) => {
      
      setSelectedForExport((prev) => { 
         const exists = patient in prev;

         if(exists){
            const updated = {...prev};
            delete updated[patient]
            return updated;
            
         }
         else {
            return {
               ...prev,
               [patient]: true
            }
         }
      } 
   )}


//MAINCONTEXT VALUES
   //Values will be passed down to children of MainContext


   const contextValue ={
       getFilteredPatients, 
      selectedAges, handleAgeSelection, removeAgeDisplay,
      nsaid, handleNSAID,
      cvd, handleCVD,
      selectedBP, handleBP, removeBP,
      // selectedChd,handleChd,
      selectedOrbit, handleOrbit, removeOrbitDisplay,
      medReview, handleMedReview, setMedReview,
      importedData, setImportedData,
      setRelativeRunDate,
      selectedAnti, handleAntiFilter, removeAntiFilter,
      setSelectedVulnerabilities, selectedVulnerabilities, handleVulnerabilitesFilter,
      isModalOpen, setIsModalOpen,
      handlePatientClick,
      selectedPatientData,
      handleNextPatient,
      handlePreviousPatient,
      resetFilters,
      handleSortClick, data,
      sortChdValue, dataCount,
      relativeRunDate,
      handleChdValue,  selectedChdValue, removeChdValue,
      handleChdDate,selectedChdDate, removeChdDate,
      quickFilter, handleQuickFilter,
      resetAllFilters,

      //REMOVE FILTERS
      removeNsaidFilter, removeCvdFilter, removeVulnerabilities, removeStatinFilter,

      //ORBIT FUNCTIONS AND STATES
      handleOrbitValueSelection, handleOrbitDateRecordedSelection,
      selectedOrbitValue, selectedOrbitDateRecorded, removeSelectedOrbitValue,
      removeSelectedOrbitDate,

      //EXPORT COUNT
      exportCount, setExportCount,

      selectedForExport, setSelectedForExport, handleStatin, statin,

   
      // removeAgeDisplay
      // MASTER CHECKBOX CONTROL ON DATA TABLE 
      setMasterCheckbox, masterCheckbox,

      //TOGGLE PATIENT EXPORT
      toggleSelectedPatient,

      //GPSYSTEM
      gpSystemSelected, setGpSystemSelected,

      //List Export
      confirmListExport, setConfirmListExport,

      displayExportListAlert, setDisplayExportListAlert,
      exportListType, setExportListType,
      handleContinueListExport, exportExcel,

      emptyExportListAlert, setEmptyExportListAlert

   }



  return (
    <MainContext.Provider value ={ contextValue }>
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider


