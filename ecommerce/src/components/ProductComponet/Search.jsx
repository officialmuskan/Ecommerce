import React, { useState } from 'react'
useNavigate
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { FaUser, FaSun, FaSearch, FaShoppingCart, FaBars, FaTimes, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AllProduct from './AllProduct';


const Search = (props) => {
const navigate = useNavigate()
    const [keyword, setkeyword] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            console.log(keyword)
            navigate(`/products/${keyword}`)
        }
        else{
            console.log("heko")
            navigate('/product')
        }

    }
  return (
    <>
    <div className='bg-gray-900'>
      <form className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-gray'} shadow-md px-8 flex justify-end py-4`} onSubmit={handleSubmit}>
    <Paper
      
      sx={{ p: '2px 4px',position:'sticky', border:'2px solid grey', top:80,  display: 'flex', alignItems: 'center', width: 400, backgroundColor: 'transparent'}}
    >
    <InputBase id='box'
        sx={{ ml: 1, flex: 1, color:"grey" }}
        placeholder="Search any product"
        onChange={(e)=>setkeyword(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px',  color:"grey" }} aria-label="search">
      <FaSearch className="cursor-pointer hover:text-gray-600" />
      
      </IconButton>
      </Paper>
    </form>
    </div>
    
    <AllProduct mode={props.mode}/>

    

    </>
  )
}

export default Search