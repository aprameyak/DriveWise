import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  Car, 
  Calculator, 
  TrendingDown, 
  GitCompare, 
  Bell, 
  Shield, 
  Zap, 
  Target,
  Download,
  Star
} from 'lucide-react'
import type { HomePageProps } from '../types'

export default function HomePage(props: HomePageProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Drive Smarter, Not Harder
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Make informed car buying decisions with DriveWise. Get personalized recommendations, 
              compare total cost of ownership, and optimize your automotive investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download for iOS</span>
              </a>
              <a 
                href="#" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download for Android</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Make the Right Choice
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              DriveWise combines advanced analytics with user-friendly insights to help you 
              find the perfect car for your needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* TCO Optimizer */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">TCO Optimizer</h3>
              <p className="text-gray-600">
                Calculate the true cost of ownership including depreciation, fuel, insurance, 
                maintenance, and taxes to make informed decisions.
              </p>
            </div>

            {/* Car Comparison */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <GitCompare className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Comparison</h3>
              <p className="text-gray-600">
                Compare multiple vehicles side-by-side with detailed analysis of costs, 
                reliability, and long-term value.
              </p>
            </div>

            {/* Depreciation Explorer */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingDown className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Depreciation Analysis</h3>
              <p className="text-gray-600">
                Understand how your car's value will change over time and optimize your 
                buying and selling strategy.
              </p>
            </div>

            {/* Smart Alerts */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Bell className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Alerts</h3>
              <p className="text-gray-600">
                Get notified about price drops, maintenance reminders, and optimal timing 
                for buying or selling your vehicle.
              </p>
            </div>

            {/* Safety & Reliability */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety & Reliability</h3>
              <p className="text-gray-600">
                Access comprehensive safety ratings, reliability data, and real-world 
                performance metrics for informed decisions.
              </p>
            </div>

            {/* Performance Analytics */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h3>
              <p className="text-gray-600">
                Analyze fuel efficiency, acceleration, handling, and other performance 
                metrics to find your perfect match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How DriveWise Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to smarter car buying decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Set Your Preferences</h3>
              <p className="text-gray-600">
                Tell us about your budget, location, driving habits, and must-have features. 
                We'll use this to personalize your recommendations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Smart Recommendations</h3>
              <p className="text-gray-600">
                Our AI analyzes thousands of vehicles to find the best matches for your needs, 
                considering TCO, reliability, and value retention.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Make Confident Decisions</h3>
              <p className="text-gray-600">
                Compare vehicles side-by-side, track price changes, and get alerts when 
                it's the optimal time to buy or sell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Smart Car Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who have made better car buying decisions with DriveWise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">$3M+</div>
              <div className="text-gray-600">Saved by Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Car Models Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">4.8★</div>
              <div className="text-gray-600">App Store Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Drive Smarter?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Download DriveWise today and start making informed car buying decisions that save you money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download for iOS</span>
            </a>
            <a 
              href="#" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download for Android</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
