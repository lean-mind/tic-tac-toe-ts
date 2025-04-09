import type {AiLevel} from "./level.ts";

export class AiSelectComponent {
  constructor(
    private aiSelectElement: HTMLSelectElement,
    private onSelect: (value: AiLevel) => void,
  ) {
    this.aiSelectElement.addEventListener('change', () => {
      this.onSelect(this.aiSelectElement.value as AiLevel)
    })
  }

  render(disabled = false) {
    this.aiSelectElement.disabled = disabled
  }
}
