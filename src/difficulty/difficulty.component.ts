import type {Difficulty} from './difficulty.ts'

export class DifficultyComponent {
  constructor(
    private aiSelectElement: HTMLSelectElement,
    private onSelect: (value: Difficulty) => void,
  ) {
    this.aiSelectElement.addEventListener('change', () => {
      this.onSelect(this.aiSelectElement.value as Difficulty)
    })
  }

  render(disabled = false) {
    this.aiSelectElement.disabled = disabled
  }
}
