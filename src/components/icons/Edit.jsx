import React from 'react';
import SvgIcon from '../SvgIcon';
import useTheme from 'misc/hooks/useTheme';

const Edit = ({
  color = 'default', // default | header | error | success | warning | info | <string>
  size = 24,
}) => {
  const { theme } = useTheme();
  const actualColor = theme.icon.color[color] || color;

  return (
    <SvgIcon style={{ height: `${size}px`, width: `${size}px` }} viewBox='0 0 24 24'>
      <path
        d='M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zm18.71-10.04c.39-.39.39-1.02 0-1.41l-2.54-2.54a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
        fill={actualColor}
      />
    </SvgIcon>
  );
};

export default Edit;
