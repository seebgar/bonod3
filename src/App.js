import React from "react";
import "./App.css";
import * as d3 from "d3";
import { BST } from "./BST";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let tree = new BST(3, 66);
    tree.insert(56);
    tree.insert(15);
    tree.insert(89);

    this.state = {
      value: undefined,
      radius: 20,
      tree: tree,
      svgContainer: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCanvas = this.handleCanvas.bind(this);
  }

  componentDidMount() {
    this.setState(
      prev => {
        return {
          svgContainer: d3
            .select("body")
            .append("svg")
            .attr("width", "100%")
            .attr("height", 700)
        };
      },
      _ => {
        const data = this.state.tree.preorder(this.state.tree.root);
        this.handleCanvas(data);
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const valor = parseInt(event.target.numero.value);
    this.setState(
      prev => {
        multiplier += 0;
        prev.tree.insert(valor);
        return { tree: prev.tree };
      },
      _ => {
        const data = this.state.tree.preorder(this.state.tree.root);
        this.handleCanvas(data);
      }
    );
  }

  handleCanvas(data) {
    let arcos = this.state.svgContainer
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .style("opacity", 0)
      .attr("x1", d => (d.parent ? d.parent.cx : d.cx))
      .attr("y1", d => (d.parent ? d.parent.cy : d.cy))
      .attr("x2", d => d.cx)
      .attr("y2", d => d.cy)
      .attr("stroke-width", 2)
      .attr("stroke", "grey");

    let circle = this.state.svgContainer
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle");

    let circleAttributes = circle
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      .attr("r", d => d.r)
      .style("fill", d => d.color);

    circleAttributes
      .style("opacity", 0)
      .transition()
      .delay(0)
      .duration(1300)
      .style("opacity", 1);

      arcos
      .transition()
      .delay(600)
      .duration(1600)
      .style("opacity", 1);

    let text = this.state.svgContainer
      .selectAll("text")
      .data(data)
      .enter()
      .append("text");

    text
      .attr("x", d => {
        let base = parseFloat(d.cx) - 0.5;
        const center = base.toString() + "%";
        return center;
      })
      .attr("y", d => {
        let base = parseFloat(d.cy) + 5;
        const center = base.toString() + "px";
        return center;
      })
      .text(d => d.value)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "white");
  }

  render() {
    return (
      <div className="uk-container uk-container-large">
        <div
          style={{ width: "100%" }}
          className="uk-flex uk-flex-center uk-text-center"
        >
          <div>
            <h1 className="uk-margin-top">Bono D3</h1>
            <p className="uk-margin-remove">Sebastian Garcia 201630047</p>
            <hr />
            <div>
              <form onSubmit={this.handleSubmit}>
                <input type="number" name="numero" />
                <button type="submit">Agregar Valor</button>
              </form>
            </div>
          </div>
        </div>
        <br />
        <div></div>
      </div>
    );
  }
}

let multiplier = 1;
export { multiplier };
