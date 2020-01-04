class navBar {
  constructor(whatElementToRenderTo) {
    this.visible = false;
    this.renderToElement = $(whatElementToRenderTo)
  }

  setVisibility(state = true) {
    this.visible = state
    this.renderToElement.innerHTML = this.render()
  }

  render() {
    return `
      <nav class="navbar flex flex-space-between ${this.visible ? '' : 'hidden'}">
        <button type="button">&#128196;</button>
        <button type="button">&#128269;</button>
        <button type="button" class="button-round">&#10133;</button>
        <button class="favorite-btn" type="button">&#10025;</button>
        <button type="button">&#128100;</button>
      </nav> 
    `
  }
}