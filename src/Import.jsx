
import React, { useContext, useRef, useState } from 'react'
import { Button, buttonVariants } from './components/ui/button.jsx'
import { useNavigate} from'react-router-dom'
import Papa from 'papaparse'
import { GpSystems } from './enums/GPsystems.ts'
import { MainContext } from './MainContext'
import { AFibColumns } from './enums/AFibColumns'
import { getBloodPressure, hasCVD, hasHypertension, onAnticoagulantMeds, onAspirinAntiplateletMeds, onNSAIDMeds, onStatinsMeds } from './helper/AFibLTCmeds'
import { transformS1ImportedData } from './helper/S1DataTransform'
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"



const Import = () => {
   //Extract functions from MainContext to update data and run date
   const { 
      setImportedData, 
      setRelativeRunDate, gpSystemSelected, setGpSystemSelected,
      setConfirmListExport, confirmListExport
   } = useContext(MainContext)
   
   const navigate = useNavigate()//Hook for programmatic navigation

   // //State to track the selected GP system, initialised to 'Not Selected'
   // const [gpSystemSelected, setGpSystemSelected] = useState(GpSystems.NotSelected)
 
   

   //Sets an error message if no clinical system was selected
   const [error, setError] = useState("")
   const[retryCount, setRetryCount] = useState(0);
   const[selectGpSystemError, setSelectGpSystemError] = useState(false) 
   const [systmOneImportError, setSystmOneImportError] = useState(false);
   const [emisWebImportError, setEmisWebImportError] = useState(false)


   //Sets GPsystem 
   

   // Report columns
   const EMIS_ReportColumnsCount = 92;   //91
   const S1ReportColumnsCount = 85;
   
   // Variable for run date and relative run date (for emis web)
   let runDateTime;
   let relativeRunDate;

   // FILE INPUT FUNCTIONALITY
   
   const handleGpSystemSelect = (event) =>{
      // setGpSystemSelected(GpSystems.NotSelected)
      setGpSystemSelected(event.target.value)
      setError("")
      // if(error){
      //    setError("")
      // }
      
   }
   const fileInputRef = useRef(null)

   const handleButtonClick = () =>{
      setError("");

      if(gpSystemSelected === GpSystems.NotSelected){
         setError("Please select a clinical system before importing.")
         return;
      }

      if(fileInputRef.current){
         fileInputRef.current.click();
      }
      // if (gpSystemSelected !== GpSystems.NotSelected){
      //    // setError("")
      //    if(fileInputRef.current) {
      //       fileInputRef.current.click()
      //    }
      // }else {
      //    setError("Please select a clinical system before importing.")
  
      // }
      
   }

   //IMPORTING FUNCTIONALITY
   
  
   const handleFileUpload = (event) => {
      const files = event.target.files;
      if (files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      try{
         if (gpSystemSelected === GpSystems.EMIS_Web) {
            handleEMISWebReport(file);
         } 
         else if (gpSystemSelected === GpSystems.SystmOne) {
            handleSystmOneReport(file);
         }
      }catch{
         resetFileInput(event.target);
      }
      
   } 

   
   
   // console.log(gpSystemSelected);


   const handleEMISWebReport= (file)=>{
      
      let skipRows = 0; 
            
      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = function (){
         
         const lines = reader.result.split('\n');

         for (let i = 0; i < lines.length; i++){
            const line = lines[i].split(',');
            
            if (line[0].includes("Last Run") || line[0].includes("Last run")) {
               runDateTime = line[3];
            }
            if (line[0].includes("Patient Details") || line[0].toLowerCase().includes("patient details")) {
               skipRows++;

               if (line.length !== EMIS_ReportColumnsCount) { 
                  setGpSystemSelected(GpSystems.EMIS_Web)
                  setError("")
                  setTimeout(() => {
                     setError("EMIS Web report is not valid. Please import the correct report version. ")
                  }, 10)

                  if(fileInputRef.current){
                     fileInputRef.current.value = "";
                  }
                  return;
                  
               }
               else{
                  setError("")
               }
               break;
            }
            skipRows++;
         }

         if (runDateTime) {
            relativeRunDate = runDateTime.split(' ')[0];
            let cleanedRelativeRunDate = relativeRunDate.replace(/"/g, '')
            setRelativeRunDate(cleanedRelativeRunDate);
            parseData(file, skipRows);

         } 
         else {
            setGpSystemSelected(GpSystems.EMIS_Web)
            setError("");
            setTimeout(() => {
               setError("EMIS Web report is not valid. Please import the correct report version.");
            }, 10);
            if(fileInputRef.current){
               fileInputRef.current.value = "";
            }
            return;
         }
         
      };
   };


   const handleSystmOneReport = (file) => {
      // setSystmOneImportError(false)

      runDateTime = new Date(file.lastModified);   //'1-Apr-2024';
      relativeRunDate = runDateTime.getDate() + '-' + runDateTime.toLocaleString('default', { month: 'short' }) + '-' + runDateTime.getFullYear();
      setRelativeRunDate(relativeRunDate);

      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = function(){
         const lines = reader.result.split('\n');
         const line = lines[0].split(',');
         if (line.length !== S1ReportColumnsCount) {
            setGpSystemSelected(GpSystems.SystmOne)
            setError("")
            setTimeout(()=> {
               setError("SystmOne report is not valid, please import correct version report")
            })
            if(fileInputRef.current){
               fileInputRef.current.value = ""
            }
            return;
            // throw new Error("S1 report is not valid, please import correct report version.");           
         }
         let skipRows = 1;
         parseData(file, skipRows);
      };
   };   
   

   function parseData(file, skipLines) {
      setEmisWebImportError(false)
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
                           // dataArray[dataArray.length - 1][AFibColumns.Selected] = true;
                        }
                  });
                  //dataArray.splice(-1);                  
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
      
              setImportedData(dataArray)
              navigate("/display",);
            },
          error: function (error) {
              console.error("Error parsing the CSV file:", error);
              alert("Error parsing the CSV file.");
          }
      });
  }

  


  return (
   <>

      <div className = "flex justify-center  items-start h-screen bg-[#21376A]">
         <div  className = " w-[40%] max-w-[500px] mt-[20vh] border text-center py-12 rounded-t-lg bg-white">
            <div className="text-center w-full sm:w-auto  flex-row flex-1">
               <h1 className="text-sm md:text-md 
                  lg:text-lg xl:text-xl 2xl:text-2xl 
                   font-sourceSans font-bold
                  text-[#21376A]" 
               >Clinical Effectiveness Group</h1>
               <h1 className="text-xl md:text-2xl 
                  lg:text-3xl xl:text-4xl 
                  2xl:text-4xl  font-sourceSans 
                  font-bold
                  text-[#21376A]"
               >Atrial Fibrillation tool </h1>
 
            </div>

            <div className=" max-w-[370px]  m-auto mt-4 mb-4 font-semibold">
               <p>This tool has been created to present clinical information coded in the patient health record. It is not a diagnostic tool or intended to replace clinical judgement.</p>
            </div>

           
               <div>
               </div>
               <div className="flex flex-col justify-center items-center mb-6">
                  <h2 className="text-xl font-medium text-[#21376A]">Select clinical system and import CSV file </h2>
                     {/* <RadioGroup className ="flex justify-center items-center"> */}
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
                  {
                     error && (
                        <div className = " text-sm text-red-600">{error}</div>
                     )
                  }
                  
               </div>
            
            

            <div className="flex justify-center ">
               {/* <Link to="/display"> */}
                  <Button 
                     className="text-center bg-gradient-to-r from-[#7B0E72] from-70%  
                              to-[#E6007E] text-white w-[6em] text-lg import_button" 
                     onClick={handleButtonClick}
                  > 
                     Import
                  </Button>
               {/* </Link> */}
               
               <input
                  type="file"
                  accept=".csv"
                  // onChange={()=>checkSystemSelected(event)}
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
    
//        {/* <header className="mb-4">
//                <img 
//                   src={CegLogo} 
//                   alt="Ceg Logo" 
//                   className="w-[20%] mx-auto "
//                />
//                <h1 className="text-2xl text-center mt-4 font-bold">Atrial Fibrillation Tool </h1>
//             </header> */}
//                {/* <CardTitle>Card Title</CardTitle> */}
               
               
            
            
//             {/* <CardContent className ="text-center"> */}
//                {/* <div>
//             <img />
//             <h1>Atrial Fibrillation Tool </h1>
//             <div>
//                <h2>Select clinical system and import CSV file </h2>
//             </div>
//          </div> w-[40%]*/}// function Import() {
//    console.log("Import component loaded");

//    return (
//       <div>
//          <h1>Import Component Loaded Successfully</h1>
//          <p>Current Path: {window.location.pathname}</p>
//       </div>
//    );
// }

// export default Import;


// const handleFileUpload = (event) =>{
      
   //    //Get File
   //    let files = event.target.files;
   //    if (files.length === 0) return;

   //    const file = files[0]
   //    let skipRows = 0;
   //    let runDateTime;
   //    let relativeRunDate;
      
   //    const reader = new FileReader();

   //    //Check GP system 
   //    if(gpSystemSelected === GpSystems.EMIS_Web){         
 
   //       reader.readAsText(file);

   //       reader.onload = function() {
   //          let lines = reader.result.split('\n');
            
   //          for (let i = 0; i < lines.length; i++){
   //             let line = lines[i].split(',');
   //             if(line[0].includes("Last Run") || line[0].includes("Last run")){
   //                runDateTime = line[3]
   //             }
   //             if(line[0].includes("Patient Details") || line[0].toLowerCase().includes("patient details")){
   //                skipRows++;

   //                if (line.length !== EMIS_ReportColumnsCount) {
   //                   alert("EMIS Web report is not valid, please import correct report version.");
   //                   throw "EMIS Web report is not valid";
   //                }                     
   //                break;
   //             }
   //             skipRows++;
   //          }
   //          if (runDateTime) {                  
   //             relativeRunDate = runDateTime.split(' ')[0] // Splits the run date and time and saves the first value in the variable
   //             setRelativeRunDate(relativeRunDate)
   //             parseData(file, skipRows) //?? HOISTING Function
   //          }
   //          else {
   //             alert("EMIS Web report is not valid, please import correct report version.");
   //             throw "EMIS Web report is not valid";
   //          }
   //       };         
   //    }
   //    else if (gpSystemSelected === GpSystems.SystmOne) {
         
   //       relativeRunDate = '1-Apr-2024';  //file.lastModified;
   //       setRelativeRunDate(relativeRunDate);

   //       reader.readAsText(file);

   //       reader.onload = function() {
   //          let lines = reader.result.split('\n');
   //          let line = lines[0].split(',');

   //          if (line.length !== S1ReportColumnsCount) {
   //             // setS1ImportError(true)

   //             alert("S1 report is not valid, please import correct report version.");
   //             throw "S1 report is not valid";
               
   //             // return;
   //          }
   //          parseData(file, skipRows);
   //       }
         
   //    }      
   // } 
   
   // const checkSystemSelected = (event) =>{
   //    //Checks if a GP system has been selected before importing data, This prevents the import button from being active if no GP System has been selected

   //    //Check if GP system has been selected 
  
   //    if(gpSystemSelected === GpSystems.EMIS_Web || gpSystemSelected === GpSystems.SystmOne ){
   //       handleFileUpload(event)
   //    }
   //    else{
   //       setImportError(true)
   //       alert("Please select a clinical system before importing")
   //    }
         

   //       //If it has been selected run handleFile Upload
   //    //If not throw an error 

   // }      // Checks if there a GP System has been selected 
      // If there is input selected we reference our input button 
      // If no input selected and we click on the Import button an alert will pop up on the screen 
      // setSystmOneImportError(false)
      // setEmisWebImportError(false)  {/* ALERT MESSAGES */}
         {/* {
            s1ImportError && (
               <Alert className ="border w-100 pt-1">
                  <AlertTitle className="border flex">
                     <span>
                     Error!
                     </span>
                     <button className="ml-auto text-sm  hover:text-lg"
                        onClick={()=>setS1ImportError(false)}>
                        &#10005;
                     </button>

                  </AlertTitle>
                  <AlertDescription>
                     SystmOne report is not valid, please import correct report version.
                  </AlertDescription>
               </Alert>
            )
            
         } */}{/* {
                     selectGpSystemError && 
                     (
                        <div className = " text-sm text-red-600">Please select a clinical system.</div>
                     )
                  }
                  {
                     systmOneImportError && 
                     (
                        <div className = " text-sm text-red-600">SystmOne report is not valid, please import correct report version.</div>
                     )
                  }
                  {
                     emisWebImportError && 
                     (
                        <div className = " text-sm text-red-600"> Emis Web report is not valid, please import correct report version.</div>
                     )
                  } */} // setRetryCount(prev => {
                  //    // const newRetryCount = prev + 1;Attempt #${newRetryCount + 1}
                  //    setError(`EMIS Web report is not valid. Please import the correct report version. `)
                    
                  //    return;
                  //    // return newRetryCount;
                  // })// setEmisWebImportError(false)
                  // setEmisWebImportError(true)
                  // setGpSystemSelected(GpSystems.NotSelected)
                  // throw new Error("EMIS Web report is not valid. Please import the correct report version.");