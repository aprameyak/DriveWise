import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Shield, Eye, Lock, Database } from 'lucide-react'
import type { PrivacyPageProps } from '../../types'

export default function PrivacyPage({}: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
              <p className="text-gray-600 mb-4">
                DriveWise ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services.
              </p>
              <p className="text-gray-600">
                By using DriveWise, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <p className="text-gray-600 mb-4">
                We may collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Email address and account information</li>
                <li>Name and contact details</li>
                <li>Vehicle preferences and search criteria</li>
                <li>Location data (zip code for regional pricing)</li>
                <li>Usage patterns and app interactions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4">
                When you use our app, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Device information (model, operating system, unique device identifiers)</li>
                <li>App usage data and analytics</li>
                <li>Crash reports and performance data</li>
                <li>IP address and general location information</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Provide and maintain our car recommendation services</li>
                <li>Calculate accurate Total Cost of Ownership (TCO) estimates</li>
                <li>Personalize your experience and recommendations</li>
                <li>Send you alerts and notifications about price changes</li>
                <li>Improve our app functionality and user experience</li>
                <li>Analyze usage patterns to enhance our services</li>
                <li>Communicate with you about updates and new features</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Service Providers:</strong> We may share data with trusted third-party service providers who assist us in operating our app and providing services</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated data for research and analytics purposes</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
              <p className="text-gray-600">
                However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Opt out of certain data collection and communications</li>
              </ul>
              <p className="text-gray-600">
                To exercise these rights, please contact us at aprameyakannan@gmail.com
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. We may retain certain information for longer periods if required by law or for legitimate business purposes.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our app is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-2">
                  <strong>Email:</strong> aprameyakannan@gmail.com
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Address:</strong> DriveWise Privacy Team<br />
                  123 Innovation Drive<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Features Highlight */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Commitment to Privacy
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to protecting your data and maintaining your trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure by Design</h3>
              <p className="text-gray-600">
                We implement industry-standard security measures to protect your data at every level.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Practices</h3>
              <p className="text-gray-600">
                We're open about how we collect, use, and protect your information.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">You Control Your Data</h3>
              <p className="text-gray-600">
                Access, modify, or delete your personal information at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
