import { useState } from "react";

const faqs = [
  {
    question: "What are common signs that my pet might be sick?",
    answer:
      "Common signs include lethargy, loss of appetite, vomiting, diarrhea, coughing, sneezing, or behavioral changes. If symptoms persist for more than 24 hours, consult a vet.",
  },
  {
    question: "Can I give home remedies for mild pet ailments?",
    answer:
      "Yes, for mild cases like minor skin irritation, you can use a diluted oatmeal bath or aloe vera. But always consult your vet before giving any homemade remedy.",
  },
  {
    question: "How do I prevent ticks and fleas on my pet?",
    answer:
      "Regular grooming, monthly tick/flea medication, and maintaining a clean environment can prevent infestations. Natural options like neem oil sprays may also help.",
  },
  {
    question: "What should I feed a sick dog who refuses to eat?",
    answer:
      "You can offer boiled chicken, plain rice, or low-sodium bone broth to entice appetite. Keep portions small and frequent, and consult your vet if refusal continues.",
  },
  {
    question: "Is vaccination important for indoor pets?",
    answer:
      "Yes. Even indoor pets need core vaccines to protect against diseases like rabies, distemper, and parvovirus. Indoor environments don't eliminate risk entirely.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 bg-red-500 rounded-xl p-4 shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left flex justify-between items-center font-bold text-lg"
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-white">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
