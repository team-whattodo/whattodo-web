import ProjectContent from "@/components/ProjectContent";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const { projectId } = await params;

  return <ProjectContent projectId={projectId}/>
  
};

export default ProjectPage;
