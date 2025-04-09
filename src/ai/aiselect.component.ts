export class AiSelectComponent {
  constructor(private aiSelectElement: HTMLSelectElement) {}

  render(disabled = false) {
    if (disabled) {
      this.aiSelectElement.disabled = true
    }
  }
}
