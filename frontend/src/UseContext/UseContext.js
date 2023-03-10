import React,{createContext,useState,memo} from 'react'

 export const context = createContext();

function UseContext({children}) {
    const[data,setData]= useState("");
  return (
    <context.Provider value={{
        data,
        setData,
    }}
    >
    {children}    
    </context.Provider>
  )
}

export default  UseContext
