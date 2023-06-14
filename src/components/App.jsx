import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { TelephoneBook, Title } from './App.styled';

export function App() {
  const allContacts = 'contacts';
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(allContacts)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(allContacts, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filtredContacts = getVisibleContacts();
  return (
    <TelephoneBook>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />

      <Title>Contacts</Title>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        filtredContacts={filtredContacts}
        onDeleteContact={deleteContact}
      />
    </TelephoneBook>
  );
}
