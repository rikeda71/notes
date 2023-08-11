// Non-null assertion
// 変数の後ろにつける`!`をNon-null assertionという。null, undefinedの型情報をインラインでふるい落とす
// 基本的に利用しない
function great(name?: string) {
  console.log(`Hello ${name!.toUpperCase()}`);
}
great(); // Runtime error

// double assertion
// これも基本的に利用しない
const myName = 0;
console.log(myName.toUpperCase()); // Compile error
// double assertionで欺く
const myNameWithTypes = (0 as any) as string;
console.log(myNameWithTypes.toUpperCase()); // Runtime error
