import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  IconButton,
  Grid2,
  Badge,
  Tooltip
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AddApprovedDocumentModal from "./AddApprovedDocumentModal"; // Import your modal component
import AddStakeholderModal from "./AddStakeholderModal"; // Import your modal component

const ProjectView = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [stakeholders, setStakeholders] = useState([]);
  const [approvedDocsModalOpen, setApprovedDocsModalOpen] = useState(false);
  const [stakeholderModalOpen, setStakeholderModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/`);
        setProject(response.data);

        // Fetch stakeholders associated with the project
        const stakeholdersResponse = await axios.get(`/stakeholders/?project=${projectId}`);
        setStakeholders(stakeholdersResponse.data);
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

  // Determine if the button should be disabled
  const isSubmitDisabled =
    Object.keys(project.approved_docs).length === 0 || stakeholders.length < 3;

  return (
    <div>
      
      <Paper className="p-6">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Project Details
        </Typography>

        {/* Button Container */}
        <Grid2 container justifyContent="flex-end" spacing={2}>
        <Grid2 item>

          <Tooltip title="Project must have at least one approved document and three stakeholders to submit for commissioning.">
          <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => navigate(`/projects/commissioning/${projectId}/`)} 
              disabled={isSubmitDisabled}
            >
              Submit for Commissioning
            </Button>          </Tooltip>
          </Grid2>
          <Grid2 item>
            <Button variant="contained" color="secondary" onClick={() => navigate(`/projects/edit/${projectId}/`)}>
              Edit Project
            </Button>
          </Grid2>
          <Grid2 item>
            <Button variant="outlined" onClick={() => setStakeholderModalOpen(true)}>
              Add Stakeholder
            </Button>
          </Grid2>
          <Grid2 item>
            <Button variant="outlined" onClick={() => setApprovedDocsModalOpen(true)}>
              Add Approved Document
            </Button>
          </Grid2>
        </Grid2>



        <Grid2 container spacing={3} sx={{ marginTop: 2 }}>
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
            

            {/* Display stakeholders */}
            {stakeholders.length > 0 ? (
              <>
                <List>
                  {stakeholders.map((stakeholder) => (
                    <ListItem key={stakeholder.id}>
                      <ListItemText primary={`${stakeholder.name} - ${stakeholder.role}`} />
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Typography>No stakeholders added yet.</Typography>
            )}
          </Grid2>

        </Grid2>


      </Paper>

      {/* Card for Approved Documents */}
      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Approved Documents</Typography>
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

      {/* Card for Stakeholders */}
      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Stakeholders</Typography>
          {stakeholders.length > 0 ? (
            <List>
              {stakeholders.map((stakeholder) => (
                <ListItem key={stakeholder.id} divider>
                  <ListItemText primary={`${stakeholder.name} - ${stakeholder.role}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No stakeholders added yet.</Typography>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default ProjectView;
