import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


const PetList = (props) => {
    const [allPets, setAllPets] = useState([]);
    // const [pet, setPets] = useState([]);
    // const [pets, setPetss] = useState([]);
    // const history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/")
            .then((res) => {
                console.log(res.data);
                setAllPets(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Delete function in controller takes an ID and returns deleted
    // Pass in the ID and and refresh the page with the deleted item filtered out
    // We need to remove a value from state using filter
    const deletePet = (e, petId) => {
        axios.delete("http://localhost:8000/api/pets/" + petId)
            .then((res) => {
                console.log(res.data);
                setAllPets(allPets.filter((pet) => pet._id !== petId));
                // uses setallpets to access state and filter through our pet array and only return where the ID which we just passed to be deleted not in the list
            }
            )
    }
    // const routeChange = () =>{ 
    //     let path = `/${pet._id}/edit`; 
    //     history.push(path);
    //   }
    const handleLikeClick = (id, likes) => {
        console.log(id, likes,"hello");
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
                setAllPets(updatedPets);
                console.log("liked");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <body>
            <div className="d-flex col col-12 flex-column container p-3 my-3 bg-dark text-white rounded shadow shadow-lg table table-striped">
                <h3>These pets are looking for a good home</h3>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Type</th>
                        <th>Actions / Likes</th>
                    </thead>
                    <tbody>
                        {/* take the pets from state and map to each of the pets */}
                        {
                            allPets.map((pet, index) => (
                                <tr>
                                    <td><Link to={`/pets/${pet._id}`}> {pet.name} </Link></td>
                                    <td> {pet.age}</td>
                                    <td> {pet.type}</td>
                                    <td>
                                    <Link to={`/pets/${pet._id}`} className="btn btn-sm btn-primary m-2 btn-outline">Details</Link>
                                        {/* <button onClick={(e) => deletePet(e, pet._id)} className="btn btn-sm btn-primary m-2 btn-outline">Details</button> */}
                                        <Link to={`/pets/${pet._id}/edit`} className="btn btn-sm btn-warning m-2 btn-outline">Edit</Link>
                                        <button onClick= { (e) => deletePet(e, pet._id)} className="col col-23btn btn-sm btn-danger m-2 btn-outline">Adopt {pet.name}</button>
                                        <p onClick = {() => handleLikeClick(pet._id, pet.like)} className="btn btn-sm btn-success m-2 btn-outline" style={{ cursor: "pointer" , outline: "none"}}> Like {pet.name} {pet.LikeCount}</p>
                                        {/* <p onClick = {() => handleLikeClick(pet._id, pet.like)} style={{ cursor: "pointer" , outline: "none"}}> &#128175;{pet.LikeCount}</p> */}
                                        {/* //&#x270B; */}
                                    </td>
                                    <td> {pet.like} </td>
                                </tr>
                            )
                            )

                        }
                    </tbody>
                </table>
            </div>
        </body>
    )
};

export default PetList;