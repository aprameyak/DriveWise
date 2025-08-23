'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  FileText, 
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useState } from 'react'

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function SupportPage() {
  const faqs = [
    {
      question: "How does DriveWise calculate Total Cost of Ownership (TCO)?",
      answer: "DriveWise uses comprehensive data including depreciation rates, fuel costs, insurance rates by state, maintenance schedules, and tax information to calculate the true cost of owning a vehicle over time. Our algorithms consider your location, driving habits, and ownership duration to provide accurate estimates."
    },
    {
      question: "How accurate are the car recommendations?",
      answer: "Our recommendations are based on extensive market data, user preferences, and machine learning algorithms. We analyze over 500 car models and continuously update our data to ensure accuracy. User feedback shows our recommendations help save an average of $3,000 on car purchases."
    },
    {
      question: "Can I compare multiple cars at once?",
      answer: "Yes! DriveWise allows you to compare up to 4 vehicles side-by-side. You can compare different aspects including TCO, reliability ratings, safety scores, and feature comparisons to make the best decision for your needs."
    },
    {
      question: "How do I set up alerts for price changes?",
      answer: "Navigate to the Alerts section in the app, select the vehicles you're interested in, and set your price thresholds. DriveWise will notify you when prices drop or when it's an optimal time to buy or sell."
    },
    {
      question: "Is my personal data secure?",
      answer: "Absolutely. We take data security seriously and use industry-standard encryption to protect your information. We never sell your personal data to third parties. Read our Privacy Policy for more details."
    },
    {
      question: "How often is the car data updated?",
      answer: "Our car database is updated weekly with the latest pricing, features, and market data. We also update depreciation curves and TCO calculations monthly to ensure you have the most current information."
    },
    {
      question: "Can I use DriveWise for used cars?",
      answer: "Yes! DriveWise works for both new and used vehicles. Our depreciation analysis is particularly valuable for used car buyers, helping you understand the vehicle's value trajectory and optimal ownership period."
    },
    {
      question: "What if I find incorrect information?",
      answer: "We strive for accuracy, but if you find any incorrect information, please report it through the app's feedback feature or contact our support team. We'll investigate and update the data promptly."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How Can We Help?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions, get in touch with our support team, 
              or explore our help resources.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-md mx-auto">
            {/* Email Support */}
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Help</h3>
              <p className="text-gray-600 mb-4">
                Have a question or need support? Send us an email and we'll get back to you.
              </p>
              <a 
                href="mailto:aprameyakannan@gmail.com" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                aprameyakannan@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>




      <Footer />
    </div>
  )
}
