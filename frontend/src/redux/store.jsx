import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './bookSlice'
import authorReducer from './authorSlice' // Yazar işlemleri için authorSlice'ı import ettik.
import categoryReducer from './categorySlice' // Kategori işlemleri için categorySlice'ı import ettik.
import publisherReducer from './publisherSlice' // Yayıncı işlemleri için publisherSlice'ı import ettik.
import bookBorrowingSlice from './borrowingSlice' // Kitap ödünç alma işlemleri için bookBorrowingSlice'ı import ettik.

export const store = configureStore({
  reducer: {
    book: bookReducer, // bookSlice.js dosyasındaki reducer'ı kullanıyoruz.
    author: authorReducer, // authorSlice.js dosyasındaki reducer'ı kullanıyoruz.
    category: categoryReducer, // categorySlice.js dosyasındaki reducer'ı kullanıyoruz.
    publisher: publisherReducer, // publisherSlice.js dosyasındaki reducer'ı kullanıyoruz.
    bookBorrowing: bookBorrowingSlice, // bookBorrowingSlice.js dosyasındaki reducer'ı kullanıyoruz.
  },
})