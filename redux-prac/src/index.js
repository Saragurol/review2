import React from 'react'
import ReactDom from 'react-dom'

import App from './components/App'

//REACT-REDUX STUFF

import { provider } from 'react-redux'
import {store} from './store'

ReactDom.render(
    <Provider store= { store }>
        <App />
    </Provider>,
     document.querySelector('app')
)

//provider will provide the store to anybody that wants it
