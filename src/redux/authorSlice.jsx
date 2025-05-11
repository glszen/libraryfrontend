import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' //Book işlemleri için slice oluşturma işlemi yapıyoruz.
// Redux Toolkit kullanarak slice oluşturma işlemi yapıyoruz.
import axios from 'axios'; //Http isteklerini buradan Axios ile yapacağız.

const mystate = { 
    authors : [],
    loading: false
}

export const getAllAuthors = createAsyncThunk('authors', async() => { //Yazar okuma işlemi yapıyoruz.
   const response = await axios.get("http://localhost:8080/api/v1/authors");
   console.log(response.data); //Dönen veriyi konsola yazdırıyoruz.
   return response.data; //Dönen veriyi döndürüyoruz.
})

export const updateAuthor = createAsyncThunk('updateAuthor', async({id, updatedAuthor}) => { //Yazar güncelleme işlemi yapıyoruz.
    const response = await axios.put(`http://localhost:8080/api/v1/authors/${id}`, updatedAuthor);
    console.log(response.data);
    return response.data; //Dönen veriyi döndürüyoruz.
})

export const deleteAuthor = createAsyncThunk('deleteAuthor', async(id) => {
    await axios.delete(`http://localhost:8080/api/v1/authors/${id}`); //Yazar silme işlemi yapıyoruz.
    return id; //Silinen kitabın id'sini döndürüyoruz.
})

export const addAuthor = createAsyncThunk('addAuthor', async(newAuthor) => {
    const response = await axios.post(`http://localhost:8080/api/v1/authors`, newAuthor); //Yazar ekleme işlemi yapıyoruz.
    return response.data;
})

export const authorSlice = createSlice({
    name: 'author',
    initialState: mystate,
    reducers:{
        //Http isteği olmazsa bu reducer'ı kullanacağız.
    },
    extraReducers: (builder) => {
        //Http istekleri için extraReducers kullanıyoruz.
        builder.addCase(getAllAuthors.fulfilled, (state, action) => {
            state.authors = action.payload; //Dönen veriyi state'e atıyoruz.
    })
    builder.addCase(updateAuthor.fulfilled, (state, action) => {
        const index = state.authors.findIndex((author) => author.id === action.payload.id); //Güncellenen kitabın index'ini buluyoruz.
        if (index !== -1){
            state.authors[index] = action.payload; //Güncellenen kitabı state'e atıyoruz.
        }
    })
    builder.addCase(deleteAuthor.fulfilled, (state,action)=> {
        state.authors = state.authors.filter((author) => author.id !== action.payload);
    })
    builder.addCase(addAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload); //Yeni kitabı state'e ekliyoruz.
    })
}
})

export const { } = authorSlice.actions  
export default authorSlice.reducer //Reducer'ı dışarı aktarıyoruz.