// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class View {
  static deactivateSelect(element: HTMLSelectElement) {
    element.disabled = true
  }
}
