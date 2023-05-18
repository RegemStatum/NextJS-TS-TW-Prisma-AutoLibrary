import {
  ProfileReducerActionTypes,
  ProfileReducerActions,
  ProfileState,
} from "@/types/reducers/ProfileReducer";

const profileReducer = (
  state: ProfileState,
  action: ProfileReducerActions
): ProfileState => {
  switch (action.type) {
    case ProfileReducerActionTypes.SET_IS_ORDERS_LOADING: {
      const newIsLoading = action.payload;
      const newState = { ...state, isOrdersLoading: newIsLoading };
      return newState;
    }
    case ProfileReducerActionTypes.SET_ORDERS: {
      const newOrders = action.payload;
      const newState = { ...state, orders: newOrders };
      return newState;
    }
    default: {
      return { ...state };
    }
  }
};

export default profileReducer;
