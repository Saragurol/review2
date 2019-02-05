import { createStore, bindActionCreators } from 'redux'

//action types
const INCREMENT_TIMES = "INCREMENT_TIMES"

//Action creators
export const incrementTimes = (amount = 1) => ({
    type: INCREMENT_TIMES,
    amount: amount
})

//INITIAL STATE for REDUCER

const initialState={
    times: 0
}

//REDUCER
const reducer = (state = initialState, action ) =>{
    //state above is previousState
    // reduce takes a previoud state and updates it when an action occurs
    switch(action.type) {
        case "INCREMENT_TIMES" : {
            return {
            // ...state, (spread out the state and change only what u need to)
            times: state.times + action.amount 
            }
        }
        default : {
            return state 
        }
    }
}

//STORE
const store = createStore(reducer)

export default store