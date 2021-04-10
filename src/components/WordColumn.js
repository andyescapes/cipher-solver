import ".././App.css";
function WordColumn(props) {
  let element;
  if (props.letter !== " " && props.single == true) {
    element = (
      <div className="word_column single">
        <p>_</p>

        <p>{props.letter}</p>
      </div>
    );
  } else if (props.letter !== " ") {
    element = (
      <div className="word_column">
        <p>_</p>

        <p>{props.letter}</p>
      </div>
    );
  } else {
    element = <div className="space"></div>;
  }

  return <>{element}</>;
}

export default WordColumn;
