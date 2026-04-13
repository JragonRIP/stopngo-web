/** Weekday-oriented pickup labels; kitchen interprets day/context. */
export function buildPickupTimeOptions(): string[] {
  const options: string[] = ["ASAP, next available window"];
  for (let minutes = 4 * 60 + 30; minutes < 16 * 60; minutes += 15) {
    const h24 = Math.floor(minutes / 60);
    const m = minutes % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 > 12 ? h24 - 12 : h24 === 0 ? 12 : h24;
    const label = `${h12}:${m === 0 ? "00" : String(m).padStart(2, "0")} ${period}`;
    options.push(label);
  }
  return options;
}
