import React from 'react'
import { Alert} from "@/components/ui/alert"

const EmptyExportAlert = ({closeAlert}) => {
  return (
   <div className="fixed top-0 left-0 bottom-0 right-0 z-[999]">
      <Alert className= " m-auto fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[32em] flex flex-col text-center justify-center items-center bg-[#21376A] text-white py-2">
         <p>No patient satisfied current filter selection, or patient count is '0'</p>
         <button 
            className=" w-[4em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md mt-2"      
            onClick ={closeAlert}
         >
            Close
         </button>
      </Alert>
   </div>
  )
}

export default EmptyExportAlert
