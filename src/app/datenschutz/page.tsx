import type { Metadata } from "next";
import { ConfiguredLegal } from "../../components/ConfiguredLegal";
export const metadata: Metadata = { title: "Datenschutz | IchGeheViral" };
export default function Page() {
  return <ConfiguredLegal title="Datenschutz" field="privacy_text" />;
}
