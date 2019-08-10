import { Text as XdText, Color } from 'scenegraph';

const makeText = ({
  text: textContent,
  color = '#000000',
  fontSize = 16,
}) => {
  const text = new XdText();

  text.text = textContent;
  text.fill = new Color(color);
  text.fontSize = fontSize;

  const { width, height } = text.localBounds;
  // text.areaBox = { width: width + 1, height };

  return { text, width, height };
};

export default class Text {
  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.instance = null;

    this.width = 0;
    this.height = 0;

    if (typeof props.children === 'string') {
      const text = new XdText();
      text.text = props.children;
      text.fontSize = props.style.fontSize || 16;
      const { width, height } = text.localBounds;
      this.width = width;
      this.height = height;

      console.log({ width, height });
    }


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

  // async renderChildren() {
  //   for (const child of children) {
  //     this.parent.instance.addNode(child);

  //     await child.render();
  //   }
  // }

  async render({ layout } = { layout: { left: 0, top: 0 } }) {
    const { name, style, children } = this.props;
    const { left, top } = layout;
    const { fontSize, color } = style || {};

    if (typeof children === 'string') {
      const textContent = children;
  
      const { text, width, height } = makeText({
        text: textContent,
        color,
        fontSize
      });
  
      this.instance = text;
      this.parent.instance.addChild(text);
  
      text.moveInParentCoordinates(left, top + height);

      this.width = width;
      this.height = height;

      return;
    }

    // await this.renderChildren();
  }
}
