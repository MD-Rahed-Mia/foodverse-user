import { configureStore } from "@reduxjs/toolkit";
import { popularItemReducer } from "../features/slices/popularSlices";
import { bestDealSliceReducer } from "../features/slices/bestDealSlices";
import { categoryItemReducer } from "../features/slices/CategorySlices";


export const store = configureStore({
    reducer: {
        popularItem: popularItemReducer,
        bestDeal: bestDealSliceReducer,
        category: categoryItemReducer
    }
})