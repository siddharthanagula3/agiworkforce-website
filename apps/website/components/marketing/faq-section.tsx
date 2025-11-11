import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "What operating systems are supported?",
      answer:
        "AGI Workforce currently supports Windows 10/11. macOS and Linux support are planned for Q2 2025.",
    },
    {
      question: "Do I need coding experience?",
      answer:
        "No! AGI Workforce features a visual workflow builder and natural language chat interface. Power users can write custom scripts if desired, but it's not required.",
    },
    {
      question: "How does the 50% discount work?",
      answer:
        "All new users get 50% off their first month on any paid plan. Your subscription automatically renews at the regular price ($20/month for Pro) after the first month unless you cancel.",
    },
    {
      question: "Can I use my own LLM API keys?",
      answer:
        "Yes! Bring your own API keys for OpenAI, Anthropic, and Google. You can also use local Ollama models completely free.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. API keys are stored in Windows Credential Manager using DPAPI encryption. All data stays local unless you opt into cloud sync. We're SOC 2 compliant.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, cancel anytime from your account settings. No questions asked, no cancellation fees.",
    },
    {
      question: "What's included in the free trial?",
      answer:
        "The 14-day Pro trial includes all Pro features with no credit card required. After the trial, you can downgrade to the free Community plan or continue with Pro.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee on all paid plans.",
    },
    {
      question: "Can AGI Workforce run automations while I'm away?",
      answer:
        "Yes! Schedule automations to run 24/7 in the background or trigger them via API. The autonomous agent mode handles tasks even when you're not at your computer.",
    },
    {
      question: "How is this different from browser extensions?",
      answer:
        "Browser extensions can only control web pages. AGI Workforce controls your entire desktop - applications, files, system settings, and more. It also includes LLM reasoning that browser extensions lack.",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
