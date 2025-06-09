export async function getStats(): Promise<number> {
  return new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random() * 1000)), 500))
}
