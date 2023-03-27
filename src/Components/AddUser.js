import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppState } from "../Context/AppProvider";
import BaseApp from "../Core/Base";
import * as yup from 'yup'
import { useFormik } from "formik";

const userSchemaValidation = yup.object({
    id : yup.string().required("please specify your ID"),
    name : yup.string().required("Please fill in you name ..."),
    email:yup.string().email().required("please write proper mail"),
    experience: yup.string().required("why not specify your experience?"),
    batch: yup.string().required("Please specify your batch..")
    .min(5, "It is not a valid batch name"),
})


export function AddUser() {

    // formik validations 
    const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues : {
            id : "",
            name : "",
            email: "",
            experience:"",
            batch : "",
        },
        validationSchema : userSchemaValidation,
         onSubmit : (newUser)=>{
            console.log("on submit called :", newUser)
            addNewUser(newUser)
         }

    })

  const { dispatch } = AppState();
  const history = useHistory();
  const addNewUser = async (newUser) => {

    try {
      const resposne = await fetch(
        "https://6410036ae1212d9cc926f1fd.mockapi.io/users",
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await resposne.json();
      console.log(data);
      //setUser([...user, data])
      dispatch({ type: "add-user", payload: data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseApp title={"Add A New User"}>
        <form  onSubmit={handleSubmit} className="text-areas">
        <TextField
          id="fullWidth"
          name = "id"
          onBlur={handleBlur}
          label="ID"
          variant="outlined"
          value={values.id}
          onChange={handleChange}
        />
        {touched.id && errors.id ? <p style={{color:"crimson"}}>{errors.id}</p>:""}
        <TextField
          id="fullWidth"
          label="Name"
          variant="outlined"
          onBlur={handleBlur}
          name = "name"
          value={values.name}
          onChange={handleChange}
        />
        {touched.name && errors.name ? <p style={{color:"crimson"}}>{errors.name}</p>:""}

        <TextField
          id="fullWidth"
          label="Email"
          variant="outlined"
          onBlur={handleBlur}
          name = "email"
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email ? <p style={{color:"crimson"}}>{errors.email}</p>:""}

        <TextField
          id="fullWidth"
          label="Experience"
          variant="outlined"
          onBlur={handleBlur}
          name = "experience"
          value={values.experience}
          onChange={handleChange}
        />
     {touched.experience && errors.experience ? <p style={{color:"crimson"}}>{errors.experience}</p>:""}
        <TextField
          id="fullWidth"
          label="Batch"
          variant="outlined"
          onBlur={handleBlur}
          name = "batch"
          value={values.batch}
          onChange={handleChange}
        />
    {touched.batch && errors.batch ? <p style={{color:"crimson"}}>{errors.batch}</p>:""}
          <Button 
          variant="contained" 
          type="submit"
          color="success"
          //onClick={addNewUser}
          >
               Add Data
            </Button>
    </form>
    </BaseApp>
  );
}
