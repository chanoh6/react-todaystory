import { createContext, useContext } from 'react';
import APIClient from 'api/APIClient';
import APIService from 'api/APIService';
import APIService2 from 'api/APIService2';

const client = new APIClient();
const api = new APIService(client);
// const api = new APIService2();

export const APIContext = createContext();

export const useAPI = () => useContext(APIContext);

export const APIProvider = ({ children }) => <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;

export default APIProvider;
