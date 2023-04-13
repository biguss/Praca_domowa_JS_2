console.log("Zadanie 1A-E");
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

function createNickname(person) {
  let nickname = "";

  // tworzymy nick z 3 pierwszych liter imienia
  const firstName = person.firstName.slice(0, 3).split("").reverse().join("");

  // tworzymy nick z 3 ostatnich liter nazwiska
  const lastName = person.lastName.slice(-3).split("").reverse().join("");

  // łączymy oba nicks i pierwszą literę zmieniamy na dużą
  nickname = `${firstName}${lastName}`;
  nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();

  // jeśli nick ma mniej niż 3 znaki, to skracamy go o tyle znaków
  if (nickname.length < 3) {
    nickname =
      nickname.slice(0, nickname.length - 1) +
      person.lastName.charAt(0).toUpperCase();
  }

  return { ...person, nickname };
}

const peopleWithNicknames = people.map(createNickname);

console.log(peopleWithNicknames);
