import React from 'react';

class Card extends React.Component {

    handleClick = () => {
        this.props.onCardClick(this.props);
    };

  render() {

    const {card} = this.props;

    return (

        <div className="elements__element">

            <img className="elements__image" alt={card.name} src={card.link} onClick={this.handleClick} />

            <button className="elements__trash-button elements__trash-button_active"></button>

            <div className="elements__group">

                <p className="elements__place">{card.name}</p>

                <div className="elements__like-container">

                    <button className="elements__like-button"></button>

                    <p className="elements__like-count">{card.likes.length}</p>

                </div>

            </div>

        </div>
    );
  }
}

export default Card;