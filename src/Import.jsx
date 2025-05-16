
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate} from'react-router-dom'
import Papa from 'papaparse'
import { Button } from './components/ui/button.jsx'
import { GpSystems } from './enums/GPsystems.js'
import { MainContext } from './MainContext'
import { AFibColumns } from './enums/AFibColumns'
import { Alert  } from "@/components/ui/alert";

import { 
   getBloodPressure,
   hasCVD, 
   hasHypertension, 
   onAnticoagulantMeds, 
   onAspirinAntiplateletMeds, 
   onNSAIDMeds, 
   onStatinsMeds 
} from './helper/AFibLTCmeds'

import { transformS1ImportedData } from './helper/S1DataTransform'
import axios from 'axios'

const Import = () => {
   
   const { 
      setImportedData, 
      setRelativeRunDate, 
      setGpSystemSelected,
      gpSystemSelected
   } = useContext(MainContext);
   
   const navigate = useNavigate();

   const [importError, setImportError] = useState("");
   const [displayLatestReportAlert, setDisplayLatestReportAlert] = useState(false);


   const REPORT_COLUMNS = {
      // EMIS: 92,
      EMIS: 91,
      S1:85
   }
   
   // Handles selecting a GP system
   const handleGpSystemSelect = (event) =>{
      setGpSystemSelected(event.target.value);
      setImportError("");
   }

   // Ref for file input element
   const fileInputRef = useRef(null)

   // Handles the click of the import button 
   const handleImportButtonClick = () =>{
      setImportError(""); //Clears any previous error state

      // Checks if a GP system is selected before proceeding
      if(gpSystemSelected === GpSystems.NotSelected){
         setImportError("Please select a clinical system before importing.")
         return;//Exits the function if no system is selected
      }

      // Triggers the file input if a valid GP system is selected 
      if(fileInputRef.current){
         fileInputRef.current.value = "";
         fileInputRef.current.click(); // Simulates a click on the file input
      }
      // console.log(gpSystemSelected)
   }
   
   //Handles the file upload process
   const handleFileUpload = (event) => {

      const files = event.target.files; //Get the files from the input
      if (files.length === 0) return ;// Return if no files are selected;

      const file = files[0]; //Get the first file
      try{
         // Process the file based on the selected GP system
         if (gpSystemSelected === GpSystems.EMIS_Web) {
            handleEMISWebReport(file); //Handle EMIS Web file
         } 
         else if (gpSystemSelected === GpSystems.SystmOne) {
            handleSystmOneReport(file); //Handle systemOne file
         }
      }catch{
         resetFileInput(event.target); //Reset file input in case of error
      } 
   } 

   const parseDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);

   }

   const handleEMISWebReport= (file)=>{
      let runDateTime;
      let relativeRunDate;
      let skipRows = 0; 
      let status;
      let odsCode;
      let differenceInDateInDays;
      
      if (!file ) return;
      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = async () => {


         const lines = reader.result.split('\n');
         const lineToCheck = "Patient Details"
         let odsObject;
         for (let i = 0; i < lines.length; i++){
            if(lines[i].includes(lineToCheck)){
               odsObject = Papa.parse(lines[i + 2])
            }
         }
         const odsArray = odsObject.data[0]
         const odsValue = odsArray[7]
         // console.log(odsCode) 
         
         const odsCodeRegex = /^[A-Z]\d{4,5}$/;

         if (odsCodeRegex.test(odsValue)){
            odsCode = odsValue
         } else {
            odsCode = "UNKNOWN";
         }
         console.log(odsCode)
         
         for (let i = 0; i < lines.length; i++){
            const line = lines[i].split(',');
            
            //Check for the "Last Run" date
            if (line[0].includes("Last Run") || line[0].includes("Last run")) {
               runDateTime = line[3];
            }
            if (line[0].includes("Patient Details") || line[0].toLowerCase().includes("patient details")) {
               skipRows++;

               if (line.length < REPORT_COLUMNS.EMIS || line.length > REPORT_COLUMNS.EMIS + 1) { 
                  console.log(line.length)
                  setGpSystemSelected(GpSystems.EMIS_Web)
                  setImportError("")
                  status = "failure";
                  setTimeout(() => {
                     setImportError("EMIS Web report is not valid. Please import the correct report version. 1")
                  }, 10)
                  if(fileInputRef.current){
                     fileInputRef.current.value = "";
                  }
                  break;
               }
               else{
                  setImportError("")
               }
               break;
            }
            skipRows++;
         }

         if (runDateTime) {
            
            relativeRunDate = runDateTime.split(' ')[0];
            let cleanedRelativeRunDate = relativeRunDate.replace(/"/g, '')
            setRelativeRunDate(cleanedRelativeRunDate);
            const dateOfReport = parseDate(cleanedRelativeRunDate)
            const dateToday = new Date();
            const differenceInDateInMs = Math.abs(dateToday - dateOfReport)
            differenceInDateInDays = Math.floor(differenceInDateInMs / (1000 * 60 * 60 * 24))
            status = "success"
            parseData(file, skipRows, null, differenceInDateInDays);
               
         } 
         else {
            status = "failure"
            setGpSystemSelected(GpSystems.EMIS_Web)
            setImportError("")
            setTimeout(() => {
               setImportError("EMIS Web report is not valid. Please import the correct report version.")
              
            }, 10)

            if(fileInputRef.current){
               fileInputRef.current.value = "";
            }
         }

         try{
            const response = await axios.post ("https://dashboard.qmul-ceg.net:8450/log", {
               tool: "AF tool",
               gp_system: "EMIS Web",
               file_name: file.name,
               ods_code: odsCode,
               status: status,
            },
            {
               headers: {
                  'Content-Type': 'application/json',
               }
            });
         }catch(error){
            console.error("Error:", error.response?.data)
         }
      };
   };

   const handleSystmOneReport = (file) => {

      let status;

      const runDateTime = new Date(file.lastModified);
      let relativeRunDate = runDateTime.getDate() + '-' + runDateTime.toLocaleString('default', { month: 'short' }) + '-' + runDateTime.getFullYear();
      setRelativeRunDate(relativeRunDate);
   
      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = async () => {
         const lines = reader.result.split('\n');
         const firstLine = lines[0].split(',');


         if (firstLine.length !== REPORT_COLUMNS.S1) {
            status="failure"
            setGpSystemSelected(GpSystems.SystmOne)
            setImportError("")
            setTimeout(() => {
               setImportError("EMIS Web report is not valid. Please import the correct report version. ")
            }, 10)
            if(fileInputRef.current){
               fileInputRef.current.value = "";
            }
         }else {

            parseData(file, 1, runDateTime); 
            status = "success"
         }

         try{
            const response = await axios.post ("https://dashboard.qmul-ceg.net:8450/log", {
               tool: "AF tool",
               gp_system: "SystmOne",

               file_name: file.name,
               ods_code: "11111",
               status: status,
            },
            {
               headers: {
                  'Content-Type': 'application/json',
               }
            });
            console.log("Response:", response.data);
            }catch(error){
            console.error("Error:", error.response?.data)
            }

      };
   };   

   const confirmImport = () => {
      setDisplayLatestReportAlert(false)
      navigate("/display")
   }

   const cancelImport = () => {
      setDisplayLatestReportAlert(false)
   }
  
   const displayData = (data, reportDate) => {
      if(reportDate > 14){
         setDisplayLatestReportAlert(true)
         setImportedData(data)
      }
      else {
         
         setImportedData(data)
         navigate("/display"); 
      }
   }

   const parseData = (file, skipLines, runDateTime = null,  reportDate = null, log_details) => {
      Papa.parse(file, {
         header : false,
         skipEmptyLines: false,
         skipFirstNLines: skipLines,
         complete: function (result) {

            let dataArray = [];

               if (gpSystemSelected === GpSystems.EMIS_Web) {
                  result.data.forEach((data, index) => {
                     if (index > skipLines && data[AFibColumns.FullName] !== "") {
                           dataArray.push(Object.values(data));
                           
                           dataArray[dataArray.length - 1][AFibColumns.OnAnticoagulant] = onAnticoagulantMeds(dataArray[dataArray.length - 1]);
                           dataArray[dataArray.length - 1][AFibColumns.OnAspirinAntiplatelet] = onAspirinAntiplateletMeds(dataArray[dataArray.length - 1]);
                           dataArray[dataArray.length - 1][AFibColumns.OnNSAID] = onNSAIDMeds(dataArray[dataArray.length - 1]);
                           dataArray[dataArray.length - 1][AFibColumns.OnStatin] = onStatinsMeds(dataArray[dataArray.length - 1]);
                           dataArray[dataArray.length - 1][AFibColumns.CVD] = hasCVD(dataArray[dataArray.length - 1]);
                           dataArray[dataArray.length - 1][AFibColumns.Hypertension] = hasHypertension(dataArray[dataArray.length - 1]);
                           dataArray[dataArray.length - 1][AFibColumns.BP] = getBloodPressure(dataArray[dataArray.length - 1]);
                        }
                  });
               }

              else if (gpSystemSelected === GpSystems.SystmOne) {                  
                  dataArray = transformS1ImportedData(result.data, runDateTime);
                  dataArray.forEach((dataRow, index) => {
                     dataArray[index][AFibColumns.OnAnticoagulant] = onAnticoagulantMeds(dataRow);
                     dataArray[index][AFibColumns.OnAspirinAntiplatelet] = onAspirinAntiplateletMeds(dataRow);
                     dataArray[index][AFibColumns.OnNSAID] = onNSAIDMeds(dataRow);
                     dataArray[index][AFibColumns.OnStatin] = onStatinsMeds(dataRow);
                     dataArray[index][AFibColumns.CVD] = hasCVD(dataRow);
                     dataArray[index][AFibColumns.Hypertension] = hasHypertension(dataRow);
                     dataArray[index][AFibColumns.BP] = getBloodPressure(dataRow);                                
                  });
              }
  
               displayData(dataArray, reportDate)
            },
         error: function (error) {
            console.error("Error parsing the CSV file:", error);
            alert("Error parsing the CSV file.");
         }
      });
      
   }


   const overlay ={
      position : 'fixed',
      top:0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex:99
   }


  return (
   <>
      <div className = "flex justify-center  items-start h-screen bg-[#21376A]">
         {
            displayLatestReportAlert && (
               <div style={overlay} className= "">
                  <Alert className= " m-auto fixed top-[450px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[42em] flex flex-col text-center justify-center items-center bg-[#21376A] text-white py-2">
                     <p>The report data is over 2 weeks old, would you like to continue with the import?</p>
                     <div className="flex gap-4 mt-2">
                        <button className="w-[6em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md " onClick= {confirmImport}>Continue</button>
                        <button className="w-[6em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md " onClick= {cancelImport}>Cancel</button>
                     </div>
                  </Alert>
               </div>
            )
         }

         <div  className = " w-[40%] max-w-[500px] mt-[20vh] border text-center py-12 rounded-t-lg bg-white">
            <div className="text-center w-full sm:w-auto  flex-row flex-1">
               <h1 className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-sourceSans font-bold text-[#21376A]">
                  Clinical Effectiveness Group
               </h1>
               <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-sourceSans font-bold text-[#21376A]">
                  Atrial Fibrillation tool
               </h1>
            </div>

            <div className=" max-w-[370px]  m-auto mt-4 mb-4 font-semibold">
               <p>This tool has been created to present clinical information coded in the patient health record. It is not a diagnostic tool or intended to replace clinical judgement.</p>
            </div>

            <div className="flex flex-col justify-center items-center mb-6">
               <h2 className="text-xl font-medium text-[#21376A]">Select clinical system and import CSV file </h2>
               <div className="flex items-center mt-4 gap-10 font-bold text-[#21376A]">
                  <label className="text-xl flex flex-col items-center" htmlFor="option-one">
                     EMIS Web
                     <input
                        type="radio"
                        id="option-one"
                        name="gp-system"
                        value={GpSystems.EMIS_Web}
                        onClick={handleGpSystemSelect}
                        className="w-4 h-4 border-2 rounded-full  checked:bg-[#21376A] mr-2 emis_radio_input"
                     />
                     <div className="emis_custom_radio cursor-pointer"></div>
                  </label>   
               
                  <label className="text-xl flex flex-col items-center" htmlFor="option-two">
                     SystmOne
                     <input
                        type="radio"
                        id="option-two"
                        name="gp-system"
                        value={GpSystems.SystmOne}
                        onClick={handleGpSystemSelect}
                        className="w-4 h-4 border-2 rounded-full  checked:bg-[#648DBC] mr-2 systmone_radio_input"
                     />
                     <div className="systmone_custom_radio cursor-pointer"></div>
                  </label>
               </div>
               { importError && <div className = " text-sm text-red-600">{importError}</div>}
            </div>
            
            <div className="flex justify-center ">
               <Button 
                  className="text-center bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white w-[6em] text-lg import_button"       
                  onClick={handleImportButtonClick}
               >
                  Import
               </Button>

               <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style ={{display: 'none'}}
               />
            </div>
         </div>
      </div>
   </> 
  )
}

export default Import