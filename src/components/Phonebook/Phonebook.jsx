import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
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

const Phonebook = () => {
  const [filter, setFilter] = useState('');
  const [user, setUser] = useState('');
  const [number, setNumber] = useState('');

  const [storageContacts, setStorageContscts] = useLocalStorage(
    STORAGE_KEY,
    contactsData.contacts,
  );

  useEffect(() => {
    setStorageContscts(contactsData.contacts);
  }, [setStorageContscts]);

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setUser(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      case 'filter':
        setFilter(e.target.value);
        break;

      default:
        break;
    }
  };

  const addContact = e => {
    e.preventDefault();

    const searchSameName = storageContacts
      .map(cont => cont.name)
      .includes(user);

    searchSameName
      ? alert(`${user} is already in contacts`)
      : setStorageContscts(prevContacts => {
          const newContact = {
            name: user,
            number: number,
            id: nanoid(),
          };
          return [newContact, ...prevContacts];
        });

    reset();
  };

  const reset = () => {
    setUser('');
    setNumber('');
  };

  const deleteContact = e => {
    const contactsWhisOutDeletedContact = storageContacts.filter(
      contact => contact.id !== e.target.name,
    );
    setStorageContscts(contactsWhisOutDeletedContact);
  };

  const filterByName = () => {
    return storageContacts.filter(el =>
      el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  };

  return (
    <div className={s.phonebook}>
      <h2 className={s.title}>Phonebook</h2>
      <UserInput
        valueName={user}
        valueTel={number}
        onChange={handleChange}
        addContact={addContact}
      />

      <h3>Contacts</h3>
      <FilterPhonebook filterValue={filter} onChange={handleChange} />
      <ContactList
        filter={filter}
        contacts={storageContacts}
        filterByName={filterByName}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default Phonebook;
