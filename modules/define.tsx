import React from 'react';
import DefinedComponent from './DefinedComponent';

/**
 * Entry to Define Component
 */
function define<CompT extends React.ComponentClass | React.FC>(Comp: CompT) {
  return new DefinedComponent(Comp);
}

// eslint-disable-next-line no-restricted-exports
export { define as default };
