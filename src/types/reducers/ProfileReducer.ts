import OrderInfo from "../misc/OrderInfo";

type ProfileState = {
  orders: OrderInfo[];
  isOrdersLoading: boolean;
};

enum ProfileReducerActionTypes {
  SET_BADGE = "SET_BADGE",
  SET_IS_ORDERS_LOADING = "SET_IS_ORDERS_LOADING",
  SET_ORDERS = "SET_ORDERS",
}

type SetOrdersAction = {
  type: ProfileReducerActionTypes.SET_ORDERS;
  payload: OrderInfo[];
};

type SetIsOrdersLoadingAction = {
  type: ProfileReducerActionTypes.SET_IS_ORDERS_LOADING;
  payload: boolean;
};

type ProfileReducerActions = SetIsOrdersLoadingAction | SetOrdersAction;

export type { ProfileState, ProfileReducerActions };

export { ProfileReducerActionTypes };
