import React from 'react';

const Footer = ({ length, author }) => {
    const today = new Date();

    return (
        <footer>
            <p>
                {length} List {length === 1 ? 'Item' : 'Items'}
            </p>
            <p>~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~</p>
            <p>
                {author} - Copyright &copy; {today.getFullYear()}
            </p>
        </footer>
    );
};

export default Footer;
