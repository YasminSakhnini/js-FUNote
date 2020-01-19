//Helper Functions
export function $(selector) {
  return document.querySelectorAll(selector)[0]
}

export function timeString() {
  return new Date().toLocaleString('se')
}

export function create(element) {
  return document.createElement(element)
}
// End of helperss