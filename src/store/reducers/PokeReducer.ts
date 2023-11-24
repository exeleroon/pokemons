import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSortedPoke} from "./ActionCreators";
import {ISorted} from "../../models/IPoke";

interface IPokeState {
    lastPage: number;
    isLoading: boolean;
    error: string;
    sortedItems: ISorted;
    sortedTypeId: {
        id: string;
        value: string;
    };
}

const initialState: IPokeState = {
    lastPage: null,
    isLoading: false,
    error: null,
    sortedItems: null,
    sortedTypeId: {
        id: null,
        value: null
    }
}


export const pokeSlice = createSlice({
    name: 'poke_slice',
    initialState,
    reducers: {
        setClickedPage(state, action) {
            state.lastPage = action.payload;
        },
        setSortId(state, action) {
            state.sortedTypeId = action.payload;
        }
    },
    extraReducers: {
        [getSortedPoke.fulfilled.type]: (state, action: PayloadAction<ISorted>) => {
            state.isLoading = false
            state.error = '';
            state.sortedItems = action.payload;
        },
        [getSortedPoke.pending.type]: (state, action: PayloadAction<ISorted>) => {
            state.isLoading = false;
            state.error = '';
            state.sortedItems = action.payload;
        },
        [getSortedPoke.rejected.type]: (state) => {
            state.isLoading = false;
            state.error = 'Something went wrong';
            state.sortedItems = null;
        }
    }
})

export default pokeSlice.reducer;