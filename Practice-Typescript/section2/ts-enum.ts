// enum 列挙型
// number enum
enum Direction {
  Up, // (enum member) Direction.Up = 0;
  Down, // (enum member) Direction.Down = 1;
  Left, // (enum member) Direction.Left = 2;
  Right, // (enum member) Direction.Right = 3;
}
const left = Direction.Left;

// string enum
enum Ports {
  USER_SERVICE = '8080',
  REGISTER_SERVICE = '8081',
  MEDIA_SERVICE = '8888',
}
/* 上は以下のように定義してもいい
enum Ports {
  USER_SERVICE = '8080',
}
enum Ports {
  REGISTER_SERVICE = '8081',
}
enum Ports {
  MEDIA_SERVICE = '8888',
}
*/
