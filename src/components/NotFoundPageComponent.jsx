import React from 'react';
import '/navbar.css'; // CSS dosyasını doğru şekilde import ediyoruz
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png' // Logo dosyasını import ediyoruz

function NotFoundPageComponent() {
    return (
        <div className='justify-content-center d-flex align-items-center' style={{height: '70vh', color: 'white'}} > 
            
            <div className="wrapper">
                <h1>SORRY, PAGE NOT FOUND 😕</h1>
            </div>
        
        </div>
        
    );
}

export default NotFoundPageComponent;