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
                     bg-gradient-to-br from-[#7B0E72] to-[#E6007E] text-white "
                  >
                     User guide & <br></br>resources
                  </PopoverTrigger>
                  <PopoverContent className = "px-2 py-2 w-[15em] mr-28">
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
                              <li><a href="https://www.mdcalc.com/calc/43/creatinine-clearance-cockcroft-gault-equation" target="_blank" rel="noopener noreferrer">Creatinine clearance MDCALC</a></li>
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
                              <li><button onClick= {()=> handleExport("excel")}>Excel list (.xlsx)</button> </li>
                              <li><button onClick= {()=> handleExport("accurx")}>Accurx list (.csv)</button> </li>
                              <li><button onClick= {()=> handleExport("nhs_list")}>NHS No. list (.txt)</button> </li>
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


