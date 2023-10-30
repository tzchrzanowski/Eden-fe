import React, { createContext, useReducer, useContext } from 'react';

interface User {
    role_id: string;
    username: string;
    user_photo: string;
    user_id: string;
}

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
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        case 'UPDATE_PHOTO':
            return { user: action.payload };
        default:
            return state;
    }
};

// UserProvider component
// @ts-ignore
export function UserProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(userReducer, { user: null });

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

// Sample usage in a component
// import { useUser } from './userContext';

// Inside a component:
// const { state, dispatch } = useUser();
// ...

export default UserContext;
