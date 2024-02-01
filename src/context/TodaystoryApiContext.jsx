import { createContext, useContext } from 'react';
import TodaystoryClient from '../api/TodaystoryClient';
import Todaystory from '../api/Todaystory';

const client = new TodaystoryClient();
const todaystory = new Todaystory(client);

export const TodaystoryApiContext = createContext();

export function TodaystoryApiProvider({ children }) {
  return <TodaystoryApiContext.Provider value={{ todaystory }}>{children}</TodaystoryApiContext.Provider>;
}

export function useTodaystoryApi() {
  return useContext(TodaystoryApiContext);
}

export default TodaystoryApiProvider;
