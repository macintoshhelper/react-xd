import Root from './Root';
import Text from './Text';
import Document from './Document';
import Artboard from './Artboard';
import View from './View';

const constructors = {
  root: Root,
  document: Document,
  artboard: Artboard,
  text: Text,
  view: View,
};

function createInstance(element, root) {
  const { type, props = {} } = element;

  if (constructors[type]) {
    return new constructors[type](root, props);
  }

  throw new Error(`Invalid element of type ${type} passed to XD renderer`);
}

export { createInstance };
