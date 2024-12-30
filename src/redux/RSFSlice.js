import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const rsfFile = "fake_rsf.json";

// Define an async thunk to fetch initial data
export const loadRSFData = createAsyncThunk('rsf/loadFromDisk', async () => {
  console.log("Loading RSF Data from disk");
  const response = await electron.fileApi.readTextFromFile(rsfFile);
  console.log(response);
  const settingsFromDisk = JSON.parse(response);
  return settingsFromDisk;
});

// Create your slice
const rsfSlice = createSlice({
  name: 'rsf',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {/* No Reducers - these values are immutable */},
  extraReducers: (builder) => {
    builder
      .addCase(loadRSFData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadRSFData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadRSFData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
//export const { setLang } = settingsSlice.actions

export default rsfSlice.reducer