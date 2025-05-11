import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend URL'sini merkezi bir değişken olarak tanımlıyoruz
const BASE_URL = 'https://retired-vanda-glszen-ba299dbf.koyeb.app/api';

const initialState = { 
    books: [],
    loading: false
};

// Tüm kitapları getirme işlemi
export const getAllBooks = createAsyncThunk('books/getAll', async () => {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
});

// Kitap güncelleme işlemi
export const updateBook = createAsyncThunk('books/update', async ({ id, updatedBook }) => {
    const response = await axios.put(`${BASE_URL}/books/${id}`, updatedBook);
    return response.data;
});

// Kitap silme işlemi
export const deleteBook = createAsyncThunk('books/delete', async (id) => {
    await axios.delete(`${BASE_URL}/books/${id}`);
    return id;
});

// Yeni kitap ekleme işlemi
export const addBook = createAsyncThunk('books/add', async (newBook) => {
    const response = await axios.post(`${BASE_URL}/books`, newBook);
    return response.data;
});

// Redux slice tanımı
export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            state.books = action.payload;
        });
        builder.addCase(updateBook.fulfilled, (state, action) => {
            const index = state.books.findIndex((book) => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        });
        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.books = state.books.filter((book) => book.id !== action.payload);
        });
        builder.addCase(addBook.fulfilled, (state, action) => {
            state.books.push(action.payload);
        });
    }
});

export default bookSlice.reducer;