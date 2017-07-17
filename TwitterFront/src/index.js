import React from 'react'
import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

import { authReducer } from './reducers/AuthReducer';
import LoginSuccess from "./components/LoginSuccess";
import SignUpSuccess from "./components/SignUpSuccess";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        authReducer: authReducer,

    }), composeEnhancers(applyMiddleware(thunk))
);

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )
const requireAuth = (nextState, replace) => {
    const state = store.getState();
    if (!state.authReducer.loginFlg) {
        replace({ pathname: '/login' })
    }
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/signUpSuccess" component={SignUpSuccess}/>
            <Route path="/loginSuccess" component={LoginSuccess} onEnter={requireAuth} />
        </Router>
    </Provider>,
    document.getElementById('root')
)
