import React, {PureComponent} from 'react';
import './Modal.scss';

class Modal extends PureComponent {
    render() {
        return (
            <div className='modal'>
                <div className='modal__content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal;