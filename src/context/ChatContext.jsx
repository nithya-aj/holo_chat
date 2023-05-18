import {
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                if (!action.payload || !action.payload.uid) {
                    return state;
                }
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    // Update chatId on user login
    useEffect(() => {
        if (currentUser && state.chatId === null) {
            dispatch({ type: "CHANGE_USER", payload: currentUser });
        }
    }, [currentUser, state.chatId]);


    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
