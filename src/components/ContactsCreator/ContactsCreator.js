import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ContactsCreator extends Component {
  state = {
    text: "",
    number: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addContact(this.state.text, this.state.number);
  };

  textChange = (e) => {
    this.setState({ text: e.target.value });
  };

  numberChange = (e) => {
    this.setState({ number: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Name</h2>
        <input type="input" onChange={this.textChange} />

        <h2>Number</h2>
        <input type="number" onChange={this.numberChange} />

        <hr />
        <button>Add contact</button>
      </form>
    );
  }
  static propTypes = {
    addContact: PropTypes.func,
  };
}
