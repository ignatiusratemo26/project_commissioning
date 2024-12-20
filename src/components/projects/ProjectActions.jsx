// ProjectActions.js
import React from "react";
import {Grid2, Button, Tooltip } from "@mui/material";

const ProjectActions = ({ project, isSubmitDisabled, handleApprovedDocsModalOpen, handleStakeholderModalOpen, navigate, projectId }) => {
  return (
    <Grid2 container justifyContent="flex-end" spacing={2} className="mt-10">
      <Grid2 item>
        <Tooltip title="Project must have at least three approved documents and three stakeholders to submit for approval.">
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => (project.approved_for_commissioning ? handleSubmitForCommissioning : handleSubmitForApproval)}
            disabled={isSubmitDisabled}
          >
            {project.approved_for_commissioning ? 'Submit for Commissioning' : 'Submit for Approval'}
          </Button>
        </Tooltip>
      </Grid2>
      <Grid2 item>
        <Button variant="contained" color="secondary" onClick={() => navigate(`/projects/edit/${projectId}/`)}>
          Edit Project
        </Button>
      </Grid2>
      <Grid2 item>
        <Button variant="outlined" onClick={handleStakeholderModalOpen}>
          Add Stakeholder
        </Button>
      </Grid2>
      <Grid2 item>
        <Button variant="outlined" onClick={handleApprovedDocsModalOpen}>
          Add Approved Document
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default ProjectActions;
