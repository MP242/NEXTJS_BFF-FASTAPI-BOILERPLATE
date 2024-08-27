import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((prevState: T) => T)) => void;

function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    // Vérifiez si l'environnement est le navigateur
    if (typeof window !== 'undefined') {
      try {
        const value = window.localStorage.getItem(key);
        if (value !== null) {
          setState(value as unknown as T);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [key]);

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);

      // Vérifiez si l'environnement est le navigateur
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, valueToStore as unknown as string);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [state, setValue] as [T, SetValue<T>];
}

export default useLocalStorage;
