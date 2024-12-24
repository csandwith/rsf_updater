import { createSlice } from '@reduxjs/toolkit'

const settings = {};
const settingsFile = "settings.json";

let readingFromFile = false;

export function loadFromFile() {
  console.log("Would load settings");
  readingFromFile = true;
  electron.fileApi.readTextFromFile(settingsFile).then((result) => {
    console.log("Read from file: " + result);
    const settingsFromDisk = JSON.parse(result);
    if ('lang' in settingsFromDisk) {
      dispatch(setLang(settingsFromDisk.lang));
    }
    readingFromFile = false; 
  }).catch((err) => {
    //Going to blindly assume that the file doesn't exist.
    readingFromFile = false; 
  });
}

function saveToFile() {
  let settingsStr = JSON.stringify(settings);
  console.log("Would save " + settingsStr + " to file");
  electron.fileApi.writeTextToFile(settingsStr, settingsFile); 
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
      value: {
        lang: "en"
      },
    },
    reducers: {
        setLang: (state, action) => {
            state.value.lang = action.payload;
            settings.lang = action.payload;
            if(!readingFromFile) {
              saveToFile();
            }
        },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setLang } = settingsSlice.actions
  
  export default settingsSlice.reducer