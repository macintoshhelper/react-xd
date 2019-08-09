import { Text, Color, Artboard } from 'scenegraph';
import TestRenderer from 'react-test-renderer';
import * as renderers from './renderers';

const makeText = ({
  textContent,
  color = '#000000',
}) => {
  const text = new Text();

  text.text = textContent;
  text.fill = new Color(color);

  const render = (node) => {
    node.addChild(text);
  }

  return {
    text,
    render,
  }
}

const renderArtboard = (tree, artboard) => {
  const { type, children } = tree;

  console.log({tree, children });

  return children.map((child, i) => {
    const { props } = child;
    if (child.type === 'text') {
      const { fontSize = 16 } = props;

      return child.children.map((node) => {
        if (typeof node === 'string') {
          const text = new Text();

          text.text = node;
          text.fill = new Color('#000000');
          text.fontSize = fontSize;

          artboard.addChild(text);
          text.moveInParentCoordinates(0, 50 * (i + 1));

          text.areaBox = { height: 50, width: 50 };
        }
      })
    }
  })
}

const renderDocument = (tree, document) => {
  const { children } = tree;

  return (children || []).map((child, i) => {
    if (child.type !== 'artboard') {
      throw new Error('Document children must be of type Artboard');
    }
    const { props, type } = child;
    const Renderer = renderers[type];

    const renderer = new Renderer(document, props);

    renderer.render();
  })
};

const renderTree = (element, documentRoot) => {
  const testRenderer = TestRenderer.create(element);
  const json = testRenderer.toJSON();
  console.log({ json });

  const { type, props, children } = json;
  const { fontSize = 16 } = props;

  if (type === 'document') {
    renderDocument(json, documentRoot);
  }

  // if (type === 'artboard') {
  //   const { height = 640, width = 360, viewportHeight, home = false } = props;
  //   const artboard = new Artboard();
  //   artboard.fill = new Color('#FFFFFF');
  //   artboard.fillEnabled = true;
  //   artboard.height = height;
  //   artboard.width = width;
  //   // artboard.isHomeArtboard = home;
  //   documentRoot.addChild(artboard);
    
    
  //   for (const artboardChild of children) {
  //     const [child] = artboardChild.children;
      
  //   }
    
  // }


  // for (const child of children) {
  //   if (type === 'artboard') {
  //     const { height = 640, width = 360, viewportHeight, home = false } = props;
  //     const node = new Artboard();
  //     node.height = height;
  //     node.width = width;
  //     node.isHomeArtboard = home;

  //   }
    
  // }
}

export const render = (element, documentRoot) => {
  // const tree = buildTree(element);

  return renderTree(element, documentRoot);
};
