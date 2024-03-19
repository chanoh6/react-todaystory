import { createContext, useContext } from 'react';
import APIClient from 'api/APIClient';
import APIService from 'api/APIService';

const client = new APIClient();
const api = new APIService(client);

export const APIContext = createContext();

export function APIProvider({ children }) {
  return <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;
}

export function useAPI() {
  return useContext(APIContext);
}

export default APIProvider;
