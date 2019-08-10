import { Artboard as XdArtboard, Color } from 'scenegraph';
import computeLayout from 'css-layout';

const makeArtboard = ({
  name = 'Artboard',
  color = '#FFFFFF',
  width = 360,
  height = 640,
}) => {
  const artboard = new XdArtboard();

  artboard.fill = new Color(color);
  artboard.fillEnabled = true;

  artboard.height = height;
  artboard.width = width;

  if (name) {
    artboard.name = name;
  }

  return artboard;
};

export default class Artboard {
  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.instance = null;

    this.children = [];
  }

  appendChild(child) {
    child.parent = this;

    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
  }

  async renderChildren() {
    const { children, props } = this;

    const nodeTree = {
      style: props.style,
      children: children.map((child) => ({
        style: {
          ...(child.width ? { width: child.width } : {}),
          ...(child.height ? { height: child.height } : {}),
          ...child.props.style,
        },
      })),
    };
    computeLayout(nodeTree);

    let i = 0;
    for (const child of children) {
      await child.render({ layout: nodeTree.children[i].layout });

      i += 1;
    }
  }

  async render({ layout }) {
    const { name, style } = this.props;
    const { left, top } = layout;
    const { width, height, backgroundColor } = style;

    const artboard = makeArtboard({ name, color: backgroundColor, height, width });

    this.instance = artboard;
    this.root.instance.addChild(artboard);

    artboard.moveInParentCoordinates(left, top);

    await this.renderChildren();
  }
}
