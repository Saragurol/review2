import React, { Component } from 'react'
import store, {incrementTimes} from '../store'

import { connect } from 'react-reduc'

//conect is a function that can take 2 functions and then returns a component 


const App =(props) => ( 
    <div>
        return <h1>Hello World!</h1>
        <button onClick = {this.props.incrementTimesFromComponent}>Click me!</button>
        <button onClick = {this.decrementTimes}>DONT click me!</button>
        <p>"You've clicked the button {this.props.times} times</p>
    </div>

}    
    funcIncrementTimes(){
       store.dispatch(incrementTimes())
    }

    funcDecrementTimes(){
        store.dispatch(incrementTimes(-1))
    }


const constructPropsForComponentFromState = (state) =>({
    times: state.times
})
//return state from our store into props into our component

const utilizeDispatchFromWithinProps = (dispatch) =>({
    incrementTimesFromComponent: () => dispatch(incrementTimes())
})
//disptach is just store.dispatch

const connectWithMyOptions = connect(
    constructPropsForComponentFromState, 
    utilizeDispatchFromWithinProps
)
const connectedApp = connectWithMyOptions(App)

export default connectedApp 

//must provide store to anyne hwo wants it
//only hthose who wants it connect to the srtore
//connect takes 2 funcs. fun1 = store provided props. func2= dispatch 