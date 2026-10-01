import type { Metadata } from "next";
import { ConfiguredLegal } from "../../components/ConfiguredLegal";
export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen | IchGeheViral" };
export default function Page() {
  return <ConfiguredLegal title="Allgemeine Geschäftsbedingungen" field="terms_text" />;
}
