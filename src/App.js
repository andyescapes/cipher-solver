import logo from './logo.svg';
import './App.css';
import './components/WordColumn';
import React, { useState } from 'react';
import WordColumn from './components/WordColumn';
import KeyInput from './components/KeyInput';

function App() {
  
  const [inputWord, setInputWord] = useState([])
  console.log(inputWord)
  const alpha = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));


  return (
    
    <div className="App">
      
      <h1>
        Cipher Solver
      </h1>
      <input placeholder = {"Type in your Cipher"} id ="input">
      </input>
      <button onClick = {() =>{
        setInputWord(document.getElementById("input").value.split(""))
        //document.getElementById("blanks").innerText = document.getElementById("input").value.replace(/\S/g, "-")
        
        }}>Enter</button>

      <p id = "blanks"></p>
      <p id = "cipher"></p>
      <div className = "letter_container">
        {inputWord.map( char =>(
          <WordColumn letter={char}></WordColumn>
        )
            
            
          )}
      </div>
      <h2>
        Key:
      </h2>
      <div className = "key_container">
      {
        alpha.map(alpha_letter =>{
          return  <KeyInput letter = {alpha_letter}></KeyInput>
        })
      }
      </div>
      


      
    </div>
  );
}

export default App;
