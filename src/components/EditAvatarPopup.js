import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {

    const { isOpen, onClose, onUpdateAvatar, isLoading } = props;

    const inputAvatarRef = React.useRef('');

    React.useEffect(() => {
        inputAvatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
            avatar: inputAvatarRef.current.value 
        });
      }

    return (
        <PopupWithForm
            name='avatar-edit'
            title='Обновить аватар'
            submit='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input
                type="url"
                className="popup__input popup__input_avatar-edit"
                id="avatar-edit-input"
                name="link"
                placeholder="Ссылка на аватар"
                required
                ref={inputAvatarRef}
            />
            <span id="avatar-edit-input-error" className="popup__input_name-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;