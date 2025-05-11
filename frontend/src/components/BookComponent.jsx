import React, { useEffect, useState } from 'react'; // useEffect'i ekledik
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap'; // React Bootstrap'ten Modal ve Button bileşenlerini ekliyoruz
import { getAllBooks } from '../redux/bookSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateBook } from '../redux/bookSlice';
import { deleteBook } from '../redux/bookSlice'; // Kitap silme işlemi için import ettik.
import { addBook } from '../redux/bookSlice'; // Kitap ekleme işlemi için import ettik.



function BookComponent() {
  const dispatch = useDispatch();
  const { books } = useSelector((store) => store.book);
  const [editBookId, setEditBookId] = useState(null); // Güncellenen kitabın id'sini tutmak için state ekledik
  const [updatedBook, setUpdatedBook] = useState({}); // Güncellenen kitabın bilgilerini tutmak için state ekledik
  const [showModal, setShowModal] = useState(null); // Modal'ı göstermek için state ekledik
  const [showAddModal, setShowAddModal] = useState(false); // Modal'ı göstermek için state ekledik
  const [bookToDelete, setBookToDelete] = useState(null); // Silinecek kitabı tutmak için state ekledik
  const { authors } = useSelector((store) => store.author) // Yazarları almak için ekledik
  const { categories } = useSelector((store) => store.category) // Kategorileri almak için ekledik
  const { publishers } = useSelector((store) => store.publisher) // Yayınevlerini almak için ekledik
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    publisher: '',
    publicationYear: '',
    stock: '',
  });

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleNewBookChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value }); // Yeni kitabın bilgilerini state'e atıyoruz
  }

  const handleAddBook = () => {
    const formattedBook = {
      ...newBook,
      author: { id: parseInt(newBook.author) }, // Yazar ID'sini nesneye dönüştürüyoruz
      publisher: { id: parseInt(newBook.publisher) }, // Yayıncı ID'sini nesneye dönüştürüyoruz
      categories: newBook.categories.map((categoryId) => {
        const category = categories.find((cat) => cat.id === parseInt(categoryId));
        return { id: category.id, name: category.name, description: category.description };
      }), // Kategori ID'lerini tam nesnelere dönüştürüyoruz
      publicationYear: parseInt(newBook.publicationYear), // Yıl bir sayı olmalı
      stock: parseInt(newBook.stock), // Stok bir sayı olmalı
    };

    console.log("Gönderilen Veri (Formatlanmış):", formattedBook); // Formatlanmış veriyi kontrol edin

    dispatch(addBook(formattedBook))
      .unwrap()
      .catch((error) => {
        console.error("Kitap Eklenirken Hata:", error); // Hata mesajını konsola yazdırın
      });

    setNewBook({ name: '', author: '', publisher: '', publicationYear: '', stock: '', categories: [] });
    setShowAddModal(false);
  };

  const handleEditClick = (book) => {
    setEditBookId(book.id); // Güncellenen kitabın id'sini state'e atıyoruz
    setUpdatedBook(book); // Güncellenen kitabın bilgilerini state'e atıyoruz   
  }

  const handleInputChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value }); // Güncellenen kitabın bilgilerini state'e atıyoruz
  }

  const handleSaveClick = () => {
    dispatch(updateBook({ id: editBookId, updatedBook })); // Güncellenen kitabı güncelliyoruz
    setEditBookId(null); // Düzenleme işlemini bitiriyoruz.
  }

  const handleDeleteClick = (book) => {
    setBookToDelete(book); // Silinecek kitabı state'e atıyoruz
    setShowModal(true); // Modalı açıyoruz
  }

  const handleConfirmDelete = () => {
    if (bookToDelete && bookToDelete.id) {
      dispatch(deleteBook(bookToDelete.id)); // Kitabı siliyoruz
    }
    setShowModal(false); // Modalı kapatıyoruz
    setBookToDelete(null); // State'i temizliyoruz
  };

  const handleCloseModal = () => {
    setShowModal(false); // Modalı kapatıyoruz
    setBookToDelete(null); // Silinecek kitabı null yapıyoruz

  }

  return (
    <div>
      <div className="container mulish">
        <h2></h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name</div>
            <div className="col col-2">Author</div>
            <div className="col col-3">Publisher</div>
            <div className="col col-8">Publication Year</div>
            <div className="col col-5">Stock</div>

            <div className="col col-6">Categories</div>
            <div className="col col-6">Options</div>
            <div className="col col-9" onClick={() => setShowAddModal(true)} style={{ cursor: 'pointer', color: 'white' }}>
              Add
            </div>
          </li>
          {books &&
            books.map((book) => (
              <li className="table-row" key={book.id}>
                {editBookId === book.id ? (
                  <>
                    <div className="col col-1 me-2">
                      <input
                        type="text"
                        name="name"
                        value={updatedBook.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-2 me-2">
                      <select
                        name="author"
                        value={updatedBook.author.id}
                        onChange={(e) =>
                          setUpdatedBook({
                            ...updatedBook,
                            author: { id: parseInt(e.target.value) },
                          })
                        }
                        className="form-control"
                      >
                        <option value="">Select an Author</option>
                        {authors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col col-3 me-2">
                      <select
                        name="publisher"
                        value={updatedBook.publisher.id}
                        onChange={(e) =>
                          setUpdatedBook({
                            ...updatedBook,
                            publisher: { id: parseInt(e.target.value) },
                          })
                        }
                        className="form-control"
                      >
                        <option value="">Select a Publisher</option>
                        {publishers.map((publisher) => (
                          <option key={publisher.id} value={publisher.id}>
                            {publisher.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col col-4 me-1">
                      <input
                        type="number"
                        name="publicationYear"
                        value={updatedBook.publicationYear}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-5">
                      <input
                        type="number"
                        name="stock"
                        value={updatedBook.stock}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-7">
                      <select
                        name="categories"
                        value={updatedBook.categories.map((cat) => cat.id)} // Seçilen kategorilerin ID'lerini alıyoruz
                        onChange={(e) =>
                          setUpdatedBook({
                            ...updatedBook,
                            categories: Array.from(
                              e.target.selectedOptions, // Seçilen seçenekleri alıyoruz
                              (option) => ({ id: parseInt(option.value) }) // Her bir seçeneği nesneye dönüştürüyoruz
                            ),
                          })
                        }
                        className="form-control"
                        multiple // Çoklu seçim özelliği
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col col-6">
                      <button className="btn btn-sm" onClick={handleSaveClick}>
                        ✔
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-1" data-label="Name">{book.name}</div>
                    <div className="col col-2" data-label="Author">{book.author.name}</div>
                    <div className="col col-3" data-label="Publisher">{book.publisher.name}</div>
                    <div className="col col-8" data-label="Year">{book.publicationYear}</div>
                    <div className="col col-5" data-label="Stock">{book.stock}</div>

                    <div className="col col-7" data-label="Categories">
                      {book.categories.map((category) => category.name).join(', ')}
                    </div>
                    <div className="col col-6">
                      <span
                        className="btn btn-sm"
                        onClick={() => handleEditClick(book)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn btn-sm ms-2"
                        onClick={() => handleDeleteClick(book)}
                      >
                        🗑️
                      </span>
                    </div>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the book <strong>{bookToDelete?.name || 'Unknown'}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={newBook.name}
                onChange={handleNewBookChange}
                placeholder="Book Name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <select
                name="author"
                value={newBook.author}
                onChange={handleNewBookChange}
                className="form-control"
              >
                <option value="">Select an Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                name="publisher"
                value={newBook.publisher}
                onChange={handleNewBookChange}
                className="form-control"
              >
                <option value="">Select an Publisher</option>
                {publishers.map((publisher) => (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                name="categories"
                value={newBook.categories}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    categories: Array.from(
                      e.target.selectedOptions, // Seçilen seçenekleri alıyoruz
                      (option) => option.value // Her bir seçeneğin değerini alıyoruz
                    ),
                  })
                }
                className="form-control"
                multiple // Çoklu seçim özelliği
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="publicationYear"
                value={newBook.publicationYear}
                onChange={handleNewBookChange}
                placeholder="Publication Year"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="stock"
                value={newBook.stock}
                onChange={handleNewBookChange}
                placeholder="Stock"
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBook}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookComponent;