import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Import from './Import.jsx';
import Display from './Display.jsx';
import { useEffect, useState } from 'react';
import MainProvider from './MainContext.jsx';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"



function App() {
   console.log("App component loaded");

   //State checks desktop to see if it can be displayed 
   const [isDesktop, setIsDesktop] = useState(true)

   //Checking user screen size
   const checkScreenSize =() => {
   
      if(window.innerWidth < 1024){
         setIsDesktop(false)
      }
      else{
         setIsDesktop(true)
      }
   }
   
   useEffect(() => {
      checkScreenSize();

      window.addEventListener('resize', checkScreenSize);
      return ()=>{
         window.removeEventListener('resize', checkScreenSize)
      };
   }, [])

   console.log("Current path:", window.location.pathname);
   

   // if(!isDesktop){
   //    return (
   //       <>
   //          <Alert className= "w-[45%] m-auto fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
               
   //             <AlertTitle>Incompatible screen size!</AlertTitle>
   //             <AlertDescription className="pt-4">
   //                This application is not available on smaller screen resolutions, please use a desktop or laptop to access this application.
   //             </AlertDescription>
   //          </Alert>
   //       </>
            
   //    )
   // }
   return (
      // <div>
      //    <h1>App Component</h1>
      //    <Import />
      // </div>
      <MainProvider>
         {
            !isDesktop && (
               <div className="app_overlay">
                   <Alert className= "w-[45%] m-auto fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                     <AlertTitle>Incompatible screen size!</AlertTitle>
                     <AlertDescription className="pt-4">
                        This application is not available on smaller screen resolutions, please use a desktop or laptop to access this application.
                     </AlertDescription>
                  </Alert>
               </div>
            )
         }
         <div>
            <Router basename="/af_tool_test/">
               <Routes>
                  <Route path="*" element={<Import />} />
                  <Route path = "/" element = {<Import />}/>
                  <Route path = "/display" element = {<Display />}/>
                  {/* <Route path = "/modal" element = {<Modal />}/>  */}
                  {/* DELETE ABOVE PATH AFTER BUILDING MODAL */}

               </Routes>
            </Router>
         </div>
      </MainProvider>
   )
}

export default App
