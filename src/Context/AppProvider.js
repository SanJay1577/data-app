import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import reducer from '../Reducer/reducer';


//step 1 : creating a context 
const AppContext = createContext();

const AppProvider = ({children}) => {
//    step 2 create provider subscriber model

const initialState = {user : []}
const [state, dispatch] = useReducer(reducer, initialState)

useEffect(()=>{
   const getuserDetails = async()=>{
        try {
          const response = await fetch("https://6410036ae1212d9cc926f1fd.mockapi.io/users", {
            method :"GET",
          }); 
          const data = await response.json()
          console.log(data)
          dispatch({type:"get-from-api", payload:data})
          if(!data){
            console.log("unable to fetch data")
          }
        } catch (error) {
          console.log(error)
        }
   }
   getuserDetails();
}, [])

  return (
      <AppContext.Provider
      value = {{
        state,
        dispatch
      }}
      >
        {children}  
      </AppContext.Provider>
  )
}

//step3 use the context 
export const AppState = ()=>{
    return useContext(AppContext)
}

export default AppProvider
