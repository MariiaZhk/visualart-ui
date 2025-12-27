import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from 'misc/hooks/useTheme';

const FloatingActionButton = ({ icon, to, ariaLabel }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      style={{
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(6),
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: theme.button.color.primary.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        border: 'none',
        zIndex: 1000,
      }}
    >
      {icon}
    </button>
  );
};

export default FloatingActionButton;
