import Menu from "./menu";

const h3 = tags.h3`
  font-size: 48px;
  font-weight: normal;
`;

const title = h3.clone().setContent(() => {
  /**
   * Example of dynamic content
   * @returns {String}
   */
  const page = (window.location.hash || "#home").replace("#", "");
  return `Página: /${page}`;
});

export default tags.header.setContent([title, Menu]);
