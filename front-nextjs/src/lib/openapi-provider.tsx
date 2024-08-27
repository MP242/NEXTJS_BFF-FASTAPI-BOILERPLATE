'use client';
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { OpenAPI } from '../client'; // Assure-toi que le chemin est correct

interface OpenAPIContextProps {
  openAPIClient: typeof OpenAPI;
}

const OpenAPIContext = createContext<OpenAPIContextProps | undefined>(undefined);

export const OpenAPIProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Configurer l'URL de base
    OpenAPI.BASE = process.env.API_URL || '';
    OpenAPI.WITH_CREDENTIALS = true;
    OpenAPI.TOKEN = async () => {
      return localStorage.getItem('access_token')!;
    };
  }, []);

  return <OpenAPIContext.Provider value={{ openAPIClient: OpenAPI }}>{children}</OpenAPIContext.Provider>;
};

export const useOpenAPI = () => {
  const context = useContext(OpenAPIContext);
  if (context === undefined) {
    throw new Error('useOpenAPI must be used within an OpenAPIProvider');
  }
  return context;
};
