import React from 'react';
import ArtworkDetailsPage from 'pages/artworkDetails';
import PageContainer from './components/PageContainer';

const ArtworkDetails = (props) => {
  return (
    <PageContainer>
      <ArtworkDetailsPage {...props} />
    </PageContainer>
  );
};

export default ArtworkDetails;
