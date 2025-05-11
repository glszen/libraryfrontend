import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const mystate = {
  bookBorrowings: [],
  loading: false,
};

export const getAllBookBorrowings = createAsyncThunk('bookBorrowings', async () => {
  const response = await axios.get("http://localhost:8080/api/v1/borrows");
  console.log(response.data);
  return response.data;
});

export const addBookBorrowing = createAsyncThunk('addBookBorrowing', async (newBookBorrowing) => {
  const response = await axios.post("http://localhost:8080/api/v1/borrows", newBookBorrowing);
  return response.data;
});

export const updateBookBorrowing = createAsyncThunk(
  'borrowing/updateBookBorrowing',
  async ({ id, updatedBookBorrowing }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/borrows/${id}`, updatedBookBorrowing);
      return response.data; // Backend'den dönen güncellenmiş veriyi döndürüyoruz
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBookBorrowing = createAsyncThunk('deleteBookBorrowing', async (id) => {
  await axios.delete(`http://localhost:8080/api/v1/borrows/${id}`);
  return id;
});

export const bookBorrowingSlice = createSlice({
  name: 'bookBorrowing',
  initialState: mystate,
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

export const { } = bookBorrowingSlice.actions;
export default bookBorrowingSlice.reducer;