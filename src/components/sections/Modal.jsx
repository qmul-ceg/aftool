import React, { useEffect } from 'react'
import { useContext } from 'react'
import { MainContext } from '@/MainContext'
import {Table, TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { AFibColumns } from '@/enums/AFibColumns'
import { Description } from '@radix-ui/react-dialog'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

const Modal = ({open, }) => {

   // const { setOpenModal, modalOpen } = useContext(MainContext)
   const { setIsModalOpen, 
      selectedPatientData, 
      handleNextPatient, 
      handlePreviousPatient, 
      isModalOpen,
      relativeRunDate
      } = useContext(MainContext)


   if (!open) return null
   
   const freezeBackgroundStyles = {
      position: "fixed",
      marginLeft: "2em"
   }
   // STOPS BACKGROUND FROM SCROLLING
//    useEffect(() => {
//       if (open) {
//           document.body.classList.add('no-scroll');
//       } else {
//           document.body.classList.remove('no-scroll');
//       }
  
//       // Clean up effect
//       return () => {
//           document.body.classList.remove('no-scroll');
//       };
//   }, [open]);
   const cegColors = {
      navy: "#21376A",
      green: "#0C746A",
      red: "#BD1D1D",
      orange: "#D35D0C",
      yellow: "#CDA70A"
   }

   const OVERLAY ={
      position : 'fixed',
      top:0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0, 0.9)',
      zIndex:50
   }

   const medicationTableData = [
      {  medication: "Warfarin (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.WarfarinMed], 
         dateOfIssue: selectedPatientData[AFibColumns.WarfarinDate] 
      },
      {
         medication: "DOAC (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.DOAC_Med], 
         dateOfIssue: selectedPatientData[AFibColumns.DOAC_Date] 
      },
      {
         medication: "Third Party Prescribing (12m)", 
         colorCode: "", 
         medicationName: "", 
         dateOfIssue: "",
      },
      {
         medication: "Other Oral Anticoagulants (12m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.OtherAnticoagulantsMed], 
         dateOfIssue: selectedPatientData[AFibColumns.OtherAnticoagulantsDate] 
      },
      {
         medication: "Aspirin (12m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.AspirinMed], 
         dateOfIssue: selectedPatientData[AFibColumns.AspirinDate] 
      },
      {
         medication: "Other Antiplatelets (12m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.AntiplateletMed], 
         dateOfIssue: selectedPatientData[AFibColumns.AntiplateletDate] 
      },
      {
         medication: "PPI (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.PPI_Med], 
         dateOfIssue: selectedPatientData[AFibColumns.PPI_Date] 
      },
      {
         medication: "NSAID (excluding aspirin) (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.NSAID_Med], 
         dateOfIssue: selectedPatientData[AFibColumns.NSAID_Date] 
      },
      {
         medication: "Statins (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.StatinsMed], 
         dateOfIssue: selectedPatientData[AFibColumns.StatinsDate] 
      }
   ]

   const riskScoreTableData = [
      {
         risk: "CHA₂DS₂-VASc (latest ever)", 
         colorCode: "", 
         score: selectedPatientData[AFibColumns.CHADSVAScValue], 
         dateRecorded: selectedPatientData[AFibColumns.CHADSVAScDate] 
      },
      {
         risk: "ORBIT (latest ever)", 
         colorCode: "", 
         score: selectedPatientData[AFibColumns.ORBIT_Value], 
         dateRecorded: selectedPatientData[AFibColumns.ORBIT_Date] 
      },
      {
         risk: "HAS-BLED (latest ever)", 
         colorCode: "", 
         score: selectedPatientData[AFibColumns.HASBLED_Value], 
         dateRecorded: selectedPatientData[AFibColumns.HASBLED_Date] 
      },
   ]

   const comorbiditiesTableData = [
      {
         comorbidity: "HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2)", 
         colorCode: "", 
         description:"" , 
         dateRecorded: ""
      },
      {
         comorbidity: "Liver Failure", 
         colorCode: "", 
         description: selectedPatientData[AFibColumns.LiverFailureConcept], 
         dateRecorded: ""
      },
      {
         comorbidity: "Heart Valve", 
         colorCode: "", 
         description: selectedPatientData[AFibColumns.HeartValveConcept], 
         dateRecorded: ""
      },
      {
         comorbidity: "Bleeding history", 
         colorCode: "", 
         description: selectedPatientData[AFibColumns.BleedConcept], 
         dateRecorded: ""
      },
      {
         comorbidity: "SMI/Learning Disability/Housebound", 
         colorCode: "", 
         description: selectedPatientData[AFibColumns.SMI_Concept], 
         dateRecorded: ""
      },
      {
         comorbidity: "Dementia", 
         colorCode: "", 
         description: selectedPatientData[AFibColumns.DementiaConcept], 
         dateRecorded: ""
      },
      {
         comorbidity: "Palliative Care", 
         colorCode: "", 
         description: selectedPatientData[AFibColumns.PalliativeCareConcept], 
         dateRecorded: ""
      },
   ]

   const processMeasuresTableData = [
      {
         process: "International normalised ratio (INR)(latest in 24m)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.INR_Value], 
         dateRecorded: selectedPatientData[AFibColumns.INR_Date] 
      },
      {
         process: "Systolic/Diastolic BP (mmHg)(latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.BP], 
         dateRecorded: selectedPatientData[AFibColumns.SystolicBPDate] 
      },
      {
         process: "Alcohol consumption", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.AlcoholValue], 
         dateRecorded: selectedPatientData[AFibColumns.AlcoholDate] 
      },
      {
         process: "Audit Scores * (latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.AuditScoresValue], 
         dateRecorded: selectedPatientData[AFibColumns.AuditScoresDate] 
      },
      {
         process: "eGFR (mL/min)(latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.eGFR_Value], 
         dateRecorded: selectedPatientData[AFibColumns.eGFR_Date]
      },
      {
         process: "Cockcroft-Gault CrCI (mL/min)(latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.CreatClearanceValue], 
         dateRecorded: selectedPatientData[AFibColumns.CreatClearanceDate]
      },
      {
         process: "Serum creatinine level (latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.SerumCreatValue], 
         dateRecorded: selectedPatientData[AFibColumns.SerumCreatDate]
      },
      {
         process: "Serum ALT or ASP (latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.ALT_LFT_Value], 
         dateRecorded: selectedPatientData[AFibColumns.ALT_LFT_Date]
      },
      {
         process: "Haemoglobin (latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.HaemEstimateValue], 
         dateRecorded: selectedPatientData[AFibColumns.HaemEstimateDate]
      },
      {
         process: "Weight (kg)(latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.WeightValue], 
         dateRecorded: selectedPatientData[AFibColumns.WeightDate]
      },
      
   ]


   const convertDate = (dateString) => {
      if (dateString) {
         const [day, month, year] = dateString.split('-');
         const months = { 
            "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", 
            "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", 
            "Nov": "11", "Dec": "12" 
         };
         return `20${year}-${months[month]}-${day}`; 
      }
      return "";
   };
   
   const recordedOverTwelveMonths = (recordedDate, relativeRunDate) => {
      const recorded = new Date(recordedDate); // Convert to Date object
      const cutoffDate = new Date(relativeRunDate); // Reference date
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1); // Subtract 12 months
      return recorded < cutoffDate; // Check if recorded is over 12 months ago
   }

   const convertRelativeRunDate = (dateString) =>{
      if(dateString){
         const [day, month, year] = dateString.split('/');
         return `${year}-${month}-${day}`;
      }
      else return ""
      
   }

   return (
      <>
      <div className="fixed "  style={OVERLAY} />
         
         
         
         <div className="fixed inset-0 max-h-[80vh] w-[60%] max-w-[900px] m-auto z-50  ">
            


            {/* HEADER */}
            <div className="flex justify-between items-center  w-full h-12 px-4 rounded-t-lg bg-[#21376A] text-white">
               <strong>Patient Information</strong>
               <button className=" p-1 text-sm  hover:text-lg " onClick={()=>{
                  // console.log('Closing Modal...')
                  setIsModalOpen((prevState) => !prevState)
                  }}> 
                     &#10005;
               </button>
            </div>

            {/* GET PREVIOUS AND NEXT PATIENT */}
            <div className=" flex justify-center  gap-6 p-2  bg-white">

               <button className=" " onClick={handlePreviousPatient}>
                  <div className="flex flex-col text-xs font-semibold hover:text-sm">
                     <span>Previous patient</span>
                     <span className="">&larr;</span>
                  </div>
               </button>
               <button className=" " onClick={handleNextPatient}>
                  <div className="flex flex-col text-xs font-semibold hover:text-sm">
                     <span>Next patient</span>
                     <span className="">&rarr;</span>
                  </div>  
               </button>
            </div>

            
           
              
            <div className=" text-xs px-2 flex flex-col h-[90%] bg-white">
               <div className="flex w-full  mt-2">

                  {/* TABLE 1 */}
                  <div className="flex flex-col gap-2  w-[50%] text-left">
                     <div className="flex ">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Full name</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.FullName]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Date of birth</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.DateOfBirth]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">NHS number</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.NHS_Number]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Ethnicity</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.EthnicityCodeTerm]}</div>
                     </div>
                  </div>

                  {/* TABLE 2 */}
                  <div className="flex flex-col gap-2 w-[50%] text-left">
                     <div className="flex">
                        <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg whitespace-nowrap">Patient record #</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.PatientReference]}</div>
                     </div>
                     <div className="flex">
                        <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Gender</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.Gender]}</div>
                     </div>
                     <div className="flex">
                        <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Age</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.Age]}</div>
                     </div>
                     <div className="flex">
                        <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Mobile telephone</h2>
                        <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{selectedPatientData[AFibColumns.MobileTelephone]}</div>
                     </div>
                  </div>
               </div>
               
               {/* NOTE AND COLOURS LEGEND */}
               <div className=" text-center mt-6  flex justify-between items-center pl-2 pr-4">
                  <strong>*NOTE: This list of medications is not exhaustive and the patient may be on additional medications not shown below</strong>
                  
                  <div className=" flex " >
                     <span>
                        <Popover>
                           <PopoverTrigger 
                              className="flex justify-center items-center
                              font-serif text-xs px-[0.51em]  rounded-full font-semibold
                              bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white "
                           >
                              i              
                           </PopoverTrigger>
                              <PopoverContent className="p-0 w-[16em] text-sm">
                                 <div className="px-4 py-2 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                       <div className=" w-14 h-5 "
                                          style={{backgroundColor: cegColors.red}}
                                       ></div>
                                       <span>High Risk</span>
                                    </div>
                                    <div className="flex  gap-2">
                                       <div className=" w-14 h-5"
                                       style={{backgroundColor: cegColors.orange}}></div>
                                       <span>Moderate Risk</span>
                                    </div>
                                    <div className="flex  gap-2">
                                       <div className=" w-14 h-5"
                                       style={{backgroundColor: cegColors.yellow}}></div>
                                       <span>Mild Risk</span>
                                    </div>
                                    <div className="flex  gap-2">
                                       <div className=" w-14 h-5 "
                                       style={{backgroundColor: cegColors.green}}></div>
                                       <span>Optimal Treatment</span>
                                    </div>
                                    
                                 </div>
                              </PopoverContent>
                           </Popover>
                     </span>
                  </div>  
               </div>

               
               {/* TABLES */}
               <div className=" flex-1 overflow-y-auto max-h-full mt-2 modal_scrollbar">
                  {/* MEDICATIONS TABLE */}
                  <table className="w-full">
                     <thead className="bg-[#21376A] text-left text-white font-semibold ">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%] rounded-tl-lg ">Medications</th>
                           <th className=" w-[6%] " colSpan="1">&nbsp;</th>
                           <th className=" border-black pl-2">Medication name</th>
                           <th className=" border-black pl-2  w-[15%] rounded-tr-lg">Date of issue</th>

                        </tr>
                     </thead>
                     <tbody className="border-l border-b ">
                        {
                           medicationTableData.map((item, index) =>(
                              <tr key={index} 
                                 className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" }>
                                 <td className="py-1 pl-4 font-semibold">{item.medication}</td>
                                 <td 
                                    className="text-center text-white font-semibold"
                                    style = {{
                                       backgroundColor : (item.medication ==="Warfarin (6m)" ||
                                          item.medication ==="DOAC (6m)" ||
                                          item.medication === "Third Party Prescribing (12m)" ||
                                          item.medication === "Other Oral Anticoagulants (12m)" ||
                                          item.medication === "PPI medication (6m)" ||
                                          item.medication === "Statins (6m)")&& item.medicationName ? cegColors.green
                                          : (item.medication ==="Aspirin (12m)"|| item.medication ==="Other Antiplatelets (12m)") && item.medicationName ? cegColors.orange
                                          : item.medication ==="NSAID (excluding Aspirin)(6m)" && item.medicationName ? cegColors.orange 
                                          : null
                                    }}
                                 >
                                       {item.medicationName ? "YES" : ""}
                                 </td>
                                 <td className="py-1 pl-4">{item.medicationName}</td>
                                 <td className="py-1 pl-4">{item.dateOfIssue}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>
                  {/* RISK SCORE TABLE */}
                  <table className="w-full  mt-4">
                     <thead className="bg-[#21376A] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%] rounded-tl-lg">Risk score</th>
                           <th className="w-[6%]" colSpan="1">&nbsp;</th>
                           <th className=" pl-2">Score</th>
                           <th className=" pl-2 w-[15%] rounded-tr-lg">Date recorded</th>

                        </tr>
                     </thead>
                     <tbody className="border-l border-b ">
                        {
                           riskScoreTableData.map((item, index) =>(
                              <tr key={index} 
                                 className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" }  
                                 
                              >
                                 <td className="py-1 pl-4 font-semibold">
                                    {item.risk}
                                    {item.process}
                                    
                                    {/* Check if item.risk is "CHA₂DS₂-VASc (latest ever)" */}
                                    {item.risk === "CHA₂DS₂-VASc (latest ever)" && (
                                       
                                       <span><Popover >
                                           <PopoverTrigger 
                                                   className=" ml-2 justify-center items-center
                                                   font-serif text-xs px-[0.51em]  rounded-full font-semibold
                                                   bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white "
                                                >i
                                             </PopoverTrigger>
                                       <PopoverContent className="p-0 w-[30em] text-sm">
                                          <div className="py-1 w-full border-b border-gray-200 bg-gray-100 font-bold text-center">CHA₂DS₂-VASc Risk Factors</div>
                                          <table className=" w-full">
                                             <thead className=" border-b border-gray-200 w-full">
                                                <tr className="py-2 text-left">
                                                   <th className="py-1  pl-2">Risk Factors</th>
                                                   <th  className="py-1  pl-2 text-center">Points</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Congestive Heart Failure (CHF)</td>
                                                   <td className =" py-1 pl-2 text-center">1</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Hypertension</td>
                                                   <td className ="py-1 pl-2 text-center">1</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Age ≥ 75</td>
                                                   <td className ="py-1 pl-2 text-center">2</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Age 65 - 74</td>
                                                   <td className =" py-1 pl-2 text-center">1</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Diabetes mellitus</td>
                                                   <td className =" py-1 pl-2 text-center">1</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Ischaemic Stroke/TIA/Thromboembolism</td>
                                                   <td className =" py-1 pl-2 text-center">2</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Vascular disease</td>
                                                   <td className =" py-1 pl-2 text-center">1</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                   <td className=" w-[22em] pl-4">Sex Female</td>
                                                   <td className =" py-1 pl-2 text-center">1</td>
                                                </tr>
                                                

                                             </tbody>

                                          </table>
                                       </PopoverContent>
                                    </Popover>
                                    </span>
                                    )}

                                    {/* Check if item.risk is "ORBIT (latest ever)" */}
                                    {item.risk === "ORBIT (latest ever)" && (
                                       <span>
                                             <Popover>
                                                <PopoverTrigger 
                                                   className=" ml-2 justify-center items-center
                                                   font-serif text-xs px-[0.51em]  rounded-full font-semibold
                                                   bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white "
                                                >i
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0 w-[40em] text-sm">
                                                   <div className="py-1 w-full border-b border-gray-200 bg-gray-100 font-bold text-center">
                                                   Orbit Bleeding Risk Score for AF
                                                   </div>
                                                   <table className=" w-full">
                                                         <thead className=" w-full">
                                                            <tr className="border-b border-gray-200 py-2 text-left">
                                                               <th className="  py-1 pl-2 w-[32em]">Clinical Characteristics</th>
                                                               <th className="py-1 pl-2 text-center">Points</th>
                                                            </tr>
                                                         </thead>
                                                         <tbody>
                                                            <tr className="border-b border-gray-200">
                                                               <td className="w-[22em] pl-2" colSpan="3">
                                                                     <div>
                                                                        <header className="font-semibold">Sex</header>
                                                                        <p className="pl-4">- Males with haemoglobin {"<"}130 g/L or hematocrit {"<"}40%</p>
                                                                        <p className="pl-4"> - Females with haemoglobin {"<"}120 g/L or hematocrit {"<"}36%</p>
                                                                     </div>
                                             
                                                               </td>
                                                               
                                                            </tr>
                                                            <tr className="border-b border-gray-200">
                                                               <td className="w-[22em] pl-2">Haemoglobin {"<"}120/130 g/L or hematocrit {"<"}36%/40% </td>
                                                               <td className="py-1 pl-2 text-center">2</td>
                                                            </tr>
                                                            <tr className="border-b border-gray-200">
                                                               <td className="w-[22em] pl-2">Age {">"} 74 years</td>
                                                               <td className="py-1 pl-2 text-center">1</td>
                                                            </tr>
                                                            <tr className="border-b border-gray-200">
                                                               <td className="w-[22em] pl-2">
                                                                     <div>
                                                                        <header className="font-semibold">Bleeding history</header>
                                                                        <p className="pl-4">Any history of GI bleeding, intracranial bleeding, or hemorrhagic stroke</p>
                                                                        
                                                                     </div>
                                                               </td>
                                                               <td className="py-1 pl-2 text-center"> 2</td>
                                                            </tr>
                                                            <tr className="border-b border-gray-200">
                                                               <td className="w-[22em] pl-2">eGFR {"<"}60 mL/min/1.73 m</td>
                                                               <td className="py-1 pl-2 text-center">1</td>
                                                            </tr>
                                                            <tr className="border-b border-gray-200">
                                                               <td className="w-[22em] pl-2">Treatment with antiplatelet agents</td>
                                                               <td className="py-1 pl-2 text-center">1</td>
                                                            </tr>


                                                   
                                                         </tbody>


                                                         
                                                   </table>
                                                            <table className="w-full  "> 
                                                            <thead className="">
                                                                  <tr className="py-1 w-full border-b border-gray-200 bg-gray-100 font-bold text-center">
                                                                        <th className=" w-1/4">ORBIT Score</th>
                                                                        <th className=" w-1/3">Risk Group</th>
                                                                        <th className="w-1/3 "> Bleeds per 100 patient years</th>

                                                                  </tr>            
                                                            </thead>
                                                            <tbody className="text-center">
                                                               <tr className="border-b border-gray-200">
                                                                  <td>0-2</td>
                                                                  <td>Low</td>
                                                                  <td>2.4</td>
                                                               </tr>
                                                               <tr className="border-b border-gray-200">
                                                                  <td>3</td>
                                                                  <td>Medium</td>
                                                                  <td>4.7</td>
                                                               </tr>
                                                               <tr className="border-b border-gray-200">
                                                                  <td>4.7</td>
                                                                  <td>High</td>
                                                                  <td>8.1</td>
                                                               </tr>
                                                            </tbody>               
                                                      
                                                         </table>         
                                                   
                                                </PopoverContent>
                                             </Popover>
                                       </span>
                                    )}



                                 </td>
                                 <td className={`
                                    ${
                                       !item.score && 
                                       item.risk === "CHA₂DS₂-VASc (latest ever)" ? "bg-red-500" : null
                                    }
                                    
                                    `}>
                                      

                                    </td>
                                 <td className="py-1 pl-4"> {!item.score ? "Not Recorded" : item.score}</td>
                                 <td className="py-1 pl-4">{item.dateRecorded}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>
                  

                  {/* COMORBODITIES TABLE  */}
                  <table className="w-full mt-4">
                     <thead className="bg-[#21376A] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%] rounded-tl-lg">Comorbiditiies</th>
                           <th className="w-[6%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4">Description</th>
                           <th className=" pl-2 w-[15%] rounded-tr-lg">Date recorded</th>
                        </tr>
                     </thead>
                     <tbody className="border-l border-b ">
                        {
                           comorbiditiesTableData.map((item, index) =>(
                              <tr key={index} 
                                 className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" } 
                              >
                                 <td 
                                    className="py-1 pl-4 font-semibold">{item.comorbidity}
                                 </td>
                                 <td 
                                    className="text-center text-white font-semibold"
                                    style ={{
                                       backgroundColor: 
                                          item.comorbidity ==="HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2)" &&
                                          ((selectedPatientData[AFibColumns.HF_Concept]) ||
                                          (selectedPatientData[AFibColumns.CKD3_5_Concept]) ||
                                          (selectedPatientData[AFibColumns.IHD_Concept])||
                                          (selectedPatientData[AFibColumns.StrokeTIA_Concept]) ||
                                          (selectedPatientData[AFibColumns.NonHaemStrokeConcept]) ||
                                          (selectedPatientData[AFibColumns.PAD_Concept]) ||
                                          (selectedPatientData[AFibColumns.Hypertension]) ||
                                          (selectedPatientData[AFibColumns.DiabetesConcept]))
                                          ? cegColors.orange
                                          : item.comorbidity ==="Liver Failure" && selectedPatientData[AFibColumns.LiverFailureConcept] ? cegColors.orange
                                          : item.comorbidity ==="Heart Valve" && selectedPatientData[AFibColumns.HeartValveConcept] ? cegColors.orange
                                          : item.comorbidity ==="Bleeding history" && selectedPatientData[AFibColumns.BleedConcept] ? cegColors.red
                                          : item.comorbidity ==="Palliative Care" && selectedPatientData[AFibColumns.PalliativeCareConcept] ? cegColors.red
                                          : item.comorbidity ==="Dementia" && selectedPatientData[AFibColumns.DementiaConcept] ? cegColors.orange
                                          : item.comorbidity ==="SMI/Learning Disability/Housebound" &&
                                          (selectedPatientData[AFibColumns.SMI_Concept] ||
                                          selectedPatientData[AFibColumns.LD_Concept] ||
                                          selectedPatientData[AFibColumns.HouseboundConcept]) ?  cegColors.orange
                                          :null 
                                    }}
                                          
                                    // className={`text-center text-white font-semibold
                                    //    ${
                                    //       item.comorbidity ==="HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2)" 
                                    //       && 
                                    //       (
                                    //          (selectedPatientData[AFibColumns.HF_Concept]) ||
                                    //          (selectedPatientData[AFibColumns.CKD3_5_Concept]) ||
                                    //          (selectedPatientData[AFibColumns.IHD_Concept])||
                                    //          (selectedPatientData[AFibColumns.StrokeTIA_Concept]) ||
                                    //          (selectedPatientData[AFibColumns.NonHaemStrokeConcept]) ||
                                    //          (selectedPatientData[AFibColumns.PAD_Concept]) ||
                                    //          (selectedPatientData[AFibColumns.Hypertension]) ||
                                    //          (selectedPatientData[AFibColumns.DiabetesConcept])
                                    //       )
                                    //       ? " bg-orange-400" 
                                    //       : null
                                    //    }
                                    //    ${
                                    //       item.comorbidity ==="Liver Failure" &&
                                    //       selectedPatientData[AFibColumns.LiverFailureConcept] ? " bg-orange-400" : null
                                          
                                    //    }
                                    //    ${
                                    //       item.comorbidity ==="Heart Valve" &&
                                    //       selectedPatientData[AFibColumns.HeartValveConcept] ? " bg-orange-400" : null
                                          
                                    //    }
                                    //    ${
                                    //       item.comorbidity ==="Bleeding history" &&
                                    //       selectedPatientData[AFibColumns.BleedConcept] ? " bg-red-600" : null
                                          
                                    //    }
                                    //    ${
                                    //       item.comorbidity ==="Palliative Care" &&
                                    //       selectedPatientData[AFibColumns.PalliativeCareConcept] ? " bg-red-600" : null
                                          
                                    //    }
                                    //    ${
                                    //       item.comorbidity ==="Dementia" &&
                                    //       selectedPatientData[AFibColumns.DementiaConcept] ? " bg-orange-400" : null
                                          
                                    //    }
                                    //    ${
                                    //       item.comorbidity ==="SMI/Learning Disability/Housebound" &&
                                    //       (selectedPatientData[AFibColumns.SMI_Concept] ||
                                    //       selectedPatientData[AFibColumns.LD_Concept] ||
                                    //       selectedPatientData[AFibColumns.HouseboundConcept]) ?  "bg-orange-400" : null
                                          
                                          
                                    //    }            
                                    //               `
                                    // }
                                 >
                                    {
                                       item.comorbidity ==="HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2)"
                                       && 
                                       ((selectedPatientData[AFibColumns.HF_Concept]) ||
                                       (selectedPatientData[AFibColumns.CKD3_5_Concept]) ||
                                       (selectedPatientData[AFibColumns.IHD_Concept])||
                                       (selectedPatientData[AFibColumns.StrokeTIA_Concept]) ||
                                       (selectedPatientData[AFibColumns.NonHaemStrokeConcept]) ||
                                       (selectedPatientData[AFibColumns.PAD_Concept]) ||
                                       (selectedPatientData[AFibColumns.Hypertension]) ||
                                       (selectedPatientData[AFibColumns.DiabetesConcept])
                                       )? "YES" : null

                                    }
                                    {
                                       item.comorbidity ==="Liver Failure" && selectedPatientData[AFibColumns.LiverFailureConcept]  ? "YES" : null
                                    }
                                    {
                                       item.comorbidity ==="Heart Valve" && selectedPatientData[AFibColumns.HeartValveConcept] ? "YES" : null
                                    }
                                    {
                                       item.comorbidity ==="Bleeding history" && selectedPatientData[AFibColumns.BleedConcept]  ? "YES" : null
                                    }
                                    {
                                       (item.comorbidity ==="SMI/Learning Disability/Housebound" &&
                                          (
                                             selectedPatientData[AFibColumns.SMI_Concept] ||
                                             selectedPatientData[AFibColumns.LD_Concept] ||
                                             selectedPatientData[AFibColumns.HouseboundConcept]

                                          ) ? "YES" : null


                                       ) 
                                    }
                                    {
                                       (item.comorbidity ==="Dementia" && selectedPatientData[AFibColumns.DementiaConcept]  ? "YES" : null )
                                    }
                                    {
                                       (item.comorbidity ==="Palliative Care" && selectedPatientData[AFibColumns.PalliativeCareConcept]  ? "YES" : null )
                                    }
                                    
                                   
                                 </td>
                              
                                 <td className="py-1 pl-4">
                                 {/* HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2) */}
                                    {(() => {
                                          

                                          if(item.comorbidity ==="HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2)"){
                                             let description = [];
                                             if (selectedPatientData[AFibColumns.HF_Concept]) {
                                                description.push("Heart Failure");
                                             }
                                             if (selectedPatientData[AFibColumns.CKD3_5_Concept]) {
                                                description.push("CKD 3-5");
                                             }
                                             if (selectedPatientData[AFibColumns.IHD_Concept]) {
                                                description.push("IHD");
                                             }
                                             if (selectedPatientData[AFibColumns.StrokeTIA_Concept] || selectedPatientData[AFibColumns.NonHaemStrokeConcept]) {
                                                description.push("Stroke/TIA");
                                             }
                                             if (selectedPatientData[AFibColumns.PAD_Concept]) {
                                                description.push("PAD");
                                             }
                                             if (selectedPatientData[AFibColumns.Hypertension]) {
                                                description.push("Hypertension");
                                             }
                                             if (selectedPatientData[AFibColumns.DiabetesConcept]) {
                                                description.push("Diabetes");
                                             }

                                          // Return description, or "No Data" if empty
                                             return description.length > 0 ? description.join(", ") : null;
                                          }
                                          
                                          else if(item.comorbidity ==="Liver Failure"){
                                             return selectedPatientData[AFibColumns.LiverFailureConcept] ? "Liver Failure" : null
                                          }
                                          else if(item.comorbidity ==="Heart Valve"){
                                             return selectedPatientData[AFibColumns.HeartValveConcept] ? "Heart Failure" : null
                                          }
                                          else if(item.comorbidity ==="Bleeding history"){
                                             return selectedPatientData[AFibColumns.BleedConcept] ? "Bleeding history" : null
                                          }
                                          else if(item.comorbidity ==="SMI/Learning Disability/Housebound"){
                                             let smiArray=[]
                                             if (selectedPatientData[AFibColumns.SMI_Concept]) {
                                                smiArray.push("SMI");
                                             }
                                             if (selectedPatientData[AFibColumns.LD_Concept]) {
                                                smiArray.push("Learning Disability");
                                             }
                                             if (selectedPatientData[AFibColumns.HouseboundConcept]) {
                                                smiArray.push("Housebound");
                                             }
                                             return smiArray.length > 0 ? smiArray.join(", ") : null;
                                          }
                                          else if(item.comorbidity ==="Dementia"){
                                             return selectedPatientData[AFibColumns.DementiaConcept] ? "Dementia" : null
                                          }else if(item.comorbidity ==="Palliative Care"){
                                             return selectedPatientData[AFibColumns.PalliativeCareConcept] ? "Palliative care" : null
                                          }

                                          
                                       })()}
                                 </td>
                                 <td className="py-1 pl-4">{item.dateRecorded}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>


                  {/* PROCESS MEASURES */}
                  <table className="w-full  mt-4">
                     <thead className="bg-[#21376A] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%] rounded-tl-lg">Process measures</th>
                           <th className="w-[6%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4">Value</th>
                           <th className=" pl-2 w-[15%] rounded-tr-lg">Date recorded</th>

                        </tr>
                     </thead>
                     <tbody className="border-l border-b ">
                        <tr>
                           <td className="font-semibold text-[#E6007E] pl-8 py-1" colSpan="3">*INR values may not be recorded in the GP system and may be under reported in this tool.</td>
                        </tr>
                        {
                           processMeasuresTableData.map((item, index) =>(
                              <tr key={index} 
                              className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" }    
                              >
                                 
                                 <td className="py-1 pl-4 font-semibold">{item.process}
                                    {item.process === "Audit Scores * (latest ever)" && (
                                       
                                       <span>
                                          
                                          <Popover >
                                             <PopoverTrigger 
                                                   className=" ml-2 justify-center items-center
                                                   font-serif text-xs px-[0.51em]  rounded-full font-semibold
                                                   bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white "
                                                   >
                                                      i
                                             </PopoverTrigger>
                                             <PopoverContent className="p-0 w-[25em] text-sm">
                                                <table className="border w-full ">
                                                   <thead className="border bg-gray-100">
                                                      <tr className="py-2">
                                                         <th className="py-1">AUDIT SCORES *</th>
                                                      </tr>
                                                   </thead>
                                                   <tbody >
                                                      <tr>
                                                         <td className ="border-b border-gray-100 py-1 pl-2">AUDIT {">"} 15: High or severe drinking risk</td>
                                                      
                                                      </tr>
                                                      <tr>
                                                         <td className ="border-b border-gray-100 py-1 pl-2">AUDIT-C {">"} 5: High or severe drinking risk</td>
                                                      
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </PopoverContent>
                                          </Popover>
                                       </span>
                                    )}


                                 </td>
                                 <td 
                                    style ={{
                                       backgroundColor: item.process === "Systolic/Diastolic BP (mmHg)(latest ever)" && selectedPatientData[AFibColumns.SystolicBPValue] >= 160 
                                       ? cegColors.red
                                       : (item.process === "Systolic/Diastolic BP (mmHg)(latest ever)" 
                                          && selectedPatientData[AFibColumns.SystolicBPValue] >= 140) ||
                                          (item.process === "Alcohol consumption"
                                          && selectedPatientData[AFibColumns.AlcoholValue] >= 14) ||
                                          (item.process === "eGFR (mL/min)(latest ever)"
                                          && ((selectedPatientData[AFibColumns.eGFR_Value] < 60) &&
                                          (selectedPatientData[AFibColumns.eGFR_Value] > 0)))
                                       ? cegColors.orange
                                       : null
                                    }}
                                 >
                                 </td>
                                 <td className="py-1 pl-4">
                                    {item.value}
                                 </td>
                                 <td className="py-1 pl-4">{item.dateRecorded}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>
                  {/* MEDICATION REVIEW */}
                  <table className="w-full  mt-4">
                     <thead className="bg-[#21376A] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%] rounded-tl-lg">Medication review</th>
                           <th className="w-[6%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4"></th>
                           <th className=" pl-2 w-[15%] rounded-tr-lg">Date recorded</th>

                        </tr>
                     </thead>
                     <tbody className="border-l border-b ">
                           <tr className="bg-gray-50 border-b">
                              <td className="py-1 pl-4 font-semibold ">Medication reviews (latest ever)</td>
                              <td
                                 className="text-center text-white font-semibold"
                                 style = {{
                                    backgroundColor: recordedOverTwelveMonths(
                                             convertDate(selectedPatientData[AFibColumns.MedsReviewDate]),
                                             convertRelativeRunDate(relativeRunDate)
                                          ) ? cegColors.orange
                                          : selectedPatientData[AFibColumns.MedsReviewConcept]
                                          ? cegColors.green
                                          : cegColors.red

                                 }}
                        
                              >
                                 {selectedPatientData[AFibColumns.MedsReviewConcept] 
                                 ? "YES" 
                                 : "NO"
                                 }
                              </td>
                              <td className="py-1 pl-4">
                                    {  selectedPatientData[AFibColumns.MedsReviewConcept] 
                                       ? "Medication review": null
                                    }
                              </td>
                              <td className="py-1 pl-4">{selectedPatientData[AFibColumns.MedsReviewDate]}</td>
                           </tr>
                          
                     </tbody>
                  </table>

                   {/* EXCEPTION REPORTING */}
                   <table className="w-full  mt-4 mb-6">
                     <thead className="bg-[#21376A] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%] rounded-tl-lg">Exception reporting</th>
                           <th className="w-[6%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4"></th>
                           <th className=" pl-2 w-[15%] rounded-tr-lg">Date recorded</th>
                        </tr>
                     </thead>
                     <tbody className="border-l border-b ">
                        <tr className="bg-gray-50 border-b">
                           <td className="py-1 pl-4 font-semibold ">Anticoagulants contraindicated (latest ever)</td>
                           <td className=" text-center text-white font-semibold"
                               style ={{
                                          backgroundColor: selectedPatientData[AFibColumns.AnticoagContraCodeTerm]
                                          ? cegColors.orange
                                          : null

                               }}>{selectedPatientData[AFibColumns.AnticoagContraCodeTerm] ? "YES" : null }
                           </td>
                           <td></td>
                           <td className="py-1 pl-4">{selectedPatientData[AFibColumns.AnticoagContraDate]}</td>
                        </tr>
                        
                        
                        <tr>
                           <td className="py-1 pl-4 font-semibold ">Anticoagulants declined (latest ever)</td>
                           <td className=" text-center text-white font-semibold"
                               style ={{
                                          backgroundColor: selectedPatientData[AFibColumns.AnticoagDeclineCodeTerm]
                                          ? cegColors.orange
                                          : null

                               }}>{selectedPatientData[AFibColumns.AnticoagDeclineCodeTerm] ? "YES" : null }
                           </td>
                           <td></td>
                           <td className="py-1 pl-4">{selectedPatientData[AFibColumns.AnticoagDeclineDate]}</td>
                        </tr>
                          
                     </tbody>
                  </table>
                  
            </div>
         </div>
          {/* ))}  */}

      
      </div>
      </>
   )
}

export default Modal


