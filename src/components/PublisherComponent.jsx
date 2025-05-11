import React, { useEffect, useState } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { getAllPublishers, addPublisher, updatePublisher, deletePublisher } from '../redux/publisherSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function PublisherComponent() {
  const dispatch = useDispatch();
  const { publishers } = useSelector((store) => store.publisher);
  const [editPublisherId, setEditPublisherId] = useState(null); // Güncellenen yayınevinin id'sini tutmak için state
  const [updatedPublisher, setUpdatedPublisher] = useState({}); // Güncellenen yayınevinin bilgilerini tutmak için state
  const [showModal, setShowModal] = useState(null); // Modal'ı göstermek için state
  const [showAddModal, setShowAddModal] = useState(false); // Modal'ı göstermek için state
  const [publisherToDelete, setPublisherToDelete] = useState(null); // Silinecek yayınevini tutmak için state
  const [newPublisher, setNewPublisher] = useState({
    name: '',
    establishmentYear: '',
    address: '',
  });

  useEffect(() => {
    dispatch(getAllPublishers());
  }, [dispatch]);

  const handleNewPublisherChange = (e) => {
    setNewPublisher({ ...newPublisher, [e.target.name]: e.target.value }); // Yeni yayınevinin bilgilerini state'e atıyoruz
  };

  const handleAddPublisher = () => {
    dispatch(addPublisher(newPublisher)); // Yeni yayınevini ekliyoruz
    setNewPublisher({ name: '', establishmentYear: '', address: '' }); // Yeni yayınevini ekledikten sonra inputları temizliyoruz
    setShowAddModal(false); // Modalı kapatıyoruz
  };

  const handleEditClick = (publisher) => {
    setEditPublisherId(publisher.id); // Güncellenen yayınevinin id'sini state'e atıyoruz
    setUpdatedPublisher(publisher); // Güncellenen yayınevinin bilgilerini state'e atıyoruz
  };

  const handleInputChange = (e) => {
    setUpdatedPublisher({ ...updatedPublisher, [e.target.name]: e.target.value }); // Güncellenen yayınevinin bilgilerini state'e atıyoruz
  };

  const handleSaveClick = () => {
    dispatch(updatePublisher({ id: editPublisherId, updatedPublisher })); // Güncellenen yayınevini güncelliyoruz
    setEditPublisherId(null); // Düzenleme işlemini bitiriyoruz
  };

  const handleDeleteClick = (publisher) => {
    setPublisherToDelete(publisher); // Silinecek yayınevini state'e atıyoruz
    setShowModal(true); // Modalı açıyoruz
  };

  const handleConfirmDelete = () => {
    if (publisherToDelete && publisherToDelete.id) {
      dispatch(deletePublisher(publisherToDelete.id)); // Yayınevini siliyoruz
    }
    setShowModal(false); // Modalı kapatıyoruz
    setPublisherToDelete(null); // State'i temizliyoruz
  };

  const handleCloseModal = () => {
    setShowModal(false); // Modalı kapatıyoruz
    setPublisherToDelete(null); // Silinecek yayınevini null yapıyoruz
  };

  return (
    <div>
      <div className="container mulish">
        <h2></h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-10">Name</div>
            <div className="col col-10">Establishment Year</div>
            <div className="col col-10">Options</div>
            <div className="col col-10" onClick={() => setShowAddModal(true)} style={{ cursor: 'pointer', color: 'white' }}>
              Add
            </div>
          </li>
          {publishers &&
            publishers.map((publisher) => (
              <li className="table-row" key={publisher.id}>
                {editPublisherId === publisher.id ? (
                  <>
                    <div className="col col-1 me-2">
                      <input
                        type="text"
                        name="name"
                        value={updatedPublisher.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-2 me-2">
                      <input
                        type="number"
                        name="establishmentYear"
                        value={updatedPublisher.establishmentYear}
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

                  {console.log("Publisher:" ,{publishers})}
                    <div className="col col-10" data-label="Name">{publisher.name}</div>
                    <div className="col col-10" data-label="Establishment Year">{publisher.establishmentYear}</div>
                    
                  
                    <div className="col col-10">
                      <span
                        className="btn btn-sm"
                        onClick={() => handleEditClick(publisher)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn btn-sm ms-2"
                        onClick={() => handleDeleteClick(publisher)}
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
          Are you sure you want to delete the publisher <strong>{publisherToDelete?.name || 'Unknown'}</strong>?
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
          <Modal.Title>Add New Publisher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={newPublisher.name}
                onChange={handleNewPublisherChange}
                placeholder="Publisher Name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="establishmentYear"
                value={newPublisher.establishmentYear}
                onChange={handleNewPublisherChange}
                placeholder="Establishment Year"
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddPublisher}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PublisherComponent;