export function doesURLincludeValidPath(str: string, values: string[]) {
  for (let i = 0; i < values.length; i++) {
    if (str.includes(values[i])) {
      return true;
    }
  }

  return false;
}
