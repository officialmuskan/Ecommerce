
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { resetPassword } from "../../actions/userActions";
import { useParams } from "react-router-dom";


const ResetPassword = (props) => {
  const dispatch = useDispatch()
          const nav = useNavigate()
          const { token } = useParams();
        
        const { error, success, loading } = useSelector((state) => state.forgotPassword);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  
          const resetPasswordSubmit = (e)=>{
                 e.preventDefault();
                 dispatch(resetPassword(token,password, confirmpassword))
         
             }
      
             useEffect(() => {
              if(error){
                  alert(error);
              }
               
            if (success) {
            alert("PasswordUpdated Successfully");
           
      
            nav("/login");
      
            
           
          }
             }, [dispatch, error, alert, nav, success])
             
          return (
          <div className={`w-[99vw]  h-[100vh] flex justify-center pt-25 items-start ${props.mode==='dark'?'bg-gray-900':'bg-white'}`}>
              <div className='sm:w-[35vw] w-[55vw] h-[60vh] bg-indigo-800'>
                  <h2 className='sm:text-2xl p-[1.3vmax] m-auto text-white'>Update Password</h2>
                  <form className='flex flex-col sm:w-[35vw] w-[55vw] gap-5 items-center  h-[70%] p-[2vmax] m-auto' onSubmit={resetPasswordSubmit}>
                      <div className='flex items-center sm:w-[20vw] w-[35vw]'>
                          <input className='px-[4max] py-[1vmax] sm:text-lg text-sm border-1 rounded w-full' 
                          type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                        />
      
                      </div>
                      
                      <div className='flex items-center sm:w-[20vw] w-[35vw]'>
                          <input className='px-[4max] py-[1vmax] w-full sm:text-lg text-sm border-1 rounded'
                          type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                        />
      
                      </div>
                      <input className='sm:text-xl px-[1vmax] py-2 text-white rounded bg-indigo-500' type="submit" value="Reset" />
                  </form>
              </div>
      
          </div>
    )
  }

export default ResetPassword