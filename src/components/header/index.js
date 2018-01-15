import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <h1>{'Balls'}</h1>
            <nav>
                <Link to="/">{'Home'}</Link>
            </nav>
        </header>
    );
}

