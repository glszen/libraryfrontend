import React, { useEffect, useState } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { getAllBookBorrowings, addBookBorrowing, updateBookBorrowing, deleteBookBorrowing } from '../redux/borrowingSlice';
import { getAllBooks } from '../redux/bookSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookBorrowingComponent() {
  const dispatch = useDispatch();
  const { bookBorrowings } = useSelector((store) => store.bookBorrowing);
  const { books } = useSelector((store) => store.book);
  const [editBorrowingId, setEditBorrowingId] = useState(null);
  const [updatedBorrowing, setUpdatedBorrowing] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [borrowingToDelete, setBorrowingToDelete] = useState(null);
  const [newBorrowing, setNewBorrowing] = useState({
    borrowerName: '',
    borrowerMail: '',
    borrowingDate: '',
    bookForBorrowingRequest: {
      id: '',
    },
  });

  useEffect(() => {
    dispatch(getAllBookBorrowings());
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleNewBorrowingChange = (e) => {
    const { name, value } = e.target;
    setNewBorrowing({ ...newBorrowing, [name]: value });
  };

  const handleBookSelectChange = (e) => {
    const bookId = parseInt(e.target.value);
    const selectedBook = books.find((book) => book.id === bookId);
    if (selectedBook) {
      setNewBorrowing({
        ...newBorrowing,
        bookForBorrowingRequest: {
          id: selectedBook.id,
          name: selectedBook.name,
        },
      });
    }
  };

  const handleAddBorrowing = () => {
    dispatch(addBookBorrowing(newBorrowing));
    setNewBorrowing({
      borrowerName: '',
      borrowerMail: '',
      borrowingDate: '',
      bookForBorrowingRequest: {
        id: '',
      },
    });
    setShowAddModal(false);
  };

  const handleEditClick = (borrowing) => {
    setEditBorrowingId(borrowing.id);
    setUpdatedBorrowing({
      borrowerName: borrowing.borrowerName,
      borrowerMail: borrowing.borrowerMail,
      borrowingDate: borrowing.borrowingDate,
      book: {
        id: borrowing.book?.id || '',
        name: borrowing.book?.name || '',
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBorrowing({ ...updatedBorrowing, [name]: value });
  };

  const handleSaveClick = () => {
    const formattedBorrowing = {
      ...updatedBorrowing,
      book: {
        id: updatedBorrowing.book.id,
        name: updatedBorrowing.book.name,
      },
    };

    dispatch(updateBookBorrowing({ id: editBorrowingId, updatedBookBorrowing: formattedBorrowing }))
      .unwrap()
      .then(() => {
        dispatch(getAllBookBorrowings());
        setEditBorrowingId(null);
      })
      .catch((error) => {
        console.error("Error updating borrowing:", error);
      });
  };

  const handleDeleteClick = (borrowing) => {
    setBorrowingToDelete(borrowing);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (borrowingToDelete && borrowingToDelete.id) {
      dispatch(deleteBookBorrowing(borrowingToDelete.id));
    }
    setShowModal(false);
    setBorrowingToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBorrowingToDelete(null);
  };

  return (
    <div>
      <div className="container mulish">
        <h2></h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Borrower Name</div>
            <div className="col col-2">Borrower Mail</div>
            <div className="col col-3">Borrowing Date</div>
            <div className="col col-4">Book Name</div>
            <div className="col col-5">Options</div>
            <div
              className="col col-6"
              onClick={() => setShowAddModal(true)}
              style={{ cursor: 'pointer', color: 'white' }}
            >
              Add
            </div>
          </li>
          {bookBorrowings &&
            bookBorrowings.map((borrowing) => (
              <li className="table-row" key={borrowing.id}>
                {editBorrowingId === borrowing.id ? (
                  <>
                    <div className="col col-1">
                      <input
                        type="text"
                        name="borrowerName"
                        value={updatedBorrowing.borrowerName || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-2">
                      <input
                        type="text"
                        name="borrowerMail"
                        value={updatedBorrowing.borrowerMail || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-3">
                      <input
                        type="date"
                        name="borrowingDate"
                        value={updatedBorrowing.borrowingDate || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <p className="form-control-plaintext">
                        {borrowing.book.name}
                      </p>
                    </div>
                    <div className="col col-5">
                      <button className="btn btn-sm" onClick={handleSaveClick}>
                        ✔
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-1">{borrowing.borrowerName}</div>
                    <div className="col col-2">{borrowing.borrowerMail}</div>
                    <div className="col col-3">{borrowing.borrowingDate}</div>
                    <div className="col col-4">{borrowing.book?.name || 'N/A'}</div>
                    <div className="col col-5">
                      <span
                        className="btn btn-sm"
                        onClick={() => handleEditClick(borrowing)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn btn-sm ms-2"
                        onClick={() => handleDeleteClick(borrowing)}
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

      {/* Delete Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the borrowing record for{' '}
          <strong>{borrowingToDelete?.borrowerName || 'Unknown'}</strong>?
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

      {/* Add Borrowing Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Borrowing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="borrowerName"
                value={newBorrowing.borrowerName}
                onChange={handleNewBorrowingChange}
                placeholder="Borrower Name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="borrowerMail"
                value={newBorrowing.borrowerMail}
                onChange={handleNewBorrowingChange}
                placeholder="Borrower Mail"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                name="borrowingDate"
                value={newBorrowing.borrowingDate}
                onChange={handleNewBorrowingChange}
                placeholder="Borrowing Date"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <select
                name="bookForBorrowingRequest.id"
                value={newBorrowing.bookForBorrowingRequest.id}
                onChange={handleBookSelectChange}
                className="form-control"
              >
                <option value="">Select a Book</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBorrowing}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookBorrowingComponent;