import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const settings = {};
const settingsFile = "settings.json";

// Define an async thunk to fetch initial data
export const loadFromDisk = createAsyncThunk('settings/loadFromDisk', async () => {
  console.log("Loading from disk");
  const response = await electron.fileApi.readTextFromFile(settingsFile);
  console.log(response);
  const settingsFromDisk = JSON.parse(response);
  return settingsFromDisk;
});

function saveToFile() {
  let settingsStr = JSON.stringify(settings);
  console.log("Saving " + settingsStr + " to file");
  electron.fileApi.writeTextToFile(settingsStr, settingsFile); 
}

// Create your slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    setLang: (state, action) => {
      state.data.lang = action.payload;
      settings.lang = action.payload;
      if(!state.loading) {
        saveToFile();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFromDisk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFromDisk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadFromDisk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setLang } = settingsSlice.actions

export default settingsSlice.reducer