const button = tags.button`
  --base-color: #5779da;

  height: 36px;
  padding: 0 16px;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--base-color);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  &[primary] {
    background-color: var(--base-color);
    color: white;
  }

  &[primary]:hover {
    background-color: #2f4fa9;
  }

  &[secondary] {
    background-color: transparent;
  }

  &[secondary]:hover {
    background-color: #f2f2f2;
  }

  &:disabled {
    background-color: #CCCCCC;
    color: #333;
  }
`.setGlobalStyle();

export default id => {
  const element = button.clone();

  if (id) element.setAttribute("id", id);

  return element;
};
