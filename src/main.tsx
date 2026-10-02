
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './landing.tsx'
import SignIn from './signin.tsx';
import SignUp from "./signup.tsx"
 import { Bounce, ToastContainer} from 'react-toastify';
import Dashboard from './dashboard.tsx';
import Link from './link.tsx';



createRoot(document.getElementById('root')!).render(
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<SignIn/>}/>
      <Route path= "/signup" element={<SignUp/>}/>
      <Route path= "/dashboard" element={<Dashboard/>}/>
      <Route path= "/send-message/:username" element={<Link/>}/>
    </Routes>
  </BrowserRouter>
   <ToastContainer
   position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}/>
  </div>
  
)
