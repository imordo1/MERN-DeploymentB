const express = require ("express");
const cors = require("cors");

//Environment variables
const port = 8000;
const db_name = "Pet_Shelter"

// Immediately execute the import mongoose.config.js function.
require("./server/config/mongoose.config") (db_name);

const app = express ();

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cors());


require("./server/routes/pet.route")(app);

app.listen(port, () => console.log(`Listening on port ${port} for REQuests to RESpond to`));
