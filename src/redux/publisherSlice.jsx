import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; //Publisher işlemleri için slice oluşturma işlemi yapıyoruz.
// Redux Toolkit kullanarak slice oluşturma işlemi yapıyoruz.
import axios from 'axios'; //Http isteklerini buradan Axios ile yapacağız.

const mystate = { 
    publishers: [],
    loading: false
};

export const getAllPublishers = createAsyncThunk('publishers', async () => { //Yayınevi okuma işlemi yapıyoruz.
   const response = await axios.get("http://localhost:8080/api/v1/publishers");
   console.log(response.data); //Dönen veriyi konsola yazdırıyoruz.
   return response.data; //Dönen veriyi döndürüyoruz.
});

export const updatePublisher = createAsyncThunk('updatePublisher', async ({ id, updatedPublisher }) => { //Yayınevi güncelleme işlemi yapıyoruz.
    const response = await axios.put(`http://localhost:8080/api/v1/publishers/${id}`, updatedPublisher);
    console.log(response.data);
    return response.data; //Dönen veriyi döndürüyoruz.
});

export const deletePublisher = createAsyncThunk('deletePublisher', async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/publishers/${id}`); //Yayınevi silme işlemi yapıyoruz.
    return id; //Silinen yayınevinin id'sini döndürüyoruz.
});

export const addPublisher = createAsyncThunk('addPublisher', async (newPublisher) => {
    const response = await axios.post(`http://localhost:8080/api/v1/publishers`, newPublisher); //Yayınevi ekleme işlemi yapıyoruz.
    return response.data;
});

export const publisherSlice = createSlice({
    name: 'publisher',
    initialState: mystate,
    reducers: {
        //Http isteği olmazsa bu reducer'ı kullanacağız.
    },
    extraReducers: (builder) => {
        //Http istekleri için extraReducers kullanıyoruz.
        builder.addCase(getAllPublishers.fulfilled, (state, action) => {
            state.publishers = action.payload; //Dönen veriyi state'e atıyoruz.
        });
        builder.addCase(updatePublisher.fulfilled, (state, action) => {
            const index = state.publishers.findIndex((publisher) => publisher.id === action.payload.id); //Güncellenen yayınevinin index'ini buluyoruz.
            if (index !== -1) {
                state.publishers[index] = action.payload; //Güncellenen yayınevini state'e atıyoruz.
            }
        });
        builder.addCase(deletePublisher.fulfilled, (state, action) => {
            state.publishers = state.publishers.filter((publisher) => publisher.id !== action.payload);
        });
        builder.addCase(addPublisher.fulfilled, (state, action) => {
            state.publishers.push(action.payload); //Yeni yayınevini state'e ekliyoruz.
        });
    }
});

export const { } = publisherSlice.actions;  
export default publisherSlice.reducer; //Reducer'ı dışarı aktarıyoruz.