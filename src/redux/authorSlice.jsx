import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Geliştirme ortamını kontrol edin
const isDevelopment = process.env.NODE_ENV === 'development';

// Ortama göre BASE_URL belirleyin
const BASE_URL = isDevelopment 
  ? 'https://retired-vanda-glszen-ba299dbf.koyeb.app/api/v1'  // Geliştirme ortamı
  : '/api';  // Üretim ortamı (Netlify)

const initialState = { 
    authors: [],
    loading: false
};

// Tüm yazarları getirme işlemi
export const getAllAuthors = createAsyncThunk('authors/getAll', async () => {
    const response = await axios.get(`${BASE_URL}/authors`);
    return response.data;
});

// Yazar güncelleme işlemi
export const updateAuthor = createAsyncThunk('authors/update', async ({ id, updatedAuthor }) => {
    const response = await axios.put(`${BASE_URL}/authors/${id}`, updatedAuthor);
    return response.data;
});

// Yazar silme işlemi
export const deleteAuthor = createAsyncThunk('authors/delete', async (id) => {
    await axios.delete(`${BASE_URL}/authors/${id}`);
    return id;
});

// Yeni yazar ekleme işlemi
export const addAuthor = createAsyncThunk('authors/add', async (newAuthor) => {
    const response = await axios.post(`${BASE_URL}/authors`, newAuthor);
    return response.data;
});

// Redux slice tanımı
export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAuthors.fulfilled, (state, action) => {
            state.authors = action.payload;
        });
        builder.addCase(updateAuthor.fulfilled, (state, action) => {
            const index = state.authors.findIndex((author) => author.id === action.payload.id);
            if (index !== -1) {
                state.authors[index] = action.payload;
            }
        });
        builder.addCase(deleteAuthor.fulfilled, (state, action) => {
            state.authors = state.authors.filter((author) => author.id !== action.payload);
        });
        builder.addCase(addAuthor.fulfilled, (state, action) => {
            state.authors.push(action.payload);
        });
    }
});

export default authorSlice.reducer;