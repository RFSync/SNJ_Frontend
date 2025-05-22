"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = [
  {
    question: "What materials do you use for 3D printing?",
    answer:
      "We primarily use PLA, PETG, and resin for our 3D prints. Each material has different properties and finishes, allowing us to achieve various aesthetic effects. We can recommend the best material based on your specific design and requirements.",
  },
  {
    question: "How long does it take to receive my order?",
    answer:
      "Production time typically takes 3-5 business days depending on the complexity and size of your design. Shipping usually takes an additional 2-7 business days depending on your location. For rush orders, please contact us directly.",
  },
  {
    question: "Can I upload my own 3D model for printing?",
    answer:
      "We accept .STL, .OBJ, and .3MF file formats. If your file needs adjustments for optimal printing, our design team will contact you with recommendations before proceeding.",
  },
  {
    question: "Do you offer custom colors and finishes?",
    answer:
      "Yes! We offer a wide range of colors and can match specific color codes if provided. We also offer various finishes including matte, glossy, metallic, and glow-in-the-dark options for that perfect vaporwave aesthetic.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We stand behind our quality. If you're not satisfied with your print due to manufacturing defects, we offer replacements or refunds within 14 days of delivery. Custom designs cannot be returned unless there's a defect in the printing.",
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-500 to-purple-600 text-transparent bg-clip-text mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-2 border-pink-300 rounded-lg overflow-hidden bg-white/70 backdrop-blur-sm shadow-md"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-lg font-medium text-purple-800">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-pink-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-purple-600" />
              )}
            </button>

            <div
              className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-purple-900">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
