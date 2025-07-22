import React from 'react'

const Loader = (props) => {
  return (
    <div className={`${props.mode==='dark'?"bg-gray-900":'bg-white'} w-full text-center h-[90vh]  flex justify-center items-center`}>
        <div style={{borderRadius:"50%"}} className="animate-bounce div w-3 h-3 bg-indigo-500"></div>
        <div style={{borderRadius:"50%"}} className="animate-bounce div w-3 h-3 bg-indigo-500"></div>
    
        <div style={{borderRadius:"50%"}} className="animate-bounce div w-3 h-3 bg-indigo-500"></div>
    
        <div style={{borderRadius:"50%"}} className="animate-bounce div w-3 h-3 bg-indigo-500"></div>
    
    </div>
  )
}

export default Loader