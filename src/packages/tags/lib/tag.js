import types from "../types";
import { guid, child, css, isEmpty } from "../utils";

/**
 * Tag
 * @param {*} tag
 * @param {*} style
 * @param {*} conditions
 */
const Tag = (tag, style = [], conditions = [], options = {}) => {
  /**
   * Constructor
   */
  if (!tag) throw new Error(`Invalid tag to create element`);

  const $$typeof = types.TAG_ELEMENT;
  const $$identifier = guid(tag);
  const $$ref = options.ref;
  const $$tag = tag;

  let $dom = document.createElement($$tag);

  let _events = {};
  let _attributes = {};
  let _children = [];
  let _class = $$ref ? [$$ref, $$identifier] : [$$identifier];
  let _style = css.toJSON(style);
  let _styleConditions = conditions;

  const setGlobalStyle = () => {
    css.extract($$identifier, _attributes, _style, _styleConditions);

    return $self;
  };

  // Extract css on construct element
  setGlobalStyle();

  /**
   * Clone
   * @param {Boolean} fully
   */
  const clone = (options = {}) => {
    const element = Tag($$tag, [], _styleConditions, {
      ref: $$identifier,
      globalStyle: options.globalStyle
    });

    // Clone Children
    const children = _children.map(
      child =>
        (child.$$typeof === types.TAG_ELEMENT && child.clone(fully)) ||
        child.cloneNode(true)
    );
    element.setContent(children);

    // Clone Styles
    if (options.style) element.setStyle(_style);

    if (options.attributes) {
      // Clone Attributes
      for (const attrName in _attributes) {
        if (_attributes.hasOwnProperty(attrName))
          element.setAttribute(attrName, _attributes[attrName]);
      }
    }

    if (options.events) {
      // Clone events
      for (const eventName in _events) {
        if (_events.hasOwnProperty(eventName))
          element.on(eventName, _events[eventName]);
      }
    }

    return element;
  };

  /**
   * Get Attribute
   * @param {String} key Attribute Name
   */
  const getAttribute = key => _attributes[key];

  /**
   * Set Attribute
   * @param {String} key Attribute name
   * @param {String} value Attribute Value
   */
  const setAttribute = (key, value = true) => {
    if (key === "class") {
      console.warn("Can't override class values, use addClass or removeClass");
      return $self;
    }

    _attributes[key] = value;
    $dom.setAttribute(key, value);

    setGlobalStyle(); // Update extracted style

    return $self;
  };

  /**
   * Get Style
   */
  const getStyle = () => _style;

  /**
   * Override Element Style
   * @param {Object} value
   */
  const setStyle = value => {
    _style = value;

    setGlobalStyle();

    return $self;
  };

  /**
   * Override Element Style Conditions
   * @param {Function} value
   */
  const setStyleConditions = value => {
    _styleConditions = value;

    setGlobalStyle(); // Update extracted style

    return $self;
  };

  const addClass = value => {
    if (!isEmpty(value)) _class.push(value);

    return $self;
  };

  const removeClass = value => {
    if (!isEmpty(value)) _class = _class.filter($class => $class !== value);

    return $self;
  };

  /**
   * Get Content
   */
  const getContent = () => _children;

  /**
   * Set Content
   * @param {*} value
   */
  const setContent = value => {
    _children = child.parse(value);
    return $self;
  };

  /**
   * Append Childs
   * @param {*} value
   */
  const append = value => {
    if (value.constructor === Array) {
      value.forEach(v => _children.push(child.transform(v)));
    } else {
      _children.push(child.transform(value));
    }

    return $self;
  };

  /**
   * Add Listner Event
   * @param {*} eventName
   * @param {*} listner
   */
  const on = (eventName, listner) => {
    _events[eventName] = listner;
    $dom.addEventListener(eventName, listner);
    return $self;
  };

  /**
   * Render
   */
  const render = () => {
    if (!isEmpty(_class)) $dom.className = _class.join(" ");

    if (!isEmpty(_children)) {
      $dom.innerHTML = "";
      for (const node of child.render(_children)) $dom.appendChild(node);
    }

    return $dom;
  };

  const $self = {
    $$typeof,
    $$identifier,
    $$tag,
    $dom,
    getAttribute,
    setAttribute,
    getStyle,
    setStyle,
    setGlobalStyle,
    addClass,
    removeClass,
    setStyleConditions,
    getContent,
    setContent,
    on,
    append,
    clone,
    render
  };

  return $self;
};

Tag.actions = [
  "setId",
  "getId",
  "getAttribute",
  "setAttribute",
  "getStyle",
  "setStyle",
  "setGlobalStyle",
  "getContent",
  "setContent",
  "on",
  "append",
  "clone",
  "render"
];

export default Tag;
