import React from 'react';
import styles from './footer.module.css'

const Footer = () => {
    return (
        <div>
             <footer className={styles.footer}>&copy;{`bantudev ${new Date().getUTCFullYear()} todos os direitos reservados`}</footer>
        </div>
    );
}

export default Footer;
