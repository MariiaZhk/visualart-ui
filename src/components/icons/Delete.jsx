import React from 'react';
import useTheme from 'misc/hooks/useTheme';
import SvgIcon from '../SvgIcon';

const Delete = ({ color = 'default', size = 32 }) => {
  const { theme } = useTheme();
  const actualColor = theme.icon.color[color] || color;

  return (
    <SvgIcon
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill={actualColor}
          d="M3 6h18v2H3V6zm2 3h2v12H5V9zm6 0h2v12h-2V9zm6 0h2v12h-2V9zM8 4V3h8v1h5v2H3V4h5z"
        />
      </g>
    </SvgIcon>
  );
};

export default Delete;
