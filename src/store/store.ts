import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {pokeAPI} from "../service/PokeService";
import pokeReducer from "./reducers/PokeReducer";

const rootReducer = combineReducers({
    pokeReducer,
    [pokeAPI.reducerPath]: pokeAPI.reducer
})

export const setupStore = () => {
        return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(pokeAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']