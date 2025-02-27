import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { themeReducer } from "./reducers/themeReducers";
import { setStoreRef, connectSocket } from "./services/socket";

const reducer = combineReducers({
  noteList: noteListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
  theme: themeReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

setStoreRef(store);
if (userInfoFromStorage) {
  console.log("Socket connected store.js", userInfoFromStorage);
  connectSocket(userInfoFromStorage._id);
}

export default store;
