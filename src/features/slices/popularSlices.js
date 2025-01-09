import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_path_url, authToken } from "../../secret";

const initialState = {
    value: null,
    loading: false,
    isError: false
}
 
// action for fetch
export const fetchPopularItem = createAsyncThunk("fetch/popularItem", async () => {
    try {
      //  console.log("Fetching popular items...");
        const { data } = await axios.get(`${api_path_url}/menu/popular-items`, {
            headers: {
                "x-auth-token": authToken
            }
        });

      //  console.log("Fetched data: ", data);

        return data.menuItems;
    } catch (error) {
        console.log("Error fetching popular items: ", error.message);
        throw new Error(error.message); 
    }
});


const popularItemSlice = createSlice({
    name: "popularItem",
    initialState,
    reducers: {
        getPopularItem: (state, action) => {
            // This reducer isn't used in your current code but can be useful in some cases
            return state.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopularItem.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchPopularItem.fulfilled, (state, action) => {
                console.log("Popular items fetched and stored in state: ", action.payload);
                state.value = action.payload;
                state.loading = false;  
            })
            .addCase(fetchPopularItem.rejected, (state, action) => {
                console.log("Failed to fetch popular items: ", action.error.message);
                state.loading = false;
                state.isError = true;
            });
    }
});

export const { getPopularItem } = popularItemSlice.reducer

export const popularItemReducer = popularItemSlice.reducer