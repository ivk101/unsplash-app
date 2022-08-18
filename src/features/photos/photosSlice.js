import { createSlice } from '@reduxjs/toolkit';

export const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    data: [],
    pages: [],
  },
  reducers: {    
    addValues: (state, action) => {   
      state.data = [...state.data, ...action.payload]          
    },
    increaseLike: (state, action) => {
      console.log(action.payload)
      let obj = state.data.find(item => item.id === action.payload )
      obj.likes += 1
    },
    decreaseLike: (state, action) => {
      console.log(action.payload)
      let obj = state.data.find(item => item.id === action.payload )
      obj.likes -= 1
    }
  }
})

// Action creators are generated for each case reducer function
export const { addValues, increaseLike, decreaseLike } = photosSlice.actions;

export default photosSlice.reducer;