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
import Box from "@material-ui/core/Box";
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
      if (result.status == "200") {
        setCaesarResult(res_json.result);
      } else if (result.status == "400") {
        setCaesarResult(["No solutions, this isn't a Caesar Cipher"]);
      } else {
        setCaesarResult(["Server Error!"]);
      }
      const res_json = await result.json();
      console.log(res_json);
    };
    call_solve(phrase);
  };

  const fill_single = (letter) => {
    const letters = document.getElementsByClassName("single");
    if (letters.length != 0) {
      let store = letters[0].lastChild.innerText;
      for (let i = 0; i < letters.length; i++) {
        if (letters[i].lastChild.innerText != store) {
          letters[i].firstChild.innerText = letter == "a" ? "i" : "a";
          document.getElementById(
            letters[i].lastChild.innerText.toUpperCase()
          ).value = letter == "a" ? "i" : "a";
        } else {
          letters[i].firstChild.innerText = letter;
          document.getElementById(
            letters[i].lastChild.innerText.toUpperCase()
          ).value = letter;
        }
      }
    }
  };

  return (
    <div className="App">
      <h1>Cipher Helper</h1>
      <input placeholder={"Type in your Cipher"} id="input"></input>
      <button
        onClick={() => {
          setInputWord(
            document.getElementById("input").value.toLowerCase().split("")
          );
          //document.getElementById("blanks").innerText = document.getElementById("input").value.replace(/\S/g, "-")
        }}
      >
        Enter
      </button>

      <p id="blanks"></p>
      <p id="cipher"></p>
      <div className="letter_container">
        {inputWord.map((char, index) => {
          if (index - 1 !== inputWord.length && index != 0) {
            if (inputWord[index - 1] == " " && inputWord[index + 1] == " ") {
              return (
                <WordColumn
                  key={index}
                  letter={char}
                  single={true}
                ></WordColumn>
              );
            }
          }
          if (index + 1 == inputWord.length && inputWord[index - 1] == " ") {
            return (
              <WordColumn key={index} letter={char} single={true}></WordColumn>
            );
          }
          if (index === 0 && inputWord[index + 1] == " ") {
            return (
              <WordColumn key={index} letter={char} single={true}></WordColumn>
            );
          }
          return <WordColumn key={index} letter={char}></WordColumn>;
        })}
      </div>

      <div className="key_container">
        <h2 style={{ display: "inline", margin: "0 10px 0 0" }}>Key: </h2>
        {alpha.map((alpha_letter) => {
          return <KeyInput letter={alpha_letter} key={alpha_letter}></KeyInput>;
        })}
      </div>
      <Box mt={2} mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => caesar_solve(inputWord)}
        >
          Caesar Solve
        </Button>

        {caesarResult.map((res) => (
          <p>{res}</p>
        ))}
      </Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Card>
                  <h4>Single Letters</h4>
                  <Container>
                    <Typography variant="body2" gutterBottom>
                      The single letters are either A or I
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => fill_single("a")}
                      >
                        Fill A
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => fill_single("i")}
                      >
                        Fill I
                      </Button>
                    </Typography>
                  </Container>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <h4>Repeated Letters</h4>

                  <Container>
                    <Typography variant="body2" gutterBottom>
                      double letters most likely to be LL and if not EE, SS, OO
                      and TT
                    </Typography>
                  </Container>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <h4>Two Letter Words</h4>
                  <Container>
                    <Typography variant="body2" gutterBottom>
                      The most common 2 letter words are: of, to, in, it, is,
                      be, as, at, so, we, he
                    </Typography>
                  </Container>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <h4>Three Letter Words</h4>
                  <Container>
                    <Typography variant="body2" gutterBottom>
                      The most common 3 letter words are: the, and, for, are,
                      but, not, you, all, any, can, had, her, was, one, our
                    </Typography>
                  </Container>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} style={{ height: "100%" }}>
            <Card style={{ height: "100%" }}>
              <h4>Frequency Analysis</h4>
              <Container>
                <Typography variant="body2" gutterBottom>
                  The most frequent letters are E, A, R, I, O, T, N, S, L, C
                </Typography>
              </Container>
              {frequency.map((term) => (
                <Typography variant="body1" gutterBottom>
                  {term.letter}: {term.count}
                </Typography>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
//https://www.npmjs.com/package/esm
//https://deno.land/
