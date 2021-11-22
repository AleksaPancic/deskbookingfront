import React, {createContext, useContext} from "react";

const UserCotext = createContext({
    user: {},
    setUser: () => {}
});

export function useUserContext(){
    return useContext(UserCotext);
}

const UserProvider = (props) => {

    return(
        <UserCotext.Provider value={props.value}> 
            {props.children}
        </UserCotext.Provider>
    );
}

export default UserProvider;