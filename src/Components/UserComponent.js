import React from "react";
import { useHistory } from "react-router-dom";
import { AppState } from "../Context/AppProvider";
import BaseApp  from "../Core/Base";



export default function UserComponent(){
  const {state, dispatch} = AppState();
    const history = useHistory();
   //functionality 
   const deleteUser = async (idx)=>{
    try {
       
      const response = await fetch(`https://6410036ae1212d9cc926f1fd.mockapi.io/users/${idx}`,{
        method: "Delete"
      })
      const data = await response.json();
      console.log("after deletedata", data)
      const alterList = state.user.filter((per)=>per.id !== idx);
        dispatch({type:"delete-user", payload:alterList})
      if(!data){
        console.log("cound't'delete data")
      }
    } catch (error) {
       console.log(error)
    }
   }
  
    return (
        <BaseApp
        title= "User Details">
          <div className="user-content">
             {
             state.user && (
             state.user?.map((person, idx)=>(
                <div key ={idx} className="user-card">
                    <h1>{person.name}</h1>
                    <p>Batch : {person.batch}</p>
                    <p>Email : {person.email}</p>
                    <p>Exp : {person.experience}</p>

                    <div className="btn-group">

                        <button 
                        onClick={()=>history.push(`/edit/${person.id}`)}
                        className="btn edit-btn">
                          Edit</button>

                        <button 
                        className="btn view-btn"
                        onClick={()=>history.push(`/user/${idx}`)}
                        >View</button>

                        <button 
                        className="btn del-btn"
                        onClick={()=>deleteUser(person.id)}
                        >Delete</button>
                        
                    </div>

                </div>
             )
              ))}
          </div>
        </BaseApp>
    )
}