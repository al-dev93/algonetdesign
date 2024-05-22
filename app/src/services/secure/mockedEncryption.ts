export async function generateKey() {
  return window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}

export async function encryptEmail(email: string, key: CryptoKey) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Génération d'un IV
  const encoder = new TextEncoder();
  const encodedEmail = encoder.encode(email);
  const encryptedData = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedEmail);
  return {
    encryptedEmail: btoa(String.fromCharCode(...new Uint8Array(encryptedData))),
    iv: btoa(String.fromCharCode(...iv)),
  };
}

export async function decryptData(encryptedData: string, iv: string, key: CryptoKey) {
  const encryptedBuffer = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));
  const ivBuffer = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
  const decryptedData = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuffer }, key, encryptedBuffer);
  return new TextDecoder().decode(decryptedData);
}
