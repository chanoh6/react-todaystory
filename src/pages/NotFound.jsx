import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{t(`error.code`, { code: '404' })}</h1>
      <p style={styles.text}>{t(`error.title`)}</p>
      <p style={styles.text}>{t(`error.desc`)}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '40px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default NotFound;
