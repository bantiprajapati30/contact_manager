import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../Context';
import { Link } from 'react-router-dom';
import axios from 'axios'


class Contact extends Component {
    state = {
        showContactInfo: false
    };
    onShowClick = e => {
        this.setState({
            showContactInfo: !this.state.showContactInfo
        });
    }
    onDeleted = async (id, dispatch) => {
        try {
            await axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);

            dispatch({ type: 'DELETE_CONTACT', payload: id })
        }
        catch (e) {
            dispatch({ type: 'DELETE_CONTACT', payload: id })
        }

    }
    render() {
        const { showContactInfo } = this.state;
        const { id, name, email, phone, website } = this.props.contact;
        return (

            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>{name} {' '}
                                <i
                                    onClick={this.onShowClick}
                                    className="fas fa-sort-down"
                                    style={{ cursor: 'pointer' }}
                                />
                                <i onClick={this.onDeleted.bind(this, id, dispatch)} className="fas fa-times" style={{ cursor: 'pointer', float: 'right', color: 'red' }} />
                                
                                <Link to={`contact/edit/${id}`}>
                                    <i className="fas fa-pencil-alt"
                                        style={{
                                            cursor: 'pointer',
                                            float: 'right',
                                            color: 'black', 
                                            marginRight: '1rem'
                                        }}>

                                    </i>
                                </Link>

                            </h4>
                            {showContactInfo ? <ul className="list-group">
                                <li className="list-group-item"> Email: {email}</li>
                                <li className="list-group-item"> phone no: {phone}</li>
                                <li className="list-group-item"> website: {website}</li>
                            </ul> : null}
                        </div>
                    )
                }}
            </Consumer>
        )
    }
};
Contact.propTypes = {
    contact: PropTypes.object.isRequired,


}

export default Contact;
