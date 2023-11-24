import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getSortedPoke = createAsyncThunk(
    'users/fetchAll',
    async (_, thunkAPI) => {
        try {
            const state: any = thunkAPI.getState();
            const res = await axios.get<[]>(`https://pokeapi.co/api/v2/type/${state.pokeReducer.sortedTypeId.id}`)
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Failed request');
        }
    }
)