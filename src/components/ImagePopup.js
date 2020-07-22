import React from 'react';

class ImagePopup extends React.Component {
    render() {

        return (

            <div className={`popup popup_type_card-open ${this.props.isOpen && 'popup_opened'}`}>

                <div className="popup__container popup__container_card-open">

                    <button className="popup__close-button" type="button" onClick={this.props.onClose}></button>

                    <img className="popup__photo" alt={this.props.name} src={this.props.link} />

                    <p className="popup__description">{this.props.name}</p>

                </div>

            </div>
        );
    }
}
  
export default ImagePopup;