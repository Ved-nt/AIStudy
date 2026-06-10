import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 

export default function useIdleLogout() { 
  const navigate = useNavigate(); 
  
  useEffect(() => { 
    let timeout; 
    const logout = () => { 
      localStorage.removeItem("token"); 
      localStorage.removeItem("user"); 
      
      navigate("/login"); 
    }; 
    
    const resetTimer = () => { 
      clearTimeout(timeout); 
      timeout = setTimeout( 
        logout, 2 * 60 * 1000 
      ); 
    }; 
    window.addEventListener( "mousemove", resetTimer ); 
    window.addEventListener( "keydown", resetTimer ); 
    window.addEventListener( "click", resetTimer ); 
    resetTimer(); return () => { 
      
      clearTimeout(timeout); 
      window.removeEventListener( "mousemove", resetTimer ); 
      window.removeEventListener( "keydown", resetTimer ); 
      window.removeEventListener( "click", resetTimer ); 
    }; 
  }, [navigate]); 
}