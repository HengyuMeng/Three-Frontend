'use strict';
/////////////////////////////////////////////////
// Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE 不会修改原数组
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// SPLICE 会修改原数组
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE 同样会修改原数组
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT 连接数组，数组有很多方法，需要用的时候可以在MDN上查看
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));


///////////////////////////////////////
// The new at Method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
// at方法更加易读和更易使用（可以取负数，有slice的逻辑
// at方法适用于可迭代对象，也就是说不仅可以用于数组，也可以用于字符串
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));


///////////////////////////////////////
// Looping Arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements)
//.entries方法适用于可迭代对象，数组和map（相当于字典）都能使用
for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
}

//使用forEach方法时需要注意内部回调函数参数的顺序，这个顺序是有规定的有意义的
//第一个代表数组中的具体数字，第二个代表索引，第三个代表整个数组
console.log('---- FOREACH ----');
movements.forEach(function (mov, i, arr) {
    if (mov > 0)
    {
        console.log(`Movement ${i + 1}: You deposited ${mov}`);
    }
    else
    {
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
});

// forEach With Maps and Sets
// Map
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
    console.log(`${value}: ${value}`);
});


///////////////////////////////////////
//下面给出三种操作数组的新方法，非常实用

// The map Method
//和forEach遍历元素相似，但是不同点在于map方法
// 对数组中的每一个元素进行指定处理后可以返回一个处理后的新的数组
const eurToUsd = 1.1;

//常规函数写法
const movementsUSD = movements.map(function (mov) {
    return mov * eurToUsd;
});

//箭头函数的写法（更简洁
const movementsUSD = movements.map(mov => mov * eurToUsd);

//不使用map的传统写法，可以看到比较麻烦，我们还需要手动创建一个新数组
//而使用map方法可以直接返回处理后的新数组
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

//一个例子
const movementsDescriptions = movements.map(
    (mov, i) =>
        `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
            mov
        )}`
);

///////////////////////////////////////
// The filter Method
//与map类似，返回一个新的处理后的数组，而filter方法可以对数组进行指定条件下的过滤
const deposits = movements.filter(function (mov) {
    return mov > 0;
});

//不使用filter的传统写法
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

//箭头函数写法
const withdrawals = movements.filter(mov => mov < 0);


///////////////////////////////////////
// The reduce Method
console.log(movements);

// accumulator -> SNOWBALL
//注意回调函数中每个参数的含义：acc：累加器 cur：当前值 i：索引值 arr：原数组
//reduce（function，initial value）函数有两个参数，一个是回调函数，一个是初始值
//reducer函数的每次返回值被分配给累加器❤
//累加器的值在整个数组的每次迭代中都被记住，并最终成为最终的单个结果值
const balance = movements.reduce(
    function (acc, cur, i, arr) {
        console.log(`Iteration ${i}: ${acc}`);
        return acc + cur;
    }, 0);

//箭头函数写法
const balance = movements.reduce((acc, cur) => acc + cur, 0);

//传统写法，定义初始值 使用for of 进行累加
let balance2 = 0;
for (const mov of movements) balance2 += mov;

// Maximum value
//因为reducer函数的每次返回值被分配给累加器，所以可以把当前值与累加器的值相比较
//然后最后返回出最大的值
const max = movements.reduce((acc, mov) => {
    if (acc > mov)
        return acc;

    //这里的逻辑是：如果当前值大于累加器的值，
    // 那么把当前值赋给累加器，之后继续进行比较
    else
        return mov;
}, movements[0]);

