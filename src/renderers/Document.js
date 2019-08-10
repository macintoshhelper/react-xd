const computeLayout = require('css-layout');

export default class Document {
  constructor(root, props) {
    this.root = root;
    this.props = props;

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

  async renderArtboards() {
    const { children, props } = this;

    const nodeTree = {
      style: props.style,
      children: children.map((child) => ({ style: child.props.style }))
    };
    computeLayout(nodeTree);

    let i = 0;
    for (const child of children) {


      await child.render({ layout: nodeTree.children[i].layout });
      i += 1;
    }
  }

  async render() {
    await this.renderArtboards();
  }
}
