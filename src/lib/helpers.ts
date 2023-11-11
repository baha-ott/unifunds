export function doesURLincludeValidPath(str: string, values: string[]) {
  for (let i = 0; i < values.length; i++) {
    if (str.includes(values[i])) {
      return true;
    }
  }

  return false;
}

export function isJSON(json: any) {
  try {
    return JSON.parse(json) && true;
  } catch (e) {
    return false;
  }
}
