import "./assets/styles/global.css";

window.onload = () => {
  new Router(
    {
      default: import("./views/default"),
      about: import("./views/about")
    },
    document.querySelector("#root")
  );
};
