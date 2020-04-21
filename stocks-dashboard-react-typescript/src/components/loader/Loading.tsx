import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const Loading: React.FC = () => {
  return (
    <>
      <CircularProgress size={100} color="primary" />
    </>
  );
};
