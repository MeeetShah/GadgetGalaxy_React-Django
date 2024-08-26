import { createSlice, nanoid } from '@reduxjs/toolkit';
// import { storeProducts } from '../actions/productsActions';

const initialState = {
    products: {},
    login:{},
    specificproducts:{}
}



export const todoSlice = createSlice({
    name: 'Storeproducts',
    initialState,
    reducers: {
        storeProducts: (state, action) => {
            state.products = action.payload
        },

        login:(state,action)=>{
            state.login = action.payload
        },

        specificproduct:(state,action)=>{
            state.specificproducts= action.payload
        }



    }
})

export const { storeProducts,specificproduct } = todoSlice.actions

export default todoSlice.reducer