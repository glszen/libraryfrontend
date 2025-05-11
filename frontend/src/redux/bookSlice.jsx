import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' //Book işlemleri için slice oluşturma işlemi yapıyoruz.
// Redux Toolkit kullanarak slice oluşturma işlemi yapıyoruz.
import axios from 'axios'; //Http isteklerini buradan Axios ile yapacağız.

const mystate = { 
    books : [],
    loading: false
}

export const getAllBooks = createAsyncThunk('books', async() => { //Kitap okuma işlemi yapıyoruz.
   const response = await axios.get("http://localhost:8080/api/v1/books");
   console.log(response.data); //Dönen veriyi konsola yazdırıyoruz.
   return response.data; //Dönen veriyi döndürüyoruz.
})

export const updateBook = createAsyncThunk('updateBook', async({id, updatedBook}) => { //Kitap güncelleme işlemi yapıyoruz.
    const response = await axios.put(`http://localhost:8080/api/v1/books/${id}`, updatedBook);
    console.log(response.data);
    return response.data; //Dönen veriyi döndürüyoruz.
})

export const deleteBook = createAsyncThunk('deleteBook', async(id) => {
    await axios.delete(`http://localhost:8080/api/v1/books/${id}`); //Kitap silme işlemi yapıyoruz.
    return id; //Silinen kitabın id'sini döndürüyoruz.
})

export const addBook = createAsyncThunk('addBook', async(newBook) => {
    const response = await axios.post(`http://localhost:8080/api/v1/books`, newBook); //Kitap ekleme işlemi yapıyoruz.
    return response.data;
})

export const bookSlice = createSlice({
    name: 'book',
    initialState: mystate,
    reducers:{
        //Http isteği olmazsa bu reducer'ı kullanacağız.
    },
    extraReducers: (builder) => {
        //Http istekleri için extraReducers kullanıyoruz.
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            state.books = action.payload; //Dönen veriyi state'e atıyoruz.
    })
    builder.addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id); //Güncellenen kitabın index'ini buluyoruz.
        if (index !== -1){
            state.books[index] = action.payload; //Güncellenen kitabı state'e atıyoruz.
        }
    })
    builder.addCase(deleteBook.fulfilled, (state,action)=> {
        state.books = state.books.filter((book) => book.id !== action.payload);
    })
    builder.addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload); //Yeni kitabı state'e ekliyoruz.
    })
}
})

export const { } = bookSlice.actions  
export default bookSlice.reducer //Reducer'ı dışarı aktarıyoruz.