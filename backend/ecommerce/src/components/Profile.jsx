import React from 'react'
import { useEffect } from 'react';
useNavigate
import { FaEdit, FaUser, FaMoon,FaSun } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
{FaEdit}
useEffect
// Link
// useSelector
// box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
// 			0 10px 10px rgba(0,0,0,0.22);
	
const Profile = (props) => {
    const nav = useNavigate()
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        if(isAuthenticated===false){
            nav("./login")
        }
    
      
    }, [])
    
  return (
    <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} profileContainer flex h-screen w-screen fixed top-0 left-0 justify-center items-center`}>
        
        <div className='h-[80vh] w-[50vw] sm:flex-row flex-col flex justify-between items-center'>
            <div className='flex h-[80vh] sm:w-[100vw] w-[65vw]  flex-col justify-around items-center p-[5vmax] bg-indigo-500 '>
              <h1 className='sm:text-[2vmax] text-[3.2vmax] font-bold'>My Profile</h1>
              {props.mode === 'light'?(
                  <FaMoon className="cursor-pointer hover:text-black" onClick={props.toggleStyle} />
                
                  
              
                ):(
                  <FaSun className="cursor-pointer hover:text-yellow-600" onClick={props.toggleStyle} />
              
                )}
              <div className=""> <FaUser size={150} color='lightgray'/> </div>
              
              <Link to="/me/update"><FaEdit/></Link>


        </div>
        <div className='flex h-screen  flex-col justify-evenly items-start p-[5vmax]'>
           
            <div>
                <h4 className='sm:text-[1.5vmax] text-[2.5vmax] font-bold'>Full Name</h4>
                <p>{user?.name}</p>
            </div>
            <div>
                <h4 className='sm:text-[1.5vmax] text-[2.5vmax] font-bold'>Email</h4>
                <p>{user?.email}</p>
            </div>
            <div>
                <h4 className='sm:text-[1.5vmax] text-[2.5vmax] font-bold'>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div className='flex gap-10 w-[60vw]'>
                <Link className='bg-black text-white m-[1vmax] sm:text-[1vmax] text-[1.8vmax] p-[0.5vmax]' to="/orders">My Orders</Link>
                <Link className='bg-black text-white m-[1vmax] sm:text-[1vmax] text-[1.8vmax] p-[0.5vmax]' to="/password/update">Change Password</Link>
              </div>
        </div>

        </div>
        
    </div>
  )
}

export default Profile