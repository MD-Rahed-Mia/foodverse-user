import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_path_url, authToken } from "../../secret";


const initialState = {
    value: null,
    isError: false,
    loading: false
}


export const fetchBestDeals = createAsyncThunk("fetch/bestDeals", async () => {
    try {

        const { data } = await axios.get(`${api_path_url}/menu/best-deals`, {
            headers: {
                "x-auth-token": authToken
            }
        });
        return data.items
    } catch (error) {
        console.log(error.message)
        return error;

    }
})


const bestDealSlice = createSlice({
    name: "bestDeals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBestDeals.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchBestDeals.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        })
    }
})


export const bestDealSliceReducer = bestDealSlice.reducer