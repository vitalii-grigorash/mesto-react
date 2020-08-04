import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Main extends React.Component {

    static contextType = CurrentUserContext;

    onCardClick = (card) => {
        this.props.handleCardClick(card);
    };

    render () {
        return (

            <main className="content">

                <section className="profile">

                    <div className="profile__avatar-container">

                        <div className="profile__overlay" onClick={this.props.onEditAvatar}></div>
                        <img className="profile__avatar" src={this.context.avatar} alt="Аватар" />

                    </div>

                    <div className="profile__info">

                        <div className="profile__heading-info">

                            <p className="profile__name">{this.context.name}</p>
                            <button className="profile__edit-button" onClick={this.props.onEditProfile}></button>

                        </div>

                        <p className="profile__job">{this.context.about}</p>

                    </div>

                    <button className="profile__add-button" onClick={this.props.onAddPlace}></button>

                </section>

                <section className="elements">
                    {this.props.cards.map((card) => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={this.onCardClick} 
                            onCardLike={this.props.handleCardLike} 
                            onCardDelete={this.props.handleCardDelete}
                        />
                    ))}
                </section>

            </main>
        );
    }
}
  
export default Main;