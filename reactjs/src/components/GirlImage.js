import React, {Component} from 'react';
import config from '../config'

class GirlImage extends Component {
    render() {
        return (
            <div className='col-3'>
                <img
                    className='img-fluid'
                    src={ config.rootPath + this.props.img.imageUrl }
                    alt={this.props.img.title}/>
                <h4>{this.props.img.title}</h4>
                <p>{this.props.img.description}</p>
            </div>
        );
    }
}

export default GirlImage;
