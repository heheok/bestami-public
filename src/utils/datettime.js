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
const emotify = int =>
  String(int)
    .split("")
    .map(singleDigit => numberEmojies[singleDigit])
    .join("");

export const getToDaysHoursMinsSecs = from => {
  const now = Math.floor(new Date() / 1000);
  let seconds = from - now;
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days >= 0 ? days * 3600 * 24 : 0;
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs >= 0 ? hrs * 3600 : 0;
  const mnts = Math.floor(seconds / 60);
  seconds -= mnts >= 0 ? mnts * 60 : 0;

  return `${emotify(days >= 0 ? days : 0)} gün, ${emotify(
    hrs >= 0 ? hrs : 0
  )} saat, ${emotify(mnts >= 0 ? mnts : 0)} dakika, ${emotify(
    Math.floor(seconds)
  )} saniye`;
};

export const getPassedDaysHoursMinsSecs = from => {
  const now = Math.floor(new Date() / 1000);
  let seconds = now - from;
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  const mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;

  return `${emotify(days)} gün, ${emotify(hrs)} saat, ${emotify(
    mnts
  )} dakika, ${emotify(Math.floor(seconds))} saniye`;
};
