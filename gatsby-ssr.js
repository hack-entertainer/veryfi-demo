/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
// exports.onRenderBody = ({ setHtmlAttributes }) => {
//   setHtmlAttributes({ lang: `en` })
// }

// import wrapWithProvider from "./src/state/global-wrapper";
// export const wrapRootElement = wrapWithProvider

import React from 'react';
import RootElement from './src/components/root-element';

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};