import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const DARK_MODE_KEY = 'darkModeActive';

const storeValue = (value: boolean) => {
  try {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to write to localStorage', e);
  }
};

const readValue = (): boolean => {
  try {
    const storedValue = localStorage.getItem(DARK_MODE_KEY);
    const parsedValue = storedValue && JSON.parse(storedValue);
    return parsedValue;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to read localStorage', e);
    return false;
  }
};

export const DarkModeToggle = () => {
  const [darkModeActive, setDarkModeActive] = useState<boolean>(false);

  useEffect(() => {
    setDarkModeActive(readValue() || false);
  }, []);

  const onToggle = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setDarkModeActive(checked);
    storeValue(checked);
  };

  return (
    <>
      <Helmet
        htmlAttributes={{ 'data-theme': darkModeActive ? 'dark' : 'light' }}
      />
      <div className="toggle-container">
        <input
          type="checkbox"
          id="switch"
          name="theme"
          checked={darkModeActive}
          onChange={onToggle}
        />
        <label htmlFor="switch">Toggle</label>
      </div>
    </>
  );
};
