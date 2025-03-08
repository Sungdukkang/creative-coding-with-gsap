import colorStore from "./stores/ColorStore";

export class ColorModeButton {
  constructor(onColorModeChange) {
    this.onColorModeChange = onColorModeChange;
    this.colorModeButton = document.querySelector("#color-mode-button");

    // No need to bind 'this' because we're using an arrow function
    this.colorModeButton.addEventListener("click", () => this.handleClick());
  }

  handleClick = () => {
    console.log("Color mode button clicked");

    // Toggle the color mode
    const currentColorMode = document.body.getAttribute("data-theme");
    const newColorMode = currentColorMode === "light" ? "dark" : "light";
    
    // Update the button text
    this.colorModeButton.textContent = `${newColorMode.charAt(0).toUpperCase()}${newColorMode.slice(1)}`;

    // Update the theme
    document.body.setAttribute("data-theme", newColorMode);

    // Notify the color store
    colorStore.init();

    // Call the handler to reinitialize necessary components
    if (this.onColorModeChange) {
      this.onColorModeChange();
    }
  };
}