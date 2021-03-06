const toHtml = require('vdom-to-html')
const mainLoop = require('main-loop')
const vdom = require('virtual-dom')
const h = require('virtual-dom/h')
const assert = require('assert')

h.svg = require('virtual-hyperscript-svg')
h.html = require('virtual-html')

module.exports = vel

// initialize a new virtual element
// fn -> null
function vel (rend) {
  assert.equal(typeof rend, 'function')

  var update = null
  render.toString = toString
  render.render = render
  render.vtree = vtree
  return render

  // render the element's vdom tree to DOM nodes
  // which can be mounted on the DOM
  // any? -> DOMNode
  function render (state) {
    if (update) return update(state)
    const loop = mainLoop(state, renderFn(rend), vdom)
    update = loop.update
    return loop.target
  }

  // render the element's vdom tree to a string
  // any? -> str
  function toString (state) {
    return toHtml(renderFn(rend)(state))
  }

  // Get the element's vdom tree.
  // any? -> obj
  function vtree (state) {
    return rend(h, state)
  }
}

// render function
// (fn, fn) -> fn(any?) -> obj
function renderFn (rend) {
  return function (state) {
    return rend(h, state)
  }
}
