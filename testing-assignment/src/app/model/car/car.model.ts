export class Car {
  constructor(
    public make: string,
    public model: string,
    public year: number,
    public numWheels: number) {
  }

  description(): string {
    return `This is a ${this.make} ${this.model} from ${this.year} and it has ${this.numWheels} wheels`;
  }

  getWheels(): number {
    return this.numWheels;
  }

  getAge(year): number {
    const today = new Date()
    return (today.getFullYear() - year);
  }
}
