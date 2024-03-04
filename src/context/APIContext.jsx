import { createContext, useContext } from 'react';
import APIClient from 'api/APIClient';
import API from 'api/API';

const client = new APIClient();
const api = new API(client);

export const APIContext = createContext();

export function APIProvider({ children }) {
  return <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;
}

export function useAPI() {
  return useContext(APIContext);
}

export default APIProvider;
