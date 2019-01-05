import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import user from './user/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    form: formReducer,
    user
});

const persistConfig = {
    transforms: [immutableTransform({
        whitelist: ['user']
      })],
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(thunk)
));
const persistor = persistStore(store)


export {
    store,
    persistor
}