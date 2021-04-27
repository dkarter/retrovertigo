import React from 'react';

type Props = {
  tags?: string[];
};

export const Tags: React.FC<Props> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="tags">
      {tags.map((tag, i) => (
        <li key={i}>{tag}</li>
      ))}
    </ul>
  );
};
