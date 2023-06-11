import React from 'react';
import PropTypes from 'prop-types';

import { ContactListItem } from '../ContactListItem/ContactListItem';
import { List } from '../ContactList/ContactList.styled';

export const ContactList = ({ filtredContacts, onDeleteContact }) => (
  <List>
    {filtredContacts.map(contact => (
      <ContactListItem
        key={contact.id}
        id={contact.id}
        name={contact.name}
        number={contact.number}
        onDeleteContact={onDeleteContact}
      />
    ))}
  </List>
);

ContactList.propTypes = {
  filtredContacts: PropTypes.array.isRequired,
};
