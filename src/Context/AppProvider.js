import React, { createContext, useContext, useState } from 'react'
import { data } from '../Data/data';

//step 1 : creating a context 
const AppContext = createContext();

const AppProvider = ({children}) => {
//    step 2 create provider subscriber model
const [user, setUser] = useState(data);
  return (
      <AppContext.Provider
      value = {{
        user,
        setUser
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
