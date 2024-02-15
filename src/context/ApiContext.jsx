import { createContext, useContext } from 'react';
import ApiClient from 'api/ApiClient';
import Api from 'api/Api';

const client = new ApiClient();
const api = new Api(client);

export const ApiContext = createContext();

export function ApiProvider({ children }) {
  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
}

export function useApi() {
  return useContext(ApiContext);
}

export default ApiProvider;
