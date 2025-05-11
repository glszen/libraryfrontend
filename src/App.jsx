
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import BookComponent from './components/BookComponent'
import AuthorComponent from './components/AuthorComponents'
import CategoryComponent from './components/CategoryComponent'
import PublisherComponent from './components/PublisherComponent'
import BookBorrowingComponent from './components/BookBorrowingComponents'
import HomeComponent from './components/HomeComponent'
import NavbarComponents from './components/NavbarComponents'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import NotFoundPageComponent from './components/NotFoundPageComponent'

function App() {
 const BASE_URL = 'https://retired-vanda-glszen-ba299dbf.koyeb.app/api';


fetch(`${BASE_URL}/v1/authors`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("API çağrısı hatası:", error));

  return (
 <div>
  <NavbarComponents />
  <Routes> // React Router ile yönlendirme yapıyoruz.
    <Route path="/" element={<HomeComponent />} />
    <Route path="/books" element={<BookComponent />} />
    <Route path="/authors" element={<AuthorComponent />} />
    <Route path="/categories" element={<CategoryComponent />} />
    <Route path="/publishers" element={<PublisherComponent />} />
    <Route path="/book-borrowing" element={<BookBorrowingComponent />} />
    <Route path="*" element={<NotFoundPageComponent />} />

  </Routes>


 </div>
  )
}

export default App
