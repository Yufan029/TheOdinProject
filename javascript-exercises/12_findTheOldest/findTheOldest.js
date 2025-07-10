const findTheOldest1 = function(people) {
    let y = people.map(person => ({
                "diff": (person.yearOfDeath ?? new Date()).getFullYear() - person.yearOfBirth,
                person,
            }));

    y.sort((a, b) => b.diff - a.diff);
    return y[0].person;
};

function getAge(birth, death) {
    if (!death) {
        death = new Date().getFullYear();
    }

    return death - birth;
}

const findTheOldest = function (people) {
    return people.reduce((oldest, person) => {
        let oldestAge = getAge(oldest.yearOfBirth, oldest.yearOfDeath);
        let personAge = getAge(person.yearOfBirth, person.yearOfDeath);
        return personAge > oldestAge ? person : oldest;
    });
}

// Do not edit below this line
module.exports = findTheOldest;
