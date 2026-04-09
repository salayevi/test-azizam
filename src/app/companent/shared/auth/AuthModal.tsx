"use client"

import { useEffect, useState } from "react"
import { useAuthModal } from "./AuthModalProvider"
import { colors, radius, shadows, zIndex } from "@/config/design-system"

export default function AuthModal() {
  const {
    isOpen,
    view,
    closeModal,
    setView,
    authenticate,
    isSubmitting,
    errorMessage,
    customerAuthAvailable,
    customerAuthMessage,
  } =
    useAuthModal()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, closeModal])

  useEffect(() => {
    if (!isOpen) {
      setEmail("")
      setPassword("")
      setFirstName("")
      setLastName("")
      setPhone("")
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0" style={{ zIndex: zIndex.modal }}>
      <button
        type="button"
        onClick={closeModal}
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: colors.overlay.modal }}
        aria-label="Modalni yopish"
      />

      <div
        className="relative z-10 flex h-full w-full text-white"
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className="auth-sheet-shell"
          style={{
            borderRight: `1px solid ${colors.border.whiteSoft}`,
            background:
              "linear-gradient(180deg, rgba(11,17,32,0.98), rgba(17,24,39,0.96))",
            boxShadow: shadows.modal,
            pointerEvents: "auto",
          }}
        >
          <div
            className="auth-sheet-side flex flex-col justify-between p-6 sm:p-8"
            style={{
              borderRight: `1px solid ${colors.border.whiteSoft}`,
              background:
                "linear-gradient(160deg, rgba(210,168,94,0.18), rgba(255,255,255,0.04))",
            }}
          >
            <div className="space-y-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em]"
                style={{
                  borderRadius: radius.full,
                  border: `1px solid ${colors.border.whiteSoft}`,
                  color: colors.text.whiteSoft,
                }}
              >
                Hisob markazi
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {view === "login" ? "Akkauntingizga kiring" : "Yangi akkaunt yarating"}
                </h2>
                <p
                  className="max-w-md text-sm leading-7 sm:text-base"
                  style={{ color: colors.text.whiteSoft }}
                >
                  Saqlanganlar, savat, buyurtmalar va profil boshqaruvi shu
                  kirish oynasi orqali ochiladi. Layout va public section
                  geometriyasi o‘zgarmaydi, faqat foydalanuvchi holati
                  boshqariladi.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  "Profil va akkaunt",
                  "Saqlanganlar va savat",
                  "Buyurtmalar va holat",
                  "Mahsulot case va video kirishlari",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4 rounded-[24px] px-4 py-3"
                    style={{
                      border: `1px solid ${colors.border.whiteSoft}`,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <span
                      className="text-xs"
                      style={{ color: colors.text.whiteSoft }}
                    >
                      {customerAuthAvailable ? "Faol" : "Tayyor, backend kutilmoqda"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-[28px] px-4 py-4 text-sm leading-6"
              style={{
                border: `1px solid ${colors.border.whiteSoft}`,
                backgroundColor: "rgba(255,255,255,0.05)",
                color: colors.text.whiteSoft,
              }}
            >
              {customerAuthAvailable
                ? "Muvaffaqiyatli kirilgach navbar akkaunt holatini ko‘rsatadi va keyingi foydalanuvchi funksiyalari shu nuqtadan ochiladi."
                : customerAuthMessage}
            </div>
          </div>

          <div className="auth-sheet-form flex h-full flex-col p-5 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p
                  className="text-sm"
                  style={{ color: colors.text.whiteSoft }}
                >
                  {view === "login"
                    ? "Mavjud foydalanuvchi akkaunti"
                    : "Mijoz akkaunti uchun boshlang‘ich ma’lumotlar"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="px-3 py-2 text-sm transition"
                style={{
                  borderRadius: radius.full,
                  border: `1px solid ${colors.border.whiteSoft}`,
                  color: colors.text.whiteSoft,
                }}
              >
                Yopish
              </button>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setView("login")}
                className="px-4 py-3 text-sm font-medium transition"
                style={{
                  borderRadius: radius.full,
                  backgroundColor:
                    view === "login"
                      ? colors.surface.white
                      : "rgba(255,255,255,0.05)",
                  color: view === "login" ? "#111111" : colors.text.whiteSoft,
                }}
              >
                Kirish
              </button>

              <button
                type="button"
                onClick={() => setView("register")}
                className="px-4 py-3 text-sm font-medium transition"
                style={{
                  borderRadius: radius.full,
                  backgroundColor:
                    view === "register"
                      ? colors.brand.primary
                      : "rgba(255,255,255,0.05)",
                  color: colors.text.white,
                }}
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>

            <div className="grid flex-1 content-start gap-4 overflow-y-auto pr-1">
              {!customerAuthAvailable ? (
                <div
                  className="rounded-[24px] px-4 py-3 text-sm leading-6"
                  style={{
                    border: `1px solid ${colors.border.whiteSoft}`,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.text.whiteSoft,
                  }}
                >
                  {customerAuthMessage}
                </div>
              ) : null}

              {view === "register" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span>Ism</span>
                    <input
                      type="text"
                      placeholder="Ali"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      disabled={!customerAuthAvailable}
                      className="w-full px-4 py-3 outline-none placeholder:text-white/30"
                      style={{
                        borderRadius: radius.xl,
                        border: `1px solid ${colors.border.whiteSoft}`,
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                    />
                  </label>

                  <label className="grid gap-2 text-sm">
                    <span>Familiya</span>
                    <input
                      type="text"
                      placeholder="Karimov"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      disabled={!customerAuthAvailable}
                      className="w-full px-4 py-3 outline-none placeholder:text-white/30"
                      style={{
                        borderRadius: radius.xl,
                        border: `1px solid ${colors.border.whiteSoft}`,
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                    />
                  </label>

                  <label className="grid gap-2 text-sm sm:col-span-2">
                    <span>Telefon</span>
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      disabled={!customerAuthAvailable}
                      className="w-full px-4 py-3 outline-none placeholder:text-white/30"
                      style={{
                        borderRadius: radius.xl,
                        border: `1px solid ${colors.border.whiteSoft}`,
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                    />
                  </label>
                </div>
              ) : null}

              <label className="grid gap-2 text-sm">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={!customerAuthAvailable}
                  className="w-full px-4 py-3 outline-none placeholder:text-white/30"
                  style={{
                    borderRadius: radius.xl,
                    border: `1px solid ${colors.border.whiteSoft}`,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span>Parol</span>
                <input
                  type="password"
                  placeholder="Parol"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={!customerAuthAvailable}
                  className="w-full px-4 py-3 outline-none placeholder:text-white/30"
                  style={{
                    borderRadius: radius.xl,
                    border: `1px solid ${colors.border.whiteSoft}`,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                />
              </label>

              <div
                className="rounded-[24px] px-4 py-3 text-sm leading-6"
                style={{
                  border: `1px solid ${colors.border.whiteSoft}`,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: colors.text.whiteSoft,
                }}
              >
                {view === "login"
                  ? "Kirish muvaffaqiyatli bo‘lsa, akkaunt holati navbar orqali aks etadi."
                  : "Ro‘yxatdan o‘tish formasi haqiqiy backend mavjud bo‘lganda shu maydonlar bilan ishlaydi."}
              </div>

              <button
                type="button"
                onClick={() =>
                  void authenticate({
                    mode: view,
                    firstName,
                    lastName,
                    phone,
                    email,
                    password,
                  })
                }
                className="w-full px-4 py-3 font-medium text-black transition hover:scale-[1.01]"
                style={{
                  borderRadius: radius.xl,
                  backgroundColor: colors.surface.white,
                }}
                disabled={isSubmitting || !customerAuthAvailable}
              >
                {!customerAuthAvailable
                  ? "Hozircha mavjud emas"
                  : isSubmitting
                    ? "Yuklanmoqda..."
                    : view === "login"
                      ? "Kirish"
                      : "Ro‘yxatdan o‘tish"}
              </button>

              {errorMessage ? (
                <p
                  className="text-sm leading-6"
                  style={{ color: colors.text.whiteSoft }}
                >
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
