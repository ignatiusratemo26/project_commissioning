// ProjectDetails.js
import React from "react";
import { Grid2 } from "@mui/material";
import { Badge, Typography } from "@mui/material";
import { CheckCircleIcon } from "lucide-react";

const ProjectDetails = ({ project, stakeholders }) => {
  return (
    <Grid2 container spacing={3} sx={{ ml: 2 }}>
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h6">Name:</Typography>
        <Typography>{project.name}</Typography>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h6">Scope:</Typography>
        <Typography>{project.scope}</Typography>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h6">County:</Typography>
        <Badge color="primary">{project.location.county}</Badge>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h6">Constituency:</Typography>
        <Typography>{project.location.constituency}</Typography>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h6">Plot No:</Typography>
        <Typography>{project.location.plot_number}</Typography>
      </Grid2>
      
      {/* Approved Documents Section */}
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h6">Approved Docs:</Typography>
        <Typography>{project.approved_docs > 0 ? "Yes" : "No"}</Typography>

        {project.approved_drawings && (
          <>
            <Typography variant="h6" gutterBottom>Approved Documents:</Typography>
            {/* Display approved documents */}
            {project.approved_drawings.map((doc) => (
              <div key={doc.id}>
                Document: {doc.architectural || doc.structural}
              </div>
            ))}
          </>
        )}
      </Grid2>

      {/* Stakeholders Section */}
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h6">Stakeholders:</Typography>
        {stakeholders.length > 0 ? (
          <>
            <Typography>{stakeholders.length} Stakeholder(s) added.</Typography>
          </>
        ) : (
          <Typography>No stakeholders added yet.</Typography>
        )}
      </Grid2>
    </Grid2>
  );
};

export default ProjectDetails;
