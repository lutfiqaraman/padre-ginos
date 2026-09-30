import React from "react";
import { createRoot } from "react-dom/client";

const Pizza = (props) => {
  return React.createElement(
    "div", {}, [
      React.createElement("h3", { key: "name" }, props.name),
      React.createElement("p", { key: "desc" }, props.description)
    ]);
};

const App = () => {
  return React.createElement(
    "div",
    {},
    [
      React.createElement("h1", { key: "title" }, "Padro Gino's"),
      React.createElement(Pizza, {
        key: 1,
        name: 'The Pepperoni Pizza',
        description: 'Pepperoni and Mozzarella cheese Pizza'
      }),
      React.createElement(Pizza, {
        key: 2,
        name: 'The Neapolitan Pizza',
        description: 'The original 18th-century thin pie from Naples '
      }),
      React.createElement(Pizza, {
        key: 3,
        name: 'The Roman Pizza',
        description: 'Famous for its thin and crispy crust'
      }),
      React.createElement(Pizza, {
        key: 4,
        name: 'The Sicilian Pizza',
        description: 'A square-cut pie with a thick, pillowy, focaccia-like dough and a crunchy bottom crust'
      })
    ]
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(App))
