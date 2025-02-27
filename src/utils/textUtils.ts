/**
 * Shortens the given address by removing the middle part of it.
 * @param address - The address to shorten.
 * @returns The shortened address.
 * @example
 * shortenAddress('0:1234567890abcdef123')
 * // => '0:12...cdef'
 */
export const shortenAddress = (address: string) =>
  address.length > 10
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : address;
