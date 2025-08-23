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

export default function HomePage() {
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

            {/* Personalized Alerts */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Bell className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Alerts</h3>
              <p className="text-gray-600">
                Get notified about price changes, maintenance reminders, and optimal 
                buying/selling windows for your vehicles.
              </p>
            </div>

            {/* Safety & Reliability */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety First</h3>
              <p className="text-gray-600">
                Access comprehensive safety ratings and reliability data to ensure you 
                choose a vehicle that protects you and your family.
              </p>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <p className="text-gray-600">
                Get personalized car recommendations based on your budget, lifestyle, 
                and preferences using advanced AI algorithms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$2M+</div>
              <div className="text-primary-100">Savings Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Car Models Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8</div>
              <div className="text-primary-100 flex items-center justify-center">
                <Star className="w-4 h-4 fill-current mr-1" />
                App Store Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Drive Smarter?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are making better car buying decisions with DriveWise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Get Started Today</span>
            </a>
            <a 
              href="/support" 
              className="border border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
