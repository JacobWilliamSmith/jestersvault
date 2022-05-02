import {createContext, useState, useEffect, useContext} from 'react';
import {AuthContext} from './Auth';
import PresetService from '../services/Presets';

export const PresetContext = createContext();

export default ({children}) => {
  const [characterPresets, setCharacterPresets] = useState([]);
  const [gamePresets, setGamePresets] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    PresetService.getCharacterPresets()
      .then(data => { setCharacterPresets(data !== undefined ? data : []); })
      .catch(() => { setCharacterPresets([]); })
  },[authContext.isAuthenticated]);

  useEffect(() => {
    console.log(characterPresets);
  },[characterPresets]);

  return (
    <PresetContext.Provider value={{characterPresets, setCharacterPresets, gamePresets, setGamePresets}}>
      { children }
    </PresetContext.Provider>
  )
}