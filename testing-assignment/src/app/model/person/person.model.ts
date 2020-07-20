export class Person {
  constructor(
    public name?: string,
  ) {
  }

  sayHello(): string {
    return `Hi, ${this.name}`;
  }
}
