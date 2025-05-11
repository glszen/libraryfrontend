import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend URL'sini merkezi bir değişken olarak tanımlıyoruz
const BASE_URL = 'https://retired-vanda-glszen-ba299dbf.koyeb.app/api';

const initialState = { 
    publishers: [],
    loading: false
};

// Tüm yayınevlerini getirme işlemi
export const getAllPublishers = createAsyncThunk('publishers/getAll', async () => {
    const response = await axios.get(`${BASE_URL}/publishers`);
    return response.data;
});

// Yayınevi güncelleme işlemi
export const updatePublisher = createAsyncThunk('publishers/update', async ({ id, updatedPublisher }) => {
    const response = await axios.put(`${BASE_URL}/publishers/${id}`, updatedPublisher);
    return response.data;
});

// Yayınevi silme işlemi
export const deletePublisher = createAsyncThunk('publishers/delete', async (id) => {
    await axios.delete(`${BASE_URL}/publishers/${id}`);
    return id;
});

// Yeni yayınevi ekleme işlemi
export const addPublisher = createAsyncThunk('publishers/add', async (newPublisher) => {
    const response = await axios.post(`${BASE_URL}/publishers`, newPublisher);
    return response.data;
});

// Redux slice tanımı
export const publisherSlice = createSlice({
    name: 'publisher',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPublishers.fulfilled, (state, action) => {
            state.publishers = action.payload;
        });
        builder.addCase(updatePublisher.fulfilled, (state, action) => {
            const index = state.publishers.findIndex((publisher) => publisher.id === action.payload.id);
            if (index !== -1) {
                state.publishers[index] = action.payload;
            }
        });
        builder.addCase(deletePublisher.fulfilled, (state, action) => {
            state.publishers = state.publishers.filter((publisher) => publisher.id !== action.payload);
        });
        builder.addCase(addPublisher.fulfilled, (state, action) => {
            state.publishers.push(action.payload);
        });
    }
});

export default publisherSlice.reducer;