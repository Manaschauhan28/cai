import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  FileText,
  Users,
  AlertTriangle,
} from "lucide-react";

export default function TermsOfUse() {
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
              <FileText className="w-8 h-8 text-slate-900" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              TERMS OF USE
            </h1>
            <p className="text-gray-400 text-lg">
              Last Updated: December 20, 2023
            </p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  1. Acceptance of Terms
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using CI GPT services, you accept and agree to
                be bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  2. Use License
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Permission is granted to temporarily access CI GPT services
                  for personal, non-commercial transitory viewing only. This is
                  the grant of a license, not a transfer of title, and under
                  this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>modify or copy the materials</li>
                  <li>
                    use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    attempt to reverse engineer any software contained on CI
                    GPT's platform
                  </li>
                  <li>
                    remove any copyright or other proprietary notations from the
                    materials
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">
                  3. Disclaimer
                </h2>
              </div>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  The materials on CI GPT's platform are provided on an 'as is'
                  basis. CI GPT makes no warranties, expressed or implied, and
                  hereby disclaims and negates all other warranties including
                  without limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
                <p>
                  Further, CI GPT does not warrant or make any representations
                  concerning the accuracy, likely results, or reliability of the
                  use of the materials on its platform or otherwise relating to
                  such materials or on any sites linked to this site.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                4. Limitations
              </h2>
              <p className="text-gray-300 leading-relaxed">
                In no event shall CI GPT or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on CI GPT's platform, even
                if CI GPT or a CI GPT authorized representative has been
                notified orally or in writing of the possibility of such damage.
                Because some jurisdictions do not allow limitations on implied
                warranties, or limitations of liability for consequential or
                incidental damages, these limitations may not apply to you.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                5. Accuracy of Materials
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The materials appearing on CI GPT's platform could include
                technical, typographical, or photographic errors. CI GPT does
                not warrant that any of the materials on its platform are
                accurate, complete, or current. CI GPT may make changes to the
                materials contained on its platform at any time without notice.
                However, CI GPT does not make any commitment to update the
                materials.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                6. Links
              </h2>
              <p className="text-gray-300 leading-relaxed">
                CI GPT has not reviewed all of the sites linked to our platform
                and is not responsible for the contents of any such linked site.
                The inclusion of any link does not imply endorsement by CI GPT
                of the site. Use of any such linked website is at the user's own
                risk.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
              <h2 className="text-2xl font-bold text-lime-400 mb-4">
                7. Modifications
              </h2>
              <p className="text-gray-300 leading-relaxed">
                CI GPT may revise these terms of service for its platform at any
                time without notice. By using this platform, you are agreeing to
                be bound by the then current version of these terms of service.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-lime-400/20 to-purple-600/20 p-8 rounded-2xl border border-lime-400/30">
              <h3 className="text-2xl font-bold mb-4">
                Questions About These Terms?
              </h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms of Use, please
                contact us.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-lime-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-lime-300 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
