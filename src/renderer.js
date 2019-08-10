import ReactReconciler from 'react-reconciler';

import { createInstance } from './renderers';

function traceWrap(hostConfig) {
  let traceWrappedHostConfig = {};
  Object.keys(hostConfig).map(key => {
    const func = hostConfig[key];
    traceWrappedHostConfig[key] = (...args) => {
      console.trace(key);
      return func(...args);
    };
  });
  return traceWrappedHostConfig;
}




const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: (parentContext, fiberType, rootInstance) => {
    let context = { type: fiberType };
    return context;
  },
  shouldSetTextContent: (type, props) => {
    return (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    );
  },
  createInstance: (
    type,
    props,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {
    return createInstance({ type, props }, rootContainerInstance);
  },
  createTextInstance: (
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) => {
    return createInstance(
      { type: 'text', props: { children: text } },
      rootContainerInstance
    );
    // return document.createTextNode(text);
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  prepareUpdate(domElement, oldProps, newProps) {
    return true;
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {},
  commitTextUpdate(textInstance, oldText, newText) {},
  removeChild(parentInstance, child) {},
};

const ReactReconcilerInst = ReactReconciler(traceWrap(hostConfig));


export const render = async (reactElement, { documentRoot, selection }, callback) => {
  const rootContainer = createInstance({ type: 'root', props: { documentRoot, selection } });

  const mountNode = ReactReconcilerInst.createContainer(rootContainer);


  // update the root Container
  ReactReconcilerInst.updateContainer(
    reactElement,
    mountNode,
    null,
    callback
  );

  await rootContainer.render();
};
