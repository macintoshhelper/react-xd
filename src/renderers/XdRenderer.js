// import layerGroup from '../jsonUtils/layerGroup';
import { Group } from 'scenegraph';

// import processTransform from '../utils/processTransform';

const DEFAULT_OPACITY = 1.0;

export default class XdRenderer {
  getDefaultGroupName(
    // eslint-disable-next-line no-unused-vars
    props,
  ) {
    return 'Group';
  }

  renderGroupLayer(layout, style, textStyle, props) {
    // Default SketchRenderer just renders an empty group

    // const transform = processTransform(layout, style);

    const opacity = style.opacity !== undefined ? style.opacity : DEFAULT_OPACITY;

    const group = new Group();

    group.name = props.name || this.getDefaultGroupName(props);
    group.opacity = opacity;

    return group;
  }

  /* eslint-disable no-unused-vars */
  renderBackingLayers(
    layout,
    style,
    textStyle,
    props,
    children,
  ) {
    return [];
  }
  /* eslint-enable */
}
