import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cookie, Settings, BarChart, Shield } from "lucide-react";

export default function CookiePolicy() {
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
              <Cookie className="w-8 h-8 text-slate-900" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              COOKIE POLICY
            </h1>
            <p className="text-gray-400 text-lg">
              Last Updated: December 20, 2023
            </p>
          </div>

          {/* Cookie Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  1. What Are Cookies?
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Cookies are small text files that are placed on your computer
                  or mobile device when you visit our website. They are widely
                  used to make websites work more efficiently and provide
                  information to website owners.
                </p>
                <p>
                  CI GPT uses cookies to enhance your browsing experience,
                  provide personalized content, and analyze how our platform is
                  used to improve our services.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  2. Types of Cookies We Use
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-6">
                <div className="border-l-4 border-lime-400 pl-4">
                  <h3 className="text-xl font-semibold text-lime-400 mb-2">
                    Essential Cookies
                  </h3>
                  <p>
                    These cookies are necessary for the website to function and
                    cannot be switched off. They enable core functionality such
                    as security, network management, and accessibility.
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">
                    Performance Cookies
                  </h3>
                  <p>
                    These cookies collect information about how you use our
                    website, such as which pages you visit most often. This data
                    helps us optimize our platform performance.
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Functional Cookies
                  </h3>
                  <p>
                    These cookies allow our website to remember choices you make
                    and provide enhanced, more personal features such as
                    language preferences.
                  </p>
                </div>

                <div className="border-l-4 border-orange-400 pl-4">
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">
                    Targeting Cookies
                  </h3>
                  <p>
                    These cookies track your browsing habits to enable us to
                    show advertising which is more likely to be of interest to
                    you.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <BarChart className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  3. How We Use Cookies
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To remember your login status and preferences</li>
                  <li>To analyze website traffic and usage patterns</li>
                  <li>To provide personalized immigration recommendations</li>
                  <li>
                    To improve our AI algorithms based on user interactions
                  </li>
                  <li>To ensure website security and prevent fraud</li>
                  <li>To deliver relevant content and advertisements</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  4. Third-Party Cookies
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Some cookies on our website are set by third-party services
                  that appear on our pages. These may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Google Analytics:</strong> To analyze website usage
                    and performance
                  </li>
                  <li>
                    <strong>Social Media Platforms:</strong> For social sharing
                    functionality
                  </li>
                  <li>
                    <strong>Payment Processors:</strong> For secure payment
                    processing
                  </li>
                  <li>
                    <strong>Customer Support Tools:</strong> For chat and help
                    desk functionality
                  </li>
                </ul>
                <p>
                  These third parties may use cookies to collect information
                  about your online activities across different websites.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                5. Managing Your Cookie Preferences
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>You have several options to control and manage cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Browser Settings:</strong> Most browsers allow you
                    to refuse cookies or delete existing ones
                  </li>
                  <li>
                    <strong>Cookie Consent Banner:</strong> Use our cookie
                    preference center when you first visit
                  </li>
                  <li>
                    <strong>Opt-out Tools:</strong> Use industry opt-out tools
                    for advertising cookies
                  </li>
                  <li>
                    <strong>Do Not Track:</strong> Enable Do Not Track signals
                    in your browser
                  </li>
                </ul>
                <div className="bg-yellow-900/30 border border-yellow-600 p-4 rounded-lg mt-4">
                  <p className="text-yellow-200">
                    <strong>Note:</strong> Disabling certain cookies may affect
                    website functionality and your user experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                6. Cookie Retention
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Different types of cookies are stored for different periods:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Session Cookies:</strong> Deleted when you close
                    your browser
                  </li>
                  <li>
                    <strong>Persistent Cookies:</strong> Remain on your device
                    for a set period or until manually deleted
                  </li>
                  <li>
                    <strong>Authentication Cookies:</strong> Typically expire
                    after 30 days of inactivity
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> May be stored for up to
                    1 year
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                7. Updates to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or applicable laws. We will notify you
                of any significant changes by posting the updated policy on our
                website and updating the "Last Updated" date.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-lime-400/20 to-purple-600/20 p-8 rounded-2xl border border-lime-400/30">
              <h3 className="text-2xl font-bold mb-4">Cookie Questions?</h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about our use of cookies, please
                contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="bg-lime-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-lime-300 transition-colors"
                >
                  Contact Support
                </button>
                <button className="border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-slate-900 px-8 py-3 rounded-full font-semibold transition-colors">
                  Manage Cookie Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
