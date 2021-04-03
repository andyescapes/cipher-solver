import '.././App.css';
function WordColumn(props) {

    return(
        <>
        {props.letter !== " " ? (
            <div className = "word_column">
            <p>
            _
            </p>

            <p>
            {props.letter}
            </p>
            
        </div>
        ) : <div className = "space">
    </div>}
        
        </>
    )
}

export default WordColumn