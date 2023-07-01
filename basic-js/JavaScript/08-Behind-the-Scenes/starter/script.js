'use strict';

//learn the javascript principle

const student1 =
    {
        firstName: 'Mike',
        lastName: 'Miller',
        age: 18,
        family:['Alice','Bob'],
    };

//shallow copy
const studentCopy = Object.assign({},student1);
