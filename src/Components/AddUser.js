import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppState } from "../Context/AppProvider";
import BaseApp from "../Core/Base";

export function AddUser(){
    const { dispatch} = AppState();
    const history = useHistory()
    //defining states
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [experience, setExperience] = useState("");
    const [batch, setBatch]= useState("");

    const addNewUser = async(e)=>{
        const newUser = {
            id,
            name,
            email,
            batch,
            experience
        }
       e.preventDefault();
       try {
        const resposne = await fetch("https://6410036ae1212d9cc926f1fd.mockapi.io/users", {
            method:"POST",
            body : JSON.stringify(newUser),
            headers :{
                "Content-Type":"application/json",
            },
        }); 
        const data = await resposne.json();
        console.log(data)
        //setUser([...user, data])
        dispatch({type:"add-user", payload:data})
        history.push("/")
       } catch (error) {
        console.log(error)
       }
    } 
    
    return (
        <BaseApp
        title={"Add A New User"}
        >
             <div>
                <input 
                placeholder="id"
                value ={id}
                onChange={(event)=>setId(event.target.value)}
                />

                <input 
                placeholder="name"
                value= {name}
                onChange={(event)=>setName(event.target.value)}
                />

                <input 
                placeholder="email"
                value= {email}
                onChange={(event)=>setEmail(event.target.value)}
                />

                <input 
                placeholder="experience"
                value = {experience}
                onChange={(event)=>setExperience(event.target.value)}
                />

                <input 
                placeholder="batch"
                value = {batch}
                onChange={(event)=>setBatch(event.target.value)}
                />

                <button
                onClick={addNewUser}
                >Add</button>
        </div>
        </BaseApp>
    )
}