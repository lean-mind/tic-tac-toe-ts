import type {Statistics} from './statistics.ts'

export class StatisticsComponent {
  constructor(private statisticsElement: HTMLElement) {}

  renderFor(statistics: Statistics) {
    const totalPlayerWinsElement = this.statisticsElement.querySelector(
      '#playerstat1',
    ) as HTMLElement
    totalPlayerWinsElement.textContent = `${statistics.totalPlayerWins}`
    const totalComputerWinsElement = this.statisticsElement.querySelector(
      '#computerstat1',
    ) as HTMLElement
    totalComputerWinsElement.textContent = `${statistics.totalComputerWins}`
    const totalPlayerLosesElement = this.statisticsElement.querySelector(
      '#loss1',
    ) as HTMLElement
    totalPlayerLosesElement.textContent = `${statistics.totalComputerWins}`
    const totalComputerLosesElement = this.statisticsElement.querySelector(
      '#loss2',
    ) as HTMLElement
    totalComputerLosesElement.textContent = `${statistics.totalPlayerWins}`
    const totalPlayerDrawsElement = this.statisticsElement.querySelector(
      '#draw1',
    ) as HTMLElement
    totalPlayerDrawsElement.textContent = `${statistics.totalDraws}`
    const totalComputerDrawsElement = this.statisticsElement.querySelector(
      '#draw2',
    ) as HTMLElement
    totalComputerDrawsElement.textContent = `${statistics.totalDraws}`
  }
}
