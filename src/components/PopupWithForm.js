import React from 'react';

class PopupWithForm extends React.Component {
    render() {
      return (
        <div
            className={`popup popup_type_${this.props.name} ${this.props.isOpen && 'popup_opened'}`}
        >

            <div 
                className={`popup__container popup__container_type_${this.props.name}`}
            >

                <button
                    type='button'
                    className='popup__close-button'
                    onClick={this.props.onClose}
                ></button>

                <form
                    className={`popup__forms popup__forms_${this.props.name}`}
                >

                    <h2 className="popup__heading">{this.props.title}</h2>

                    
                    {this.props.children}
                    

                    <div className="popup__handlers">

                        <button
                            type='submit'
                            className="popup__submit-button"
                        >
                        {this.props.submit}
                        </button>

                    </div>

                </form>

            </div>

        </div>
      );
    }
}
  
export default PopupWithForm;