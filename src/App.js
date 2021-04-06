import logo from "./logo.svg";
import "./App.css";
import "./components/WordColumn";
import React, { useState } from "react";
import WordColumn from "./components/WordColumn";
import KeyInput from "./components/KeyInput";

function App() {
  const [inputWord, setInputWord] = useState([]);
  const [caesarResult, setCaesarResult] = useState([]);

  console.log(inputWord);
  const alpha = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  const caesar_solve = (input) => {
    const phrase = input.join("");
    console.log(phrase);

    const call_solve = async (input) => {
      const body = {
        phrase: input,
      };

      const result = await fetch("http://localhost:3001/caesar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log(result);
      const res_json = await result.json();
      console.log(res_json);
      setCaesarResult(res_json.result);
    };
    call_solve(phrase);
  };

  return (
    <div className="App">
      <h1>Cipher Solver</h1>
      <input placeholder={"Type in your Cipher"} id="input"></input>
      <button
        onClick={() => {
          setInputWord(document.getElementById("input").value.split(""));
          //document.getElementById("blanks").innerText = document.getElementById("input").value.replace(/\S/g, "-")
        }}
      >
        Enter
      </button>

      <p id="blanks"></p>
      <p id="cipher"></p>
      <div className="letter_container">
        {inputWord.map((char) => (
          <WordColumn letter={char}></WordColumn>
        ))}
      </div>
      <h2>Key:</h2>
      <div className="key_container">
        {alpha.map((alpha_letter) => {
          return <KeyInput letter={alpha_letter} key={alpha_letter}></KeyInput>;
        })}
      </div>

      <button onClick={() => caesar_solve(inputWord)}>Caesar Solve</button>

      {caesarResult.map((res) => (
        <p>{res}</p>
      ))}
    </div>
  );
}

export default App;
//https://www.npmjs.com/package/esm
//https://deno.land/
