import React, { useState, useContext, useEffect } from 'react'
import Data from './components/sections/Data'
import Header from './components/sections/Header'
import Filter from './components/sections/Filter'
import Modal from './components/sections/Modal'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { MainContext } from './MainContext'
import Preloader from './components/sections/Preloader'
// import { useNavigate } from 'react-router-dom'




const Display = () => {
  

   const { isModalOpen, dataCount, relativeRunDate } = useContext(MainContext)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
      }, 500)
   }, [])

   
   return (
      // justify-center align-center 
      <div className="h-screen  display_container">
           
         {/* HEADER */}
         {/* {loading && <Preloader />} */}
         {/* <section id="header" className =" flex justify-center mt-2 border"> */}
        
         <section className="mx-4">
            <Header />
         </section>
         
         <Modal 
            open ={isModalOpen}
         >
         </Modal>

         {/* FILTER DROPDOWN */}
         {/* <section className="flex flex-col justify-center items-center  mt-4 border" > */}
         <section className=" mt-4 mx-4 ">
            <Filter /> 
         </section>
            
        
         <div className=" mt-2 mx-4 px-2 text-left flex justify-between">
            <p>Patient count: <strong className='text-[#E6007E]'>{dataCount}</strong></p>
            <p>Relative run date: <strong className='text-[#E6007E]'>{relativeRunDate}</strong></p>

         </div>
         
         {/* DISPLAY DATA */}
         {/* <section 
            className= "flex justify-center  mt-2 mb-2  border grow " 
            id="display_data"
         > */}
            {/* <div className=" w-[98vw] "> */}
            {/* <div className ="w-[98vw border-[1px] border-[#21376A]] border"> */}
         <section className =" mx-4 mb-2 overflow-y-auto border border-[#21376A] rounded-t-lg ">
            <Data />
         </section>
            
         {/* </section> */}
         
         <footer className=" flex gap-2  mx-4 mb-2 justify-center lg:text-xs xl:text-sm 2xl:text-sm sticky mt-auto  ">
            <p className="font-semibold"> © Clinical Effectiveness Group (CEG), Queen Mary University of London. All rights reserved.</p> 
            <p className="font-semibold">Attribution-NonCommercial-ShareAlike CC BY-NC-SA.</p>
         </footer>
         
         {/* max-h-[400px] overflow-y-auto */}
      </div>
   )
}

export default Display



// If modal is open, display background is frozen
      // <div 
      //    className={`flex flex-col  h-screen items-center ml-4 fixed
      //       ${isModalOpen ? "overflow-hidden ml-3" : null}`}
      // >


      // h-screen
   //    <div 
   //    className="flex flex-col h-full justify-center align-center "
        
   // >