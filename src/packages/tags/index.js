import Tag from "./lib/tag";
import { domElements } from "./utils/index";

(tags => {
  const generate = tag => {
    const fn = (style, ...conditions) => Tag(tag, style, conditions);

    for (const prop of Tag.actions) {
      fn[prop] = (value, ...args) => fn()[prop].call(null, value, ...args);
    }

    return fn;
  };

  for (const element of domElements) tags[element] = generate(element);
})((window.tags = {}));
