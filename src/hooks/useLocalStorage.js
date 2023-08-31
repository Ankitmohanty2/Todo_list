import { useState, useEffect } from "react";

const useLocalStorage = (key, initValue) => {

    // getting the stored values from the localStorage
    const [value, setValue] = useState(() => {
        try {
            const localValue = window.localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : initValue;
        } catch (error) {
            console.log(error);
            return initValue;
        }
    });

    // storing the values in the localStorage
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);


    return [value, setValue];
};

export default useLocalStorage;