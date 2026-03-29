"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { colors, radius, shadows, sizes } from "@/config/design-system"
import { usePublicSiteContent } from "@/app/companent/shared/content/PublicSiteContentProvider"
import { selectAboutViewModel } from "@/lib/backend/selectors"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const snapshot = usePublicSiteContent()
  const about = selectAboutViewModel(snapshot)
  const sectionRef = useRef<HTMLElement | null>(null)
  const bigTitleRef = useRef<HTMLHeadingElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const textsRef = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bigTitleRef.current, {
        scale: 1.3,
        opacity: 0,
      })

      gsap.set(imageRef.current, {
        scale: 0.6,
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      })

      gsap.set([titleRef.current, ...textsRef.current], {
        opacity: 0,
        y: 40,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4500",
          scrub: true,
          pin: true,
        },
      })

      tl.to(bigTitleRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
      })

      tl.to(bigTitleRef.current, {
        y: -200,
        opacity: 0,
        duration: 1.2,
      })

      tl.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
      })

      tl.to(imageRef.current, {
        x: "-35vw",
        duration: 1.5,
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })

      tl.to(titleRef.current, {
        opacity: 0,
        y: -40,
        duration: 1,
      })

      textsRef.current.forEach((el) => {
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
        })

        tl.to(el, {
          opacity: 0,
          y: -40,
          duration: 1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="flex h-screen w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: colors.background.about }}
    >
      <h2
        ref={bigTitleRef}
        className="absolute text-7xl font-bold md:text-[120px]"
        style={{ color: colors.brand.primaryStrong }}
      >
        {about.section.sectionLabel.toUpperCase()}
      </h2>

      <div
        ref={imageRef}
        className="absolute overflow-hidden"
        style={{
          borderRadius: radius.xl,
          border: `2px solid ${colors.brand.primary}`,
          boxShadow: shadows.card,
        }}
      >
        <Image
          src={about.image?.url ?? "/grid-img.png"}
          alt={about.image?.alt ?? about.section.brandTitle}
          width={520}
          height={650}
          className="object-cover"
        />
      </div>

      <div
        className="absolute right-[10vw]"
        style={{ width: sizes.about.textWidth }}
      >
        <h3
          ref={titleRef}
          className="absolute text-5xl font-semibold"
          style={{ color: colors.brand.primaryStrong }}
        >
          {about.section.brandTitle}
        </h3>

        {about.textItems.map((item, index) => (
          <p
            key={item.id}
            ref={(el) => {
              textsRef.current[index] = el
            }}
            className="absolute text-2xl"
            style={{ color: colors.brand.secondary }}
          >
            {item.text}
          </p>
        ))}
      </div>
    </section>
  )
}
