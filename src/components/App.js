import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = useState({}); 
  
  React.useEffect (() => {
    api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  });

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: '',
  });

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
      />

      <Footer />

      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        submit='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        
        <input
          type="text"
          className="popup__input popup__input_name"
          id="name-input"
          name="name"
          placeholder='Имя'
          minLength="2"
          maxLength="40"
          pattern="[A-Za-zа-яёА-ЯЁ -]{1,}"
          required
        />
        <span id="name-input-error" className="popup__input_name-error"></span>
        
        
        <input
          type="text"
          className="popup__input popup__input_job"
          id="job-input"
          name="job"
          placeholder='О себе'
          minLength="2"
          maxLength="200"
          required
        />
        <span id="job-input-error" className="popup__input_name-error"></span>
        
      </PopupWithForm>

      <PopupWithForm
        name='new-card'
        title='Новое место'
        submit='Сохранить'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        
        <input
          type="text"
          className="popup__input popup__input_card-name"
          id="card-name-input"
          name="name"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          required
        />
        <span id="card-name-input-error" className="popup__input_name-error"></span>
        
        
        <input
          type="url"
          className="popup__input popup__input_card-link"
          id="card-link-input"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="card-link-input-error" className="popup__input_name-error"></span>
        
      </PopupWithForm>

      <PopupWithForm
        name='avatar-edit'
        title='Обновить аватар'
        submit='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        
        <input
          type="url"
          className="popup__input popup__input_avatar-edit"
          id="avatar-edit-input"
          name="link"
          placeholder="Ссылка на аватар"
          required
        />
        <span id="avatar-edit-input-error" className="popup__input_name-error"></span>
        
      </PopupWithForm>

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
