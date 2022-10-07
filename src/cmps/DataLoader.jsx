import React, { useLayoutEffect } from 'react';
import { ReactComponent as Loader } from '../assets/img/icons/dataLoader.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export const DataLoader = () => {
  // TODO : very buggy. not a good idea to manage it from redux there is latency. manage it within the component state. remove the redux and add a props for shouldShow or not.
  const { isLoading } = useSelector((state) => state.appModule);
  const [showClass, setShowClass] = useState('');
  useLayoutEffect(() => {
    const className = isLoading ? 'show slide' : '';
    setShowClass(className);
  }, [isLoading]);
  return (
    <div className={`data-loader flex ${showClass}`}>
      <div className="flex  align-center">
        <Loader />
        <span>Loading...</span>
      </div>
    </div>
  );
};
