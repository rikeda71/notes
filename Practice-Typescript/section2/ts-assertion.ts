// assertion sample1
// anyをstringにダウンキャストしている
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
// assertion sample2
let strLength2: number = (someValue as string).length;
