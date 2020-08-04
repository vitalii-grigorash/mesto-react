import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {

    const { isOpen, onClose, onUpdateUser, isLoading } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: name,
          about: description,
        });
    }

    return (

        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            submit='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
        
            <input
            type="text"
            className="popup__input popup__input_name"
            id="name-input"
            name="name"
            defaultValue={name}
            placeholder='Имя'
            minLength="2"
            maxLength="40"
            pattern="[A-Za-zа-яёА-ЯЁ -]{1,}"
            required
            onChange={handleNameChange}
            />
            <span id="name-input-error" className="popup__input_name-error"></span>
        
        
            <input
            type="text"
            className="popup__input popup__input_job"
            id="job-input"
            name="job"
            defaultValue={description} 
            placeholder='О себе'
            minLength="2"
            maxLength="200"
            required
            onChange={handleDescriptionChange}
            />
            <span id="job-input-error" className="popup__input_name-error"></span>
        
        </PopupWithForm>
    )

}

export default EditProfilePopup;