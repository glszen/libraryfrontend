import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend URL'sini merkezi bir değişken olarak tanımlıyoruz
const BASE_URL = 'https://retired-vanda-glszen-ba299dbf.koyeb.app/api/v1';

const initialState = {
  bookBorrowings: [],
  loading: false,
};

// Tüm ödünç alma işlemlerini getirme
export const getAllBookBorrowings = createAsyncThunk('bookBorrowings/getAll', async () => {
  const response = await axios.get(`${BASE_URL}/borrows`);
  return response.data;
});

// Yeni ödünç alma işlemi ekleme
export const addBookBorrowing = createAsyncThunk('bookBorrowings/add', async (newBookBorrowing) => {
  const response = await axios.post(`${BASE_URL}/borrows`, newBookBorrowing);
  return response.data;
});

// Ödünç alma işlemini güncelleme
export const updateBookBorrowing = createAsyncThunk(
  'bookBorrowings/update',
  async ({ id, updatedBookBorrowing }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/borrows/${id}`, updatedBookBorrowing);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Ödünç alma işlemini silme
export const deleteBookBorrowing = createAsyncThunk('bookBorrowings/delete', async (id) => {
  await axios.delete(`${BASE_URL}/borrows/${id}`);
  return id;
});

// Redux slice tanımı
export const bookBorrowingSlice = createSlice({
  name: 'bookBorrowing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookBorrowings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBookBorrowings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookBorrowings = action.payload;
      })
      .addCase(getAllBookBorrowings.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching book borrowings:", action.error.message);
      })
      .addCase(addBookBorrowing.fulfilled, (state, action) => {
        state.bookBorrowings.push(action.payload);
      })
      .addCase(updateBookBorrowing.fulfilled, (state, action) => {
        const index = state.bookBorrowings.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bookBorrowings[index] = action.payload;
        }
      })
      .addCase(deleteBookBorrowing.fulfilled, (state, action) => {
        state.bookBorrowings = state.bookBorrowings.filter((borrowing) => borrowing.id !== action.payload);
      });
  }
});

export default bookBorrowingSlice.reducer;