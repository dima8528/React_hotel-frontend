import React from 'react';
import styles from './contactsPage.module.scss';
import { people } from './ourTeam';

export const ContactsPage = () => {

  return (
    <div className={styles.contactsPage}>
      {people.map(person => (
        <a
          key={person.id}
          className={styles.card}
          href={person.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={person.image} alt={person.name} />
          <h2 className={styles.cardTitle}>{person.name}</h2>
          <p className={styles.cardText}>{person.description}</p>
        </a>
      ))}
    </div>
  );
};
