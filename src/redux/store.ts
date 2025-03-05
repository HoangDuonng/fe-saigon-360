import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice'; 
import configReducer  from './slices/configSlice'; 

const store = configureStore({
    reducer: {
        user: userReducer,
        config: configReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

// // Cấu hình redux-persist
// const persistConfig = {
//     key: 'user',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

// const store = configureStore({
//     reducer: {
//         user: persistedReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });

// export const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

// export default store;
