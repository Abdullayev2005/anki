const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB bilan bog'lanish
mongoose.connect('mongodb://localhost:27017/flashcards');


// Flashcard modeli
const flashcardSchema = new mongoose.Schema({
    front_text: String,
    back_text: String,
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// API yo'li: Barcha kartochkalarni olish
app.get('/api/flashcards', async (req, res) => {
    const flashcards = await Flashcard.find();
    res.send(flashcards);
});

// API yo'li: Yangi kartochka qo'shish
app.post('/api/flashcards', async (req, res) => {
    const { front_text, back_text } = req.body;
    const flashcard = new Flashcard({ front_text, back_text });
    await flashcard.save();
    res.send(flashcard);
});

// Serverni ishga tushirish
const port = 5000;
app.listen(port, () => console.log(`Server ${port}-portda ishlamoqda...`));
