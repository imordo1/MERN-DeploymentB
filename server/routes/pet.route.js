const PetController = require('../controllers/pet.controller'); 
// For a module to access another module's exports or module.exports, it must use require().
 
module.exports = (app) => {
    //----Routes for a pets CRUD operations --------    
    app.post("/api/pets/", PetController.create);
    app.get("/api/pets/", PetController.getAll);
    app.get("/api/pets/:id", PetController.getOne);
    app.delete("/api/pets/:id", PetController.delete);
    app.get("/api/pets/:id", PetController.getOne);
    app.put("/api/pets/:id/edit", PetController.update);
    app.put("/api/pets/:id", PetController.update);
    // app.put('/all', PetController.create);
};
