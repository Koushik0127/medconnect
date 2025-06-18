import React, { useState } from "react";
import emailjs from "emailjs-com";

const faqData = [
  {
    question: "What are your hospital’s visiting hours?",
    answer: "Our visiting hours are from 10:00 AM to 7:00 PM every day.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment online through our Appointment page or by calling our reception.",
  },
  {
    question: "Do you offer emergency services?",
    answer:
      "Yes, our emergency services are available 24/7. Please call +91 98765 43210 in case of emergency.",
  },
  {
    question: "Which insurance providers do you accept?",
    answer:
      "We accept most major insurance providers. Please contact our billing department for a full list.",
  },
  {
    question: "Where are you located?",
    answer: "We are located at Chikkabanavara, Bengaluru, India.",
  },
];

const FaqChatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! How can I help you today? You can ask me a question or check our FAQs below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sendEmail = (question) => {
    setIsSending(true);
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";
    const userID = "YOUR_PUBLIC_KEY";

    const templateParams = {
      user_question: question,
      to_name: "Hospital Team",
      reply_to: "noreply@yourhospital.com",
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(() => {
        alert(
          "Your question has been sent to our team. We will get back to you shortly."
        );
      })
      .catch(() => {
        alert("Oops! Something went wrong. Please try again later.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);

    // Add bot acknowledgment
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Thanks for your question! Sending it to our team now...",
      },
    ]);

    sendEmail(trimmed);

    setInput("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col h-[80vh]">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          FAQ & Ask Us Anything
        </h1>

        <div className="flex-1 overflow-y-auto mb-4 px-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-2 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* FAQ List below chatbot messages */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-700 text-center">
              FAQs (Click to toggle answer)
            </h2>
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded p-3 my-2 cursor-pointer select-none hover:bg-blue-50 transition"
                onClick={() => toggleAnswer(index)}
              >
                <div className="font-semibold text-gray-700 flex justify-between items-center">
                  {item.question}
                  <span>{openIndex === index ? "▲" : "▼"}</span>
                </div>
                {openIndex === index && (
                  <p className="mt-1 text-gray-600">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-gray-300 rounded px-4 py-3 mt-4"
        >
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-grow outline-none text-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={isSending}
            className="ml-3 px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default FaqChatbot;
