import { useContext, useState, createContext, useEffect } from 'react';

const MenuToggleContext = createContext();

export function useMenuToggle() {
  return useContext(MenuToggleContext);
}

export function MenuToggleProvider({ children }) {
  const [menuState, setMenuState] = useState(false);

  const toggleMenu = () => {
    return setMenuState((prev) => !prev);
  };

  useEffect(() => {
    setMenuState(false);
  }, []);

  const value = {
    menuState,
    toggleMenu,
  };

  return (
    <MenuToggleContext.Provider value={value}>
      {children}
    </MenuToggleContext.Provider>
  );
}
