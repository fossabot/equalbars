import types from "../types";
import domElements from "./domElements";

const isEmpty = val => val == null || !(Object.keys(val) || val).length;

const compact = arr => arr.filter(Boolean);

const toCamelCase = str => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-");

const guid = type => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return `${type}_${s4()}`;
};

const css = {
  toJSON(style = []) {
    let json = {
      variables: {}
    };
    let props = style.toString().split("\n");

    props = compact(props);

    const getProp = line => {
      const [key, value] = line.replace(";", "").split(":");

      if (key && value) {
        let propName = toCamelCase(key.trim());
        let propValue = value.replace(/^ /, "").replace(/ $/, "");
        if (key.trim().startsWith("--")) propName = `--${propName}`;

        return { [propName]: propValue };
      } else {
        return {};
      }
    };

    let nline = 0;
    for (; nline < props.length; nline++) {
      let line = props[nline];
      if (line.trim().startsWith("--")) {
        json.variables = { ...json.variables, ...getProp(line) };
      } else if (line.includes(";")) {
        // has property
        json = { ...json, ...getProp(line) };
      } else if (line.includes("{")) {
        // has condition
        const condition = line.replace("{", "").trim();
        if (isEmpty(json[condition])) json[condition] = {};

        while (!line.includes("}")) {
          nline++;
          line = props[nline];

          json[condition] = { ...json[condition], ...getProp(line) };
        }
      }
    }

    return json;
  },
  parseJSON(style = {}) {
    let css = "";

    const getProp = prop => {
      if (prop.constructor === String) {
        return `${toKebabCase(prop)}: ${style[prop]};`;
      } else {
        let subprop = "";
        for (const sub in prop) subprop += `${toKebabCase(sub)}: ${prop[sub]};`;
        return subprop;
      }
    };

    const getVars = props => {
      let subprop = "";
      for (const sub in props)
        subprop += `--${toKebabCase(sub)}: ${props[sub]};`;
      return subprop;
    };

    for (const prop in style) {
      if (prop.includes("&")) {
        css += `${prop} { ${getProp(style[prop])} }`;
      } else if (prop === "variables") {
        css += getVars(style[prop]);
      } else {
        css += getProp(prop);
      }
    }

    return css;
  },
  extract(identifier, attributes, style = {}, conditions = []) {
    if (isEmpty(style) && isEmpty(conditions)) return;

    let tagStyle = document.querySelector(`style[id="${identifier}"]`);

    if (!tagStyle) {
      tagStyle = document.createElement("style");
      tagStyle.id = identifier;
      tagStyle.type = "text/css";
    }

    if (!isEmpty(style)) {
      let parsedStyle = compact(css.parseJSON(style).split("&"));
      if (!isEmpty(parsedStyle)) {
        for (const stl of parsedStyle) {
          if (stl.includes("{")) {
            tagStyle.innerText += `.${identifier}${stl}`;
          } else {
            tagStyle.innerText += `.${identifier} { ${stl} }`;
          }
        }

        document.head.appendChild(tagStyle);
      }
    }
  }
};

const child = {
  parse(data) {
    if (!data) return [];

    if (data.constructor === Array) {
      if (data.length === 0) return [];
      return data.map(value => child.transform(value));
    } else {
      return [child.transform(data)];
    }
  },
  transform(value) {
    if (typeof value !== "object" && typeof value !== "function")
      return document.createTextNode(value);

    return value;
  },
  render(data = []) {
    return data.map(value => {
      if (value.$$typeof === types.TAG_ELEMENT) {
        return value.render();
      } else if (value.constructor === Function) {
        return document.createTextNode(value());
      } else {
        return value;
      }
    });
  }
};

export {
  guid,
  domElements,
  css,
  child,
  isEmpty,
  compact,
  toCamelCase,
  toKebabCase
};
