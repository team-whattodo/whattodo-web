import React from "react";

const ProjectPage = ({ params }: { params: { projectId: string } }) => {
  return <div>{params.projectId}</div>;
};

export default ProjectPage;
