import ".././App.css";
function KeyInput(props) {
  const highlight_letters = () => {
    const letters = document.getElementsByClassName("word_column");

    for (let i = 0; i < letters.length; i++) {
      //console.log(letters[i].lastChild.innerText,props.letter.toLowerCase() )
      if (letters[i].lastChild.innerText == props.letter.toLowerCase()) {
        letters[i].lastChild.className = "highlight";
        letters[i].firstChild.className = "highlight";
      }
    }
  };

  const clear_highlight = () => {
    const letters = document.getElementsByClassName("word_column");

    for (let i = 0; i < letters.length; i++) {
      //console.log(letters[i].lastChild.innerText,props.letter.toLowerCase() )
      if (letters[i].lastChild.innerText == props.letter.toLowerCase()) {
        letters[i].lastChild.classList.remove("highlight");
        letters[i].firstChild.classList.remove("highlight");
      }
    }
  };

  const add_letters = () => {
    const letters = document.getElementsByClassName("word_column");

    for (let i = 0; i < letters.length; i++) {
      //console.log(letters[i].lastChild.innerText,props.letter.toLowerCase() )
      if (letters[i].lastChild.innerText == props.letter.toLowerCase()) {
        const val = document.getElementById(props.letter).value;
        if (val && val.length === 1) letters[i].firstChild.innerText = val;
      }
    }
  };

  return (
    <>
      <div className="key_input">
        <input
          maxLength="1"
          id={props.letter}
          style={{ width: "100%" }}
          onFocus={highlight_letters}
          onBlur={clear_highlight}
          onChange={add_letters}
        ></input>
        <br></br>
        {props.letter}
      </div>
    </>
  );
}

export default KeyInput;
