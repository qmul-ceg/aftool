import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { MainContext } from '@/MainContext'
import { AFibColumns } from '@/enums/AFibColumns'

// import { useReactTable } from '@tanstack/react-table'


const Data = () => {

   const { 
      getFilteredPatients, 
      setIsModalOpen, 
      handlePatientClick,
      handleSortClick,
      data, sortChdValue,
      setImportedData, setExportCount,
      selectedForExport, setSelectedForExport, 
      masterCheckbox, setMasterCheckbox, toggleSelectedPatient
      } = useContext(MainContext)


   useEffect(()=>{
      //put all patients in an array 
      // setSelectedForExport({})
      const patientsSelectedForExport = {}

      const updateSelectedForExport = () => {
         data.forEach((patient) => {
            patientsSelectedForExport[patient[0]] = true;
         })
         setSelectedForExport(patientsSelectedForExport) 
      }
      
      
      updateSelectedForExport()
   }, [ data])


   useEffect(()=>{
      //Sets master checkbox to true if all the patients are selected
      if(data.length !== Object.keys(selectedForExport).length ){
         setMasterCheckbox(false)
      }
      else{
         setMasterCheckbox(true)
      }
   }, [selectedForExport, data])



   const handleMasterCheckBox = () => {
      //Sets master checkbox when we click it 
      setMasterCheckbox((prevMasterCheckBoxState) => {
         const newMasterCheckBoxState = !prevMasterCheckBoxState;

         if(newMasterCheckBoxState){
               const patientsSelectedForExport = {}


            data.forEach((patient) => {
               patientsSelectedForExport[patient[0]] = true;
            })
            setSelectedForExport(patientsSelectedForExport)
         }
         else{
            setSelectedForExport({})
         }
            return newMasterCheckBoxState
      })
   }
   
   
  
   useEffect(()=>{
      const patientExportCount  = Object.fromEntries(
         Object.entries(selectedForExport).filter(([key, value]) => value == true )
      )
      setExportCount(Object.keys(patientExportCount).length)
     
   },[toggleSelectedPatient])
   
   const theadRef= useRef(null);
   const [headerHeight, setHeaderHeight] = useState(0)

   useEffect(() => {

      const updateTableHeaderHeight= () =>{
         if(theadRef.current){
            const newHeight = theadRef.current.offsetHeight - 6
            setHeaderHeight(theadRef.current.offsetHeight)
            document.documentElement.style.setProperty('--header-height', `${newHeight}px`)
         }
      }
      
      updateTableHeaderHeight();

      window.addEventListener("resize", updateTableHeaderHeight)

      return () => {
         window.addEventListener("resize", updateTableHeaderHeight)
      }

   }, [])


  return (

   // max-h-[400px]
   // <div className="border-[0.1em] rounded-t-lg  border-[#21376A] max-h-[400px] overflow-y-auto "> 
   <div className=" rounded-t-lg  ">   
      <table className="w-full border-separate border-spacing-0 ">
        
         <thead ref = {theadRef} className=" text-[10em] lg:text-xs xl:text-sm 2xl:text-[1em] table_header ">
            <tr className="text-[#21376A] ">
               <th 
                  rowSpan={2} 
                  // className="w-[2%] border-l-[0.1em] border-[#21376A]"
                  className="w-[2%] relative"
               >
                     <input
                        type="checkbox"
                        checked={masterCheckbox}
                        className="header_checkbox"
                        onChange={handleMasterCheckBox}
                     />
                     {/* // onChange={()=>setSelectAll(!selectAll)}
                        // checked={selectAll} */}
                     {/* below div is for customised check box, styling can be found in index.css */}
                     <div className="custom_header_checkbox"></div> 
               </th>
               <th rowSpan={2} className="w-[15%] ">Full name</th>
               <th rowSpan={2} className="w-[2%]  ">Age</th>
               <th rowSpan={2} className="w-[4%]">Gender</th>
               <th rowSpan={2} className="w-[6%] ">Patient reference no.</th>
               <th colSpan="2 " className="sub_header min-w-[11em] w-[8%]">CHA₂DS₂-VASc</th>
               <th colSpan="2" className="sub_header min-w-[11em] w-[8%]">ORBIT</th>
               <th rowSpan={2} className="w-[4%]">Anticoagulant issued (6m)</th>
               <th rowSpan={2} className="w-[8%] ">Aspirin / antiplatelet <br />issued (6m)</th>
               <th rowSpan={2} className="w-[3%]">NSAID</th>
               <th rowSpan={2} className="w-[5%] ">Statin issued (6m)</th>
               <th rowSpan={2} className="w-[4%] ">CVD</th>
               {/* <th rowSpan={2} className="w-[4%]">HTN</th> */}
               <th rowSpan={2} className="w-[2%] ">BP</th>
               <th rowSpan={2} className="w-[8%] med_review">Med review date</th>
            </tr>

            <tr className="text-[#21376A]">
            
               <th className="border-r-[0.1em]  border-t-[0.1em] border-[#21376A] " >
                  {/* {sortChdValue === "asc" ? ' ↑' : ' ↓'} hover:cursor-pointer */}
                  <span>Value </span>
               </th>
               <th className="border-r-[0.1em]   border-t-[0.1em] border-[#21376A]">Latest date</th>
            {/* ORBIT */}
               <th className="border-r-[0.1em] border-t-[0.1em] border-[#21376A]">Value</th>
               <th className="border-r-[0.1em] border-t-[0.1em] border-[#21376A]">Latest date</th>

            </tr>
         </thead>
         
         {/* top-12 */}


         <tbody className="text-center lg:text-xs xl:text-sm 2xl:text-sm ">
            {data.map((patient, id) => 
                (
                  //Changed key to AFib Columns ... 
                  <tr key={patient[AFibColumns.PatientReference]} className="border-b hover:bg-gray-100 relative" >
                     <td className=" ">
                        <input
                           type="checkbox"
                           checked={!!selectedForExport[patient[0]]}
                           className="patient_checkbox"
                           onChange={()=>toggleSelectedPatient(patient[0])}
                        />
                           {/* below div is for customised check box, styling can be found in index.css */}
                           <div className="custom_patient_checkbox"></div> 
                        
                     </td>
                     <td className="font-medium text-left px-4 cursor-pointer text-blue-600 hover:underline"
                        onClick={()=>handlePatientClick(id)}
                     >
                        {patient[AFibColumns.FullName]}
                     </td>
                     <td>{patient[AFibColumns.Age]}</td>
                     <td>{patient[AFibColumns.Gender]}</td>
                     <td>{patient[AFibColumns.PatientReference]}</td>
                     <td>{patient[AFibColumns.CHADSVAScValue]}</td>
                     <td>{patient[AFibColumns.CHADSVAScDate]}</td>
                     <td>{patient[AFibColumns.ORBIT_Value]}</td>
                     <td>{patient[AFibColumns.ORBIT_Date]}</td>
                     <td>{patient[AFibColumns.OnAnticoagulant]}</td>
                     <td>{patient[AFibColumns.OnAspirinAntiplatelet]}</td>
                     <td>{patient[AFibColumns.OnNSAID]}</td>
                     <td>{patient[AFibColumns.OnStatin]}</td>
                     <td>{patient[AFibColumns.CVD]}</td>
                     <td>{patient[AFibColumns.BP]}</td>
                     <td>{patient[AFibColumns.MedsReviewDate]}</td>
                  </tr>
               )
            )}
         </tbody>
      
      </table>     

    </div>

  )
}

export default Data




