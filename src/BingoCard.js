import React, { useState, useLayoutEffect } from "react";
import "./BingoCard.css";

const phrases = [
  "Good morning!",
  "You won't believe what happened!",
  "How was your weekend?",
  "Coffee anyone?",
  "Have you heard?",
  "priorities for this week",
  "The traffic was horrible!",
  "Sorry for the delay!",
  "covid",
  "Meeting soon!",
  "gone so quickly",
  "We visited relatives.",
  "just a second",
  "with the family",
  "out with friends",
  "Have you watched it?",
  "What's for launch?",
  "It was on the news.",
  "I love Mondays!",
  "It was sunny.",
  "It was rainy.",
  "But it worked on Friday!",
  "Children got sick.",
  "COMPLETE & UTTER SILENCE",
  "My car's in the shop.",
];

const winConditions = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [4, 8, 16, 20],
  [0, 6, 18, 24],
];

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const BingoCard = () => {
  const titleIndex = 12;
  const title = "Monday Mornings";
  const [wins, setWins] = useState([]);
  const [newWin, setNewWin] = useState(false);
  const [checkedPhrases, setCheckedPhrases] = useState([]);
  const [shuffledPhrases, setShuffledPhrases] = useState([]);

  useLayoutEffect(() => {
    const newList = shuffleArray([...phrases]);
    setShuffledPhrases(newList);
  }, []);

  const checkForNewWin = (index) => {
    let hasWon = false;
    let newWins = [];

    winConditions.forEach((arr, ind) => {
      let check = arr.every((el) => {
        return [...checkedPhrases, index].includes(el);
      });

      if (check && !wins.includes(ind) && !newWins.includes(ind)) {
        newWins.push(ind);
        hasWon = true;
      }
    });

    if (hasWon) setNewWin(true);
    setWins([...wins, ...newWins]);
  };

  return (
    <div className="container">
      <div className="top">
        {newWin && (
          <div onAnimationEnd={() => setNewWin(false)} className="win-banner">
            <span role="img" aria-label="conffeti">
              &#127881;
            </span>
            <p>Hooray!</p>
          </div>
        )}
      </div>
      <div className="center">
        <div className={"bingo-card " + (newWin ? "fun" : "")}>
          <ul className="grid">
            {shuffledPhrases.map((phrase, ind) => {
              if (ind === titleIndex) {
                return (
                  <li className="grid-item center" key={ind}>
                    <div className="title center">
                      <h2>
                        &#10084;
                        <br />
                        {title}
                      </h2>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li className="grid-item center" key={ind}>
                    <div
                      className={
                        "center " +
                        (checkedPhrases.includes(ind) ? "overlay" : "item")
                      }
                      onClick={() => {
                        setCheckedPhrases([...checkedPhrases, ind]);
                        checkForNewWin(ind);
                      }}
                    >
                      <p>{phrase}</p>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BingoCard;
