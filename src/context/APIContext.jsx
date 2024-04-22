import React, { createContext, useContext } from 'react';
import APIClient from 'api/APIClient';
import APIService from 'api/APIService';

const client = new APIClient();
const api = new APIService(client);

export const APIContext = createContext();

export const useAPI = () => useContext(APIContext);

export const APIProvider = ({ children }) => <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;

export default APIProvider;
