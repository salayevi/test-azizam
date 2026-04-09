"use client"

import { colors, radius, shadows } from "@/config/design-system"
import { useAuthModal } from "../../shared/auth/AuthModalProvider"
import AuthTriggerButton from "../../shared/auth/AuthTriggerButton"

type Props = {
  accent: string
}

export default function ProductGuestCallout({ accent }: Props) {
  const { customerAuthAvailable } = useAuthModal()

  return (
    <div
      data-product-guest-callout
      className="mt-8 max-w-md p-5"
      style={{
        borderRadius: radius["2xl"],
        backgroundColor: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        boxShadow: shadows.soft,
      }}
    >
      <div
        className="text-xs font-medium uppercase tracking-[0.24em]"
        style={{ color: accent }}
      >
        Mehmon rejimi
      </div>

      <h4
        className="mt-3 text-xl font-semibold"
        style={{ color: colors.text.primary }}
      >
        {customerAuthAvailable
          ? "To‘liq imkoniyatlar uchun tizimga kiring"
          : "Hisob funksiyalari hozircha yopiq"}
      </h4>

      <p
        className="mt-3 text-sm leading-7"
        style={{ color: colors.text.secondary }}
      >
        {customerAuthAvailable
          ? "Mahsulotni savatga qo‘shish, saqlab qo‘yish va shaxsiy tanlovlarni boshqarish uchun ro‘yxatdan o‘ting yoki tizimga kiring."
          : "Savat, saqlash va shaxsiy tanlovlar mijoz auth backendda yoqilgach ochiladi. Hozircha katalogni erkin ko‘rishingiz mumkin."}
      </p>

      <div className="mt-5">
        <AuthTriggerButton
          mode={customerAuthAvailable ? "register" : "login"}
          className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          style={{
            borderRadius: radius.full,
            backgroundColor: accent,
          }}
        >
          {customerAuthAvailable ? "Ro‘yxatdan o‘tish" : "Batafsil"}
        </AuthTriggerButton>
      </div>
    </div>
  )
}
