/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
// import wrapWithProvider from "./src/state/global-wrapper";
// export const wrapRootElement = wrapWithProvider

import React from 'react';
import RootElement from './src/components/root-element';

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};