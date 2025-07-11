import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../constants/userConstants'
useSelector
import { updateProfile, loadUser } from "../actions/userActions";


const UpdateProfile = (props) => {
     const dispatch = useDispatch()
    const nav = useNavigate()
    
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    const handleRegisterSubmit = (e)=>{
           e.preventDefault();
           dispatch(updateProfile(name, email))
   
       }

       useEffect(() => {
         if (user) {
      setName(user.name);
      setEmail(user.email);}
      if (isUpdated) {
      alert("Profile Updated Successfully");
      dispatch(loadUser());

      nav("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
     
    }
       }, [dispatch, error, alert, nav, user, isUpdated])
       
    return (
    <div className={`w-[99vw]  h-[100vh] flex justify-center pt-25 items-start ${props.mode==='dark'?'bg-gray-900':'bg-white'}`}>
        <div className='sm:w-[35vw] w-[55vw] h-[40vh] bg-indigo-800'>
            <h2 className='sm:text-2xl p-[1.3vmax] m-auto text-white'>Update Profile</h2>
            <form className='flex flex-col sm:w-[35vw] w-[55vw] gap-5 items-center  h-[70%] p-[2vmax] m-auto' onSubmit={handleRegisterSubmit}>
                <div className='flex items-center sm:w-[20vw] w-[35vw]'>
                    <input className='px-[4max] py-[1vmax] sm:text-lg text-sm border-1 rounded w-full' type="text"placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                </div>
                <div className='flex items-center sm:w-[20vw] w-[35vw]'>
                    <input className='px-[4max] py-[1vmax] w-full sm:text-lg text-sm border-1 rounded'
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>
                <input className='sm:text-xl px-[1vmax] py-2 text-white rounded bg-indigo-500' type="submit" value="Update" />
            </form>
        </div>

    </div>
  )
}

export default UpdateProfile