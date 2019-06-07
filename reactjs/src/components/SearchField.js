import React, {Component} from 'react';

class SearchField extends Component {
    _handleTextChange = event => this.props.onSearchChanged(event.target.value);
    render() {
        return (
            <form className='col-3'>
                <input onChange={this._handleTextChange} type="text" className="form-control" placeholder="Search!"/>
            </form>
        );
    }
}

export default SearchField;