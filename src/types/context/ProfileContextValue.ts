import OrderInfo from "../misc/OrderInfo";
import { Badge, ProfileState } from "../reducers/ProfileReducer";

interface ProfileContextValue extends ProfileState {
  setOrders: (orders: OrderInfo[]) => void;
  setBadge: (badge: Badge) => void;
  setIsOrdersLoading: (isLoading: boolean) => void;
}

export default ProfileContextValue;
