type Comparator = (a: number, b: number) => boolean

export class MovementStrategy {
  private constructor(
    public score: number,
    public readonly compare: Comparator,
  ) {}

  static from(aiLevel: string) {
    switch (aiLevel) {
      case 'easy':
        return new MovementStrategy(Number.POSITIVE_INFINITY, (a, b) => a < b)
      case 'medium':
        return Math.random() * 100 <= 40
          ? new MovementStrategy(Number.POSITIVE_INFINITY, (a, b) => a < b)
          : new MovementStrategy(Number.NEGATIVE_INFINITY, (a, b) => a > b)
      case 'hard':
        return new MovementStrategy(Number.NEGATIVE_INFINITY, (a, b) => a > b)
    }
    return new MovementStrategy(0, (a, b) => a > b)
  }
}
