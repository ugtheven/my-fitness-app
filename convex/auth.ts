const toHex = (buf: Uint8Array): string =>
  Array.from(buf)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const fromHex = (hex: string): Uint8Array =>
  new Uint8Array(hex.match(/.{2}/g)!.map((b) => parseInt(b, 16)));

// Creates a clean ArrayBuffer copy — avoids issues with Convex's V8 runtime
// where .buffer.slice() can return an ambiguous ArrayBufferLike.
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buf = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buf).set(bytes);
  return buf;
}

export async function hashPassword(password: string): Promise<string> {
  const saltBytes = new Uint8Array(16);
  crypto.getRandomValues(saltBytes);

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: toArrayBuffer(saltBytes), iterations: 100_000, hash: 'SHA-256' },
    key,
    256,
  );

  return `pbkdf2:${toHex(saltBytes)}:${toHex(new Uint8Array(hash))}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [, saltHex, expectedHex] = stored.split(':');
  const saltBytes = fromHex(saltHex);

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: toArrayBuffer(saltBytes), iterations: 100_000, hash: 'SHA-256' },
    key,
    256,
  );

  return toHex(new Uint8Array(hash)) === expectedHex;
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return toHex(bytes);
}
