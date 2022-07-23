import { combineReducers, createStore } from "redux";
import userReducers from "./reducers/userReducers";

const reducers = combineReducers({ user: userReducers });
const store = createStore(reducers);
console.log(store.getState());

export default store;
