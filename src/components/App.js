import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = useState({}); 

  const [cards, setCards] = useState([]);
  
  React.useEffect (() => {
    api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  React.useEffect (() => {
    api.getInitialCards()
    .then((cardData) => {
      setCards(cardData);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }, [cards]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isLoading, setLoading] = useState();
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: '',
  });

function handleCardLike (card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked)
  .then((newCard) => {
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
    setCards(newCards);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
}

function handleCardDelete (card) {
  const isOwn = card.owner._id === currentUser._id;
  api.removeCard(card._id, !isOwn)
  .then((newCard) => {
    const newCards = cards.filter((c) => c._id === card._id ? !newCard : c);
    setCards(newCards);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
}

  function handleCardClick(cardData) {
    const { link, name } = cardData.card;
    setSelectedCard({ isImageOpen: true, link: link, name: name });
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function handleUpdateUser (userData) {
    setLoading(true);
    api.setUserInfo(userData)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => setLoading(false));
    closeAllPopups();
  }

  function handleUpdateAvatar (userData) {
    setLoading(true);
    api.setAvatar(userData)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => setLoading(false));
    closeAllPopups();
  }

  function handleAddPlaceSubmit (userData) {
    setLoading(true);
    api.addCard(userData)
    .then((res) =>{
      setCards([...cards, res]);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => setLoading(false));
    closeAllPopups();
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      isImageOpen: false,
      link: '',
      name: ''
    });
  }

  return (
    
    <CurrentUserContext.Provider value={currentUser}>

    <div className="page">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleCardClick={handleCardClick}
        handleCardLike={handleCardLike}
        handleCardDelete={handleCardDelete}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} 
        isLoading={isLoading}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar} 
        isLoading={isLoading}
      />

      <PopupWithForm

        name="card-remove"
        title= "Вы уверены?"
        submit="Да"
        onClose={closeAllPopups}

      ></PopupWithForm>

      <ImagePopup
        name={selectedCard.name}
        link={selectedCard.link}
        onClose={closeAllPopups}
        isOpen={selectedCard.isImageOpen}
      />
      
    </div>

    </CurrentUserContext.Provider> 
  );
}

export default App;
