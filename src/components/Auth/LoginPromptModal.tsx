import { X, ArrowRight } from "lucide-react";

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
  onRegister,
}: LoginPromptModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-6 sm:p-8 border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Badge Container */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex items-center justify-center p-2 bg-white rounded-2xl shadow-md shadow-blue-500/15 border border-gray-100">
            <img 
              src="https://www.image2url.com/r2/default/images/1789100294147-a604f829-b27a-4b30-81d0-17b2fb789440.png" 
              alt="HireUP Logo" 
              className="h-7 w-auto object-contain"
            />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Hire<span className="text-[#1254E7]">UP</span>
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Unlock Full Access
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed">
            You've used your 3 free screening attempts. Create an account or sign in to continue evaluating candidates effortlessly.
          </p>
        </div>

        {/* Actions / Buttons */}
        <div className="space-y-3 mt-7">
          <button
            type="button"
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold text-sm px-5 py-3.5 rounded-2xl shadow-lg shadow-[#1254E7]/25 transition-all duration-200 cursor-pointer"
          >
            <span>Sign In to Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            Create Free Account
          </button>
        </div>

        {/* Helper Note */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400">
            🔒 Your current job details and selected resumes will be securely kept while you sign in.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPromptModal;