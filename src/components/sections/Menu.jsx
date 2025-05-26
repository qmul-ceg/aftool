import React, { useContext } from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Link } from 'react-router-dom'
import { MainContext } from '@/MainContext'
import { GpSystems } from '@/enums/GPsystems.js';


const Menu = () => {


   const { getFilteredPatients,
      selectedForExport, data, gpSystemSelected, setGpSystemSelected,
      resetAllFilters, confirmListExport, setConfirmListExport,
      setDisplayExportListAlert, 
      setExportListType, setEmptyExportListAlert, emptyExportListAlert
    } = useContext(MainContext);
   
    const filteredPatients = getFilteredPatients();

   




   const handleLoadNewPatientData = () => {
      resetAllFilters()
      setGpSystemSelected(GpSystems.NotSelected)
   } 

   const handleExport = (listType) =>{
      if(Object.keys(selectedForExport).length > 0){
         setDisplayExportListAlert(true)
         setExportListType(listType)
      }
      else if (Object.keys(selectedForExport).length == 0 ){
         setEmptyExportListAlert(true)
      }
   }

  

   return (
      <>
         <div className="flex">

            <div className="mr-2 my-auto">
               <Popover>
                  <PopoverTrigger 
                     className="flex justify-center items-center
                      text-xs 
                      px-2 py-[0.3em]  rounded-lg font-semibold
                     bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white "
                  >
                     User guide & <br></br>resources
                  </PopoverTrigger>
                  <PopoverContent className = "px-2 py-2 w-[14em] mr-28">
                     <div className=" text-sm ">
                        <div> 
                           {/* <a href = "https://www.qmul.ac.uk/ceg/support-for-gp-practices/resources/software-tools/aftool/user-guidance/"
                              className="ml-2 menu_list_items">User guide</a>         */}
                           <ul className="ml-2 menu_list_items">
                              <li>
                                 <a href = "https://www.qmul.ac.uk/ceg/support-for-gp-practices/resources/software-tools/aftool/user-guidance/"
                                    target="_blank" rel="noopener noreferrer"
                                 >
                                    User guide
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="w-full border mt-1 mb-1"></div>
                        <div>
                           <strong>Resources</strong>
                           <ul className="ml-2 menu_list_items">
                              <li><a href="https://www.qmul.ac.uk/ceg/" target="_blank" rel="noopener noreferrer">CEG website</a></li>
                              <li><a href="https://cks.nice.org.uk/topics/anticoagulation-oral/" target="_blank" rel="noopener noreferrer">NICE CKS Anticoagulation</a></li>
                              <li><a href="https://www.mdcalc.com/calc/43/creatinine-clearance-cockcroft-gault-equation" target="_blank" rel="noopener noreferrer">Creatine clearance MDCALC</a></li>
                           </ul>
                        </div>                            
                        
                        

                     </div>
                  </PopoverContent>
               </Popover>
            </div>

            
            <div className="flex border border-[#21376A] rounded-lg ">
               <div className="mr-1">
                  <Popover>
                     <PopoverTrigger className ="h-full ">
                        <div className="text-center  px-6 ">
                           <p className="text-md hover:text-black font-bold text-[#21376A]">Export</p>
                        </div>
                     </PopoverTrigger>
                     <PopoverContent className="px-2 py-2 w-[17em] ml-18">
                        <div className="text-sm">
                           <strong className="text-sm">EXPORT SELECTED PATIENTS LIST</strong>
                           <ul className=" ml-2 menu_list_items">
                              <li><button onClick= {()=> handleExport("excel")}>Excel list</button> </li>
                              <li><button onClick= {()=> handleExport("accurx")}>Accurx list</button> </li>
                              <li><button onClick= {()=> handleExport("nhs_list")}>NHS No. list</button> </li>
                           </ul>
                        </div>
                        
                     </PopoverContent>
                  </Popover>
               </div>

               <div className="">
                  <div className='border border-[#21376A] h-[80%] my-1'>

                  </div>
               </div>

               <div className="ml-1 w-[70%]">
                  <Link to="/">
                     <button className="  flex flex-col  items-center px-4  py-1 hover:text-black group"  onClick ={handleLoadNewPatientData} >
                        <p className="text-xs text-[#21376A]  group-hover:text-black font-bold">Load new <br></br>patient data</p>
                     </button>
                  </Link>

               </div>
            </div>  
         </div>
    </>
  )
}

export default Menu


{/* <button 
   className="font-serif border "
   // className="

   // text-xs xl:text-sm 2xl:text-sm 
   // px-2 rounded-full font-serif font-semibold 
   // bg-gradient-to-r from-[#7B0E72] from-70%   to-[#E6007E] text-white"
>
   i
</button> */}{/* <li><a href='#' onClick={handleExportNHS}>NHS NO. LIST</a></li> */}
{/* onClick={resetFilters} */}
                  
   // const exportExcel = (selectedForExportList, data) => {
      
   //    if (selectedForExportList.length == 0){
   //       alert("No patient statisfied current filter selection, or patient count is '0'");
   //       return;
   //    }

   //    const exportData = Object.keys(selectedForExportList).map((patient)=>{
   //       const patientInfo = data.find((patientName) => patientName[0] === patient);

   //       // console.log(patientInfo)
   //       return{
   //          Name : patientInfo[0],
   //          Age: patientInfo[2],
   //          Gender: patientInfo[3],
   //          "Patient reference" : patientInfo[1],
   //          "CHA₂DS₂-VASc - Value" : patientInfo[27],     
   //          "CHA₂DS₂-VASc - Date)": patientInfo[26],
   //          "ORBIT - Value": patientInfo[30],
   //          "ORBIT - Date": patientInfo[31],
   //          "Anticoagulant issued (6m)" : patientInfo[91],
   //          "Aspirin / antiplatelet issued (6m)" : patientInfo[92],
   //          NSAID: patientInfo[93],
   //          "Statin issued": patientInfo[94],
   //          CVD: patientInfo[95],
   //          BP: patientInfo[97],
   //          "Medication Review Date": patientInfo[90]
            
   //       }
   //    })

   //    // setDisplayExportListAlert(true)
   //    alert("You are about to export a file containing patient-identifiable data. Please make sure the file is saved to an appropriately secure drive.");
   //    // console.log(confirmListExport)
   //    if(confirmListExport){
   //       let worksheet = XLSX.utils.json_to_sheet(exportData, {origin: "A3"})

   //       XLSX.utils.sheet_add_aoa(worksheet,
   //          [["Patient Data Export"]],
   //          {origin: "A1"}
   //       );
   //       //Create a workbook and add the worksheet
   //       const workbook = XLSX.utils.book_new();
   //       XLSX.utils.book_append_sheet(workbook, worksheet, "Patients")

   //       XLSX.writeFile(workbook, "Patients.xlsx")
   //    }
   //    setConfirmListExport(false)
   // };
   // console.log(confirmListExport)

   
   // const exportNHS_list = (selectedForExportList, data) =>{

   //    if (selectedForExportList.length == 0){
   //       alert("No patient statisfied current filter selection, or patient count is '0'");
   //       return;
   //    }
      
   //    const patientsList = Object.keys(selectedForExportList).map(key => {
   //       const patientsToExport = data.find(patients => patients[0] === key) 
   //       return patientsToExport[AFibColumns.NHS_Number]   
   //    })

   //    if(patientsList.length == 0){
   //       alert("No patient statisfied current filter selection, or patient count is '0'")
   //       return;
   //    }
   //    alert("You are about to export a file containing NHS numbers. Please make sure the file is saved to an appropriately secure drive.");

   //    const listToExport = patientsList.join("\n");
   //    const file = new Blob([listToExport], { type : "text/plain"});
   //    const url = URL.createObjectURL(file)

   //    const link = document.createElement("a");
   //    link.href = url;
   //    link.download = "AFib_patients_NHS_number_" + getRandomNumbers() + ".txt";

   //    document.body.appendChild(link)
   //    link.click();
   //    document.body.removeChild(link)
   //    setTimeout(()=>URL.revokeObjectURL(url), 1000)
   // }  

   // const exportAccuRxList = (selectedForExport, data, selGpSystem) => {
   //    // console.log(selGpSystem)
   //    if (selectedForExport.length == 0){
   //       alert("No patient statisfied current filter selection, or patient count is '0'");
   //       return;
   //    }

   //    alert("You are about to export a file containing patient-identifiable data. Please make sure the file is saved to an appropriately secure drive.");
      
   //    let outputContent = "";
   //    if(selGpSystem == GpSystems.EMIS_Web){
   //       outputContent += "EMIS Web, NHS Number"

   //       const patientsList = Object.keys(selectedForExport).map(key => {
   //          const patientsToExport = data.find(patients => patients[0] === key) 
   //          outputContent += "\n" + patientsToExport[AFibColumns.PatientReference] + "," + patientsToExport[AFibColumns.NHS_Number];
   //       })
   //    }
   //    else if(selGpSystem == GpSystems.SystmOne){
   //       outputContent = "NHS Number, Date of Birth, Mobile telephone";

   //       const patientsList = Object.keys(selectedForExport).map(key => {
   //          const patientsToExport = data.find(patients => patients[0] === key) 
   //          outputContent += "\n" + patient[AFibColumns.NHS_Number] + "," + patient[AFibColumns.DateOfBirth] + "," + patient[AFibColumns.MobileTelephone];
   //       })

   //    }
     
   //    const file = new Blob([outputContent], { type : "text/plain"});
   //    const url = URL.createObjectURL(file)

   //    const link = document.createElement("a");
   //    link.href = url;
   //    link.download = "AccuRx_AF_patients_list_" + getRandomNumbers() + ".csv ";

   //    document.body.appendChild(link)
   //    link.click();
   //    document.body.removeChild(link)
   //    setTimeout(()=>URL.revokeObjectURL(url), 1000)

   // }   // function getRandomNumbers() {
   //    let dateObj = new Date()
   //    let dateTime = dateObj.getHours() + '' + dateObj.getMinutes() + '' + dateObj.getSeconds();
   
   //    return dateTime + '' + Math.floor((Math.random().toFixed(2)*100));
   // }