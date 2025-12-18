import React from 'react';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';

const useStyles = createUseStyles({
  outer: ({ theme }) => ({
    height: `calc(100vh - ${theme.header.height}px)`,
    width: '100%',
    background: theme.pageContainer.color.background,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  }),

  middle: ({ theme }) => ({
    width: '100%',
    maxWidth: theme.pageContainer.content.width,
    background: theme.pageContainer.content.color.background,
    display: 'flex',
    flexDirection: 'column',
  }),

  inner: ({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  }),
});

function PageContainer({ children }) {
  const { theme } = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.outer}>
      <div className={classes.middle}>
        <div className={classes.inner}>{children}</div>
      </div>
    </div>
  );
}

export default PageContainer;
