import { v4 } from "uuid";

import Contacts from "./components/Contacts/Contacts";
import React, { Component } from "react";
import ContactsCreator from "./components/ContactsCreator/ContactsCreator";
import Filter from "./components/Filter/Filter";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };






  componentDidUpdate(prevState) {
    const contacts = this.state.contacts;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    if (contacts) {
      this.setState({
        contacts: JSON.parse(contacts),
      });
    }
  }





  addContact = (text, number) => {
    if (this.state.contacts.some((e) => e.text === text) === true) {
      alert(`${text} is already in contacts`);
      return;
    }
    const contact = {
      id: v4(),
      text: text,
      number: number,
    };
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  
  handleFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  deleteContact = (id) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => {
          if (contact.id === id) {
            return false;
          } else {
            return true;
          }
        }),
      };
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.text.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div>
        <ContactsCreator addContact={this.addContact} />
        <Filter Filter={this.handleFilter} value={this.state.filter}/>
        <h2>Contacts</h2>
        <Contacts
          contact={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
