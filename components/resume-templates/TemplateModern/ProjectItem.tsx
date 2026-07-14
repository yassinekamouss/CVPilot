import { ResumeContent } from "@/schemas/resume.schema";

type ProjectEntry = NonNullable<ResumeContent["projects"]>[number];

interface ProjectItemProps {
    project: ProjectEntry;
}

export const ProjectItem = ({ project }: ProjectItemProps) => (
    <div className="mb-3 last:mb-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-sm font-bold uppercase text-neutral-900">
                {project.name}
            </h3>

            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold uppercase tracking-wide text-neutral-700 underline decoration-neutral-400 underline-offset-4"
                >
                    View link
                </a>
            )}
        </div>

        {project.description && (
            <p className="mt-1.5 text-sm leading-[1.45] text-neutral-600">
                {project.description}
            </p>
        )}
    </div>
);