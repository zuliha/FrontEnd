//1.使用commonjs的模块化的规范
const { add, mul } = require('./mathUtil') //利用require导入
console.log(add(20, 30));
console.log(mul(20, 30));

//2. 使用ES6的模块化的规范
import { name, age, height } from "./info";
console.log(name);
console.log(age);
console.log(height);

//3.依赖css文件
require('./css/style.css');
// 4.依赖less文件
require('./css/special.less');
document.writeln('<h2>hello world</h2>')