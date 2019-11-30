import { multiplier } from "./App";

var assert = require("assert");

const dark = 'rgb(80, 81, 79)';
const red = 'rgb(226,104,98)';
const yellow = '#70C1B3';

class BST {
  constructor(x, y) {
    this.root = undefined;
    this.tree = [];
    this.X = x;
    this.Y = y;
  }

  recursive_insert(parent, child) {
    assert(parent && child, "Los Nodos deben ser validos.");
    if (child.value <= parent.value) {
      child.color = dark;
      if (!parent.left) {
        const cx = parseFloat(parent.cx) - (this.X * multiplier)
        child.cx = cx.toString() + "%";
        const cy = parseFloat(parent.cy) + (this.Y)
        child.cy = cy.toString() + "px";
        child.parent = parent;
        parent.left = child;
      } else {
        this.recursive_insert(parent.left, child);
      }
    } else {
      child.color = yellow;
      if (!parent.right) {
        const cx = parseFloat(parent.cx) + (this.X * multiplier)
        child.cx = cx.toString() + "%";
        const cy = parseFloat(parent.cy) + (this.Y)
        child.cy = cy.toString() + "px";
        child.parent = parent;
        parent.right = child;
      } else {
        this.recursive_insert(parent.right, child);
      }
    }
  }

  insert(value) {
    const nuevo = new Node(value);
    if (!this.root) {
      nuevo.color = red;
      this.root = nuevo;
    } else {
      this.recursive_insert(this.root, nuevo);
    }
  }

  preorder(node) {
    if (node != null) {
      this.tree.push(node);
      this.preorder(node.left);
      this.preorder(node.right);
    }
    return this.tree;
  }
}

class Node {
  constructor(value) {
    assert(
      typeof value == "number",
      "El valor de vada nodo debe ser un numero."
    );
    this.value = value;
    this.left = undefined;
    this.right = undefined;
    this.parent = undefined;
    this.r = 18;
    this.cx = '50%';
    this.cy = 40;
    this.color =undefined;
    this.isLeft = false;
    this.isRight = false;
  }
}

export { BST }