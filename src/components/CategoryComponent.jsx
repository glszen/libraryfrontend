import React, { useEffect, useState } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../redux/categorySlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryComponent() {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.category);
  const [editCategoryId, setEditCategoryId] = useState(null); // Güncellenen kategorinin id'sini tutmak için state
  const [updatedCategory, setUpdatedCategory] = useState({}); // Güncellenen kategorinin bilgilerini tutmak için state
  const [showModal, setShowModal] = useState(null); // Modal'ı göstermek için state
  const [showAddModal, setShowAddModal] = useState(false); // Modal'ı göstermek için state
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Silinecek kategoriyi tutmak için state
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleNewCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value }); // Yeni kategorinin bilgilerini state'e atıyoruz
  };

  const handleAddCategory = () => {
    dispatch(addCategory(newCategory)); // Yeni kategoriyi ekliyoruz
    setNewCategory({ name: '', description: '' }); // Yeni kategoriyi ekledikten sonra inputları temizliyoruz
    setShowAddModal(false); // Modalı kapatıyoruz
  };

  const handleEditClick = (category) => {
    setEditCategoryId(category.id); // Güncellenen kategorinin id'sini state'e atıyoruz
    setUpdatedCategory(category); // Güncellenen kategorinin bilgilerini state'e atıyoruz
  };

  const handleInputChange = (e) => {
    setUpdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value }); // Güncellenen kategorinin bilgilerini state'e atıyoruz
  };

  const handleSaveClick = () => {
    dispatch(updateCategory({ id: editCategoryId, updatedCategory })); // Güncellenen kategoriyi güncelliyoruz
    setEditCategoryId(null); // Düzenleme işlemini bitiriyoruz
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category); // Silinecek kategoriyi state'e atıyoruz
    setShowModal(true); // Modalı açıyoruz
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete && categoryToDelete.id) {
      dispatch(deleteCategory(categoryToDelete.id)); // Kategoriyi siliyoruz
    }
    setShowModal(false); // Modalı kapatıyoruz
    setCategoryToDelete(null); // State'i temizliyoruz
  };

  const handleCloseModal = () => {
    setShowModal(false); // Modalı kapatıyoruz
    setCategoryToDelete(null); // Silinecek kategoriyi null yapıyoruz
  };

  return (
    <div>
      <div className="container mulish">
        <h2></h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-10">Name</div>
            <div className="col col-10">Description</div>
            <div className="col col-10">Options</div>
            <div className="col col-10" onClick={() => setShowAddModal(true)} style={{ cursor: 'pointer', color: 'white' }}>
              Add
            </div>
          </li>
          {categories &&
            categories.map((category) => (
              <li className="table-row" key={category.id}>
                {editCategoryId === category.id ? (
                  <>
                    <div className="col col-1 me-2">
                      <input
                        type="text"
                        name="name"
                        value={updatedCategory.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-2 me-2">
                      <input
                        type="text"
                        name="description"
                        value={updatedCategory.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col col-3">
                      <button className="btn btn-sm" onClick={handleSaveClick}>
                        ✔
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col col-10" data-label="Name">{category.name}</div>
                    <div className="col col-10" data-label="Description">{category.description}</div>
                    <div className="col col-10">
                      <span
                        className="btn btn-sm"
                        onClick={() => handleEditClick(category)}
                      >
                        ✏️
                      </span>
                      <span
                        className="btn btn-sm ms-2"
                        onClick={() => handleDeleteClick(category)}
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
          Are you sure you want to delete the category <strong>{categoryToDelete?.name || 'Unknown'}</strong>?
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
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleNewCategoryChange}
                placeholder="Category Name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="description"
                value={newCategory.description}
                onChange={handleNewCategoryChange}
                placeholder="Category Description"
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryComponent;