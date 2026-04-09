export type CustomerAuthCapability = {
  requestedMode: string;
  isAvailable: boolean;
  message: string;
};

const requestedMode =
  process.env.NEXT_PUBLIC_AUTH_MODE?.trim().toLowerCase() || "disabled";

const unavailableMessage =
  requestedMode === "real"
    ? "Mijozlar uchun kirish va ro‘yxatdan o‘tish bu serverda hali faollashtirilmagan. Saytdan foydalanish davom etadi, lekin hisob yaratish va kirish hozircha ishlamaydi."
    : "Mijozlar uchun kirish va ro‘yxatdan o‘tish hozircha yoqilmagan.";

export const customerAuthCapability: CustomerAuthCapability = {
  requestedMode,
  isAvailable: false,
  message: unavailableMessage,
};

export function createCustomerAuthUnavailableError() {
  return new Error(customerAuthCapability.message);
}
