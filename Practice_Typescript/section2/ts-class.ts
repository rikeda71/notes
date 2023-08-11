// class
// 宣言
class Creature {
  numberOfHands: number;
  numberOfFeet: number;
  constructor(numberOfHands: number, numberfOfFeet: number) {
    this.numberOfHands = numberOfHands;
    this.numberOfFeet = numberfOfFeet;
  }
}
const creature = new Creature(0, 4);

// 継承
class Dog extends Creature {
  bark: string;
  constructor(bark: string) {
    super(0, 4);
    this.bark = bark;
  }
  barking() {
    return `${this.bark}! ${this.bark}!`;
  }
  shakeTail() {
    console.log(this.barking());
  }
}

class Hunam extends Creature {
  name: string;
  constructor(name: string) {
    super(2, 2);
    this.name = name;
  }
  greet() {
    return `Hello! I'm ${this.name}`;
  }
  shakeHands() {
    console.log(this.greet());
  }
}
const dog = new Dog('bow-wow');
const human = new Hunam('Hanako');

// class member modifier
// public, private, protected

class HumanWithModifier extends Creature {
  protected name: string;
  constructor(name: string) {
    super(2, 2);
    this.name = name;
  }
  protected greet() {
    return `Hello! I'm ${this.name}`;
  }
  public shakeHands() {
    console.log(this.greet());
  }
}

class Taro extends HumanWithModifier {
  constructor() {
    super('Taro');
  }
  public greeting() {
    console.log(this.greet()); // greetはprotectedメンバーなので実行可能
  }
}

const taro = new Taro();
taro.greeting();
taro.greet(); // greetはprotectedメンバーなので実行不可
taro.shakeHands();
