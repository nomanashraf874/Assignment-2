import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [  { src: "./osh.png", matched: false },  { src: "./bulb.png", matched: false },  { src: "./squ.png", matched: false },  { src: "./turt.png", matched: false },  { src: "./char.jpeg", matched: false },  { src: "./s2-2.jpeg", matched: false },];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false); // Add new state variable

  // Shuffle the cards.
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameCompleted(false); // Reset game completion status
  };

  // Handle a choice.
  const handleChoice = (card) => {
    if (choiceOne === null) {
      setChoiceOne(card);
    } else if (choiceTwo === null) {
      setChoiceTwo(card);
      setDisabled(true);
    }
  };

  // Compare two cards.
  useEffect(() => {
    if (choiceOne !== null && choiceTwo !== null) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
        setTurns((prevTurns) => prevTurns + 1);
      }, 1000);
    }
  }, [choiceOne, choiceTwo]);

  // Check if all cards have been matched.
  useEffect(() => {
    const allCardsMatched = cards.every((card) => card.matched === true);
    if (allCardsMatched) {
      setGameCompleted(true); // Update game completion status
    }
  }, [cards]);

  // Shuffle the cards automatically when the game is started.
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      {gameCompleted && <p>Congratulations! You've completed the game.</p>}
    </div>
  );
} 
export default App;
