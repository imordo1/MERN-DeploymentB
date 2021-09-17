import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";


const Pet = (props) => {
    const [pet, setPet] = useState(null);
    const history = useHistory();
    const { id } = useParams();
    const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  // The response hasn't come back yet so we want to to return loading... so the user made aware
  if (pet === null) {
    return "Loading...";
  }

  const deletePet = (e, petId) => {
    axios.delete("http://localhost:8000/api/pets/" + petId)
    .then((res) => {
        console.log(res.data);
        history.push(`/pets/`);
        // setAllPets(allPets.filter((pet) => pet._id !== petId)); 
        // uses setallpets to access state and filter through our pet array and only return where the ID which we just passed to be deleted not in the list
    }
    )
}
const handleLikeClick = (id, likes) => {
    console.log(id, likes);
    if (likes == undefined) {
        likes = 0;
    }
    const editedPet = { like: likes + 1 };
    
        axios
        .put("http://localhost:8000/api/pets/" + id, editedPet)
        .then((res) => {
            const updatedPet = res.data;

            const updatedPets = allPets.map((pet) => {
                if (pet._id === id) {
                return updatedPet;
            } 
            return pet;
       })
            setPet(updatedPet);
            setAllPets(updatedPets);
            console.log("liked");
        })
        .catch((err) => {
            console.log(err);
        });
}

    return (
    <div className="d-flex col col-12 flex-column container p-3 my-3 bg-dark text-white rounded shadow justify-text-center">
      <h1>Details about: {pet.name}</h1>
      <h4 className= "fst-italic">Pet type: {pet.type}</h4>
      <h3 className= "fst-italic">Description: {pet.description}</h3>
      <br></br>
      <h4 className= "fst-italic">Skills: {pet.skill1}, {pet.skill2}, {pet.skill3}</h4>
      <h5>Age: {pet.age}</h5>
      <img src="" alt=""></img>
          <div className="d-flex">
          <button onClick= { (e) => deletePet(e, pet._id)} className="col col-2 btn btn-sm btn-danger m-2 btn-outline">Adopt {pet.name}</button>
          <Link to={`/pets/${pet._id}/edit`} className="col col-1 btn btn-sm btn-warning m-2 btn-outline">Edit</Link>
          <p onClick = {() => handleLikeClick(pet._id, pet.like)} className="btn btn-sm btn-success m-2 btn-outline" style={{ cursor: "pointer" , outline: "none"}}> Like {pet.name} </p>
          <p>Likes: {pet.like }</p>
        
        </div >

    </div>
  );
};

export default Pet;