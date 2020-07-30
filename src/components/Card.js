import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Card extends React.Component {

    static contextType = CurrentUserContext;

    handleClick = () => {
        this.props.onCardClick(this.props);
    };

    handleLikeClick = () => {
        this.props.onCardLike(this.props.card);
    }

    handleDeleteClick = () => {
        this.props.onCardDelete(this.props.card);
    }

  render() {

    const {card} = this.props;

    const isOwn = card.owner._id === this.context._id;

    const cardDeleteButtonClassName = (
        `elements__trash-button ${isOwn ? 'elements__trash-button_active' : ''}`
    );

    const isLiked = card.likes.some(i => i._id === this.context._id);

    const cardLikeButtonClassName = (
        `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`
    );

    return (

        <div className="elements__element">

            <img className="elements__image" alt={card.name} src={card.link} onClick={this.handleClick} />

            <button className={`${cardDeleteButtonClassName}`} onClick={this.handleDeleteClick}></button>

            <div className="elements__group">

                <p className="elements__place">{card.name}</p>

                <div className="elements__like-container">

                    <button className={`${cardLikeButtonClassName}`} onClick={this.handleLikeClick}></button>

                    <p className="elements__like-count">{card.likes.length}</p>

                </div>

            </div>

        </div>
    );
  }
}

export default Card;