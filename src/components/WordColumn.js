import '.././App.css';
function WordColumn(props) {

    return(
        <>
        {props.letter !== " " ? (
            <div className = "word_column">
            _
            <br>
            </br>
            {props.letter}
        </div>
        ) : <div className = "space">
    </div>}
        
        </>
    )
}

export default WordColumn