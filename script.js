// const element = {
//   type: "div",
//   props: {
//     id: "container",
//     onclick: () => console.log("click!"),
//     children: [
//       { type: "input", props: { value: "foo", type: "text" } },
//       {
//         type: "a",
//         props: {
//           href: "/bar",
//           children: [
//             {
//               type: "TEXT ELEMENT",
//               props: { nodeValue: "Foo" },
//             },
//           ],
//         },
//       },
//       { type: "span", props: {} },
//     ],
//   },
// };

// let rootInstance = null;

// function render(element, container) {
//   const prevInstance = rootInstance;
//   const nextInstance = reconcile(container, prevInstance, element);
//   rootInstance = nextInstance;
// }

// const render = (element, parentDom) => {
//   const { type, props } = element;

//   const isTextElement = type === "TEXT ELEMENT";

//   const domElement = isTextElement
//     ? document.createTextNode("")
//     : document.createElement(type);

//   const isListener = (name) => name.startsWith("on");
//   Object.keys(props)
//     .filter(isListener)
//     .forEach((name) => {
//       const eventType = name.toLowerCase().substring(2);
//       domElement.addEventListener(eventType, props[name]);
//     });

//   const isAttribute = (name) => !isListener(name) && name !== "children";
//   Object.keys(props)
//     .filter(isAttribute)
//     .forEach((name) => {
//       domElement[name] = props[name];
//     });

//   const childrenElements = props.children || [];
//   childrenElements.forEach((child) => render(child, domElement));

//   parentDom.append(domElement);
// };

// render(element, root);
