import OrderInfo from "../misc/OrderInfo";

type Badge = {
  type: "success" | "error" | "info" | "pending" | "";
  msg: string;
};

type ProfileState = {
  orders: OrderInfo[];
  isOrdersLoading: boolean;
  badge: Badge;
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

type SetBadgeAction = {
  type: ProfileReducerActionTypes.SET_BADGE;
  payload: Badge;
};

type SetIsOrdersLoadingAction = {
  type: ProfileReducerActionTypes.SET_IS_ORDERS_LOADING;
  payload: boolean;
};

type ProfileReducerActions =
  | SetBadgeAction
  | SetIsOrdersLoadingAction
  | SetOrdersAction;

export type { Badge, ProfileState, ProfileReducerActions };

export { ProfileReducerActionTypes };
