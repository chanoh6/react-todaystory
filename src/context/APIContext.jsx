import { createContext, useContext } from 'react';
import APIClient from 'api/APIClient';
import APIService from 'api/APIService';
import APIService2 from 'api/APIService2';

const client = new APIClient();
const api = new APIService(client);
// const api = new APIService2();

export const APIContext = createContext();

export function APIProvider({ children }) {
  return <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;
}

export function useAPI() {
  return useContext(APIContext);
}

export default APIProvider;
