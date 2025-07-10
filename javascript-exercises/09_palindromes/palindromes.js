const palindromes = function (str) {
    let newArr = str.toLowerCase()
                    .split('')
                    .filter(x => x.match(/[a-z0-9]/i));

    let newStr = newArr.join('');
    let reverseStr = newArr.reverse().join('');

    return newStr === reverseStr;
};

// Do not edit below this line
module.exports = palindromes;
