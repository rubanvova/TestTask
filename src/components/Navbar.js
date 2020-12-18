import React from 'react';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.wrapperNav}>
      <div className={styles.logo}> ToDo </div>
    </div>
  );
};

export default Navbar;
