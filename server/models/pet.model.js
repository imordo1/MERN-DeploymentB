const mongoose = require('mongoose');
// For a module to access another module's exports or module.exports, it must use require().

const PetSchema = new mongoose.Schema({
    // Adding validations to our back-end MondoDB in our mongoose model
    name: {
        type : String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },

    type: {
        type : String,
        required: [true, "Type is required"],
        minlength: [3, "Type must be at least 3 characters long"]
    },

        
    description: {
        type : String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters long"]   
    },

    age: {
        type : Number,
        required: [true, "Age is required"],
        minlength: [1, "Age must be at least 1 number long"]
    },


    skill1: {
        type : String,  
    },

    skill2: {
        type : String,
  
    },
    skill3: {
        type : String,

    },

    like : {
        type: Number
    }
})

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
// expose the Pet schema to other parts of the app