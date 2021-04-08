import "./App.css";
import "./components/WordColumn";
import React, { useState } from "react";
import WordColumn from "./components/WordColumn";
import KeyInput from "./components/KeyInput";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const [inputWord, setInputWord] = useState([]);
  const [caesarResult, setCaesarResult] = useState([]);
  const [frequency, setFrequency] = useState([]);

  const set_freq_obj = (input) => {
    console.log(input);
    const freq_list = [];
    const input_set = new Set(inputWord);

    input_set.forEach((letter) => {
      let count = 0;
      input.forEach((letter2) => {
        if (letter === letter2) {
          count++;
        }
      });

      if (letter != " ") {
        const frequence_object = { letter: letter };
        frequence_object.count = count;
        freq_list.push(frequence_object);
      }
    });
    freq_list.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
    setFrequency(freq_list);
  };

  React.useEffect(() => {
    set_freq_obj(inputWord);
  }, [inputWord]);

  console.log(frequency);
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

      <div className="key_container">
        <h2 style={{ display: "inline", margin: "0 10px 0 0" }}>Key: </h2>
        {alpha.map((alpha_letter) => {
          return <KeyInput letter={alpha_letter} key={alpha_letter}></KeyInput>;
        })}
      </div>

      <button onClick={() => caesar_solve(inputWord)}>Caesar Solve</button>

      {caesarResult.map((res) => (
        <p>{res}</p>
      ))}
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card>
            <h4>Frequency Analysis</h4>
            {frequency.map((term) => (
              <Typography variant="body1" gutterBottom>
                {term.letter}: {term.count}
              </Typography>
            ))}
            <Container>
              <Typography variant="body2" gutterBottom>
                The most frequent letters in english are in the order E, A, R,
                I, O, T, N, S, L, C
              </Typography>
            </Container>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <h4>Single Letters</h4>
            <Container>
              <Typography variant="body2" gutterBottom>
                The single letters are either A or I
              </Typography>
              <Button variant="contained" color="primary">
                Fill A
              </Button>
              <Button variant="contained" color="secondary">
                Fill I
              </Button>
            </Container>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <h4>Repeated Letters</h4>

            <Container>
              <Typography variant="body2" gutterBottom>
                double letters most likely to be LL and if not EE, SS, OO and TT
              </Typography>
            </Container>

            <Button>Fill in</Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
//https://www.npmjs.com/package/esm
//https://deno.land/
