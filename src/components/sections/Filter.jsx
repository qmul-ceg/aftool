import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
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
         // selectedChd, handleChd,
         selectedOrbit, handleOrbit, removeOrbitDisplay,
         medReview, handleMedReview, setMedReview,
         handleVulnerabilitesFilter,
         selectedAnti, handleAntiFilter, setSelectedAnti, removeAntiFilter,
         selectedVulnerabilities, 
         setSelectedVulnerabilities, 
         importedData, relativeRunDate,
         resetFilters, resetAllFilters, data, quickFilter, handleQuickFilter,
         //REMOVE FILTERS
         removeNsaidFilter, removeVulnerabilities, removeCvdFilter
         } = useContext(MainContext);



   //FILTER AND QUICK FILTERS FUNCTIONALITY
   const[filterMenu, setFilterMenu] = useState(true)
   const[showQuickFilter, setShowQuickFilter] = useState(true)

   //FILTER DISPLAY FEATURE
   // const [displayAntiFilter] = useState(selectedAnti)

   const [selectedAntiLabel, setSelectedAntiLabel] = useState()
   const [resizeQuickFilter, setResizeQuickFilter] = useState(true)

   
   const checkScreenSize = () =>{
      if(window.innerWidth < 1522){
         setResizeQuickFilter(false)
      }else {
         setResizeQuickFilter(true)
      }
   }

   useEffect(() => {
      checkScreenSize(); //Calls checkScreenSize when we first mount 
      window.addEventListener('resize', checkScreenSize)

      return () => {
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

   // const toggleQuickFilter =()=>{
   //    setShowQuickFilter(!showQuickFilter)
   // }


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

   const selectedChdDateLabel = {
      '>12m' : 'Recorded > 12',
      'not_recorded' : 'Not recorded',
      '<12m' : 'Recorded < 12'
   }

   // console.log(selectedFilters)
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
                     <button className=" text-xs bg-white text-[#21376A] px-2 rounded-md ">
                        <strong className ="mr-2">AntiCoag/AntiP:</strong> {selectedAnti.label } 
                       
                        {<button className="  ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeAntiFilter()}>x</button>}
                     </button>
                  )}

                  {/* MED REVIEW DISPLAY */}
                  {(importedData.length > 0 && displayMedReview[0].value !== "") && (
                     <button className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">Med Review:</strong> {displayMedReview[0].value } 
                        {<button className=" ml-2 font-bold text-red-500 hover:text-sm"onClick={() => handleMedReview("")}>x</button>}
                     </button>
                  )}

                  {/* NSAID DISPLAY */}
                  {(importedData.length > 0 && displayNsaid[0].value !== "") && (
                     <button className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">NSAID:</strong> {displayNsaid[0].value } 
                        {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={removeNsaidFilter}>x</button>}
                     </button>
                  )}
                  {/* CVD DISPLAY */}
                  {(importedData.length > 0 && cvd)  && (
                     <button className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">CVD:</strong> {cvd.value } 
                        {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={removeCvdFilter}>x</button>}
                     </button>
                  )}
                  {/* VULNERABILITIES DISPLAY */}
                  {(importedData.length > 0 && selectedVulnerabilities.length > 0) && (
                     selectedVulnerabilities.map((item, id) => 
                        <button key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">Vulnerabilities: </strong> {item.label} 
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeVulnerabilities(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  
                  {/* BP DISPLAY */}
                  {(importedData.length > 0 && selectedBP.length > 0) && (
                     selectedBP.map((item, id) => 
                        <button key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">BP:</strong> {item.label} 
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeBP(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  {/* CHA₂DS₂-VASc DISPLAY */}
                  {(importedData.length > 0 && selectedChdValue.length > 0 && !selectedChdDate) && (
                     console.log("displaying 1"),
                     selectedChdValue.map((item, id) => 
                        <button key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">CHA₂DS₂-VASc: </strong> {selectedChdValueLabel[item]} 
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeChdValue(item)}>x</button>}
                        </button>
                     )
                  )}
                  

                  {(importedData.length > 0 && selectedChdValue.length === 0 && selectedChdDate) && (
                      console.log("displaying 2"),
                     <button key = {selectedChdDate} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                        <strong className ="mr-2">CHA₂DS₂-VASc: </strong> {selectedChdDateLabel[selectedChdDate]} 
                        {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeChdDate()}>x</button>}
                     </button>
                     
                  )}
                  {(importedData.length > 0 && selectedChdValue.length > 0 && selectedChdDate) && (
                      console.log("displaying 3"),
                      selectedChdValue.map((item, id) => 
                        <button key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">CHA₂DS₂-VASc: </strong>{selectedChdValueLabel[item]}
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeChdValue(item )}>x</button>}
                           <span className="ml-2">{selectedChdDateLabel[selectedChdDate]} </span>
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeChdDate()}>x</button>}
                        </button>
                  ))}

                  {/* ORBIT DISPLAY */}
                  {(importedData.length > 0 && selectedOrbit.length > 0) && (
                     selectedOrbit.map((item, id) => 
                        <button key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">ORBIT:</strong> {item.label} 
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeOrbitDisplay(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  {/* AGE DISPLAY */}
                  {(importedData.length > 0 && selectedAges.length > 0) && (
                     selectedAges.map((item, id) => 
                        <button key = {id} className=" text-xs bg-white text-[#21376A] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">Age:</strong> {item.label} 
                           {<button className="ml-2 font-bold text-red-500 hover:text-sm" onClick={()=>removeAgeDisplay(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  
               </div>

               
            </div>
            
            {/* Reset Filters button */}
            <div className="ml-auto mr-8  text-center min-w-[140px] ">
               <button
                  className = " cursor-pointer bg-white text-xs  lg:text-xs xl:text-sm 2xl:text-sm font-semibold text-[#21376A] hover:text-black px-2 py-1 rounded-lg "
                  onClick={resetAllFilters} 
               >
                  Remove all filters
               </button>
               
            </div>
           
            {/* TOGGLE COLLAPSE BUTTON */}
            <button onClick={toggleFilter}>
               {filterMenu ? <FiChevronDown /> : <FiChevronUp/>}
            </button>
         </div>
         

         {/* lg:text-xs xl:text-sm 2xl:text-sm */}
         {/* {
            filterMenu && ( */}
              
               <div className= 
                  {`flex justify-between border-[0.1em] border-[#21376A] px-4 py-2 transition-all duration-700 ease-in-out ${filterMenu ? "opacity-100 max-h-96": "opacity-0 max-h-0 overflow-hidden"}`}
               >

                  {/* QUICK FILTERS */}
                  {
                     !resizeQuickFilter && (
                        // <div className=" min-w-[10px] ">
                        <div className=" mr-2  w-[10%]">
                           <Popover className="">
                              <PopoverTrigger className="flex justify-center w-full">
                                 <header className="w-full border flex justify-between px-2 py-2 rounded-lg  bg-gradient-to-r from-[#7B0E72] from-70%   to-[#E6007E] text-white" >
                                    <span className ="font-semibold text-left text-xs  xl:text-sm 2xl:text-sm pr-2 text-nowrap">Quick filters</span>
                                    {/* <button onClick={toggleQuickFilter}> 
                                       { showQuickFilter  ? <FiChevronDown /> : <FiChevronUp/> }
                                    </button> */}
                                 </header>
                              </PopoverTrigger>
                              <PopoverContent className="w-88 ml-8 pl-0">
                                 <div className=" text-sm font-semibold">
                                    {[
                                       { value: "option_one", label: "CHA₂DS₂-VASc ≥ 2 (12m), no anticoagulation "},
                                       { value: "option_two", label: "CHA₂DS₂-VASc ≥ 2 (>12m), no anticoagulation"},
                                       { value: "option_three", label: "ORBIT ≥ 4 (12m), on anticoagulation"},
                                       { value: "option_four", label: "Med review > 12m, on anticoagulation"},
                                       { value: "option_five", label: "On NSAIDs, on anticoagulant"},
                                       { value: "option_six", label: "On dual therapy, no med review (12m)"}
                                    ].map((item) => {
                                       return (
                                          <label
                                             // value={item.value}
                                             className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" 
                                          
                                          >
                                             <input
                                                type="checkbox"
                                                checked={quickFilter === item.value}
                                                onChange={()=>handleQuickFilter(item.value)} 
                                                className="checkbox_input"
                                                
                                             />
                                             <div className="custom_checkbox"></div>
                                             <span>{item.label}</span>       
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

                        <div className =" flex-1 w-full flex flex-col justify-between max-w-[360px] mr-2">
                           <div className =" flex flex-col">
                              <header className="flex justify-between px-2 py-2 rounded-t-lg  bg-gradient-to-r from-[#7B0E72] from-70%   to-[#E6007E] text-white" >
                                 <p className ="font-semibold text-xs text-left xl:text-sm 2xl:text-sm pr-2">Quick filters</p>
                                 {/* <button onClick={toggleQuickFilter}>
                                    { showQuickFilter  ? <FiChevronDown /> : <FiChevronUp/> }
                                 </button> */}
                              </header>
                     
                              {
                           showQuickFilter && (
                              <div className="border-[0.1em] border-[#21376A] h-36 border-t-0 text-sm pt-2 font-semibold ">
                                 {[
                                    { value: "option_one", label: "CHA₂DS₂-VASc ≥ 2 (12m), no anticoagulation "},
                                    { value: "option_two", label: "CHA₂DS₂-VASc ≥ 2 (>12m), no anticoagulation"},
                                    { value: "option_three", label: "ORBIT ≥ 4 (12m), on anticoagulation"},
                                    { value: "option_four", label: "Med review > 12m, on anticoagulation"},
                                    { value: "option_five", label: "On NSAIDs, on anticoagulant"},
                                    { value: "option_six", label: "On dual therapy, no med review (12m)"}
                                 ].map((item) => {
                                    return (
                                       <label
                                          value={item.value}
                                          className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" 
                                       >
                                          <input
                                             type="checkbox"
                                             checked={quickFilter === item.value}
                                             onChange={()=>handleQuickFilter(item.value)}
                                             className="checkbox_input"
                                          />
                                          <div className="custom_checkbox"></div>
                                          <span>{item.label}</span>       
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
                  
                  
                  {/* w-[70vh] flex justify-between */}
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
                                 // {value: "none", label:"NONE", name: 'Anti'},
                                 {value: "doac_warf", label: "DOAC or Warfarin", name: 'Anti'},
                                 {value: "doac", label: "DOAC", name: 'Anti'},
                                 {value: "warf", label: "Warfarin", name: 'Anti'},
                                 {value: "antiplatelets", label: "Antiplatelets only" , name: 'Anti'},
                                 {value: "no_anticoagulant", label: "None" , name: 'Anti'},
                                 {value: "dual", label: "Dual therapy" , name: 'Anti'},
                              ].map((item) => (
                                 <label 
                                    key={item.value}
                                    className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]"
                                    // for="filter_checkbox"
                                 >
                                    <input
                                       type="checkbox"
                                       value={item.value}
                                       name="antiFilter"
                                       checked={selectedAnti && selectedAnti.value === item.value || false}
                                       onChange={() => handleAntiFilter(item.value, item.label)}
                                       className="checkbox_input"
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span>{item.label}</span>
                                    
                                 </label>
                              ))}
                           </SelectContent>
                        </Select>

                        {/* MED REVIEW FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#21376A]  text-white">
                              <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm">Medication review {">"} 12m</h1>
                              {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                           </SelectTrigger>
                           <SelectContent>
                              <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                 <input
                                    type="checkbox"
                                    name="medReview"
                                    value="Yes"
                                    checked = {medReview=== "Yes"}
                                    onChange= {()=>handleMedReview("Yes")}
                                    className="checkbox_input"
                                 />
                                 <div className="custom_checkbox"></div>
                                 <span>Yes</span>
                              </label>

                              <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                 <input
                                       type="checkbox"
                                       name="medReview"
                                       value="No"
                                       checked={medReview === "No"}
                                       onChange={()=>handleMedReview("No")}
                                       className="checkbox_input"
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span>No</span>
                              </label>
                           </SelectContent>
                        </Select>

                        {/*VULNERABILITIES FILTER */}
                        <Select>
                           <SelectTrigger className=" bg-[#21376A]  text-white">
                           <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">Vulnerabilities</h1>
                           {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                           </SelectTrigger>
                           <SelectContent>

                              {[
                                    {value: 'smi', label: 'SMI' },
                                    {value: 'learning_disability', label: 'Learning disability' },
                                    {value: 'dementia', label: 'Dementia' },
                                    {value: 'housebound', label: 'Housebound' },
                                 ].map((item, index) =>
                                    (
                                       <label
                                          value={item.value}
                                          className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" 
                                       >
                                          <input
                                             type="checkbox"
                                             value={item.value}
                                             checked={selectedVulnerabilities.some(object =>object.value === item.value)}
                                             onChange = {() => handleVulnerabilitesFilter(item.value, item.label)}
                                             className="checkbox_input"
                                          />
                                          <div className="custom_checkbox"></div>
                                          <span>{item.label}</span>       
                                       </label>
                                    ))}
                           
                           </SelectContent>
                        </Select>

                        
                     
                     </div>

                     {/* FILTER COLUMN 2 */}
                     <div className= "flex flex-col gap-6">
                        
                        {/* CHA₂DS₂-VASc FILTER */}
                        <Select>
                              <SelectTrigger className=" bg-[#21376A] text-white">
                                 <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">CHA₂DS₂-VASc</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                              {[ 'gte2', '1', '0'].map((item, index) => 
                                 (
                                 
                                    <label key={index} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                       <input
                                          type="checkbox"
                                          value={item}
                                          checked={selectedChdValue.includes(item)}
                                          onChange={() => handleChdValue(item)}
                                          className="checkbox_input"
                                       
                                       />
                                       <div className="custom_checkbox"></div>
                                       <span>{selectedChdValueLabel[item]}</span>
                                    </label>
                                 ))
                              }
                              
                              <div className="w-full border"></div>
                              
                              {[ '>12m', 'not_recorded', '<12m'].map((item, index) => 
                                 (
                                    <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                       <input
                                          type="checkbox"
                                          value={item}
                                          checked= {selectedChdDate === item}
                                          onChange={() => handleChdDate(item)}
                                          className="checkbox_input"
                                       />
                                       <div className="custom_checkbox"></div>
                                       <span>{selectedChdDateLabel[item]}</span>
                                    </label>
                              ))}
                              
                              {/* {[
                                 { value: 'gte2', label: '≥ 2' },
                                 { value: '1', label: '1' },
                                 { value: '0', label: '0' }
                              ].map((item, index) => (
                                 <label key={index} className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value={item.value}
                                       checked={selectedChdValue.some(object => object.value === item.value)}
                                       onChange={() => handleChdValue(item.value, item.label)}
                                    
                                    />
                                    <span>{item.label}</span>
                                 </label>
                              ))}
                              
                              <div className="w-full border"></div>
                              
                              {[
                                 { value: '>12m', label: 'Recorded > 12m' },
                                 { value: 'not_recorded', label: 'Not Recorded' },
                                 { value: '<12m', label: 'Recorded < 12m' }
                              ].map((item, index) => (
                                 <label key={index + 3} className="flex items-center space-x-2 ml-4">
                                    <input
                                    type="checkbox"
                                    value={item.value}
                                    checked= {selectedChdDate && selectedChdDate.value === item.value}
                                    onChange={() => handleChdDate(item.value, item.label)}
                                    />
                                    <span>{item.label}</span>
                                 </label>
                              ))} */}
                                
                              </SelectContent>
                        </Select>

                        {/* ORBIT FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#21376A]  text-white">
                              <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm">ORBIT</h1>
                              {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                           </SelectTrigger>
                           <SelectContent>
                              {[
                                 {value: "gte4", label : "≥ 4"},
                                 {value: ">12m", label : "Recorded > 12m"},
                                 {value: "not_recorded", label : "Not recorded"}
                              ].map((item, index) =>{
                                 return (
                                    <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                    <input
                                       type="checkbox"
                                       value={item.value}
                                       checked={selectedOrbit.some(object =>object.value === item.value)}
                                       onChange={() => handleOrbit(item.value, item.label)}
                                       className="checkbox_input"
                                       
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span>{item.label}</span>
                                    
                                 </label>
                                 )
                              })}
                              
                           </SelectContent>
                        </Select>      
                        
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
                                 return (
                                    <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                    <input
                                       type="checkbox"
                                       value={item.value}
                                       checked={selectedAges.some(object =>object.value === item.value)}
                                       onChange={() => handleAgeSelection(item.value, item.label)}
                                       className="checkbox_input"
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span>{item.label}</span>
                                 </label>
                                 )
                              })}

                           </SelectContent>
                        </Select>

                     </div>
                     
                     {/* FILTER COLUMN 3 */}
                     <div className= "flex flex-col gap-6 ">
                        {/*NSAID FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#21376A] text-white">
                                 <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">NSAID</h1>
                                 {/* <SelectValue placeholder="" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                    <input
                                       type="checkbox"
                                       name="nsaid"
                                       value="Yes"
                                       checked= {nsaid=== "Yes"}
                                       onChange= {()=>handleNSAID("Yes")}
                                       className="checkbox_input"
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span>{"Yes"}</span>
                                 </label>

                                 <label className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                    <input
                                          type="checkbox"
                                          name="nsaid"
                                          value="No"
                                          checked={nsaid === "No"}
                                          onChange={()=>handleNSAID("No")}
                                          className="checkbox_input"
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span>{"No"}</span>
                                 </label>
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
                                 return (
                                    <label key={index + 3} className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]">
                                    <input
                                       type="checkbox"
                                       value={item.value}
                                       checked={cvd && cvd.value === item.value}
                                       onChange={() => handleCVD(item.value, item.label)}
                                       className="checkbox_input"
                                    />
                                    <div className="custom_checkbox"></div>
                                    <span>{item.label}</span>
                                 </label>
                                 )
                              })}
                           
                              </SelectContent>
                        </Select>

                        {/* BP FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#21376A] text-white">
                                 <h1 className="text-xs font-semibold text-left xl:text-sm 2xl:text-sm">BP</h1>
                                 {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 {[
                                    { value: "lt130-80", label: "< 130/80"},
                                    { value: "lt140-90", label: "< 140/90"},
                                    { value: "140/90-159/90", label: "140/90 - 159/90"},
                                    { value: "gte160-100", label: "≥ 160/100"}
                                 ].map((item) => {
                                    return (
                                       <label
                                          value={item.value}
                                          className="flex items-center space-x-2 lg:text-xs  xl:text-sm 2xl:text-[1em]" 
                                       >
                                          <input
                                             type="checkbox"
                                             value={item.value}
                                             checked={selectedBP.some(object =>object.value === item.value)}
                                             onChange = {() => handleBP(item.value, item.label)}
                                             className="checkbox_input"
                                             
                                          />
                                          <div className="custom_checkbox"></div>
                                          <span>{item.label}</span>       
                                       </label>

                                    )
                                 })}
                              

                              </SelectContent>
                        </Select>

                     </div>
                  </div>
                  
                  
                  {/* SUMMARY */}
                  <div className="  min-w-[470px] max-w-[560px] flex-1 flex flex-col justify-between ml-2">
                     <div>
                        <header className=" flex  rounded-t-lg px-2 py-2 bg-[#21376A] text-white">
                           <p className ="text-xs font-semibold text-left xl:text-sm 2xl:text-sm pr-2">Summary</p>
                        </header>

                        <div className=" border-t-0 border-[0.1em] border-[#21376A] flex flex-col pt-2 px-2" >
                           <table className=" lg:text-xs xl:text-sm 2xl:text-sm summary_table">
                              <tbody className=" ">
                                 <tr className="border-b border-gray-200">
                                    <td className=" font-bold">Atrial Fibrillation Register</td>
                                    <td className=" font-semibold text-right">{importedData.length}</td>
                                    <td className="  font-semibold text-right">{ percentageFormatter(importedData.length, importedData.length) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200 bg-gray-100 text-left">
                                    <td className="flex flex-nowrap">*Modified AF008: CHA₂DS₂-VASc ≥ 2 issued Anticoagulants (6m)
                                       <div className="ml-2 my-auto">
                                          <Popover>
                                             <PopoverTrigger 
                                                 className="flex justify-center items-center
                                                 font-serif text-xs px-[0.51em]  rounded-full font-semibold
                                                 bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white "
                                             >
                                                i
                                             </PopoverTrigger>
                                             <PopoverContent 
                                                className="min-w-[30em] text-xs  
                                                text-left xl:text-sm 2xl:text-sm pr-2  py-1 pl-1"
                                             >
                                                   Modified QOF: no exclusions for contraindication or declined
                                                
                                             </PopoverContent>
                                          </Popover>
                                       </div>




                                    </td>
                                       
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2Anticoag,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2Anticoag,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr> 
                                 <tr className="border-b border-gray-200">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 and NOT issued Anticoagulants (6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2NotOnAnticoag,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2NotOnAnticoag,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200 bg-gray-100">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued Aspirin/Antiplatelets ONLY (6m) </td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2OnAspAntipOnly,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2OnAspAntipOnly,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                    <tr className="border-b border-gray-200">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued BOTH Anticoagulants + Antiplatelets (6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2OnAnticoagAspAntip,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2OnAnticoagAspAntip,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200 bg-gray-100">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued DOAC (6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2DOAC,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2DOAC,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200">
                                    <td className="">*Modified AF006: new CHA₂DS₂-VASc ≥ 2 in last 12m</td>
                                    <td className=" text-right">{ importedData.reduce(newChadsvasce2,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(newChadsvasce2,0), (importedData.length - importedData.reduce(chadsvasc2RecordedPrior12m,0)) ) }</td>
                                 </tr>
                              </tbody>
                           </table>

                           {/*  */}
                        </div>

                     </div>
                        
                        {/* EXTERNAL LINKS */}
                        
                                    
                     {/* <div>
                        <Popover >
                           <PopoverTrigger className="flex justify-center pr-4 ml-auto mt-2">

                              <button className=" px-2 rounded-full font-serif font-semibold bg-gradient-to-r from-[#7B0E72] from-70%   to-[#E6007E] text-white">i</button>
                              
                           </PopoverTrigger>
                           <PopoverContent>
                              <div>
                                 <strong className="text-sm">EXTERNAL LINKS</strong>
                                 <ul className=" ml-4 text-sm">
                                    <li><a href="https://www.qmul.ac.uk/ceg/" target="_blank" rel="noopener noreferrer">https://www.qmul.ac.uk/ceg/</a></li>

                                 </ul>
                              </div>
                           </PopoverContent>
                        </Popover>
                     </div> */}
                  </div>
               </div>
            {/* )
         } */}
      </>
  )
}

export default Filter



 // setDisplayVulnerabilities((prev) => prev.filter((item) => item.value !== value));
      // selectedVulnerabilities.map((item) => {
      //    if(item === value){
      //       return selectedVulnerabilities.filter((currentItems) => currentItems !== value )
      //    }
      // })
      
      
      // setDisplayVulnerabilities((prev) => {

      //    const exists = prev.some((item)=> item.value === value)

      //    if(exists){
      //       return prev.filter((item) => item.value !== value)
      //    }else{
      //       return [...prev, {value, label}];
      //    }
      // });
      
      
      // handleVulnerabilities,

      // {[
      //    {value: "none", label:"NONE", name: 'Anti'},
      //    {value: "doac_warf", label: "DOAC or WARFARIN", name: 'Anti'},
      //    {value: "doac", label: "DOAC", name: 'Anti'},
      //    {value: "warf", label: "WARFARIN", name: 'Anti'},
      //    {value: "antiplatelets", label: "ANTIPLATELETS ONLY" , name: 'Anti'},
      //    {value: "no_anticoagulant", label: "NO ANTICOAGULANT" , name: 'Anti'},
      //    {value: "dual", label: "DUAL THERAPY" , name: 'Anti'},
      // ].map((item) => (
      //    <label 
      //       key ={item.value}
      //       className="flex items-center space-x-2 ml-4"
      //    >
      //       <input
      //       type="radio"
      //       value={item.value}
      //       name="antiFilter"
      //       checked={selectedAnti === item.value}
      //       onChange={(event) => handleAntiChange(event, item.label, item.name)}
            
      //       />
      //       <span>{item.label}</span>
      //    </label>
      // ))}
      {/* <Button 
               //    className = "bg-white text-xs font-semibold text-[#21376A] hover:bg-gray-400 hover:text-white"
               //    // variant="outline"
               //    onClick={resetFilters}>
               //       Remove all filters
               // </Button> */}

   // const removeNsaidFilter =()=>{
   //    handleNSAID("")
   // }

   // const removeCvdFilter =()=>{
   //    handleCVD("")
   // }

   // const removeVulnerabilities = (value) =>{
   //    setSelectedVulnerabilities((prev) => 
   //       prev.filter((item) => item.value !== value)
   //   );

   // };
{/* <div className="text-sm mt-10 border-b border-gray mb-2">
                               *Modified QOF: no exclusions for contraindication or declined
                            </div> */}{/* <div>
                                                   <strong className="text-sm">EXTERNAL LINKS</strong>
                                                   <ul className=" ml-4 text-sm">
                                                      <li><a href="https://www.qmul.ac.uk/ceg/" target="_blank" rel="noopener noreferrer">https://www.qmul.ac.uk/ceg/</a></li>

                                                   </ul>
                                                </div> */}