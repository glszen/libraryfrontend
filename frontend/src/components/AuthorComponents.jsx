import React, { useEffect, useState } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } from '../redux/authorSlice';
import 'bootstrap/dist/css/bootstrap.min.css';


function AuthorComponent() {
  const dispatch = useDispatch();
  const { authors } = useSelector((store) => store.author);
  const [editAuthorId, setEditAuthorId] = useState(null); // Güncellenen yazarın id'sini tutmak için state
  const [updatedAuthor, setUpdatedAuthor] = useState({}); // Güncellenen yazarın bilgilerini tutmak için state
  const [showModal, setShowModal] = useState(null); // Modal'ı göstermek için state
  const [showAddModal, setShowAddModal] = useState(false); // Modal'ı göstermek için state
  const [authorToDelete, setAuthorToDelete] = useState(null); // Silinecek yazarı tutmak için state
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    birthDate: '',
    country: '',
  });

  useEffect(() => {
    dispatch(getAllAuthors());
  }, [dispatch]);

  const handleNewAuthorChange = (e) => {
    setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value }); // Yeni yazarın bilgilerini state'e atıyoruz
  };

  const handleAddAuthor = () => {
    dispatch(addAuthor(newAuthor)); // Yeni yazarı ekliyoruz
    setNewAuthor({ name: '', birthDate: '', country: '' }); // Yeni yazarı ekledikten sonra inputları temizliyoruz
    setShowAddModal(false); // Modalı kapatıyoruz
  };

  const handleEditClick = (author) => {
    setEditAuthorId(author.id); // Güncellenen yazarın id'sini state'e atıyoruz
    setUpdatedAuthor(author); // Güncellenen yazarın bilgilerini state'e atıyoruz
  };

  const handleInputChange = (e) => {
    setUpdatedAuthor({ ...updatedAuthor, [e.target.name]: e.target.value }); // Güncellenen yazarın bilgilerini state'e atıyoruz
  };

  const handleSaveClick = () => {
    dispatch(updateAuthor({ id: editAuthorId, updatedAuthor })); // Güncellenen yazarı güncelliyoruz
    setEditAuthorId(null); // Düzenleme işlemini bitiriyoruz
  };

  const handleDeleteClick = (author) => {
    setAuthorToDelete(author); // Silinecek yazarı state'e atıyoruz
    setShowModal(true); // Modalı açıyoruz
  };

  const handleConfirmDelete = () => {
    if (authorToDelete && authorToDelete.id) {
      dispatch(deleteAuthor(authorToDelete.id)); // Yazarı siliyoruz
    }
    setShowModal(false); // Modalı kapatıyoruz
    setAuthorToDelete(null); // State'i temizliyoruz
  };

  const handleCloseModal = () => {
    setShowModal(false); // Modalı kapatıyoruz
    setAuthorToDelete(null); // Silinecek yazarı null yapıyoruz
  };

  return (
    <div>
      <div className="container mulish"  >
        <h2></h2 >
        <ul className="responsive-table" >
          <li className="table-header" >
            <div className="col col-1">Name</div>
            <div className="col col-2">Birth Date</div>
            <div className="col col-3">Country</div>
            <div className="col col-4">Options</div>
            <div className="col col-5" onClick={() => setShowAddModal(true)} style={{ cursor: 'pointer', color: 'white' }}>
              Add
            </div>
          </li>
          {authors &&
            authors.map((author) => (
              <li className="table-row" key={author.id}>
                {editAuthorId === author.id ? (
                  <>
                    <div className="col col-1 me-2">
                      <input
                        type="text"
                        name="name"
                        value={updatedAuthor.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-2 me-2">
                      <input
                        type="date"
                        name="birthDate"
                        value={updatedAuthor.birthDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-3 me-2">
                      <input
                        type="text"
                        name="country"
                        value={updatedAuthor.country}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-4">
                      <button className="btn btn-sm" onClick={handleSaveClick}>
                        ✔
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-1" data-label="Name">{author.name}</div>
                    <div className="col col-2" data-label="Birth Date">{author.birthDate}</div>
                    <div className="col col-3" data-label="Country">{author.country}</div>
                    <div className="col col-4">
                      <span
                        className="btn btn-sm"
                        onClick={() => handleEditClick(author)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn btn-sm ms-2"
                        onClick={() => handleDeleteClick(author)}
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
          Are you sure you want to delete the author <strong>{authorToDelete?.name || 'Unknown'}</strong>?
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
          <Modal.Title>Add New Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={newAuthor.name}
                onChange={handleNewAuthorChange}
                placeholder="Author Name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                name="birthDate"
                value={newAuthor.birthDate}
                onChange={handleNewAuthorChange}
                placeholder="Birth Date"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="country"
                value={newAuthor.country}
                onChange={handleNewAuthorChange}
                placeholder="Country"
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAuthor}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AuthorComponent;