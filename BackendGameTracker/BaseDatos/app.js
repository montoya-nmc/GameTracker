const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors"); // Agregar cors

const app = express();
app.use(cors()); // Habilitar CORS
app.use(express.json());

const MONGO_URL = "mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/nico_rojo";

// Conectar a MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexion a MongoDB exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });

// Modelo de juegos (campos solicitados)
const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, default: "" },           // "Acción", "RPG", ...
  plataforma: { type: String, default: "" },       // "PC", "PlayStation", ...
  anioLanzamiento: { type: Number },
  desarrollador: { type: String, default: "" },
  imagenPortada: { type: String, default: "" },    // URL de la imagen
  descripcion: { type: String, default: "" },
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false });

const Juego = mongoose.model("juegos", juegoSchema);

// Modelo de reseñas (reviews)
const reviewSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: 'juegos', required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  textoResena: { type: String, default: "" },
  horasJugadas: { type: Number, default: 0 },
  dificultad: { type: String, default: "" }, // "Fácil", "Normal", "Difícil"
  recomendaria: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
}, { versionKey: false });

const Review = mongoose.model('reviews', reviewSchema);

// Rutas informativas
app.get('/', (req, res) => {
  res.send('GameTracker backend running. Endpoints: /juegos, /reseñas (reviews)');
});

app.get('/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// CRUD juegos
app.get("/juegos", async (req, res) => {
  try {
    const listjuegos = await Juego.find().sort({ createdAt: -1 });
    res.status(200).json(listjuegos);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/juegos/:id", async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ message: "juego no encontrado" });
    res.status(200).json(juego);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/juegos", async (req, res) => {
  try {
    const payload = {
      titulo: req.body.titulo,
      genero: req.body.genero,
      plataforma: req.body.plataforma,
      anioLanzamiento: req.body.anioLanzamiento,
      desarrollador: req.body.desarrollador,
      imagenPortada: req.body.imagenPortada,
      descripcion: req.body.descripcion,
      completado: !!req.body.completado,
      fechaCreacion: req.body.fechaCreacion ? new Date(req.body.fechaCreacion) : Date.now()
    };
    const nuevo = new Juego(payload);
    const saved = await nuevo.save();
    res.status(201).json(saved);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/juegos/:id", async (req, res) => {
  try {
    const update = {
      titulo: req.body.titulo,
      genero: req.body.genero,
      plataforma: req.body.plataforma,
      anioLanzamiento: req.body.anioLanzamiento,
      desarrollador: req.body.desarrollador,
      imagenPortada: req.body.imagenPortada,
      descripcion: req.body.descripcion,
      completado: !!req.body.completado
    };
    const updated = await Juego.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/juegos/:id", async (req, res) => {
  try {
    const removed = await Juego.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ message: 'juego eliminado', juego: removed });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD reseñas (reviews)
// Obtener todas las reseñas
app.get('/reseñas', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ fechaCreacion: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Obtener reseñas por juegoId
app.get('/reseñas/juego/:juegoId', async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId }).sort({ fechaCreacion: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/reseñas', async (req, res) => {
  try {
    const payload = {
      juegoId: req.body.juegoId,
      puntuacion: req.body.puntuacion,
      textoResena: req.body.textoResena,
      horasJugadas: req.body.horasJugadas,
      dificultad: req.body.dificultad,
      recomendaria: !!req.body.recomendaria,
      fechaCreacion: req.body.fechaCreacion ? new Date(req.body.fechaCreacion) : Date.now()
    };
    const r = new Review(payload);
    const saved = await r.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/reseñas/:id', async (req, res) => {
  try {
    const update = {
      puntuacion: req.body.puntuacion,
      textoResena: req.body.textoResena,
      horasJugadas: req.body.horasJugadas,
      dificultad: req.body.dificultad,
      recomendaria: !!req.body.recomendaria,
      fechaActualizacion: new Date()
    };
    const updated = await Review.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/reseñas/:id', async (req, res) => {
  try {
    const removed = await Review.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Definir puerto y arrancar servidor (al final)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});