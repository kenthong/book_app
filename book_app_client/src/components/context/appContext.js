import { createContext, useContext } from "react";
import { useState } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('AppContext must be be within AppContextProvider');
    }

    return context;
}

const AppContextProvider = ({children}) => {
    const [reserved, setReserved] = useState([]);

    const addReserved = (book) => {
        const oldReserved = [...reserved];
        const newReserved = oldReserved.concat(book);
        setReserved(newReserved);
    }

    const removeReserved = (id) => {
        const oldReserved = [...reserved];
        const newReserved = oldReserved.filter((book) => book.id !== id);
        setReserved(newReserved);
    }

    return (
        <AppContext.Provider value={{ reserved, addReserved, removeReserved }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
