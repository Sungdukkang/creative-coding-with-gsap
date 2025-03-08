class ColorStore {
  constructor() {
    if (ColorStore.instance) {
      return ColorStore.instance;
    }

    this.colors = {};
    this.init();

    ColorStore.instance = this;
  }

  init() {
    // Helper function to get CSS variable value
    const getVariable = (variable) => getComputedStyle(document.body).getPropertyValue(variable);

    this.colors = {
      textPrimary: getVariable("--theme--text-primary"),
      textSecondary: getVariable("--theme--text-secondary"),
      backgroundPrimary: getVariable("--theme--bg-primary"),
      backgroundSecondary: getVariable("--theme--bg-secondary"),
      border: getVariable("--theme--border"),
    }
    console.log(this.colors);
  }
}

const colorStore = new ColorStore();
export default colorStore;