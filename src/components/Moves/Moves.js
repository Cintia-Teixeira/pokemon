import React from 'react';

const Moves = (props) => {
    return (
        <>
            <h2>Moves</h2>
            <div>
                {props.moves.map((move, index) => {
                    return (
                        <div className={`move move-${index}`} id={index} key={move.name}>
                            <h3 className="moveName">{move.name}</h3>
                            <span>{move.description}</span>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Moves;