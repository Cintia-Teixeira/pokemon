import React from 'react';
import './Card.scss';

const Card = (props) => {

    return (
        <div className="card">
            <div className="image-box">
                <img src={props.image}></img>
            </div>
            <span>{props.type}</span>
            <div className="content">
                <h1>{props.name}</h1>
                <section>
                    {props.moves.map(move => {
                        return (
                            <div key={move.name}>
                                <h2>{move.name}</h2>
                                <span>{move.description}</span>
                            </div>
                        )
                    })}
                </section>
                <hr />
                <section>
                    <h2>Abilities</h2>
                    <div>
                        {props.abilities.map(ability => {
                            return (
                                <span key={ability}>{ability}</span>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Card;