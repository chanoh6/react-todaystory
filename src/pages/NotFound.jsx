import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>페이지를 찾을 수 없습니다.</p>
      <p style={styles.text}>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
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
