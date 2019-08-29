import React from 'react';
import participate from './Participate.png';
import './Button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            document.location.href="https://play.google.com/store/apps/details?id=com.cmcc.cmvideo.miguc";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            document.location.href="https://apps.apple.com/hk/app/miguc/id1457655775";
        }
    }

    render() {
        return (
            <div className="Participate-button" onClick={this.handleClick}>
                <img src={participate} className="Button-img" />
            </div>
        );
    }
}

export default Button;