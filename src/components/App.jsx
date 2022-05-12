import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSubmit = data => {
    const contacts = [...this.state.contacts];

    for (const { name } of contacts) {
      if (name.toLowerCase() === data.name.toLowerCase()) {
        alert(`${name} is already in contacts.`);
        return;
      }
    }

    this.setState({ contacts: [...contacts, data] });
  };

  onFilterName = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onFilterContacts = () => {
    const { contacts, filter } = this.state;

    return [...contacts].filter(
      ({ name }) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  };

  onDeleteContact = contactId => {
    this.setState({
      contacts: [...this.state.contacts].filter(({ id }) => id !== contactId),
      filter: '',
    });
  };

  render() {
    const filterContacts = this.onFilterContacts();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>

        <ContactForm addContacts={this.onSubmit} />

        <h2 className={styles.contactsTitle}>Contacts</h2>

        <Filter value={this.state.filter} onFilterName={this.onFilterName} />

        <ContactList
          filterContact={filterContacts}
          deleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}
