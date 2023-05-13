import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import OrderInfo from "@/types/misc/OrderInfo";
import {
  Badge,
  ProfileReducerActionTypes,
  ProfileState,
} from "@/types/reducers/ProfileReducer";
import { ProfileContextValue } from "@/types/context";
import { profileReducer } from "@/reducers";

const hiddenBadge: Badge = {
  type: "",
  msg: "",
};

const initialProfileState: ProfileState = {
  orders: [],
  isOrdersLoading: false,
  badge: hiddenBadge,
};

type ProfileContextProviderProps = {
  children: React.ReactNode;
};

const initialContextState: ProfileContextValue = {
  ...initialProfileState,
  setOrders: (orders: OrderInfo[]) => {},
  setBadge: (badge: Badge) => {},
  setIsOrdersLoading: (isLoading: boolean) => {},
};

const ProfileContext = createContext(initialContextState);

const ProfileContextProvider: FC<ProfileContextProviderProps> = ({
  children,
}) => {
  const [profile, dispatch] = useReducer(profileReducer, initialProfileState);

  const setIsOrdersLoading = (isLoading: boolean) => {
    dispatch({
      type: ProfileReducerActionTypes.SET_IS_ORDERS_LOADING,
      payload: isLoading,
    });
  };

  const setBadge = (badge: Badge) => {
    dispatch({ type: ProfileReducerActionTypes.SET_BADGE, payload: badge });
  };

  // setOrders is used as a dependency in useEffect hook in ProfilePage component.
  // to prevent Maximum update depth exceeded error useCallback is used
  const setOrders = useCallback((orders: OrderInfo[]) => {
    dispatch({ type: ProfileReducerActionTypes.SET_ORDERS, payload: orders });
  }, []);

  // hide badge after showing for 5 secs
  useEffect(() => {
    if (profile.badge.msg === "") return;
    const timer = setTimeout(() => {
      setBadge(hiddenBadge);
    }, 5000);
    return () => clearTimeout(timer);
  }, [profile.badge]);

  return (
    <ProfileContext.Provider
      value={{ ...profile, setIsOrdersLoading, setBadge, setOrders }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
