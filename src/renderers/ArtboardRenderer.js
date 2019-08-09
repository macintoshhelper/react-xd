import { Artboard, Color } from 'scenegraph';

const makeArtboard = ({
  name = 'Artboard',
  color = '#FFF',
  width = 360,
  height = 640,
}) => {
  const artboard = new Artboard();

  artboard.fill = new Color(color);
  artboard.fillEnabled = true;

  artboard.height = height;
  artboard.width = width;

  if (name) {
    artboard.name = name;
  }

  return artboard;
}

export default class ArtboardRenderer {
  constructor(document, props) {
    this.document = document;
    this.props = props;
    const { name, bg, width, height } = props;

    this.artboard = makeArtboard({ name, color: bg, width, height });
  }

  render() {
    const { artboard, document } = this;

    document.addChild(artboard);
  }
}
