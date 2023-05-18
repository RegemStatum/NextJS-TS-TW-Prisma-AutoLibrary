import OrderInfo from "../misc/OrderInfo";
import { ProfileState } from "../reducers/ProfileReducer";

interface ProfileContextValue extends ProfileState {
  setOrders: (orders: OrderInfo[]) => void;
  setIsOrdersLoading: (isLoading: boolean) => void;
}

export default ProfileContextValue;
