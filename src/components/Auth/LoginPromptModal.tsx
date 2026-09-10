import {
  X,
  LockKeyhole,
  ArrowRight
} from "lucide-react";

type LoginPromptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

const LoginPromptModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegister
}: LoginPromptModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#1254E7]/10 text-[#1254E7] flex items-center justify-center mb-5">
          <LockKeyhole className="w-6 h-6" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-900">
          Continue with HireUP
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          You've used your 3 free screening attempts.
          Create an account or sign in to continue
          screening candidates.
        </p>

        {/* Buttons */}
        <div className="space-y-3 mt-6">

          <button
            type="button"
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-3 rounded-xl transition"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Create Free Account
          </button>

        </div>

        <p className="text-xs text-center text-gray-400 mt-5">
          Your current job and selected resumes will be
          kept while you sign in.
        </p>

      </div>
    </div>
  );
};

export default LoginPromptModal;