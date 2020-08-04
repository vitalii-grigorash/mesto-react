import React from 'react';

function PopupWithForm (props) {

    const { 
        onSubmit,
        name,
        isOpen,
        onClose,
        title,
        children,
        submit,
        isLoading
    } = props;

    return (

        <div
            className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
        >

            <div 
                className={`popup__container popup__container_type_${name}`}
            >

                <button
                    type='button'
                    className='popup__close-button'
                    onClick={onClose}
                ></button>

                <form
                    className={`popup__forms popup__forms_${name}`}
                    onSubmit={onSubmit}
                >

                    <h2 className="popup__heading">{title}</h2>

                    
                    {children}
                    

                    <div className="popup__handlers">

                        <button
                            type='submit'
                            className="popup__submit-button"
                        >
                        {isLoading ? `Сохранение...` : submit}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
  
export default PopupWithForm;