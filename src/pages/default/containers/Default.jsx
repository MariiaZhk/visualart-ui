import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import Button from 'components/Button';
import Link from 'components/Link';
import pagesURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';

function Default() {
  const { formatMessage } = useIntl();

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap:'10px',
        
      }}
    >
      <Typography variant="title">
        {formatMessage({ id: 'title' })}
      </Typography>

      <Typography variant="subtitle" >
        {formatMessage({ id: 'subtitle' })}
      </Typography>

      <div style={{ marginTop: '30px' }}>
        <Link to={{ pathname: `${pagesURLs[pages.artworks]}` }}> 
          <Button variant="text">
            {formatMessage({ id: 'default' })}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Default;
