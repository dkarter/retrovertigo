import React from 'react';
import { Clock } from 'react-feather';

type Props = {
  text: string;
};

export const ReadingTime: React.FC<Props> = ({ text }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Clock size={16} />
      <small>{text}</small>
    </div>
  );
};
