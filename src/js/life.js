const getSmiley = () => {
  const livingThings = [
    "🍏",
    "🌱",
    "🌿",
    "☘️",
    "🍃",
    "🌲",
    "🌳",
    "🦔",
    "🐐",
    "🪲",
    "🪳",
    "🦆",
    "🐟",
    "🐬",
    "🐖",
    "🐔",
    "🦉",
    "🦑",
    "🦐",
    "🦀",
    "🪰",
    "🐜",
    "🐞",
    "🐌",
    "🦋",
    "🐝",
    "🪼",
    "🐋",
    "🐂",
    "🦨",
    "🦦",
    "🦢",
    "🐿️",
    "🌸",
    "🌼",
    "🌻",
    "🌺",
  ];

  const index = Math.floor(Math.random() * livingThings.length);
  return livingThings[index];
};

const beings = document.getElementsByClassName("separator-being");

for (let i = 0; i < beings.length; i++) {
  beings[i].innerHTML = getSmiley();
}
