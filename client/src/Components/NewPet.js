import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

const NewPet = (props) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");;
    const [type, setType] = useState("");;
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");



    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]); 
    // Error fields
    const [nameErrors, setNameErrors] = useState("");
    const [ageErrors, setAgeErrors] = useState("");
    const [descriptionErrors, setDescriptionErrors] = useState("");
    const [typeErrors, setTypeErrors] = useState("");

    const [skill1Errors, setSkill1Errors] = useState("");
    const [skill2Errors, setSkill2Errors] = useState("");
    const [skill3Errors, setSkill3Errors] = useState("");
  // Used for routing the user to a new url.
    const history = useHistory();

  const handleNewPetSubmit = (e) => {
    e.preventDefault(); // Stop the page refresh.// The default form behavior is submitting the information to the route in the "action" which causes a page load. We want to handle this information ourselves.
        const { name: key , value} = e.target;
    
        if (key === 'name') {
            setName(value);
            if(value.length < 2) {
                setNameErrors("Name must be at least 2 characters");
            } else {
                setNameErrors("");
            }
        } else if (key === 'age') {
            setAge(value);
            if(value.length < 2) {
                setAgeErrors("Age must be at least 2 characters");
            } else {
                setAgeErrors("");
            }
        } else if (key === 'description') {
            setDescription(value);
            if(value.length < 5) {
                setDescriptionErrors("Description name must be at least 5 characters");
            } else {
                setDescriptionErrors("");
            }
        } else if (key === 'type') {
            setDescription(value);
            if(value.length < 5) {
                setTypeErrors("Type name must be at least 5 characters");
            } else {
                setTypeErrors("");
            }
        }
    const newPet = {
      name,
      age,
      description,
      type,
      skill1,
      skill2,
      skill3
    };

    axios
      .post("http://localhost:8000/api/pets/", newPet)
      .then((res) => {
        console.log(res.data);
        // Route user to the new destination's page.
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
      });
  };



  return (
      <body className = "container d-flex">
    <div className=" d-flex col col-8 flex-column container p-3 my-3 bg-dark text-white rounded shadow">
      <h3 className="text-center">Know a pet needing a home?</h3>


{/* --------------------- FORM SUBMIT -------------------------------- */}
      <form
        onSubmit={(e) => {
          handleNewPetSubmit(e);
        }}
      >
        {/* // adding validation messages */}
        {errors.map((err, index) => 
          <p style={{color: "red"}} key={index}>{err}</p>)}

        <div className="form-group">
          <label className="h6">Name</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
          />
          
          { nameErrors ? <p >{nameErrors}</p> : ""} 
        </div>

        <div className="form-group">
          <label className="h6">Age</label>
          <input
            onChange={(e) => {
              setAge(e.target.value);
            }}
            type="number"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Type</label>
          <input
            onChange={(e) => {
              setType(e.target.value);
            }}
            type="text"
            className="form-control"
          />
          
          { typeErrors ? <p >{typeErrors}</p> : ""} 
        </div>

        <div className="form-group">
          <label className="h6">Description</label>
          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        {/* ---------------------- SKILLLLS ---------------------------- */}
        <h3 className="text-center">Skills (optional)</h3>
        <div className="form-group">
          <label className="h6">Skill 1</label>
          <input
            onChange={(e) => {
              setSkill1(e.target.value);
            }}
            type="text"
            className="form-control"
          />
          
          { skill1Errors ? <p >{skill1Errors}</p> : ""} 
        </div>

        <div className="form-group">
          <label className="h6">Skill 2</label>
          <input
            onChange={(e) => {
              setSkill2(e.target.value);
            }}
            type="text"
            className="form-control"
          />
          { skill2Errors ? <p >{skill2Errors}</p> : ""}           
        </div>

        <div className="form-group">
          <label className="h6">Skill 3</label>
          <input
            onChange={(e) => {
              setSkill3(e.target.value);
            }}
            type="text"
            className="form-control"
          />
          { skill3Errors ? <p >{skill3Errors}</p> : ""} 
        </div>



        <button className="btn btn-sm btn-success m-2 btn-outline">Add Pet</button>
      </form>
      {/* <div className="d-flex col flex-column container p-3 my-3 bg-dark text-white">
                <p>Name: {name}</p>
                <p>Age: {age}</p>
                <p>Description: {description}</p>
            </div> */}
    </div>
    </body>
    
  );
};

export default NewPet;