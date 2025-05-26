//Display.jsx — Main layout for data display, filtering and export
import React, { useState, useContext, useEffect } from 'react'
import Data from './components/sections/Data'
import Header from './components/sections/Header'
import Filter from './components/sections/Filter'
import Modal from './components/sections/Modal'
import { MainContext } from './MainContext'
import nc_sa_logo from '/images/nc_sa_logo.png'
import ExportAlert from './components/alerts/ExportAlert'
import EmptyExportAlert from './components/alerts/EmptyExportAlert'



const Display = () => {
  
   //Functions and state variables passed from out MainContext
   const { 
      isModalOpen, dataCount, relativeRunDate, exportCount,
      displayExportListAlert, setDisplayExportListAlert,
      handleContinueListExport, exportListType,
      emptyExportListAlert, setEmptyExportListAlert
   } = useContext(MainContext)
  
   
   return (
      <div className="h-screen display_container pt-1 display_screen max-w-[2800px] m-auto ">
      {/* ERROR COMPONENTS */}
         {
            displayExportListAlert && (  
               <ExportAlert 
                  continueExport={()=>handleContinueListExport(exportListType)}
                  cancelExport={()=>setDisplayExportListAlert(false)}
               />
            )
         }
         {
            emptyExportListAlert && (
               <EmptyExportAlert
                  closeAlert ={()=>setEmptyExportListAlert(false)}
               />
            )
         }

         <section className="mx-4">
            <Header />
         </section>
         
         <Modal 
            open = {isModalOpen}
         >
         </Modal>

         <section className=" mt-4 mx-4 ">
            <Filter /> 
         </section>
            
         <div className="mt-2 mx-4 px-2 flex justify-between  lg:text-sm xl:text-[1em]">
            <p>Patient count: <strong className='text-[#E6007E]'>{dataCount} </strong>(Selected for export: {exportCount})</p>
            <p>Date of last run: <strong className='text-[#E6007E]'>{relativeRunDate}</strong></p>
         </div>
         
         {/* DISPLAY DATA */}
        
         <section className =" mx-4 mb-2 overflow-y-auto border border-[#21376A] rounded-t-lg table_scroll">
            <Data />
         </section>
            
         <footer className=" flex gap-2  mx-4 mb-2 justify-between items-center lg:text-xs xl:text-sm 2xl:text-sm sticky mt-auto  ">
            <div className="flex mx-auto">
               <p className="font-semibold">© Clinical Effectiveness Group (CEG), Queen Mary University of London. All rights reserved. Attribution-NonCommercial-ShareAlike CC BY-NC-SA.</p> 
               <div className="w-[4em] ml-2">
                  <img 
                     alt="Creative Commons NC SA logo"
                     src={nc_sa_logo}
                  />
               </div>
            </div>
             <div className="text-xs">
               v.0.1.34
            </div>
         </footer>
      </div>
   )
}

export default Display

