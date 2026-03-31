import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How does the Divine Architecture manifest in the Arena?",
    answer:
      "The architecture manifests as dynamic floating sanctums that respond to the kinetic energy of the competitors. Utilizing a unique blend of glassmorphic surfaces and golden light arrays, the environment shifts to prioritize the most glorious feats of strategy and skill.",
  },
  {
    id: 2,
    question: "What are the Sacred Terms of the Hackathon?",
    answer:
      "The Sacred Terms bind all warriors of code to a covenant of honour and integrity. Participants must submit original creations forged within the arena's timespan, swear by the All-Father's principles of open collaboration, and agree that disputes shall be settled by the Council of Judges whose verdict is final and absolute.",
  },
  {
    id: 3,
    question: "How can one Ascend to the Royal Tier?",
    answer:
      "To ascend to the Royal Tier, a warrior must accumulate Valor Points through exceptional code quality, innovative problem-solving, and peer recognition from fellow competitors. The top three warriors in accumulated valor at dawn of the final day shall be elevated to the Royal Tier and granted audience with the grand prize committee.",
  },
  {
    id: 4,
    question: "Is the Divine Scroll compatible with mobile devices?",
    answer:
      "Yea, the Divine Scroll has been forged to be fully responsive across all rune-stones and handheld oracle devices. Whether you wield a mighty desktop forge or a pocket-sized oracle, the sacred texts and submission portals shall render with utmost clarity and function.",
  },
  {
    id: 5,
    question: "Where can I find the Contact Oracle?",
    answer:
      "The Contact Oracle dwells within the Sanctum tab of the navigation above. You may also summon it by scrolling to the foot of any sacred page and invoking the 'Consult the Oracle' rune. The Oracle responds within one cycle of the sun to all sincere inquiries from worthy challengers.",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    if (isFirstRender.current) {
      // Set initial state without animation
      gsap.set(content, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      });
      isFirstRender.current = false;
      return;
    }

    if (isOpen) {
      const targetHeight = inner.scrollHeight;
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: targetHeight,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(content, { height: "auto" });
          },
        },
      );
    } else {
      const currentHeight = content.scrollHeight;
      gsap.fromTo(
        content,
        { height: currentHeight, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power3.inOut",
        },
      );
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="faq-item border border-[#d4c9b0] rounded-xl overflow-hidden shadow-sm"
      style={{
        backgroundColor: isOpen ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
        transition: "all 0.4s ease",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-10 py-8 min-h-[100px] text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="flex-1 pr-8 transition-colors duration-200 flex-row "
          style={{
            color: isOpen ? "#8B5E1A" : "#1a0f06",
            fontSize: "1.2rem",
            fontWeight: 600,
            fontFamily: "'EB Garamond', serif",
            lineHeight: "1.3",
          }}
        >
          {item.question}
        </span>
        <span
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[#c4b89a] transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "#f0e8d6" : "transparent",
          }}
        >
          {isOpen ? (
            <ChevronUp size={16} color="#8B5E1A" strokeWidth={2} />
          ) : (
            <ChevronDown size={16} color="#6b5a3e" strokeWidth={2} />
          )}
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden">
        <div ref={innerRef} className="px-10 pb-8">
          <p
            style={{
              color: "#4a3520",
              fontSize: "1rem",
              lineHeight: "1.7",
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number>(1);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: -20, letterSpacing: "0.3em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.2em",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        },
      );

      // Accordion items stagger
      const items = itemsRef.current?.querySelectorAll(".faq-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.2,
            scrollTrigger: {
              trigger: itemsRef.current,
              start: "top 85%",
            },
          },
        );
      }

      // Footer entrance
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? 0 : id));
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-20 bg-[#f5f0e6]"
      style={{ fontFamily: "'EB Garamond', serif" }}
    >
      {/* FAQ Content */}
      <div className="w-full max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p
            ref={subtitleRef}
            style={{
              color: "#8B5E1A",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              fontWeight: 500,
              opacity: 0,
            }}
          >
            ASGARD ARCHIVES
          </p>
          <h1
            ref={titleRef}
            className="mt-4 mb-2 text-center uppercase tracking-wider"
            style={{
              color: "#1a0f06",
              fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: "1.1",
              opacity: 0,
              fontFamily: "'Cinzel', serif",
            }}
          >
            Frequently Asked
            <br className="hidden md:block" /> Questions
          </h1>
          <div
            className="mx-auto mt-4 mb-2"
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#c9a227",
              borderRadius: "2px",
              transformOrigin: "center",
              opacity: 1,
            }}
          />
        </div>

        {/* Accordion */}
        <div ref={itemsRef} className="w-full flex flex-col gap-5">
          {faqData.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
              index={index}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div ref={footerRef} className="text-center mt-16 opacity-0">
          <p
            style={{
              color: "#6b5a3e",
              fontStyle: "italic",
              fontSize: "0.95rem",
            }}
          >
            Still seeking enlightenment?
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-3 group"
            style={{
              color: "#8B5E1A",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            CONSULT THE ORACLE
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
