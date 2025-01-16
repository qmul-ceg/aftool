import React, { useContext, useEffect, useState } from 'react'
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
      setImportedData
      } = useContext(MainContext)

   
   const [selectAll, setSelectAll] = useState(true)
   const [selectedRows, setSelectedRows] = useState([])
   

   // const handleSelectAll = () => {
   //    setSelectAll(!selectAll)
   // }

   const [selectedForExport, setSelectedForExport] = useState({})
   //Initiate a useState variable that holds an object containing the ids of patients we want to export
   
   // useEffect(() => {
   //    const patientsSelectedForExport = {}
   //    data.map((patient) =>{
   //       patientsSelectedForExport[patient.id] = true
   //    })

   //    setSelectedForExport(patientsSelectedForExport)
   // }, [data])
   
   
   
   const handleSelectAll = () => {
      // This function toggles the select all button table header it allows the user to 
      // select and deselect patients they want to add to the export list
      // selected patients are added based on their ids to the selectedForExport variable 

      const selectedPatientsForExport = {}
   
      if (Object.keys(selectedForExport).length === 0){
         data.map((patient) => (
            selectedPatientsForExport[patient.id] = true
         ));
         setSelectedForExport(selectedPatientsForExport)
      }
      else {
         setSelectedForExport({})
      }
   }
   //when we click the header we should be able to toggle the select all 
   // if we click an individaual patient we remove individual ids from select all
   const toggleSelectedPatient = (id) => {
      
      
      setSelectedForExport((prev) => {
         console.log('Previous State:', prev); // Log previous state
         console.log('Toggling ID:', id); 
         return {
            ...prev, 
            [id] : !prev[id],
         }
   })
      
   }


  return (

   // max-h-[400px]
   // <div className="border-[0.1em] rounded-t-lg  border-[#21376A] max-h-[400px] overflow-y-auto "> 
   <div className=" rounded-t-lg  ">   
      <table className="w-full border-separate border-spacing-0 ">
        
         <thead className=" text-[10em] lg:text-xs xl:text-sm 2xl:text-[1em] table_header ">
            <tr className="text-[#21376A] ">
               <th 
                  rowSpan={2} 
                  // className="w-[2%] border-l-[0.1em] border-[#21376A]"
                  className="w-[2%] "
               >
                     <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        // checked={selectAll}
                        className="header_checkbox"
                     />
                     {/* below div is for customised check box, styling can be found in index.css */}
                     <div className="custom_header_checkbox"></div> 
               </th>
               <th rowSpan={2} className="w-[12%] ">Full name</th>
               <th rowSpan={2} className="w-[4%]  ">Age</th>
               <th rowSpan={2} className="w-[5%]">Gender</th>
               <th rowSpan={2} className="w-[7%] ">Patient reference no.</th>
               <th colSpan="2 " className="sub_header">CHA₂DS₂-VASc</th>
               <th colSpan="2" className="sub_header">ORBIT</th>
               <th rowSpan={2} className="w-[7%]">Anticoagulant issued (6m)</th>
               <th rowSpan={2} className="w-[9%] ">Aspirin / antiplatelet <br />issued (6m)</th>
               <th rowSpan={2} className="">NSAID</th>
               <th rowSpan={2} className="w-[6%] ">Statin issued (6m)</th>
               <th rowSpan={2} className="w-[4%] ">CVD</th>
               <th rowSpan={2} className="w-[4%]">HTN</th>
               <th rowSpan={2} className="w-[4%] ">BP</th>
               <th rowSpan={2} className="med_review">Med review date</th>
            </tr>

            <tr className="text-[#21376A]">
            {/* CHA₂DS₂-VASc */}
               <th className="border-r-[0.1em]  border-t-[0.1em] border-[#21376A] hover:cursor-pointer " 
                  onClick={handleSortClick}   
               >
                  {/* {sortChdValue === "asc" ? ' ↑' : ' ↓'} */}
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
                  <tr key={patient.id} className="border-b hover:bg-gray-100" >
                     <td className=" ">
                        <input
                           type="checkbox"
                           checked={selectedForExport[patient.id] || false}
                           className="patient_checkbox"
                           onChange={()=>toggleSelectedPatient(patient.id)}
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
                     <td>{patient[AFibColumns.Hypertension]}</td>
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




// useEffect(() => {
//    return () => {
//      // Clear data when the component unmounts
//      setImportedData([]);
//    };
//  }, []);

//    const sortedPatients = () => {
//       if (sortChdValue === 'asc') {
//           return [...filteredPatients].sort((a, b) => {
//               const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
//               const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
//               return valueA - valueB; // Ascending
//           });
//       } else {
//           return [...filteredPatients].sort((a, b) => {
//               const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
//               const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
//               return valueB - valueA; // Descending
//           });
//       }
//   };

//    const tableData = sortedPatients()
 // if (selectAll){
      //    setSelectedRows((prev) => {
      //       return prev.filter
      //    })
      // }
      // const isChecked = event.target.checked;
      // setSelectAll(isChecked)
      // setSelectedRows(
      //    isChecked?
      //    data.map((item) => item.id)
      //    : [])
      // const handleSelectedRow = (id) =>{
   //    setSelectedRows((prev) =>
   //       prev.includes(id) ?
   //       prev.filter((rowId) => rowId !== id)
   //       : [...prev, id]
   //    )
   // }

   // console.log(selectedRows)

   // const filteredPatients = getFilteredPatients()
//    const [sortChdValue, setSortChdValue] = useState("asc")
  

//    // console.log(filteredPatients)
//    const handleSortClick = () => {
//       setSortChdValue (prevDirection => {
//          return (prevDirection === "asc" ? "desc" : "asc")
//       })
//    }
{/* <Table className=" border border-gray-400 mb-10">
          <TableHeader >
             <TableRow className="font-bold text-xs bg-[#648DBC] hover:bg-bg-[#648DBC]">
               <TableHead className="border-b border-r border-gray-400 text-center">
                  <input
                     type="checkbox"
                     onChange={handleSelectAll}
                     checked={selectAll}
                  />
               </TableHead>
                <TableHead className="border-b border-r border-gray-400 text-center font-semibold text-white">Full Name</TableHead>
                <TableHead className="border-b border-r border-gray-400  font-semibold text-white">Age</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">Gender</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">Patience Reference No.</TableHead>
                <TableHead className="border-b border-r border-gray-400 w-44 p-0">
                   <tr className="border-none">
                      <th className="w-44 p-0">
                         <div className="h-full flex flex-col justify-center">
                            <div className="h-full w-full border-b border-gray-400 flex justify-center items-center py-1 font-semibold text-white">
                            CHA₂DS₂-VASc
                            </div>
                           <div className="flex w-full">
                              <span className="w-full py-2 border-r border-gray-400 cursor-pointer font-semibold text-white" onClick={handleSortClick}
                              >
                                 Value<span>{sortChdValue === "asc" ? ' ↑' : ' ↓'}</span>
                              </span>
                           
                              <span className="w-full py-2  border-gray-400 font-semibold text-white">Latest Date</span>
                           </div>
                         </div>
                      </th>
                   </tr>
                </TableHead>
                <TableHead className="border-b border-r border-gray-400 w-44 p-0">
                   <tr className="border-none">
                      <th className="w-44 p-0">
                         <div className="h-full text-center flex flex-col justify-center">
                            <div className="h-full w-full border-b border-gray-400 flex justify-center items-center py-1 font-semibold text-white">
                               ORBIT
                            </div>
                         <div className="flex w-full">
                            <span className="w-full py-2 border-r border-gray-400 font-semibold text-white">Value</span>
                          
                            <span className="w-full py-2  border-gray-400 font-semibold text-white">Latest Date</span>
                         </div>
                         </div>
                      </th>
                   </tr>
                </TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">Anticoagulant issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white ">Aspirin / Antiplatelet <br />issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white ">NSAID issued excl. <br /> Aspirin(6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white ">Statin issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">CVD</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-semibold text-white">HTN</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-semibold text-white">BP</TableHead>
                <TableHead className="border-b border-gray-400 font-semibold text-white ">Medication Review Latest date</TableHead>
             </TableRow>
          </TableHeader>
         
          
         <TableBody className="text-center text-xs">
             {data.map((patient, id)=> (
            <TableRow key={id} className={id % 2 === 0 ? 'bg-gray-50' : ''} >
               
                  <TableCell>
                     <input
                        type="checkbox"
                        checked={selectAll}
               
                     >
                     </input>
                  </TableCell>
                  <TableCell className="font-medium  cursor-pointer text-blue-600 hover:underline"
                     onClick={()=>handlePatientClick(id)}
                  >
                     {patient[AFibColumns.FullName]}

                  </TableCell>
                 

               
               <TableCell>{patient[AFibColumns.Age]}</TableCell>
               <TableCell>{patient[AFibColumns.Gender]}</TableCell>
               <TableCell >{patient[AFibColumns.PatientReference]}</TableCell>
               <TableCell>
               <div className="flex w-full">
                  <span className="text-xs w-[50%] ">{patient[AFibColumns.CHADSVAScValue]}</span>
                  <span className=" text-xs w-full pl-6 ">{patient[AFibColumns.CHADSVAScDate]}</span>
               </div>
               </TableCell>
               
               <TableCell >
                  <div className="flex w-full">
                     <span className="text-xs w-[50%] ">{patient[AFibColumns.ORBIT_Value]}</span>
                     <span className="text-xs w-full pl-6 ">{patient[AFibColumns.ORBIT_Date]}</span>
                  </div>
               </TableCell>
               <TableCell>{patient[AFibColumns.OnAnticoagulant]}</TableCell>
               <TableCell >{patient[AFibColumns.OnAspirinAntiplatelet]}</TableCell>
               <TableCell >{patient[AFibColumns.OnNSAID]}</TableCell>
               <TableCell>{patient[AFibColumns.OnStatin]}</TableCell>
               <TableCell >{patient[AFibColumns.CVD]}</TableCell>
               <TableCell >{patient[AFibColumns.Hypertension]}</TableCell>
               <TableCell >{patient[AFibColumns.BP]}</TableCell>
               <TableCell >{patient[AFibColumns.MedsReviewDate]}</TableCell>
            </TableRow>
              )) }
         </TableBody>
      </Table> */} 
// console.log(data)
   

   // useEffect(() => {
   //    if(data && data.length > 0){
   //       setSelectedRows(data.map((row) => row.id))
   //    }
   // }, [data])

   // console.log(selectedRows)
//    useEffect(() => {
//       // Initialize selectedRows with all IDs when data changes
//       setSelectedRows(data.map((row) => row.id));
//   }, [data]);

//    const handleSelectAll = () => {
//       setSelectAll(!selectAll);
//       if(!selectAll){
//          setSelectedRows([])
//       }
      // if (!selectAll) {
      //     // Add all row IDs to selectedRows
      //     setSelectedRows(data.map((row) => row.id));
      // } else {
      //     // Clear selectedRows
      //     setSelectedRows([]);
      // }
//   };
   

   // const handleSelectedRow= (id)=>{
   //    if(selectAll){
   //       //add all my data.id to my selected rows
   //       setSelectedRows((prev) =>{
   //          return data.map((row) => row.id)
   //       })
   //       console.log("All selected")
   //    }
   //    else console.log("All not selected")
   // }

   // useEffect(()=>{
   //    console.log(selectedRows)
   // }, [selectedRows])
   
   // handleSelectedRow()