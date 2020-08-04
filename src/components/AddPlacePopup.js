import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {

    const { isOpen, onClose, onAddPlace, isLoading } = props;

    const inputNameRef = React.useRef('');
    const inputLinkRef = React.useRef('');

    React.useEffect(() => {
        inputNameRef.current.value = '';
        inputLinkRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name: inputNameRef.current.value,
          link: inputLinkRef.current.value
        });
    }
    
    return (
        <PopupWithForm
            name='new-card'
            title='Новое место'
            submit='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
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
                ref={inputNameRef}
            />
            <span id="card-name-input-error" className="popup__input_name-error"></span>
        
            <input
                type="url"
                className="popup__input popup__input_card-link"
                id="card-link-input"
                name="link"
                placeholder="Ссылка на картинку"
                required
                ref={inputLinkRef}
            />
            <span id="card-link-input-error" className="popup__input_name-error"></span>
        
        </PopupWithForm>
    )
}

export default AddPlacePopup;