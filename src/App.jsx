import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App(props) {
  // Arrays of in-game messages organised here
  const handResultMessages = [
    "Player 1 wins this hand",
    "Player 2 wins this hand",
    "It's a tie",
  ];

  const gameResultMessages = [
    "Congratulations, you won the game!",
    "Player 2 wins the game, sorry!",
    "No one won the game!",
  ];

  // Keep track of game status
  const [game, setGame] = useState(false);
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  // initialise state for score
  const [score, setScore] = useState([0, 0]);
  const [outcome, setOutcome] = useState(0); // 0 for P1 win, 1 for P2 win, 2 for draw

  const resetGame = () => {
    setGame(false);
    setCardDeck(makeShuffledDeck());
    setScore([0, 0]);
  };

  const dealAndCompareCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];

    setCurrCards(newCurrCards);

    let newScore = score;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newScore[0] += 1;
      setOutcome(0);
      setScore(newScore);
    } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
      newScore[1] += 1;
      setOutcome(1);
      setScore(newScore);
    } else {
      setOutcome(2);
    }
  };

  const tabulateScore = () => {
    if (score[0] > score[1]) {
      return gameResultMessages[0];
    } else if (score[0] < score[1]) {
      return gameResultMessages[1];
    } else {
      return gameResultMessages[2];
    }
  };
  // You can write JavaScript here, just don't try and set your state!

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }, idx) => (
    // Give each list element a unique key
    <div
      key={idx}
      style={idx == outcome ? { color: "green", fontWeight: "bold" } : null}
    >
      {name} of {suit}
    </div>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <h2>React High Card 🚀</h2>
      <div className="card my-5">
        <h3>Card table</h3>
        <br />
        {game ? currCardElems : null}
        <br />
        <p>{game ? handResultMessages[outcome] : "Game has not started"}</p>
      </div>
      <div className="card my-5">
        {game ? (
          cardDeck.length >= 2 ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={dealAndCompareCards}
              >
                Deal
              </button>
              <br />
              <p>{`Cards left: ${cardDeck.length}`}</p>
            </>
          ) : (
            <>
              <p>No more cards left!</p>
              <br />
              <p>{tabulateScore()}</p>
              <br />
              <button className="btn btn-warning" onClick={resetGame}>
                Reset game
              </button>
            </>
          )
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => {
              setGame(!game);
              dealAndCompareCards();
            }}
          >
            Start game
          </button>
        )}
      </div>
      <div className="card my-5">
        <h3>Table of scores</h3>
        <p>{`Player 1: ${score[0]} points; Player 2: ${score[1]} points`}</p>
      </div>
    </>
  );
}

export default App;
