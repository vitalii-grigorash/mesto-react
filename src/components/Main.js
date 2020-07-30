import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Main extends React.Component {
    
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);

        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        api.getInitialCards()
        .then((cardData) => {
            this.setState({
                cards: cardData
            });
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }

    handleCardLike = (card) => {
        
        const isLiked = card.likes.some(i => i._id === this.context._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

          const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
    
            this.setState({
                cards: newCards
            });
        });
    }

    handleCardDelete = (card) => {
        
        const isOwn = card.owner._id === this.context._id;
        
        api.removeCard(card._id, !isOwn).then((newCard) => {

            const newCards = this.state.cards.filter((c) => c._id === card._id ? !newCard : c);

            this.setState({
                cards: newCards
            });
        });
    }

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
                    {this.state.cards.map((card) => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={this.onCardClick} 
                            onCardLike={this.handleCardLike} 
                            onCardDelete={this.handleCardDelete}
                        />
                    ))}
                </section>

            </main>
        );
    }
}
  
export default Main;