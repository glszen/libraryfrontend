import React from 'react';
import '/navbar.css'; // CSS dosyasını doğru şekilde import ediyoruz
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png' // Logo dosyasını import ediyoruz
import { Link } from 'react-router-dom';

function NavbarComponents() {
    return (
        <div className='justify-content-center d-flex align-items-center bg-danger mulish2' > 
            <nav>
            <div className="wrapper  ">
                <img src={logo} className='logo' alt="" />
                <input type="radio" name="slider" id="menu-btn" />
                <input type="radio" name="slider" id="close-btn" />
                <ul className="nav-links">
                    <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="books">Book</Link></li>
                    <li><Link to="authors">Author</Link></li>
                    <li><Link to="categories">Category </Link> </li>
                    <li><Link to="publishers">Publisher </Link> </li>
                    <li><Link to="book-borrowing">Book Borrowing</Link></li>
                </ul>
                <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
            </div>
        </nav>
        </div>
        
    );
}

export default NavbarComponents;