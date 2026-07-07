import React from "react";
import dynamic from "next/dynamic";

const WorkflowContent = dynamic(() => import("./workflow-content"));

export default function Workflow() {
  return <WorkflowContent />;
}
