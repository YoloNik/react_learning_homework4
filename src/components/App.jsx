import React from 'react';
import Phonebook from './Phonebook/Phonebook';
import ImageFinder from './ImageFinder/ImageFinder';
import Feedback from './Feedback/Feedback';

export const App = () => {
  return (
    <>
      <Feedback />
      <Phonebook />
      <ImageFinder />
    </>
  );
};
