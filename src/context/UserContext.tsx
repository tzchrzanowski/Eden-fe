import React, { createContext, useReducer, useContext } from 'react';
import {User} from 'object-types/user-interfaces';
import {validateTokenRequest} from "data/postRequests";
import {clearPhotoUrl} from "../helpers/Helpers";

interface UserState {
    user: User | null;
}

type Action =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_PHOTO'; payload: User};

const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Define a reducer function
const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            };
        case 'LOGOUT':
            return {
                user: null
            };
        case 'UPDATE_PHOTO':
            return {
                user: action.payload
            };
        default:
            return state;
    }
};

// UserProvider component
// @ts-ignore
export function UserProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(userReducer, { user: null });

    React.useEffect(()=> {
        validateTokenOnServer();
    }, []);

    const validateTokenOnServer = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const resp = await validateTokenRequest(token);
                if (resp) {
                    if (resp.status == 200) {
                        if(resp.role_id) {
                            const clearPhoto = clearPhotoUrl(resp.user_photo);

                            dispatch({
                                type: 'LOGIN',
                                payload: {
                                    role_id: resp.role_id,
                                    username: resp.username,
                                    user_photo: clearPhoto,
                                    user_id: resp.user_id,
                                }
                            });
                            return resp;
                        }
                    } else {
                        console.info("User not validated");
                    }
                }
            } catch (error) {
                console.log("Authentication error:", error);
            }
        }
    }

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};




// Custom hooks to access the context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

/*
* Sample usage in a component:

  import { useUser } from './userContext';
  ...
  const { state, dispatch } = useUser();
* */


export default UserContext;
