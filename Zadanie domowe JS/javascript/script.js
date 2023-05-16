const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
];

const people2 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
  },
];
const people3 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself: "", // funkcja zamiast pustego stringa
  },
];

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

const nestedObject = {
  name: "Kamil",
  children: [
    {
      name: "Zosia",
    },
    {
      name: "Krysia",
      name2: "Barbara",
      children: [
        {
          name: "Basia",
          children: [
            {
              name: "Monika",
              name2: "Viola",
              children: [
                {
                  name: "Mateusz",
                },
                {
                  name: "Sebastian",
                  name2: "August",
                  name3: "Franciszek",
                  children: [
                    { name: "Alex" },
                    { name: "Stasio" },
                    {
                      name: "Paulina",
                      children: [{ name: "Kuba" }, { name: "Kacper" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Zadanie 1
const addNickname = (person) => {
  const { firstName, lastName } = person;
  let nickname = "";

  if (firstName.length >= 3) {
    const reversedFirstName = firstName
      .slice(0, 3)
      .split("")
      .reverse()
      .join("");
    nickname += reversedFirstName;
  } else {
    nickname += firstName;
  }

  if (lastName.length >= 3) {
    const reversedLastName = lastName.slice(-3).split("").reverse().join("");
    nickname += reversedLastName;
  } else {
    nickname += lastName;
  }

  person.nickname =
    nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();

  return person;
};

const peopleWithNickname = people.map(addNickname);
console.log(peopleWithNickname);

// Zadanie 2
people2.forEach((person) => {
  person.introduceYourself = function () {
    console.log(
      `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie [${this.nickname}]`
    );
  };
});

people2[0].introduceYourself();

// Zadanie 3
people3.forEach((person) => {
  person.introduceYourself = function () {
    console.log(
      `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie [${this.nickname}]`
    );
  };

  person.getFavouriteColor = function (number = 5) {
    if (number < 1) {
      console.log(
        "Podałeś za małą liczbę. Liczba nie może być mniejsza niż 1."
      );
      return;
    }

    if (number > 30) {
      console.log(
        "Podałeś za dużą liczbę. Liczba nie może być większa niż 30."
      );
      return;
    }

    const fullName = this.firstName + this.lastName + this.nickname;
    const sum = Array.from(fullName).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const index = Math.abs(sum - number) % colors.length;
    console.log(colors[index]);
  };
});

people3[0].introduceYourself();
people3[0].getFavouriteColor();
people3[0].getFavouriteColor(8);

// Zadanie 4
const getColorByNumber = (person, number = 5) => {
  if (number < 1) {
    console.log("Podałeś za małą liczbę. Liczba nie może być mniejsza niż 1.");
    return;
  }

  if (number > 30) {
    console.log("Podałeś za dużą liczbę. Liczba nie może być większa niż 30.");
    return;
  }

  const fullName = person.firstName + person.lastName + person.nickname;
  const sum = Array.from(fullName).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const index = Math.abs(sum - number) % colors.length;
  console.log(colors[index]);
};

people3.forEach((person) => getColorByNumber(person));

// 5. Zadanie:

const filteredPeople = people
  .filter(
    (person) =>
      (person.firstName.endsWith("a") || person.firstName.endsWith("k")) &&
      person.lastName.length > 6 &&
      person.nickname.includes("a")
  )
  .map((person) => ({ ...person }));

const filteredPeopleWithIsElite = filteredPeople.map((person) => ({
  ...person,
  isElite:
    Math.random() % 2 === 0 ||
    (Math.random() % 3 === 0 && Math.random() % 5 === 0),
}));

const filteredPeopleForElite = filteredPeopleWithIsElite.filter(
  (person) => person.isElite
);

const reversedObject = filteredPeopleForElite.map((person) => {
  const newObj = {};
  for (const key in person) {
    if (person.hasOwnProperty(key) && typeof person[key] !== "function") {
      newObj[person[key]] = key;
    }
  }
  return newObj;
});

const reducedObject = reversedObject.reduce(
  (accumulator, currentValue) => ({ ...accumulator, ...currentValue }),
  {}
);

const sortedArray = Object.entries(reducedObject)
  .sort()
  .reduce((accumulator, [key, value]) => {
    accumulator[key] = value;
    return accumulator;
  }, {});

console.log(sortedArray);

// 6. Currying function
const multi = (a) => (b) => a * b;

console.log(multi(5)(6)); // Output: 30

const multiFour = (a) => (b) => (c) => (d) => a * b * c * d;

console.log(multiFour(4)(5)(6)(10)); // Output: 1200

// 7. Rekurencja
const extractNames = (obj) => {
  let names = [];
  if (obj.name) {
    names.push(obj.name);
  }
  if (obj.name2) {
    names.push(obj.name2);
  }
  if (obj.name3) {
    names.push(obj.name3);
  }
  if (obj.children) {
    obj.children.forEach((child) => {
      names = names.concat(extractNames(child));
    });
  }
  return names;
};

const namesArray = extractNames(nestedObject);
console.log(namesArray);
