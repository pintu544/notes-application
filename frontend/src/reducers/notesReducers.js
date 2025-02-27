import {
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTE_CREATE_SOCKET,
  NOTE_UPDATE_SOCKET,
  NOTE_DELETE_SOCKET,
} from "../constants/notesConstants";

export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { loading: true };
    case NOTES_LIST_SUCCESS:
      return { loading: false, notes: action.payload };
    case NOTES_LIST_FAIL:
      return { loading: false, error: action.payload };
    case NOTE_CREATE_SOCKET:
      return {
        ...state,
        notes: Array.isArray(state.notes)
          ? [...state.notes, action.payload]
          : [action.payload],
      };
    case NOTE_UPDATE_SOCKET:
      return {
        ...state,
        notes: Array.isArray(state.notes)
          ? state.notes.map((note) =>
              note._id === action.payload._id ? action.payload : note
            )
          : [],
      };
    case NOTE_DELETE_SOCKET:
      return {
        ...state,
        notes: Array.isArray(state.notes)
          ? state.notes.filter((note) => note._id !== action.payload)
          : [],
      };
    default:
      return state;
  }
};

export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { loading: true };
    case NOTES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return { loading: true };
    case NOTES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return { loading: true };
    case NOTES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
