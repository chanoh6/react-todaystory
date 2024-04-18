import { createContext, useContext } from 'react';
import APIService2 from 'api/APIService2';

const api = new APIService2();

export const APIContext = createContext();

export const useAPI2 = () => useContext(APIContext);

export const APIProvider2 = ({ children }) => <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;

export default APIProvider2;
