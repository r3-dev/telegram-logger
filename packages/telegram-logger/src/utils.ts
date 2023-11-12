export function symbolToString(value: symbol | string): string {
  return typeof value === 'symbol' ? value.description! : value
}
