import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {}
});

const { reducer: professionsReducer } = professionsSlice;

export default professionsReducer;
