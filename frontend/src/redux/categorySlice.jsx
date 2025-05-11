import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; //Category işlemleri için slice oluşturma işlemi yapıyoruz.
// Redux Toolkit kullanarak slice oluşturma işlemi yapıyoruz.
import axios from 'axios'; //Http isteklerini buradan Axios ile yapacağız.

const mystate = { 
    categories: [],
    loading: false
};

export const getAllCategories = createAsyncThunk('categories', async () => { //Kategori okuma işlemi yapıyoruz.
   const response = await axios.get("http://localhost:8080/api/v1/categories");
   console.log(response.data); //Dönen veriyi konsola yazdırıyoruz.
   return response.data; //Dönen veriyi döndürüyoruz.
});

export const updateCategory = createAsyncThunk('updateCategory', async ({ id, updatedCategory }) => { //Kategori güncelleme işlemi yapıyoruz.
    const response = await axios.put(`http://localhost:8080/api/v1/categories/${id}`, updatedCategory);
    console.log(response.data);
    return response.data; //Dönen veriyi döndürüyoruz.
});

export const deleteCategory = createAsyncThunk('deleteCategory', async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/categories/${id}`); //Kategori silme işlemi yapıyoruz.
    return id; //Silinen kategorinin id'sini döndürüyoruz.
});

export const addCategory = createAsyncThunk('addCategory', async (newCategory) => {
    const response = await axios.post(`http://localhost:8080/api/v1/categories`, newCategory); //Kategori ekleme işlemi yapıyoruz.
    return response.data;
});

export const categorySlice = createSlice({
    name: 'category',
    initialState: mystate,
    reducers: {
        //Http isteği olmazsa bu reducer'ı kullanacağız.
    },
    extraReducers: (builder) => {
        //Http istekleri için extraReducers kullanıyoruz.
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categories = action.payload; //Dönen veriyi state'e atıyoruz.
        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex((category) => category.id === action.payload.id); //Güncellenen kategorinin index'ini buluyoruz.
            if (index !== -1) {
                state.categories[index] = action.payload; //Güncellenen kategoriyi state'e atıyoruz.
            }
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category) => category.id !== action.payload);
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload); //Yeni kategoriyi state'e ekliyoruz.
        });
    }
});

export const { } = categorySlice.actions;  
export default categorySlice.reducer; //Reducer'ı dışarı aktarıyoruz.