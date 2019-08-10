import { Group, Rectangle, Color } from 'scenegraph';
import commands from 'commands';
import computeLayout from 'css-layout';

const makeRectangle = ({
  name = 'ShapeGroup',
  color,
  width = 360,
  height = 640,
  borderRadius,
}) => {
  const rectangle = new Rectangle();

  if (color) {
    rectangle.fill = new Color(color);
    rectangle.fillEnabled = true;
  }
  if (borderRadius) {
    rectangle.setAllCornerRadii(borderRadius);
  }

  rectangle.height = height;
  rectangle.width = width;

  if (name) {
    rectangle.name = name;
  }

  return rectangle;
};


export default class View {
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

  async render({ layout } = { layout: { left: 0, top: 0 } }) {
    const { name, style } = this.props;
    const { left, top } = layout;
    const {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
    } = style;

    // FIXME: borderRadius hack for initial proof of concept. Needs to be fixed up in a DRY manner
    // Idea was to use borderRadius, but we're flattening styles

    const rectangle = makeRectangle({
      color: backgroundColor,
      height,
      width,
      borderRadius: borderBottomLeftRadius,
    });

    this.parent.instance.addChild(rectangle);

    this.root.selection.items = [rectangle];

    commands.group();

    const group = this.root.selection.items[0];
    group.name = name;

    this.instance = group;

    group.moveInParentCoordinates(left, top);

    await this.renderChildren();
  }
}
