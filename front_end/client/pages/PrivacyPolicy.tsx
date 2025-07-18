import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Eye, Database, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-20 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl font-bold">
            <span className="text-lime-400">CI</span>{" "}
            <span className="text-white">GPT</span>
          </span>
        </button>

        <button
          onClick={() => navigate("/")}
          className="border border-gray-500 hover:border-lime-400 px-6 py-2 rounded-full text-white hover:text-lime-400 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </header>

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-slate-900" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              PRIVACY POLICY
            </h1>
            <p className="text-gray-400 text-lg">
              Last Updated: December 20, 2023
            </p>
          </div>

          {/* Privacy Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  1. Information We Collect
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  At CI GPT, we collect information to provide better services
                  to our users. We collect information in the following ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, and immigration details you provide
                  </li>
                  <li>
                    <strong>Usage Data:</strong> How you interact with our AI
                    system and platform features
                  </li>
                  <li>
                    <strong>Device Information:</strong> Browser type, operating
                    system, and IP address
                  </li>
                  <li>
                    <strong>Communication Data:</strong> Messages and queries
                    you send through our platform
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  2. How We Use Your Information
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Provide personalized immigration guidance and
                    recommendations
                  </li>
                  <li>Improve our AI algorithms and service quality</li>
                  <li>Communicate with you about your immigration process</li>
                  <li>
                    Send updates about changes in immigration laws and policies
                  </li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>
                    Comply with legal obligations and regulatory requirements
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  3. Information Sharing and Disclosure
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to outside parties except in the following
                  circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your explicit consent</li>
                  <li>
                    To trusted service providers who assist in operating our
                    platform
                  </li>
                  <li>When required by law or to protect our rights</li>
                  <li>
                    In connection with a merger, acquisition, or sale of assets
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                4. Data Security
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                5. Your Rights
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  You have the following rights regarding your personal
                  information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability and withdrawal of consent</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience on our platform. These technologies help us
                understand user preferences, improve our services, and provide
                personalized content. You can control cookie settings through
                your browser preferences.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                7. International Data Transfers
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your own. We ensure that such transfers
                comply with applicable data protection laws and implement
                appropriate safeguards to protect your information.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date. Your continued
                use of our services after any modifications indicates your
                acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-lime-400/20 to-purple-600/20 p-8 rounded-2xl border border-lime-400/30">
              <h3 className="text-2xl font-bold mb-4">Privacy Questions?</h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or how we
                handle your data, please contact our Data Protection Officer.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-lime-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-lime-300 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
