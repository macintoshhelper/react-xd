export default class Root {
  constructor(_, props) {
    const { documentRoot, selection } = props;
    this.instance = documentRoot;
    this.selection = selection;

    this.document = null;
  }

  appendChild(child) {
    this.document = child;
  }

  removeChild() {
    this.document = null;
  }

  async render() {
    await this.document.render();
  }
}
