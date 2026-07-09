import { EditorShell } from "@/components/editor/EditorShell";

interface BuilderPageProps {
  params: Promise<{ locale: string; resumeId: string }>;
}

export async function generateMetadata({ params }: BuilderPageProps) {
  const { locale } = await params;
  return {
    title: "Resume Builder | CVPilot",
    description:
      "Build and customize your professional resume with AI assistance. Live preview updates as you type.",
    alternates: {
      canonical: `/${locale}/builder`,
    },
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const { resumeId } = await params;

  return <EditorShell resumeId={resumeId} />;
}
