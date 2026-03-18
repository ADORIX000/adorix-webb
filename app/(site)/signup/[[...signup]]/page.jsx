import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center px-4 py-20 min-h-screen">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#0D8A9E",
            colorBackground: "#ffffff",
            colorText: "#1F2B2D",
            colorTextSecondary: "#6b7280",
            colorInputBackground: "#f9fafb",
            colorInputText: "#1F2B2D",
            colorDanger: "#ef4444",
            borderRadius: "10px",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "14px",
            spacingUnit: "16px",
          },
          elements: {
            rootBox: "w-full max-w-[420px]",
            card: [
              "w-full",
              "bg-white",
              "rounded-2xl",
              "shadow-[0_4px_24px_rgba(0,0,0,0.07)]",
              "border border-gray-100",
              "p-8",
            ].join(" "),

            // Header
            headerTitle: "text-[22px] font-bold text-[#1F2B2D] tracking-tight",
            headerSubtitle: "text-sm text-gray-400 font-normal mt-0.5",
            logoBox: "hidden",
            logoImage: "hidden",

            // Social buttons
            socialButtonsBlockButton:
              "w-full h-10 border border-gray-200 rounded-lg text-[#1F2B2D] text-sm font-medium hover:bg-gray-50 transition-colors",
            socialButtonsBlockButtonText: "text-sm font-medium",
            socialButtonsBlockButtonArrow: "hidden",
            badge: "hidden",

            // Divider
            dividerRow: "my-4",
            dividerLine: "bg-gray-100",
            dividerText: "text-gray-400 text-xs px-3",

            // Fields
            formFieldRow: "mb-4",
            formFieldLabel:
              "block text-xs font-semibold text-[#1F2B2D] mb-1.5 tracking-wide uppercase",
            formFieldInput:
              "w-full h-10 px-3.5 bg-[#f9fafb] border border-gray-200 rounded-lg text-sm text-[#1F2B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D8A9E]/30 focus:border-[#0D8A9E] transition-all",
            formFieldInputShowPasswordButton: "text-gray-400 hover:text-[#0D8A9E]",

            // Link below fields
            formFieldAction: "text-[#0D8A9E] text-xs font-semibold hover:text-[#085a66]",

            // Submit button
            formButtonPrimary:
              "w-full h-10 bg-[#0D8A9E] hover:bg-[#0a7a8d] active:bg-[#085a66] text-white text-sm font-semibold rounded-lg transition-all duration-150 shadow-none mt-2",
            formButtonReset: "text-[#0D8A9E] text-sm hover:text-[#085a66]",

            // Footer
            footer: "mt-4 pt-4 border-t border-gray-100",
            footerAction: "flex items-center justify-center gap-1.5",
            footerActionText: "text-sm text-gray-400",
            footerActionLink:
              "text-sm font-semibold text-[#0D8A9E] hover:text-[#085a66]",

            // Error / alerts
            formFieldErrorText: "text-xs text-red-500 mt-1",
            formFieldSuccessText: "text-xs text-emerald-600 mt-1",
            alertText: "text-sm",
            identityPreviewText: "text-[#1F2B2D] text-sm",
            identityPreviewEditButton:
              "text-[#0D8A9E] hover:text-[#085a66] text-sm",
          },
        }}
      />
    </div>
  );
}
