const numberEmojies = [
  ":zero:",
  ":one:",
  ":two:",
  ":three:",
  ":four:",
  ":five:",
  ":six:",
  ":seven:",
  ":eight:",
  ":nine:"
];
const emotify = int => {
  const emotified = String(int)
    .split("")
    .map(singleDigit => numberEmojies[singleDigit]);

  return emotified.join("");
};
export const getDaysHoursMinsSecs = from => {
  const now = Math.floor(new Date() / 1000);
  let seconds = now - from;
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  const mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;

  return `${emotify(Math.floor(days))} gün, ${emotify(
    Math.floor(hrs)
  )} saat, ${emotify(Math.floor(mnts))} dakika, ${emotify(
    Math.floor(seconds)
  )} saniye`;
};
