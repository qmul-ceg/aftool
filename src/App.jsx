import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Import from './Import.jsx';
import Display from './Display.jsx';
import { useEffect, useState } from 'react';
import MainProvider from './MainContext.jsx';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"



function App() {


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

  
   const overlay ={
      position : 'fixed',
      top:0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#21376A',
      zIndex:100
   }

   
   return (
      
      <MainProvider>
         {
            !isDesktop && ( 
               <div style={overlay}>
                   <Alert className= " border-0 w-[45%] m-auto fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                     <AlertTitle>Incompatible screen size!</AlertTitle>
                     <AlertDescription className="pt-4">
                        This application is not available on smaller screen resolutions, please use a desktop or laptop to access this application.
                     </AlertDescription>
                  </Alert>
               </div>
            )
         }
         <div>
            {/* <Router basename="/aftool/"> */}
            <Router>
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
