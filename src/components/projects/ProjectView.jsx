import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,CardContent,Typography,List,ListItem,ListItemText,Button,Divider,
  Paper,
  IconButton,Grid2,Badge
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AddApprovedDocumentModal from "./AddApprovedDocumentModal"; // Import your modal component
import AddStakeholderModal from "./AddStakeholderModal"; // Import your modal component

const ProjectView = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [approvedDocsModalOpen, setApprovedDocsModalOpen] = useState(false);
  const [stakeholderModalOpen, setStakeholderModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  const handleApprovedDocsModalClose = () => {
    setApprovedDocsModalOpen(false);
    fetchProjectDetails(); // Refresh project details after adding
  };

  const handleStakeholderModalClose = () => {
    setStakeholderModalOpen(false);
    fetchProjectDetails(); // Refresh project details after adding
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div>
    <Paper className="p-6">
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Project Details
      </Typography>
      <Grid2 container spacing={3}>
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
        <Grid2 item xs={12} sm={6}>
          <Typography variant="h6">Approved Docs:</Typography>
          <Typography>{Object.keys(project.approved_docs).length > 0 ? "Yes" : "No"}</Typography>
          {/* Button to add approved documents */}
          <Button variant="outlined" onClick={() => setApprovedDocsModalOpen(true)}>
            Add Approved Document
          </Button>

          {/* Display approved documents */}
          {project.approved_drawings && (
            <>
              <Typography variant="h6" gutterBottom>Approved Documents:</Typography>
              <List>
                {project.approved_drawings.map((doc) => (
                  <ListItem key={doc.id}>
                    <ListItemText primary={`Document: ${doc.architectural || doc.structural}`} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Grid2>

        {/* Stakeholders Section */}
        <Grid2 item xs={12} sm={6}>
          <Typography variant="h6">Stakeholders:</Typography>
          {/* Button to add stakeholders */}
          <Button variant="outlined" onClick={() => setStakeholderModalOpen(true)}>
            Add Stakeholder
          </Button>

          {/* Display stakeholders */}
          {project.stakeholders && (
            <>
              <List>
                {project.stakeholders.map((stakeholder) => (
                  <ListItem key={stakeholder.id}>
                    <ListItemText primary={`${stakeholder.name} - ${stakeholder.role}`} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Grid2>

      </Grid2>

      {/* Modals for adding approved documents and stakeholders */}
      <AddApprovedDocumentModal 
        open={approvedDocsModalOpen} 
        handleClose={handleApprovedDocsModalClose} 
        projectId={projectId}
      />
      <AddStakeholderModal 
        open={stakeholderModalOpen} 
        handleClose={handleStakeholderModalClose} 
        projectId={projectId}
      />
    </Paper>

    <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Approved Documents
          </Typography>
          {Object.keys(project.approved_docs || {}).length > 0 ? (
            <List>
              {Object.entries(project.approved_docs).map(([key, url]) => (
                <ListItem key={key} divider>
                  <ListItemText primary={key.replace(/_/g, " ")} />
                  <Button
                    variant="outlined"
                    color="primary"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No approved documents uploaded yet.</Typography>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default ProjectView;
