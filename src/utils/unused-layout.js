// THIS FILE IS LEFT FOR FUTURE REFERENCE, it's unused

const computeLayout = require('css-layout');

const DIRECTION = {
  LTR: 'ltr',
  RTL: 'rtl',
};

class LayoutNode {
  constructor({ width, height, style }) {
    this.style = { width, height, ...style };
    this.width = width;
    this.height = height;
    this.top = 0;
    this.left = 0;

    this.children = [];
  }

  setJustifyContent(value) {
    this.style.justifyContent = value;
  }

  setWidth(width) {
    this.style.width = width;
  }

  setHeight(height) {
    this.style.height = height;
  }

  insertChild(node, i) {
    this.children[i] = node;
  }

  getStyle() {
    return this.style;
  }

  setLayout({ width, height, top, left }) {
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
  }

  calculateLayout() {
    const { children } = this;

    const childrenTree = children.map((child) => ({ style: child.getStyle() }));

    const nodeTree = {
      style: this.style,
      children: childrenTree,
    };


    computeLayout(nodeTree);

    nodeTree.children.map((child, i) => {
      const { width, height, top, left } = child.layout;
      children[i].setLayout({ width, height, top, left });
    })
  }

  getComputedLayout() {
    const { left, top, width, height } = this;

    return { left, top, width, height };
  }
}

const Node = {
  create: (props) => new LayoutNode(props),
}

const root = Node.create({
  width: 500,
  height: 300,
  justifyContent: 'center',
  flexDirection: 'row'
});


const node1 = Node.create({
  width: 100,
  height: 100,
});

const node2 = Node.create({
  width: 100,
  height: 100,
});

root.insertChild(node1, 0);
root.insertChild(node2, 1);

root.calculateLayout();

console.log(root.getComputedLayout());
// {left: 0, top: 0, width: 500, height: 300}
console.log(node1.getComputedLayout());
// {left: 150, top: 0, width: 100, height: 100}
console.log(node2.getComputedLayout());
// {left: 250, top: 0, width: 100, height: 100}
