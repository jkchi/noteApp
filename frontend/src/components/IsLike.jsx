import { createContext, useState, useContext } from 'react';

const LikeContext = createContext();

const LikeProvider = ({ children }) => {
  const [isLike, setIsLike] = useState(false);

  return (
    <LikeContext.Provider value={{ isLike, setIsLike }}>
      {children}
    </LikeContext.Provider>
  );
};

const useLike = () => {
  return useContext(LikeContext);
};

export { LikeProvider, useLike };
