import { paletasTypes } from "../types/userTypes";

const initialState = {
  paletas: [],
};

export const paletasReducer = (state = initialState, action) => {
  switch (action.type) {
    case paletasTypes.PALETAS_GET:
      return {
        ...state,
        paletas: action.payload.paletas,
      };
    default:
      return state;
  }
};
