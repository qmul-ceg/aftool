import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp, } from 'react-icons/fi'
import { Select, SelectContent,  SelectTrigger } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { MainContext } from '@/MainContext'
import { useContext } from 'react'
import { AFibColumns } from '@/enums/AFibColumns'

const Filter = () => {


   const{  
      selectedAges, handleAgeSelection, removeAgeDisplay,
      nsaid, handleNSAID, 
      cvd, handleCVD, 
      selectedBP, handleBP, removeBP,
      selectedChdValue,handleChdValue,  removeChdValue,
      selectedChdDate,handleChdDate, removeChdDate,
      selectedOrbit, handleOrbit, removeOrbitDisplay,
      medReview, handleMedReview, setMedReview, removeMedReview,
      handleVulnerabilitesFilter,
      selectedAnti, handleAntiFilter, setSelectedAnti, removeAntiFilter,
      selectedVulnerabilities, 
      setSelectedVulnerabilities, 
      importedData, relativeRunDate,
      resetFilters, resetAllFilters, data, quickFilter, handleQuickFilter,
      //REMOVE FILTERS
      removeNsaidFilter, removeVulnerabilities, removeCvdFilter,

      //ORBIT SELECTION
      handleOrbitValueSelection, handleOrbitDateRecordedSelection,
      selectedOrbitValue, selectedOrbitDateRecorded, removeSelectedOrbitValue,
      removeSelectedOrbitDate,
      //statin
      handleStatin, statin, removeStatinFilter
   } = useContext(MainContext);



   //FILTER AND QUICK FILTERS FUNCTIONALITY
   const[filterMenu, setFilterMenu] = useState(true)
   const[showQuickFilter, setShowQuickFilter] = useState(true)

   //FILTER DISPLAY FEATURE

   const [selectedAntiLabel, setSelectedAntiLabel] = useState()
   const [resizeQuickFilter, setResizeQuickFilter] = useState(true)
   const [removeProgressBar, setRemoveProgressBar] = useState(true)

   
   const checkScreenSize = () =>{
      if(window.innerWidth < 1522){
         setResizeQuickFilter(false)
      }else {
         setResizeQuickFilter(true)
      }
   }

   const checkScreenSizeForProgressBar = () =>{
      if(window.innerWidth < 1163){
         setRemoveProgressBar(true)
      }else {
         setRemoveProgressBar(false)
      }
   }

   useEffect(() => {
      checkScreenSize(); 
      checkScreenSizeForProgressBar();
      window.addEventListener('resize', checkScreenSize)
      window.addEventListener('resize', checkScreenSizeForProgressBar)

      return () => {
         window.removeEventListener('resize', checkScreenSizeForProgressBar)
         window.removeEventListener('resize', checkScreenSize)
      }
   }, [])





   const displayAntiFilter =[
      {
         name: "Anti",
         value : selectedAnti,
         label: selectedAntiLabel
      }
   ]

   const displayMedReview =[
      {
         name: "Med Review",
         value: medReview,
      }
   ]

   const displayNsaid=[
      {
         name :"NSAID",
         value: nsaid
      }
   ]
   const displayCvd=[
      {
         name : "CVD",
         value: cvd
      }
   ]





   //FILTER MENU 
   const toggleFilter =() =>{
      setFilterMenu(!filterMenu)
   }

   //SUMMARY TABLE FUNCTIONALITY
   const chadsvasce2 = (chadsvasc2Cnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2)           
         chadsvasc2Cnt += 1;
      return chadsvasc2Cnt;
   }

   const chadsvasce2Anticoag = (anticoagCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && patient[AFibColumns.OnAnticoagulant].includes('YES'))           
         anticoagCnt += 1;
      return anticoagCnt;
   }

   const chadsvasce2NotOnAnticoag = (notOnAnticoagCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && !patient[AFibColumns.OnAnticoagulant].includes('YES'))           
         notOnAnticoagCnt += 1;
      return notOnAnticoagCnt;
   }

   const chadsvasce2OnAspAntipOnly = (onAspAntipOnlyCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 &&           
          !patient[AFibColumns.OnAnticoagulant].includes('YES') &&
          patient[AFibColumns.OnAspirinAntiplatelet].includes('YES') )           
            onAspAntipOnlyCnt += 1;
      return onAspAntipOnlyCnt;
   }

   const chadsvasce2OnAnticoagAspAntip = (onAnticoagAspAntipCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && 
          patient[AFibColumns.OnAnticoagulant].includes('YES') &&
          patient[AFibColumns.OnAspirinAntiplatelet].includes('YES'))                     
            onAnticoagAspAntipCnt += 1;
      return onAnticoagAspAntipCnt;
   }

   const chadsvasce2DOAC = (DOAC_Cnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && patient[AFibColumns.OnAnticoagulant].includes('DOAC'))           
         DOAC_Cnt += 1;
      return DOAC_Cnt;
   }

   const newChadsvasce2 = (newChadsvasc2Cnt, patient) => {

      if (patient[AFibColumns.CHADSVAScDate]) {

         const dtRelRunDate = new Date(relativeRunDate);
         dtRelRunDate.setMonth(dtRelRunDate.getMonth() - 12);
         //const dtRelRunDate = new Date("02/22/2024");
         //console.log(dtRelRunDate.toLocaleDateString());

         if ( Date.parse(patient[AFibColumns.CHADSVAScDate]) >= dtRelRunDate.getTime() )           
            newChadsvasc2Cnt += 1;
      }
      return newChadsvasc2Cnt;
   }

   const chadsvasc2RecordedPrior12m = (chadsvasc2Prior12mCnt, patient) => {

      if (patient[AFibColumns.CHADSVAScDate]) {

         const dtRelRunDate = new Date(relativeRunDate);
         dtRelRunDate.setMonth(dtRelRunDate.getMonth() - 12);
         //const dtRelRunDate = new Date("02/22/2024");   
         //console.log(dtRelRunDate.toLocaleDateString());
         
         if ( Date.parse(patient[AFibColumns.CHADSVAScDate]) <= dtRelRunDate.getTime() && parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2)           
            chadsvasc2Prior12mCnt += 1;
      }
      return chadsvasc2Prior12mCnt;
   }

   function percentageFormatter(numerator, denominator) {
      
      if (denominator < numerator || denominator <= 0) {
         return '0%';
      }
      else {

         return new Intl.NumberFormat('default', {
         style: 'percent',
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
         }).format(numerator / denominator);
      }
   }

   const selectedChdValueLabel = {
      'gte2' : '≥ 2',
      '1' : '1',
      '0' : '0'
   }

   const selectedRecordedDateLabel = {
      '≥12m' : 'Recorded ≥ 12m',
      'not_recorded' : 'Not recorded',
      '<12m' : 'Recorded < 12'
   }

   return (
      <>
         <div className= "flex justify-between items-center  w-full  px-4 py-2 rounded-t-lg bg-[#21376A] text-white flex-shrink-0 ">
            <div className="flex items-center min-h-10 ">
               <p className="text-sm md:text-md 
                  lg:text-lg xl:text-xl 2xl:text-xl 
                  font-semibold">
                  Filters
               </p>


               {/* DISPLAY FILTERS */}
               <div className=" ml-6 items-center flex gap-2 flex-wrap mr-6 ">
                  {/* ANTICOAGULANTS DISPLAY */}
                  {(importedData.length > 0 && selectedAnti) && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                        <strong className ="mr-2">AntiCoag/AntiP:</strong> {selectedAnti.label } 
                       
                        {<button className="ml-2 text-red-500 text-xs hover:text-sm" onClick={()=>removeAntiFilter()}>&#10005;</button>}
                     </div>
                  )}

                  {/* MEDICATION REVIEW DISPLAY */}
                  {(importedData.length > 0 && displayMedReview[0].value !== "") && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">Medication review ≥ 12m:</strong> {displayMedReview[0].value } 
                        {<button className=" ml-2 text-red-500 text-xs hover:text-sm"onClick={removeMedReview}>&#10005;</button>}
                     </div>
                  )}
                  
                  {/* VULNERABILITIES DISPLAY */}
                  {(importedData.length > 0 && selectedVulnerabilities.length > 0) && (
                     selectedVulnerabilities.map((item, id) => 
                        <div key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">Vulnerabilities: </strong> {item.label} 
                           {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeVulnerabilities(item.value)}>&#10005;</button>}
                        </div>
                     )
                  )}

                  {/* MEDICATION DISPLAY */}
                  {(importedData.length > 0 && nsaid && !statin) && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">Medication:</strong> NSAID - {nsaid} 
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={removeNsaidFilter}>&#10005;</button>}
                     </div>
                  )}
                  {(importedData.length > 0 && statin && !nsaid) && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">Medication:</strong> Statin - {statin} 
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={removeStatinFilter}> &#10005;</button>}
                     </div>
                  )}
                  {(importedData.length > 0 && nsaid && statin) && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">Medication:</strong> NSAID - {nsaid} 
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={removeNsaidFilter}>&#10005;</button>}
                        <span className="ml-2">Statin - {statin}</span>
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={removeStatinFilter}> &#10005;</button>}
                     </div>
                  )}

                  {/* CVD DISPLAY */}
                  {(importedData.length > 0 && cvd.value)  && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">CVD:</strong> {cvd.value } 
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={removeCvdFilter}> &#10005;</button>}
                     </div>
                  )}
                 
                  
                  {/* BP DISPLAY */}
                  {(importedData.length > 0 && selectedBP.length > 0) && (
                     selectedBP.map((item, id) => 
                        <div key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">BP:</strong> {item.label} 
                           {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeBP(item.value)}>&#10005;</button>}
                        </div>
                     )
                  )}
                  {/* CHA₂DS₂-VASc DISPLAY */}
                  {(importedData.length > 0 && selectedChdValue.length > 0 && !selectedChdDate) && (
                     selectedChdValue.map((item, id) => 
                        <div key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">CHA₂DS₂-VASc: </strong> {selectedChdValueLabel[item]} 
                           {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeChdValue(item)}>&#10005;</button>}
                        </div>
                     )
                  )}
                  

                  {(importedData.length > 0 && selectedChdValue.length === 0 && selectedChdDate) && (
                     <div key = {selectedChdDate} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                        <strong className ="mr-2">CHA₂DS₂-VASc: </strong> {selectedRecordedDateLabel[selectedChdDate]} 
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeChdDate()}>&#10005;</button>}
                     </div>
                     
                  )}

                  {(importedData.length > 0 && selectedChdValue.length > 0 && selectedChdDate) && (
                     selectedChdValue.map((item, id) => 
                        <div key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">CHA₂DS₂-VASc: </strong>{selectedChdValueLabel[item]}
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeChdValue(item )}>&#10005;</button>}
                           <span className="ml-2">{selectedRecordedDateLabel[selectedChdDate]} </span>
                           {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeChdDate()}>&#10005;</button>}
                        </div>
                  ))}

                  {/* ORBIT DISPLAY */}
                  {/* Display for when only the orbit value is selected */}
                  {(importedData.length > 0 && selectedOrbitValue && !selectedOrbitDateRecorded) && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                        <strong className ="mr-2">ORBIT: </strong> ≥ 4
                        {<button className="ml-2 font-bold text-red-500 text-sm hover:text-lg" onClick={()=>removeSelectedOrbitValue()}>&#10005;</button>}
                     </div>
                  )}
                  {/* Display for only when orbit date is selected  */}
                  {(importedData.length > 0 && !selectedOrbitValue && selectedOrbitDateRecorded) && (
                      
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                        <strong className ="mr-2">ORBIT: </strong> {selectedRecordedDateLabel[selectedOrbitDateRecorded]} 
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeSelectedOrbitDate()}>&#10005;</button>}
                     </div>
                     
                  )}
                  {/* display for when both the value and date are selected  */}
                  {(importedData.length > 0 && selectedOrbitValue && selectedOrbitDateRecorded) && (
                     <div className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                        <strong className ="mr-2">ORBIT: </strong> ≥ 4
                        {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeSelectedOrbitValue()}>&#10005;</button>}
                        <span className="ml-2">{selectedRecordedDateLabel[selectedOrbitDateRecorded]} </span>
                        {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeSelectedOrbitDate()}>&#10005;</button>}
                     </div>
                  )}
                  
                  {/* AGE DISPLAY */}
                  {(importedData.length > 0 && selectedAges.length > 0) && (
                     selectedAges.map((item, id) => 
                        <div key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">Age:</strong> {item.label} 
                           {<button className="ml-2 font-bold text-red-500 text-xs hover:text-sm" onClick={()=>removeAgeDisplay(item.value)}>&#10005;</button>}
                        </div>
                     )
                  )}
               </div>
            </div>
            
            {/* Reset Filters button */}
            <div className="ml-auto mr-8  text-center min-w-[140px] ">
               <button
                  className = " cursor-pointer bg-white text-xs  lg:text-xs xl:text-sm 2xl:text-sm font-semibold text-[#21376A] hover:text-black px-2 py-1 rounded-md "
                  onClick={resetAllFilters} 
               >
                  Remove all filters
               </button>
            </div>
           
            {/* TOGGLE COLLAPSE BUTTON */}
            <button onClick={toggleFilter}>
               {filterMenu ? 
                  (
                     <FiChevronDown size={24} />
                  ) : (
                     <FiChevronUp size={24} />
                  )}
            </button>
         </div>
         
              
         <div className= 
            {`flex justify-between border-[0.1em] border-[#21376A] px-2 py-2 transition-all duration-700 ease-in-out ${filterMenu ? "opacity-100 max-h-96": "opacity-0 max-h-0 overflow-hidden"}`}
         >

         {/* QUICK FILTERS */}  
            {
               !resizeQuickFilter && (
                  // <div className=" min-w-[10px] ">
                  <div className=" mr-2  w-[10%] min-w-[7em]">
                     <Popover className="">
                      
                        <PopoverTrigger className="flex justify-center w-full" >
                           <header className="w-full border flex justify-between px-2 py-2 rounded-lg  bg-gradient-to-br from-[#7B0E72] to-[#E6007E] text-white" >
                              <span className ="font-semibold text-left text-xs  xl:text-sm 2xl:text-sm text-nowrap">Quick filters</span>
                              <div className=" flex mt-[0.1em]"> 
                                 <FiChevronDown />
                              </div>
                           </header>
                        </PopoverTrigger>
                        <PopoverContent className="w-88 ml-8 pl-0">
                           <div className=" text-sm font-semibold">
                              {[
                                 { value: "option_one", label: "CHA₂DS₂-VASc ≥ 2 (<12m), no anticoagulation (6m)"},
                                 { value: "option_two", label: "CHA₂DS₂-VASc ≥ 2 (≥12m), no anticoagulation (6m)"},
                                 { value: "option_three", label: "ORBIT ≥ 4, on anticoagulation (6m)"},
                                 { value: "option_four", label: "Med review ≥ 12m, on anticoagulation (6m)"},
                                 { value: "option_five", label: "On NSAIDs, on anticoagulant (6m)"},
                                 { value: "option_six", label: "On dual therapy (6m), Med review ≥ 12m"}
                              ].map((item) => {
                                 const inputId= `quick-filter-${item.value}`
                                 return (
                                    <label
                                       // value={item.value}
                                       className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" 
                                       key = {item.value}
                                    >
                                       <input
                                          type="checkbox"
                                          id={inputId}
                                          checked={quickFilter === item.value}
                                          onChange={()=>handleQuickFilter(item.value)} 
                                          className="checkbox_input"
                                          
                                       />
                                       <div className="custom_checkbox"></div>
                                       <span className="filterText">{item.label}</span>       
                                    </label>
                                 )
                              })}
                           </div>
                        </PopoverContent>
                  </Popover>
                  </div>
               )
            }
            {
               resizeQuickFilter && (

                  <div className =" flex-1 w-full flex flex-col justify-between max-w-[390px] mr-2">
                     <div className =" flex flex-col">
                        <header className="flex justify-between px-2 py-2 rounded-t-lg  bg-gradient-to-br from-[#7B0E72] to-[#E6007E] text-white" >
                           <p className ="font-semibold text-xs text-left xl:text-sm 2xl:text-sm pr-2">Quick filters</p>
                        </header>
               
                        {
                     showQuickFilter && (
                        <div className="border-[0.1em] border-[#21376A] h-36 border-t-0 text-sm pt-2 font-semibold ">
                           {[
                              { value: "option_one", label: "CHA₂DS₂-VASc ≥ 2 (<12m), no anticoagulation (6m)"},
                              { value: "option_two", label: "CHA₂DS₂-VASc ≥ 2 (≥12m), no anticoagulation (6m)"},
                              { value: "option_three", label: "ORBIT ≥ 4, on anticoagulation (6m)"},
                              { value: "option_four", label: "Med review ≥ 12m, on anticoagulation (6m)"},
                              { value: "option_five", label: "On NSAIDs, on anticoagulant (6m)"},
                              { value: "option_six", label: "On dual therapy (6m), Med review ≥ 12m"}
                           ].map((item) => {
                              const inputId= `quick-filter-${item.value}`
                              return (
                                 <label
                                    key = {item.value}
                                    value={item.value}
                                    className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" 
                                 >
                                    <input
                                       id={inputId}
                                       type="checkbox"
                                       checked={quickFilter === item.value}
                                       onChange={()=>handleQuickFilter(item.value)}
                                       className="checkbox_input"
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span className="filterText">{item.label}</span>       
                                 </label>

                              )
                           })}
                        </div>
                     )
                  }
                     </div>
                  </div>
               ) 
            }
                  
         {/* FILTERS */}
            <div className="flex gap-2 max-w-[560px]">
               
               {/* FILTER COLUMN 1 */}
               <div className= "flex flex-col gap-6"> 
                  {/* ANTICOAGULANT FILTER */}
                  <Select>
                     <SelectTrigger className=" bg-[#21376A] text-white">
                        <h1 className="text-xs font-semibold text-left  xl:text-sm 2xl:text-sm pr-2">Anticoagulants / Antiplatelets</h1>
                        {/* <SelectValue placeholder="" /> */}
                     </SelectTrigger>
                     <SelectContent >
                        {[

                           {value: "doac_warf", label: "DOAC or Warfarin", name: 'Anti'},
                           {value: "doac", label: "DOAC", name: 'Anti'},
                           {value: "warf", label: "Warfarin", name: 'Anti'},
                           {value: "no_anticoagulant", label: "No anticoagulant" , name: 'Anti'},
                           {value: "antiplatelets", label: "Antiplatelets only" , name: 'Anti'},
                           {value: "dual", label: "Dual therapy" , name: 'Anti'}, 
                        ].map((item) => {
                           const inputId = `anti-${item.value}`;
                           return(
                              <label 
                                 key={item.value}
                                 className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]"
                                 htmlFor={inputId}
                              >
                                 <input
                                    type="checkbox"
                                    id={inputId}
                                    value={item.value}
                                    name="antiFilter"
                                    checked={selectedAnti && selectedAnti.value === item.value || false}
                                    onChange={() => handleAntiFilter(item.value, item.label)}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{item.label}</span>
                                 
                              </label>
                           )})}
                     </SelectContent>
                  </Select>

                  {/* MED REVIEW FILTER*/}
                  <Select>
                     <SelectTrigger className=" bg-[#21376A]  text-white">
                        <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm">Medication review ≥ 12m </h1>
                        
                     </SelectTrigger>
                     <SelectContent>
                        <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor="medreview_yes">
                           <input
                              type="checkbox"
                              name="medReview"
                              value="Yes"
                              checked = {medReview=== "Yes"}
                              onChange= {()=>handleMedReview("Yes")}
                              className="checkbox_input"
                              id="medreview_yes"
                           />
                           <div className="custom_checkbox"></div>
                           <span className="filterText">Yes</span>
                        </label>

                        <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor="medreview_no">
                           <input
                              id="medreview_no"
                              type="checkbox"
                              name="medReview"
                              value="No"
                              checked={medReview === "No"}
                              onChange={()=>handleMedReview("No")}
                              className="checkbox_input"
                           />
                           <div className="custom_checkbox"></div>
                           <span className="filterText">No</span>
                        </label>
                     </SelectContent>
                  </Select>

                  {/*VULNERABILITIES FILTER */}
                  <Select>
                     <SelectTrigger className=" bg-[#21376A]  text-white">
                     <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">Vulnerabilities</h1>
                     
                     </SelectTrigger>
                     <SelectContent>
                        {[
                           {value: 'smi', label: 'SMI' },
                           {value: 'learning_disability', label: 'Learning disability' },
                           {value: 'dementia', label: 'Dementia' },
                           {value: 'housebound', label: 'Housebound' },
                        ].map((item, index) => {

                           const inputId= `vulerabilities-${item.value}`
                        
                           return(
                              <label
                                 key = {item.value}
                                 value={item.value}
                                 className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]"
                                 id={inputId} 
                              >
                                 <input
                                    type="checkbox"
                                    value={item.value}
                                    checked={selectedVulnerabilities.some(object =>object.value === item.value)}
                                    onChange = {() => handleVulnerabilitesFilter(item.value, item.label)}
                                    className="checkbox_input"
                                    id={inputId}
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{item.label}</span>       
                              </label>
                           )})}
                     </SelectContent>
                  </Select>
               </div>

               {/* FILTER COLUMN 2 */}
               <div className= "flex flex-col gap-6">
                  
                  {/* CHA₂DS₂-VASc FILTER */}
                  <Select>
                        <SelectTrigger className=" bg-[#21376A] text-white">
                           <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">CHA₂DS₂-VASc</h1>                       
                        </SelectTrigger>
                        <SelectContent>
                        {[ 'gte2', '1', '0'].map((item, index) => {
                              const inputId = `chdValue-${item}`
                        
                           return (
                           
                              <label key={index} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor ={inputId}>
                                 <input
                                    id= {inputId}
                                    type="checkbox"
                                    value={item}
                                    checked={selectedChdValue.includes(item)}
                                    onChange={() => handleChdValue(item)}
                                    className="checkbox_input"
                                 
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{selectedChdValueLabel[item]}</span>
                              </label>
                           )})
                        }
                        
                        <div className="w-full border mt-1 mb-1"></div>
                        
                        {[ '≥12m', 'not_recorded', '<12m'].map((item, index) => 
                           (
                              <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor ={item}>
                                 <input
                                    id={item}
                                    type="checkbox"
                                    value={item}
                                    checked= {selectedChdDate === item}
                                    onChange={() => handleChdDate(item)}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{selectedRecordedDateLabel[item]}</span>
                              </label>
                           )
                        )}
                     </SelectContent>
                  </Select>

                  {/* ORBIT FILTER*/}
                  <Select>
                     <SelectTrigger className=" bg-[#21376A]  text-white">
                        <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm">ORBIT</h1>
                        
                     </SelectTrigger>
                     <SelectContent>
                        
                        {/* ORBIT VALUE */}
                        <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor="orbitValue_input">
                           <input 
                              id="orbitValue_input"
                              type="checkbox"
                              value ="gte4"
                              checked ={selectedOrbitValue === "gte4"}
                              onChange = {()=>handleOrbitValueSelection("gte4")}
                              className="checkbox_input"
                           />
                           <div className="custom_checkbox"></div>
                           <span className="filterText">≥ 4</span>
                        </label>

                        <div className="w-full border mt-1 mb-1"></div>
                        {/* ORBIT DATE RECORDED */}
                        {[ '≥12m', 'not_recorded', '<12m'].map((item, index) => 
                           (
                              <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor={item}>
                                 <input
                                    id={item}
                                    type="checkbox"
                                    value={item}
                                    checked= {selectedOrbitDateRecorded === item}
                                    onChange={() => handleOrbitDateRecordedSelection(item)}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{selectedRecordedDateLabel[item]}</span>
                              </label>
                        ))}
                        
                     </SelectContent>
                  </Select>      
                  
                  
                  
                  {/*MEDICATIONS FILTER*/}
                  <Select>
                        <SelectTrigger className=" bg-[#21376A] text-white">
                           <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">Medication</h1>
                           {/* <SelectValue placeholder="" /> NSAID*/}
                        </SelectTrigger>
                        <SelectContent>
                           <div>
                              <p className="ml-2 text-xs font-semibold text-left xl:text-sm 2xl:text-sm">Statin</p>
                              <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor="statin_yes_input"> 
                                 <input
                                    id="statin_yes_input"
                                    type="checkbox"
                                    name="statin"
                                    value="Yes"
                                    checked= {statin === "Yes"}
                                    onChange= {()=>handleStatin("Yes")}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{"Yes"}</span>
                              </label>

                              <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor="statin_no_input">
                                 <input
                                    id="statin_no_input"
                                    type="checkbox"
                                    name="statin"
                                    value="No"
                                    checked={statin === "No"}
                                    onChange={()=>handleStatin("No")}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{"No"}</span>
                              </label>
                              <div className="w-full border mt-1 mb-1"></div>
                              <p className="ml-2 text-xs font-semibold text-left xl:text-sm 2xl:text-sm ">NSAID</p>
                              <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor="nsaid_yes_input">
                                 <input
                                    id="nsaid_yes_input"
                                    type="checkbox"
                                    name="nsaid"
                                    value="Yes"
                                    checked= {nsaid=== "Yes"}
                                    onChange= {()=>handleNSAID("Yes")}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{"Yes"}</span>
                              </label>

                              <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor="nsaid_no_input">
                                 <input
                                       id ="nsaid_no_input"
                                       type="checkbox"
                                       name="nsaid"
                                       value="No"
                                       checked={nsaid === "No"}
                                       onChange={()=>handleNSAID("No")}
                                       className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{"No"}</span>
                              </label>
                           </div>
                        </SelectContent>
                  </Select>
               </div>
               
               {/* FILTER COLUMN 3 */}
               <div className= "flex flex-col gap-6 ">
                     {/* AGE FILTER*/}
                  
                     <Select>
                     <SelectTrigger className=" bg-[#21376A]  text-white">
                        <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm">Age</h1>
                     </SelectTrigger>
                     <SelectContent >
                     {[
                           {value: "<65", label : "< 65"},
                           {value: "65-79", label : "65 - 79"},
                           {value: "80+", label : "80+"}
                        ].map((item, index) =>{
                           const inputId=`age-${item.value}`
                           return (
                              <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor={inputId}>
                              <input
                                 id={inputId}
                                 type="checkbox"
                                 value={item.value}
                                 checked={selectedAges.some(object =>object.value === item.value)}
                                 onChange={() => handleAgeSelection(item.value, item.label)}
                                 className="checkbox_input"
                              />
                              <div className="custom_checkbox"></div>
                              <span className="filterText">{item.label}</span>
                           </label>
                           )
                        })}

                     </SelectContent>
                  </Select>

                  {/*CVD FILTER*/}
                  <Select>
                        <SelectTrigger className=" bg-[#21376A]  text-white">
                           <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm">CVD</h1>
                           {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                        </SelectTrigger>
                        <SelectContent> {[
                           {value: "Yes", label : "Yes"},
                           {value: "No", label : "No"},
                  
                           ].map((item, index) =>{
                              const inputId=`cvd-${item.value}`
                              return (
                                 <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" htmlFor={inputId}>
                                 <input
                                    id={inputId}
                                    type="checkbox"
                                    value={item.value ?? ""}
                                    checked={cvd.value === item.value}
                                    onChange={() => handleCVD(item.value, item.label)}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span className="filterText">{item.label}</span>
                              </label>
                           )
                        })}
                        </SelectContent>
                  </Select>

                  {/* BP FILTER*/}
                  <Select>
                        <SelectTrigger className=" bg-[#21376A] text-white">
                           <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm ">BP</h1>
                           {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                        </SelectTrigger>
                        <SelectContent>
                           {[
                              { value: "lt140-90", label: "< 140/90"},
                              { value: "gte140-90", label: "≥ 140/90"},
                              { value: "gte150-90", label: "≥ 150/90"}
                           ].map((item) => {
                              const inputId = `bp-${item.value}`
                              return (
                                 <label
                                    key = {item.value}
                                    value={item.value}
                                    className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" 
                                    htmlFor ={inputId}
                                 >
                                    <input
                                       type="checkbox"
                                       value={item.value}
                                       checked={selectedBP.some(object =>object.value === item.value)}
                                       onChange = {() => handleBP(item.value, item.label)}
                                       className="checkbox_input"
                                       id={inputId}
                                       
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span className="filterText">{item.label}</span>       
                                 </label>
                              )
                           })}
                        </SelectContent>
                  </Select>
               </div>
            </div>
                  
                  
                  {/* SUMMARY  */} 
                 
                  <div className=" min-w-[500px]  xl:max-w-[610px] 2xl:max-w-[650px] flex-1 flex flex-col justify-between ml-2 summary_box">
                     <div>
                        <header className=" flex  rounded-t-lg px-2 py-2 bg-[#21376A] text-white">
                           <p className ="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">Summary</p>
                        </header>

                        <div className=" border-t-0 border-[0.1em] border-[#21376A] flex flex-col py-2 px-2" >
                           <table className=" lg:text-xs xl:text-[0.85em] 2xl:text-sm summary_table">
                              <tbody className=" ">
                                 <tr className="">
                                    <td className=" font-bold">Atrial Fibrillation Register</td>
                                    <td className=" font-semibold text-center">{importedData.length}</td>
                                    <td className="  font-semibold text-center">{ percentageFormatter(importedData.length, importedData.length) }</td>
                                 </tr>

                                 <tr className=" bg-gray-100 text-left ">
                                    {/* *Modified AF008: CHA₂DS₂-VASc ≥ 2 issued Anticoagulants (6m) */}
                                    <td className="flex flex-nowrap">CHA₂DS₂-VASc ≥ 2 issued Anticoagulants (6m)
                                       
                                    </td>
                                    <td className=" text-center">{ importedData.reduce(chadsvasce2Anticoag,0) }</td>
                                    <td className="relative">
                                       <span className="progress_data">{percentageFormatter(importedData.reduce(chadsvasce2Anticoag,0), importedData.reduce(chadsvasce2,0)) }</span>
                                    </td>
                                    {
                                       importedData.length > 0 && importedData.reduce(chadsvasce2Anticoag,0) > 0 && !removeProgressBar && (
                                          <td className="ml-4 border  border-gray-200 w-[4em] relative rounded-md p-0">
                                             <div 
                                                style =
                                                   {{
                                                      width: `${percentageFormatter(importedData.reduce(chadsvasce2Anticoag,0), importedData.reduce(chadsvasce2,0)) }`,
                                                   }}
                                                   className="absolute h-full top-0 bg-[#21376A] "
                                             >
                                             </div>
                                          </td> 
                                       ) 
                                    } 
                                    
                                 </tr> 

                                 <tr>
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued DOAC (6m)</td>
                                    <td className=" text-center">{ importedData.reduce(chadsvasce2DOAC,0) }</td>
                                    <td className="relative ">
                                       <span className="progress_data">{percentageFormatter(importedData.reduce(chadsvasce2DOAC,0), importedData.reduce(chadsvasce2,0))}</span>
                                    </td> 
                                    {
                                       importedData.length > 0 && importedData.reduce(chadsvasce2DOAC,0) > 0 && !removeProgressBar &&(
                                          <td className="ml-4 border  border-gray-200 w-[4em] relative rounded-md p-0">
                                          <div 
                                             style =
                                                {{
                                                   width: `${percentageFormatter(importedData.reduce(chadsvasce2DOAC,0), importedData.reduce(chadsvasce2,0))}`,
                                                   
                                                }}
                                                className="absolute h-full top-0 bg-[#21376A]"
                                                   
                                          >
                                          </div>
                                    </td>      
                                       )
                                    }
                                 </tr>

                                 <tr className="bg-gray-100">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 and NOT issued Anticoagulants (6m)</td>
                                    <td className=" text-center">{importedData.reduce(chadsvasce2NotOnAnticoag,0) }</td>
                                    <td className="relative ">
                                       <span className="progress_data">{percentageFormatter(importedData.reduce(chadsvasce2NotOnAnticoag,0), importedData.reduce(chadsvasce2,0)) }</span>
                                    </td> 
                                    {
                                       importedData.length > 0 && importedData.reduce(chadsvasce2NotOnAnticoag,0) > 0 && !removeProgressBar && (
                                          <td className="ml-4 border  border-gray-200 w-[4em] relative rounded-md p-0">
                                          <div 
                                             style =
                                                {{
                                                   width: `${percentageFormatter(importedData.reduce(chadsvasce2NotOnAnticoag,0), importedData.reduce(chadsvasce2,0))}`,
                                                   
                                                }}
                                                className="absolute h-full top-0 bg-[#21376A]"    
                                          >
                                          </div>
                                       </td>    
                                       )
                                    }
                                 </tr>
                                 <tr>
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued Aspirin/Antiplatelets ONLY (6m) </td>
                                    <td className=" text-center">{ importedData.reduce(chadsvasce2OnAspAntipOnly,0) }</td>
                                    <td className="relative ">
                                       <div 
                                          
                                       ></div>
                                       <span className="progress_data">{percentageFormatter(importedData.reduce(chadsvasce2OnAspAntipOnly,0), importedData.reduce(chadsvasce2,0))}</span>
                                    </td>
                                    {
                                       importedData.length > 0 && importedData.reduce(chadsvasce2OnAspAntipOnly,0) > 0 && !removeProgressBar &&(

                                       <td className="ml-4 border  border-gray-200 w-[4em] relative rounded-md p-0">
                                       <div 
                                             style =
                                                {{
                                                   width: `${percentageFormatter(importedData.reduce(chadsvasce2OnAspAntipOnly,0), importedData.reduce(chadsvasce2,0))}`,
                                                   
                                                }}
                                                className= "absolute h-full top-0 bg-[#21376A]"
                                                  
                                       ></div>
                                    </td>  
                                       )
                                    }
                                         
                                 </tr >
                                 <tr className=" bg-gray-100">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued BOTH Anticoagulants + Antiplatelets (6m)</td>
                                    <td className=" text-center">{ importedData.reduce(chadsvasce2OnAnticoagAspAntip,0) }</td>
                                    <td className="relative ">
                                       
                                       <span className="progress_data">{percentageFormatter(importedData.reduce(chadsvasce2OnAnticoagAspAntip,0), importedData.reduce(chadsvasce2,0))}</span>
                                    </td> 
                                    {
                                       importedData.length > 0 && importedData.reduce(chadsvasce2OnAnticoagAspAntip,0) > 0 && !removeProgressBar &&(
                                          <td className="ml-4 border  border-gray-200 w-[4em] relative rounded-md p-0">
                                             <div 
                                                style =
                                                   {{
                                                      width: `${percentageFormatter(importedData.reduce(chadsvasce2OnAnticoagAspAntip,0), importedData.reduce(chadsvasce2,0))}`,
                                                      
                                                   }}
                                                   className="absolute h-full top-0 bg-[#21376A]"
                                             >
                                             </div>
                                    </td>       
                                       )
                                    }
                                 </tr>
                                 




                                
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
      </>
  )
}

export default Filter



 