import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { updatePassword, loadUser } from "../../actions/userActions";


const UpdatePassword = (props) => {
  
    const dispatch = useDispatch()
        const nav = useNavigate()
        
      const { user } = useSelector((state) => state.user);
      const { error, isUpdated, loading } = useSelector((state) => state.profile);
const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

        const updatePasswordSubmit = (e)=>{
               e.preventDefault();
               dispatch(updatePassword(oldPassword, newPassword, confirmPassword))
       
           }
    
           useEffect(() => {
            if(error){
                alert(error);
            }
             
          if (isUpdated) {
          alert("PasswordUpdated Successfully");
         
    
          nav("/account");
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          })
         
        }
           }, [dispatch, error, alert, nav, isUpdated])
           
        return (
        <div className={`w-[99vw]  h-[100vh] flex justify-center pt-25 items-start ${props.mode==='dark'?'bg-gray-900':'bg-white'}`}>
            <div className='sm:w-[35vw] w-[55vw] h-[60vh] bg-indigo-800'>
                <h2 className='sm:text-2xl p-[1.3vmax] m-auto text-white'>Update Password</h2>
                <form className='flex flex-col sm:w-[35vw] w-[55vw] gap-5 items-center  h-[70%] p-[2vmax] m-auto' onSubmit={updatePasswordSubmit}>
                    <div className='flex items-center sm:w-[20vw] w-[35vw]'>
                        <input className='px-[4max] py-[1vmax] sm:text-lg text-sm border-1 rounded w-full' 
                        type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                      />
    
                    </div>
                    <div className='flex items-center sm:w-[20vw] w-[35vw]'>
                        <input className='px-[4max] py-[1vmax] w-full sm:text-lg text-sm border-1 rounded'
                        type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                      />
    
                    </div>
                    <div className='flex items-center sm:w-[20vw] w-[35vw]'>
                        <input className='px-[4max] py-[1vmax] w-full sm:text-lg text-sm border-1 rounded'
                        type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                      />
    
                    </div>
                    <input className='sm:text-xl px-[1vmax] py-2 text-white rounded bg-indigo-500' type="submit" value="Update" />
                </form>
            </div>
    
        </div>
  )
}

export default UpdatePassword