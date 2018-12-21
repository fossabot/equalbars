class Router {
  constructor(routes, target) {
    this.routes = routes;
    this.root = target;
    window.addEventListener("hashchange", this.hashChanged.bind(this));
    this.hashChanged();
  }

  async hashChanged() {
    if (window.location.hash.length > 0) {
      const pageName = window.location.hash.substr(1);
      this.show(pageName);
    } else if (this.routes["default"]) {
      this.show("default");
    }
  }

  async show(pageName) {
    const setContent = async (value = "", clear = true) => {
      if (clear) this.root.innerHTML = "";
      if (typeof value === "string") this.root.innerHTML = value;
      else this.root.appendChild(value);
    };
    const route = this.routes[pageName];

    setContent("");
    return route.then(({ default: body }) => {
      if (body.constructor === Array) {
        for (const elm of body) setContent(elm.render(), false);
      } else {
        setContent(body.render());
      }
    });
  }
}

window.Router = Router;
