// type guard
// typeof 演算子によって、型が一致した条件分岐ブロック内では、型に絞り込み推論が適応されている
function reset(value: number | string | boolean) {
  const v0 = value; // string | number | boolean
  if (typeof value === 'number') {
    const v1 = value; // v1: number
    return 0;
  }
  const v2 = value; // const v2: string | boolean
  if (typeof v2 === 'string') {
    const v3 = value; // v3: string
    return '';
  }
  const v4 = value; // const v4: boolean
  return false;
}

console.log(reset(1));
console.log(reset('1'));
console.log(reset(true));

// in type guards
// typeのなかに含まれているプロパティによって、型の絞り込みができる
type User = { gender: string };
type UserA = User & { name: string };
type UserB = User & { age: number; graduate: string };

function judgeUserType(user: UserA | UserB) {
  if ('gender' in user) {
    const u0 = user; // const u0: UserA | UserB
    console.log('user type is UserA | UserB');
  }
  if ('name' in user) {
    const v1 = user; // const v1: UserA
    console.log('user type is UserA');
    return;
  }
  const u2 = user;
  console.log('user type is UserB');
}

// instanceof type guards
// instanceof 演算子によって、インスタンスがどのクラスなのかを判別して型の絞り込みができる
class Creature {
  breathe() {}
}

class Animal extends Creature {
  shakeTail() {}
}

class Human extends Creature {
  greet() {}
}

function action(creature: Animal | Human | Creature) {
  const c0 = creature;
  c0.breathe(); // no error
  if (creature instanceof Animal) {
    const c1 = creature; // const c1: Animal
    return c1.shakeTail();
  }
  const c2 = creature; // const c2: Human | Animal
  if (creature instanceof Human) {
    const c3 = creature; // const c3: Human
    return c3.greet();
  }
  const c4 = creature; // const c4: Creature
  return c4.breathe();
}
