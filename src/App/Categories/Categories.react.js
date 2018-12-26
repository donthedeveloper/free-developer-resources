import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.styles.scss';

const Categories = () => {
    return (
        <div className='categories'>
            <Link className='categories__link categories__link--1-blue' to='/resources/ux'>
                UX & Design
            </Link>
            <Link className='categories__link categories__link--2-red' to='/resources/frontend'>
                Frontend
            </Link>
            <Link className='categories__link categories__link--3-green' to='/resources/backend'>
                Backend
            </Link>
            <Link className='categories__link categories__link--4-brown' to='/resources/foundations'>
                Foundations
            </Link>
        </div>
    );
};

export default Categories;