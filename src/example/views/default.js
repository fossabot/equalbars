import Header from "../includes/header";
import Button from "../components/button";

const root = tags.div`
  display:grid;
  grid-gap: 20px;
`.setAttribute("id", "root");

const btnExampleOne = Button("button-1")
  .setAttribute("primary")
  .setContent("BUTTON")
  .setStyle({
    variables: {
      baseColor2: "purple",
      baseColor3: "purple"
    },
    "&[primary]": {
      backgroundColor: "var(--base-color2)"
    },
    "&:hover": {
      backgroundColor: "var(--base-color2)"
    }
  })
  .on("click", event => {
    console.log("clicked on button");
  });

const btnExampleTwo = Button("button-2")
  .setStyle({
    variables: {
      baseColor: "green"
    }
  })
  .setContent("BUTTON 2");

const btnExampleThree = Button("button-3")
  .setAttribute("secondary")
  .setContent("BUTTON 3");

const btnExampleFour = Button("button-4")
  .setStyle({
    "&[disabled]": {
      backgroundColor: "#333",
      color: "#ccc"
    }
  })
  .setAttribute("disabled")
  .setContent("BUTTON 3");

export default root.setContent([
  Header,
  btnExampleOne,
  btnExampleTwo,
  btnExampleThree,
  btnExampleFour
]);
