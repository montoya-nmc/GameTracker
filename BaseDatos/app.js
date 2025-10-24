const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const MONGO_URL = "mongodb+srv://nico:4225170Nicolas@projectjs.u6pqxrl.mongodb.net/?retryWrites=true&w=majority&appName=projectJS";
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Conexion a MongoDB exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//Modelo de juegos
const juegos = mongoose.model("juegos",{
    nombre: {type: String, required: true},
    nivel: {type: String, default: "Basico"},
})

app.post("/juegos",async (req,res) =>{
    try{
        const newJuego = new juegos(req.body);
        await newJuego.save();
        res.status(201).json({message: "Juego creado", newJuego});
    }catch(error){
        res.status(400).json({error: error.message});
    }
})

app.get("/juegos", async (req, res) =>{
    const listjuegos = await juegos.find();
    res.status(200).json({listjuegos});
})

app.get("/juegos/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        const skill = await Skill.findById(id);

        // // Buscar por nombre
        // const skills = await Skill.find({ nombre: "JavaScript" });

        if(!juego){
            return res.status(404).json({message: "juego no encontrado"});
        }

        res.status(200).json({message: "juego encontrado", juego: juego});
    }catch(error){
        res.status(400).json({error: error.message});
    }
})

app.delete("/juegos/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        const juego = await juegos.findByIdAndDelete(id);

        if(!juego){
            return res.status(404).json({message: "juego no encontrado"});
        }

        res.status(200).json({message: "juego eliminado", juego: juego});
    }catch(error){
        res.status(400).json({error: error.message});
    }
})

app.put("/juegos/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        const juego = await juegos.findByIdAndUpdate(id, req.body);

        if(!juego){
            return res.status(404).json({message: "juego no encontrado"});
        }

        res.status(200).json({message: "juego actualizado", juego: juego});
    }catch(error){
        res.status(400).json({error: error.message});
    }
})