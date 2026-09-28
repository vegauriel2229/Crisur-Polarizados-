const E164_WITHOUT_PLUS = /^[1-9]\d{7,14}$/;

export class InvalidPhoneNumberError extends Error {
  constructor(phoneNumber: string) {
    super(`Invalid WhatsApp number "${phoneNumber}": expected E.164 digits without '+' (8–15 digits).`);
    this.name = 'InvalidPhoneNumberError';
  }
}

/**
 * Se evalúa en build time: un número inválido rompe el build en vez de publicar links rotos.
 * @throws {InvalidPhoneNumberError}
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): URL {
  if (!E164_WITHOUT_PLUS.test(phoneNumber)) {
    throw new InvalidPhoneNumberError(phoneNumber);
  }
  const url = new URL(`https://wa.me/${phoneNumber}`);
  url.searchParams.set('text', message);
  return url;
}
