import React from 'react'
import { Alert} from "@/components/ui/alert"

const ExportAlert = ({continueExport, cancelExport}) => {
   return (
      <div className="fixed top-0 left-0 bottom-0 right-0 z-[999]">
         <Alert className= " m-auto fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[42em] flex flex-col text-center justify-center items-center bg-[#21376A] text-white py-2">
            <p>You are about to export a file containing patient-identifiable data. Please make sure the file is saved to an appropriately secure drive.</p>
            <div className="flex gap-4 mt-2">
               <button className="w-[6em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md " onClick={continueExport}>Continue</button>
               <button className="w-[6em] font-semibold text-[#21376A] bg-white hover:text-black px-2 py-1 rounded-md " onClick ={cancelExport}>Cancel</button>
            </div>
         </Alert>
      </div>
   )
   }

export default ExportAlert
