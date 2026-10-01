import { CustomerJobDetail } from "../../../../components/CustomerJobDetail";

export default async function ReelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CustomerJobDetail jobId={slug} />;
}