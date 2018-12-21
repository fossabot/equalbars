const link = tags.a`
  display: block;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  
  font-weight: bold;
`;

const listItem = tags.li`
  
`;

const menu = tags.ul`
  display: flex;
`;

const index = link
  .clone()
  .setContent("Home")
  .setAttribute("href", "#");

const about = link
  .clone()
  .setContent("Sobre")
  .setAttribute("href", "#about");

const generateMenu = items =>
  items.map(item => listItem.clone().setContent(item));

export default menu.setContent(generateMenu([index, about]));
