import React, { useState, useContext, useEffect } from 'react'
import Data from './components/sections/Data'
import Header from './components/sections/Header'
import Filter from './components/sections/Filter'
import Modal from './components/sections/Modal'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MainContext } from './MainContext'
import Preloader from './components/sections/Preloader'
import nc_sa_logo from '/images/nc_sa_logo.png'
// import { useNavigate } from 'react-router-dom'




const Display = () => {
  

   const { isModalOpen, dataCount, relativeRunDate, exportCount,
      displayExportListAlert, setDisplayExportListAlert,handleContinueListExport, exportListType,
      emptyExportListAlert, setEmptyExportListAlert
    } = useContext(MainContext)

   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
      }, 500)
   }, [])

   const overlay ={
      position : 'fixed',
      top:0,
      left: 0,
      right: 0,
      bottom: 0,
      // backgroundColor: '#21376A',
      zIndex:99
   }

  
   
   return (
      // justify-center align-center 
      <div className="h-screen  display_container pt-1 display_screen max-w-[2800px] m-auto">
         {
            displayExportListAlert && (
               <div style={overlay}>
                  <Alert className= " m-auto fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[42em] flex flex-col text-center justify-center items-center bg-[#21376A] text-white py-2">
                     {/* <AlertTitle>Export Alert!</AlertTitle> </AlertDescription>*/}
                     <p>You are about to export a file containing patient-identifiable data. Please make sure the file is saved to an appropriately secure drive.</p>
                     
                     
                     <div className="flex gap-4 mt-2">
                        <button className="w-[6em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md " onClick={()=>handleContinueListExport(exportListType)}>Continue</button>
                        <button className="w-[6em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md " onClick ={()=>setDisplayExportListAlert(false)}>Cancel</button>
                     </div>
                  </Alert>
               </div>
            )
         }
         {
            emptyExportListAlert && (
               <div style={overlay}>
                  <Alert className= " m-auto fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[32em] flex flex-col text-center justify-center items-center bg-[#21376A] text-white py-2"
                  >
                     <p>No patient satisfied current filter selection, or patient count is '0'</p>
                     <button 
                        className=" w-[4em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md mt-2"      
                        onClick ={()=>setEmptyExportListAlert(false)}
                     >
                        Close
                     </button>
                  </Alert>
               </div>
            )
         }
        
         <section className="mx-4">
            <Header />
         </section>
         
         <Modal 
            open ={isModalOpen}
         >
         </Modal>

         {/* FILTER DROPDOWN */}
         <div>
            
         </div>
         <section className=" mt-4 mx-4 ">
            <Filter /> 
         </section>
            
        
         <div className="mt-2 mx-4 px-2  flex justify-between  lg:text-sm xl:text-[1em]">
            <p>Patient count: <strong className='text-[#E6007E]'>{dataCount} </strong>(Selected for export: {exportCount})</p>
            <p>Date of last run: <strong className='text-[#E6007E]'>{relativeRunDate}</strong></p>
         </div>
         
         {/* DISPLAY DATA */}
        
         <section className =" mx-4 mb-2 overflow-y-auto border border-[#21376A] rounded-t-lg ">
            <Data />
         </section>
            
         
         <footer className=" flex gap-2  mx-4 mb-2 justify-between items-center lg:text-xs xl:text-sm 2xl:text-sm sticky mt-auto  ">
            <div className="flex mx-auto">
               <p className="font-semibold"> © Clinical Effectiveness Group (CEG), Queen Mary University of London. All rights reserved. Attribution-NonCommercial-ShareAlike CC BY-NC-SA.</p> 
               <div className="w-[4em] ml-2">
                  <img 
                     src={nc_sa_logo}
                  />
            </div>
            </div>
             <div className="text-xs ">
               v.0.3.0
            </div>
         </footer>
      </div>
   )
}

export default Display

