export async function withRetry<T>(
  cb: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    if (retries <= 0) {
      console.error(`Failed after retries: ${error}`);
      throw error;
    }

    console.warn(`Retrying after ${delay}ms... Attempts left: ${retries}`);

    return new Promise<T>((res, rej) => {
      setTimeout(() => {
        withRetry(cb, retries - 1, delay * 2).then(res, rej);
      }, delay);
    });
  }
}
