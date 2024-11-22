import Sidebar from "@/components/sidebar";
import Navbar from "../navigation/navbar";
import './page.css'
import Library from "./library/page";
import Footer from "../footer/footer";

function ForYou() {
    return (
      <div className='screen-container'>
        <Sidebar/>
        <Footer/>
      </div>
       
    )  
  
  /*return (
      <div className=".screen-container">
        <div className=" main-body">
            <Sidebar />
      </div>
      </div>
      
    )*/
  }
  
  export default ForYou
//className=" w-full h-full bg-gradient-circle"
//falta el navbar