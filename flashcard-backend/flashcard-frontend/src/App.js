import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        // API orqali kartochkalarni olish
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Kartochkalarni olishda xato:', error));
    }, []);

    const flipCard = () => setFlipped(!flipped);  

    const nextCard = () => {
        setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
        setFlipped(false);  // Har safar yangi kartaga o'tganda uni qaytarish
    };

    return (
        <div className="container">
            <header>
                <h1>Yaponcha So'zlarni Yodlash</h1>
            </header>

            {flashcards.length > 0 ? (
                <div className="flashcard" onClick={flipCard}>
                    {flipped ? (
                        <div id="card-back">{flashcards[currentCardIndex].back_text}</div>
                    ) : (
                        <div id="card-front">{flashcards[currentCardIndex].front_text}</div>
                    )}
                </div>
            ) : (
                <p>Yuklanmoqda...</p>
            )}

            <button className="next-btn" onClick={nextCard}>Keyingi</button>
        </div>
    );
}

export default App;
