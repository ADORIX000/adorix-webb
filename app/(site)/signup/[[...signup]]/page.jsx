import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="pt-28 pb-24 flex justify-center items-center min-h-[80vh]">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-adorix-primary hover:bg-[#085a66] text-white",
            footerActionLink: 
              "text-adorix-primary hover:text-[#085a66]",
            card: "shadow-2xl rounded-3xl border border-gray-100 p-8",
            headerTitle: "text-3xl font-bold text-adorix-dark",
            headerSubtitle: "text-gray-500 font-medium",
            socialButtonsBlockButton: "border border-gray-200 rounded-xl hover:bg-gray-50 text-adorix-dark font-bold",
            socialButtonsBlockButtonText: "font-bold",
            formFieldInput: "bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-adorix-primary focus:border-transparent outline-none py-3 px-5",
            formFieldLabel: "text-sm font-bold text-adorix-dark mb-2",
          },
        }}
      />
    </div>
  );
}
