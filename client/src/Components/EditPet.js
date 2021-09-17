import React, { useEffect, useState } from "react"; // Usestate the app knows when to render the data
import axios from "axios";
import { Redirect, useHistory, useParams } from "react-router-dom";

const EditPet = (props) => {
    const [pet, setPet] = useState("");
    const [errors, setErrors] = useState(null);
    const history = useHistory(); //using history to keep track of the routes/pages you are going to so you can go back and forth
    const { id } = useParams();
    

  /* 
  Empty arr as second argument means this will only happen on the first render
  of this component.
  */
    // Get the data using UseEffect when the page first loads
    // using axios to get the data so it is prefilled for the item/id that is selected
    useEffect(() => {
    axios
        .get(`http://localhost:8000/api/pets/` + id)
        .then((res) => {
            setPet(res.data);
    })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    const handleOnChange = (e) => {
        const keyBeingUpdated = e.target.name;
        const newValue = e.target.value;
    
        setPet({ ...pet, [keyBeingUpdated]: newValue });
        
        // Neil showed two ways one with setting each state, and one with
        // combining into a handler since we will be passing an onject
        /* The setDest above can be written like this: */
        // const updatedDest = {...dest}
        // updatedDest[keyBeingUpdated] = newValue;
        // setDest(updatedDest)
    };
    
    const handleEditSubmit = (e) => {
        e.preventDefault(); 
        axios
            .put("http://localhost:8000/api/pets/" + pet._id + "/edit", pet)
            .then((res) => {
                console.log(res.data);
            // Route user to the new destination's page.
                history.push(`/pets/${pet._id}`);
            })
            .catch((err) => {
            // THIS CATCH only triggers because our controller uses
            // res.status(400).json(err);
            setErrors(err.response.data.errors);
            console.log(err.response);
            });
        };
        if (pet === null) {
            return "Loading...";
        }
        // using this for the Cancel button
        const routeChange = () =>{ 
            let path = `/pets/`; 
            history.push(path); 
          }
        return (
        <div className="d-flex col col-8 flex-column container p-3 my-3 bg-dark text-white rounded shadow justify-text-center shadow">
            <h3 className="text-center">Edit: {pet.name}</h3>
            <form
            onSubmit={(e) => {
            handleEditSubmit(e);
            }}
        >
            <div className="form-group">
                <label className="h6">Pet Name: </label>
                {errors?.name && (
                <span className="text-danger"> {errors?.name?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={pet.name} // "value" triggering the change from state. putting in the value into the field
                name="name"
                />
            </div>

            <div className="form-group">
                <label className="h6">Pet Type: </label>
                {errors?.type && (
                <span className="text-danger"> {errors?.type?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={pet.type}
                name="type"
                />
            </div>

            <div className="form-group">
                <label className="h6">Description: </label>
                {errors?.description && (
                <span className="text-danger"> {errors?.description?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={pet.description}
                name="description"
                />
            </div>

            <div className="form-group">
                <label className="h6">Age: </label>
                {errors?.src && (
                <span className="text-danger"> {errors?.age?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="number"
                className="form-control"
                value={pet.age}
                name="age"
                />
            </div>

            <div className="form-group">
                <label className="h6">Skill 1: </label>
                {errors?.skill1 && (
                <span className="text-danger"> {errors?.skill1?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={pet.skill1}
                name="skill1"
                />
            </div>
            <div className="form-group">
                <label className="h6">Skill 2: </label>
                {errors?.skill2 && (
                <span className="text-danger"> {errors?.skill2?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={pet.skill2}
                name="skill2"
                />
            </div>
            <div className="form-group">
                <label className="h6">Skill 3: </label>
                {errors?.skill3 && (
                <span className="text-danger"> {errors?.skill3?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={pet.skill3}
                name="skill3"
                />
            </div>
            
            <button className="btn btn-sm btn-success m-2 btn-outline">Update</button>
            <button onClick ={routeChange} className="btn btn-sm btn-danger m-2 btn-outline">Cancel</button>
            </form>
        </div>
        );
};

export default EditPet;