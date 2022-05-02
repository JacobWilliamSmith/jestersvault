import {createContext} from 'react';
import AuthProvider from './Auth';
import PresetProvider from './Presets';

export const AuthContext = createContext();

export default ({children}) => {
  return (
    <AuthProvider>
      <PresetProvider>
        {children}
      </PresetProvider>
    </AuthProvider>
  )
}