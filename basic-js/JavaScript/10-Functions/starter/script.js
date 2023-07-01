'use strict';
///////////////////////////////////////
// Default Parameters
const bookings = [];

const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    // ES5
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);

};

createBooking('LH123');
createBooking('LH123', 2, 800);

//当需要跳过一个值进行赋值时，中间那个跳过的值需要传入undefined
createBooking('LH123', undefined, 1000);

//按值传递时，函数参数和原始变量占用不同的内存空间，而按引用传递时，函数参数和原始变量共享同一个内存空间
//在javascript中，函数参数的传递都是按值传递的，下面链接详细解释了两种参数传递的区别
// https://pediaa.com/what-is-the-difference-between-pass-by-value-and-pass-by-reference/


///////////////////////////////////////
// Functions Accepting Callback Functions
//一个函数A接受另一个函数B作为参数，在函数A体内调用B，达到代码目的
const upperFirstWord = function (str)
{
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);

///////////////////////////////////////
// Functions Returning Functions
//闭包
const greet = function (greeting)
{
    return function (name)
    {
        console.log(`${greeting} ${name}`);
    };
};

//greetHey也是一个函数（greet函数的返回函数）
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Mike');

///////////////////////////////////////
// The call and apply Methods
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    },
};

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

//存一个lufthansa对象的book（）函数，可以避免重写，但是需要注意的是this的指向
//直接调用book(23, 'Sarah Williams');是错误的，因为没有显示指出this的指向
const book = lufthansa.book;

// 使用Call method来显示的将this指向某个对象
book.call(eurowings, 23, 'Sarah Williams');

book.call(lufthansa, 239, 'Mary Cooper');

//使用...操作符拆包，之后调用call函数
const flightData = [583, 'George Cooper'];
book.call(eurowings, ...flightData);

////////////////////////////////////////////////////
//除了call（）函数，我们还可以用另外一种函数：bind（）函数：
// The bind Method bind函数调用后返回一个新的函数
//下面是一个和bind函数等价的示例（直观的理解bind函数返回一个函数）
const addTaxRate = function (rate)
{
    return function (value)
    {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

//bind（）函数不仅可以指定this，还可以指定默认参数
const bookEW = book.bind(eurowings);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');

//使用bind函数设置默认参数：
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//当我们不关心this的指向时，直接把它设置为null
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(23));

//bind函数在Event Listener中的用法：
//先为lufthansa增加一个属性和一个方法
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    this.planes++;
    console.log(this.planes);
};

//添加Event Listener：
//不用call（）的原因是，这个函数会直接调用函数
//而Event Listener需要传入一个待调用函数而不是直接调用它
//这个时候就需要bind（）函数，因为调用它后他会返回一个函数，符合Event Listener
document.querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
//立即执行函数表达式：https://blog.csdn.net/weixin_43876206/article/details/106025126#:~:text=%E3%80%90%E5%89%8D%E7%AB%AF%20%E6%95%99%E7%A8%8B%E3%80%91%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%20%E8%AF%A6%E8%A7%A3%201%201%E3%80%81%E5%AE%9A%E4%B9%89%20%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%20%EF%BC%9A%E5%A3%B0%E6%98%8E%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%EF%BC%8C%E5%B9%B6%E9%A9%AC%E4%B8%8A%E8%B0%83%E7%94%A8%E8%BF%99%E4%B8%AA%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0%E5%B0%B1%E5%8F%AB%E5%81%9A%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%EF%BC%9B%E5%8D%B3%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E6%98%AF%E5%AE%9A%E4%B9%89%E5%87%BD%E6%95%B0%E4%BB%A5%E5%90%8E%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E8%AF%A5%E5%87%BD%E6%95%B0%E3%80%82%202,6%E3%80%81%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E7%9A%84%E5%8F%82%E6%95%B0%20...%207%207%E3%80%81%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC%20...%208%208%E3%80%81%E6%80%BB%E7%BB%93%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E4%BD%9C%E7%94%A8%EF%BC%9F%20
// IIFE
(function () {
    console.log('This will never run again');
    const isPrivate = 23;
})();

//IIFE会形成一个单独的作用域，可以避免全局变量名污染
//它的应用之一是初始化网页，一些变量只用一次，这时使用IIFE可以避免全局变量名污染

(() => console.log('This will ALSO never run again'))();

{
    const isPrivate = 23;
    var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

/////////////////////////////////
//闭包
const secureBooking = function ()
{
    let passengerCount = 0;

    return function ()
    {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();

//在这里，每调用一次booker passengerCount的数量都会加一
//有趣的是即使在调用栈中secureBooking（）这个函数已经销毁了
//我们依然可以操作passengerCount这个变量
//即 闭包函数可以访问已销毁的父物体中的变量
booker();
booker();
booker();

const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);