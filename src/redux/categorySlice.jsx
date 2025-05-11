import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Geliştirme ortamını kontrol edin
const isDevelopment = process.env.NODE_ENV === 'development';

// Ortama göre BASE_URL belirleyin
const BASE_URL = isDevelopment 
  ? 'https://retired-vanda-glszen-ba299dbf.koyeb.app/api/v1'  // Geliştirme ortamı
  : '/api';  // Üretim ortamı (Netlify)

const initialState = { 
    categories: [],
    loading: false
};

// Tüm kategorileri getirme işlemi
export const getAllCategories = createAsyncThunk('categories/getAll', async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
});

// Kategori güncelleme işlemi
export const updateCategory = createAsyncThunk('categories/update', async ({ id, updatedCategory }) => {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, updatedCategory);
    return response.data;
});

// Kategori silme işlemi
export const deleteCategory = createAsyncThunk('categories/delete', async (id) => {
    await axios.delete(`${BASE_URL}/categories/${id}`);
    return id;
});

// Yeni kategori ekleme işlemi
export const addCategory = createAsyncThunk('categories/add', async (newCategory) => {
    const response = await axios.post(`${BASE_URL}/categories`, newCategory);
    return response.data;
});

// Redux slice tanımı
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex((category) => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category) => category.id !== action.payload);
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload);
        });
    }
});

export default categorySlice.reducer;