import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppState } from "../Context/AppProvider";
import BaseApp from "../Core/Base";

const EditUser = () => {
  const { state, dispatch } = AppState();
  const [name, setName] = useState("");
  const [idx, setIdx] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [batch, setBatch] = useState("");

  const { id } = useParams();
  const history = useHistory();

  const selectedUser = state.user.find((per) => per.id === id);

  useEffect(() => {
    setIdx(selectedUser.id);
    setName(selectedUser.name);
    setEmail(selectedUser.email);
    setExperience(selectedUser.experience);
    setBatch(selectedUser.batch);
  }, []);

  //
  const updateUser = async () => {
    // step 1 : collecting new data
    const editIndex = state.user.findIndex((per) => per.id === id);
    //chnaged data in the input field
    const editedData = {
      id: idx,
      name,
      email,
      experience,
      batch,
    };
    try {
      const response = await fetch(
        `https://6410036ae1212d9cc926f1fd.mockapi.io/users/${idx}`,
        {
          method: "PUT",
          body: JSON.stringify(editedData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      //updating the user
      state.user[editIndex] = data;
      //setUser([...state.user]);
      dispatch({ type: "edit-user" });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseApp title={"Edit the user details"}>
      <div className="text-areas">
        <TextField
          id="fullWidth"
          label="Id"
          variant="outlined"
          value={idx}
          onChange={(event) => setIdx(event.target.value)}
        />

        <TextField
          id="fullWidth"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          id="fullWidth"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <TextField
          id="fullWidth"
          label="Experience"
          variant="outlined"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />

        <TextField
          id="fullWidth"
          label="Batch"
          variant="outlined"
          value={batch}
          onChange={(event) => setBatch(event.target.value)}
        />

        <Button variant="contained" color="secondary" onClick={updateUser}>
          Edit Data
        </Button>
      </div>
    </BaseApp>
  );
};

export default EditUser;
