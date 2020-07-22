import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            userDescription: '',
            userAvatar: '',
            cards: []
        }
    }

    componentDidMount() {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardData]) => {
            this.setState({
                userName: userData.name,
                userDescription: userData.about,
                userAvatar: userData.avatar,
                cards: cardData,
            });
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
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

                        <img className="profile__avatar" src={this.state.userAvatar} alt="Аватар" />

                    </div>

                    <div className="profile__info">

                        <div className="profile__heading-info">

                            <p className="profile__name">{this.state.userName}</p>
                            <button className="profile__edit-button" onClick={this.props.onEditProfile}></button>

                        </div>

                        <p className="profile__job">{this.state.userDescription}</p>

                    </div>

                    <button className="profile__add-button" onClick={this.props.onAddPlace}></button>

                </section>

                <section className="elements">
                    {this.state.cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={this.onCardClick} />
                    ))}
                </section>

            </main>
        );
    }
}
  
export default Main;