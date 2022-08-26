import React, { Component } from 'react';
import UserInput from './UserInput/UserInput';
import FilterPhonebook from './FilterPhonebook/FilterPhonebook';
import ContactList from './ContactList/ContactList';
import phonebookData from 'data/phonebookData';
import { nanoid } from 'nanoid';
import * as storage from 'service/localstorage';
import s from './Phonebook.module.css';

const STORAGE_KEY = 'contacts';
const contactsData = storage.get(STORAGE_KEY)
  ? { contacts: storage.get(STORAGE_KEY) }
  : { ...phonebookData };

export class Phonebook extends Component {
  state = {
    ...contactsData,
    name: '',
    number: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      storage.save(STORAGE_KEY, contacts);
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addContact = e => {
    e.preventDefault();
    const searchSameName = this.state.contacts
      .map(cont => cont.name)
      .includes(e.target.name);

    searchSameName
      ? alert(`${e.target.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [
            {
              name: prevState.name,
              number: prevState.number,
              id: nanoid(),
            },
            ...prevState.contacts,
          ],
        }));
    storage.save('contacts', this.state.contacts);
    this.reset();
  };

  deleteContact = e => {
    const contactsWhisOutDeletedContact = this.state.contacts.filter(
      contact => contact.id !== e.target.name,
    );
    this.setState({ contacts: contactsWhisOutDeletedContact });
  };

  filterByName = () => {
    return this.state.contacts.filter(el =>
      el.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase()),
    );
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number, filter, contacts } = this.state;
    return (
      <div className={s.phonebook}>
        <h2 className={s.title}>Phonebook</h2>
        <UserInput
          valueName={name}
          valueTel={number}
          onChange={this.handleChange}
          addContact={this.addContact}
        />

        <h3>Contacts</h3>
        <FilterPhonebook filterValue={filter} onChange={this.handleChange} />
        <ContactList
          filter={filter}
          contacts={contacts}
          filterByName={this.filterByName}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default Phonebook;
