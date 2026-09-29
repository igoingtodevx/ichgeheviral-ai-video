import { SignIn } from "@clerk/nextjs";
import { AuthPageShell, AUTH_APPEARANCE } from "../../../components/AuthPageShell";

export default function SignInPage() {
  return (
    <AuthPageShell
      eyebrow="Kundenbereich"
      title="Willkommen zurück"
      description="Melde dich an, um deine Reels und laufenden Aufträge zu sehen."
    >
      <SignIn appearance={AUTH_APPEARANCE} />
    </AuthPageShell>
  );
}
