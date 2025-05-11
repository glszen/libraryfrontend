import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from '../assets/photo4.jpg' // Photo dosyasını import ediyoruz

function HomeComponent() {
  return (
    <div className="container align-items-center d-flex vh-100">
      <div
        className="text-center p-5 rounded shadow mt-4 col-8"
        style={{
          background: 'rgba(255, 255, 255, 0.2)', // Transparan beyaz arka plan
          backdropFilter: 'blur(10px)', // Arka plan bulanıklığı
          borderRadius: '30px', // Kenar yuvarlama
        }}
      >
        <h1 className="mb-4">Welcome to the Digital Library System</h1>
        <p className="lead">
          Discover the power of seamless library management with our Digital Library System. This platform is designed to simplify and enhance the way you manage books, authors, publishers, and borrowing records. Whether you're adding new books, editing author details, or tracking borrowing activities, our system provides an intuitive and efficient solution.
        </p>
        <h3 className="mt-4">Key Features:</h3>
        <ul className="list-unstyled mt-3">
          <li>📚 <strong>Book Management:</strong> Easily add, edit, and delete books in your library.</li>
          <li>✍️ <strong>Author Management:</strong> Maintain a comprehensive list of authors and their works.</li>
          <li>📂 <strong>Category Organization:</strong> Categorize books for better organization and accessibility.</li>
          <li>🏢 <strong>Publisher Management:</strong> Keep track of publishers and their associated books.</li>
          <li>🔄 <strong>Borrowing Records:</strong> Monitor and manage book borrowing activities with ease.</li>
        </ul>
        <p className="mt-4">
          Our goal is to provide a user-friendly interface that empowers you to manage your library effortlessly. Start exploring today and experience the future of digital library management!
        </p>
      </div>
      <div className='col-5 mt-4'>
        <img className='p4' src={photo} alt="" />
      </div>
    </div>
  );
}

export default HomeComponent;