

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_path_url, authToken } from "../../secret";
import axios from "axios";


const initialState = {
    value: null,
    loading: false,
    isError: false
}

// action for fetch
export const fetchCategory = createAsyncThunk("fetch/categoryItem", async () => {
    try {
        const { data } = await axios.get(`${api_path_url}/category/all`, {
            headers: {
                "x-auth-token": authToken,
            },
        });



        return data.result

    } catch (error) {
        if (error.name === "CanceledError") {
            console.warn("Request canceled:", error.message);
        } else {
            console.error("Error fetching categories:", error);
        }
    }
});



const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategory.fulfilled, (state, action) => {

         //   console.log('category : ', action.payload)
            state.loading = false
            state.value = action.payload
        });
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.loading = false
            state.isError = true
        })
    }
})

export const categoryItemReducer = categorySlice.reducer