import React, { Component } from 'react';
import { Consumer } from '../../Context';
import TextInputGroup from '../Layout/TextInputGroup';
// import { v1 as uuid } from 'uuid';
import axios from 'axios'

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        website: '',
        errors: {}
    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            website: contact.website
        });
    }
    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone, website } = this.state;

        //check for Error
        if (name === '') {
            this.setState({ errors: { name: 'name is required' } })
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'email address is required' } })
            return;
        }
        if (phone === '') {
            this.setState({ errors: { phone: 'phone no is required' } })
            return;
        }
        if (website === '') {
            this.setState({ errors: { website: 'website is required' } })
            return;
        }
        const updContact = {
            name,
            email,
            phone,
            website
        };
        const { id } = this.props.match.params;

        const res = await axios.put(
            `https://jsonplaceholder.typicode.com/users/${id}`,
            updContact
        );

        dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

        // clear text field
        this.setState({
            name: '',
            email: '',
            phone: '',
            website: '',
            errors: {}
        });
        this.props.history.push('/');
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
    render() {
        const { name, email, phone, website, errors } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Edit Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        labal="Name"
                                        name="name"
                                        placeholder="Enter your Name"
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        labal="Email Address"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your Email Id"
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        labal="Phone No"
                                        name="phone"
                                        placeholder="Enter your Phone no"
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />
                                    <TextInputGroup
                                        labal="website"
                                        name="website"
                                        placeholder="Enter your website"
                                        value={website}
                                        onChange={this.onChange}
                                        error={errors.website}
                                    />
                                    <input
                                        type="submit"
                                        value="Update Contact"
                                        className="btn btn-dark btn-block" />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
export default EditContact;