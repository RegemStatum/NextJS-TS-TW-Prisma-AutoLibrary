import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import OrderInfo from "@/types/misc/OrderInfo";
import {
  ProfileReducerActionTypes,
  ProfileState,
} from "@/types/reducers/ProfileReducer";
import ProfileContextValue from "@/types/context/ProfileContextValue";
import profileReducer from "@/reducers/profileReducer";

const initialProfileState: ProfileState = {
  orders: [],
  isOrdersLoading: false,
};

type ProfileContextProviderProps = {
  children: React.ReactNode;
};

const initialContextState: ProfileContextValue = {
  ...initialProfileState,
  setOrders: (orders: OrderInfo[]) => {},
  setIsOrdersLoading: (isLoading: boolean) => {},
};

const ProfileContext = createContext(initialContextState);

const ProfileContextProvider: FC<ProfileContextProviderProps> = ({
  children,
}) => {
  const [profile, dispatch] = useReducer(profileReducer, initialProfileState);

  // ORDERS CONTROL
  const setIsOrdersLoading = (isLoading: boolean) => {
    dispatch({
      type: ProfileReducerActionTypes.SET_IS_ORDERS_LOADING,
      payload: isLoading,
    });
  };

  // setOrders is used as a dependency in useEffect hook in ProfilePage component.
  // to prevent Maximum update depth exceeded error useCallback is used
  const setOrders = useCallback((orders: OrderInfo[]) => {
    dispatch({ type: ProfileReducerActionTypes.SET_ORDERS, payload: orders });
  }, []);

  return (
    <ProfileContext.Provider
      value={{ ...profile, setIsOrdersLoading, setOrders }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
