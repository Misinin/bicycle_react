/** @jsx createElement */

const TEXT_ELEMENT = "TEXT_ELEMENT";
const POSSIBLE_LETTERS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

const root = document.getElementById("root");
const button = document.getElementById("button");

function createElement(type, props, ...children) {
  const modChildren = children.map((child) => {
    if (typeof child === "string") {
      return { type: "TEXT_ELEMENT", props: { nodeValue: child } };
    }

    return child;
  });

  return {
    type,
    props: {
      ...props,
      children: Array.isArray(modChildren) ? modChildren.flat() : modChildren,
    },
  };
}

function getRandomLetterSequence(string) {
  const letters = string.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

function getListItem(item) {
  return <li>{item}</li>;
}

const list = (
  <ul>{getRandomLetterSequence(POSSIBLE_LETTERS).map(getListItem)}</ul>
);

let rootInstance = null;

function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {
  if (!instance) {
    const newInstance = instantiate(element);
    parentDom.append(newInstance.nodeContainer);
    return newInstance;
  } else if (element === null) {
    parentDom.removeChild(instance.nodeContainer);
  } else if (instance.element.type === element.type) {
    updateDomProperties(
      instance.nodeContainer,
      instance.element.props,
      element.props
    );
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.nodeContainer, instance.nodeContainer);
    return newInstance;
  }
}

function reconcileChildren(instance, element) {
  const instanceContainer = instance.nodeContainer;
  const prevInstances = instance.childInstances;
  const nextChildrenElements = element.props.children;

  const newChildInstances = [];

  prevInstances.forEach((prevInstance, index) => {
    const nextElement = nextChildrenElements[index] || null;

    const newChildInstance = reconcile(
      instanceContainer,
      prevInstance,
      nextElement
    );
    newChildInstances.push(newChildInstance);
  });

  return newChildInstances.filter((instance) => instance !== null);
}

function instantiate(element) {
  const { type, props } = element;

  const isTextNode = type === TEXT_ELEMENT;
  const nodeContainer = isTextNode
    ? document.createTextNode("")
    : document.createElement(type);

  updateDomProperties(nodeContainer, [], props);

  const properties = Object.keys(props).filter((key) => key !== "children");

  properties.forEach((propName) => {
    nodeContainer[propName] = props[propName];
  });

  const childElements = props.children || [];

  const childInstances = childElements.map(instantiate);

  const childNodeContainers = childInstances.map(
    (childInstance) => childInstance.nodeContainer
  );
  childNodeContainers.forEach((childNodeContainer) =>
    nodeContainer.append(childNodeContainer)
  );

  return { nodeContainer, element, childInstances };
}

function updateDomProperties(elementContainer, prevProps, nextProps) {
  const prevPropsKeys = Object.keys(prevProps).filter(
    (key) => key !== "children"
  );

  // prevPropsKeys.forEach((key) => (elementContainer[key] = null));

  const nextPropsKeys = Object.keys(nextProps).filter(
    (key) => key !== "children"
  );

  // nextPropsKeys.forEach((key) => (elementContainer[key] = nextProps[key]));

  prevPropsKeys.forEach((prevKey) =>
    nextPropsKeys.forEach((nextKey) => {
      // console.log(elementContainer[prevKey], nextProps[nextKey]);

      if (elementContainer[prevKey] === nextProps[nextKey]) {
        console.log("return", elementContainer[prevKey]);
        return;
      }
      console.log(elementContainer[prevKey]);
      elementContainer[prevKey] = nextProps[nextKey];
    })
  );
}

render(list, root);

function resortList() {
  const letters = (
    <ul>{getRandomLetterSequence(POSSIBLE_LETTERS).map(getListItem)}</ul>
  );

  render(letters, root);
}

setInterval(resortList, 5000)
