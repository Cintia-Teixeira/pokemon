import React from 'react';
import './Card.scss';
import '../Moves/Moves';
import Moves from '../Moves/Moves';
import { useState } from 'react/cjs/react.development';


const Card = (props) => {
    const { name, color, image, type, moves, abilities } = props.pokemon;
    const [modalDisplay, setModalDisplay] = useState('none')

    const movesToBeShown = moves.filter((move, index) => index === 0 || index === 1);

    const toggleModal = () => {
        if (modalDisplay === 'none') {
            setModalDisplay('flex')
        } else {
            setModalDisplay('none');
        };
    }

    return (
        <div className="card" style={{ display: props.display }}>
            <img src={image} alt={name}></img>
            <div className="content" style={{ border: `solid 2px ${color}` }}>
                <span className="type" style={{ background: color }}>{type}</span>
                <h1>{name}</h1>
                <section className="abilitiesWrapper">
                    <h2>Abilities</h2>
                    <div className="abilities">
                        {abilities.map(ability => {
                            return (
                                <span className="ability" key={ability}>{ability}</span>
                            )
                        })}
                    </div>
                </section>
                <section className="movesWrapper">
                    <Moves moves={movesToBeShown}></Moves>
                    <button className="btn" style={{ background: color }} onClick={toggleModal}>Ver lista completa</button>
                </section>
                <div className="modal-container" style={{ display: modalDisplay }}>
                    <div className="modal" aria-expanded="true">
                        <div className="btn-close" onClick={toggleModal}>
                            <span className="close-pipe close-pipe1">|</span>
                            <span className="close-pipe close-pipe2">|</span>
                        </div>
                        <Moves moves={moves}></Moves>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;