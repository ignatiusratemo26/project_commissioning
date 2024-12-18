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
import { CheckCircleIcon } from "lucide-react";

const ProjectView = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [stakeholders, setStakeholders] = useState([]);
  const [approvedDocsModalOpen, setApprovedDocsModalOpen] = useState(false);
  const [stakeholderModalOpen, setStakeholderModalOpen] = useState(false);
  const [isSubmittedForApproval, setIsSubmittedForApproval] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/`);
        setProject(response.data);
        setIsSubmittedForApproval(response.data.ready_for_approval);
        

        // Fetch stakeholders associated with the project
        const stakeholdersResponse = await axios.get(`/stakeholders/?project=${projectId}`);
        setStakeholders(stakeholdersResponse.data);

        if (!response.data.ready_for_approval) {
          setIsSubmitDisabled(
            response.data.approved_docs < 3 || stakeholdersResponse.data.length < 3
          );
        } else if (response.data.approved_for_commissioning) {
          setIsSubmitDisabled(response.data.approved_docs < 5);
        }

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

  const handleSubmitForApproval = async () => {
    try {
      await axios.patch(`/projects/${projectId}/`, { ready_for_approval: true });
    } catch (error) {
      console.error("Error submitting project for approval:", error);
    }
  };

  const handleSubmitForCommissioning = async () => {
    try {
      await axios.patch(`/projects/${projectId}/`, { ready_for_commissioning: true });
    } catch (error) {
      console.error("Error submitting project for commissioning:", error);
    }
  };

  if (!project) return <div>Loading...</div>;
  
  const documentFields = [
    { label: 'NEMA Certificate', key: 'nema_cert' },
    { label: 'EIA Report', key: 'eia_report' },
    { label: 'NCA Certificate', key: 'nca_cert' },
    { label: 'Architectural', key: 'architectural' },
    { label: 'Structural', key: 'structural' },
    { label: 'Proposed Sewer', key: 'proposed_sewer' },
    { label: 'Proposed Water', key: 'proposed_water' },
    { label: 'Proposed Electricity', key: 'proposed_electricity' },
  ];

  return (
    <div>
      
      <Paper className="p-6">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
          {/* Title Section */}
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <Typography variant="h4" gutterBottom style={{ marginRight: "46px" }}>
            Project Details for {project.name}
          </Typography>
          
        </div>

        <div style={{ display: "flex", justifyContent:"center" , marginBottom: "16px" }}>
        {project.approved_for_commissioning && (
            <Badge
              badgeContent={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon style={{ marginRight: "4px" }} />
                  Approved for Commissioning
                </span>
              }
              color="success"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  marginRight: "8px",
                  paddingY: "20px",
                },
              }}
            />
          )}
          {project.approved_for_occupancy && (
            <Badge
              badgeContent={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon style={{ marginRight: "4px" }} />
                  Approved for Occupancy
                </span>
              }
              color="success"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  padding: "4px 12px",
                  paddingY:"20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  marginLeft: "8px",
                },
              }}
            />
          )}
          </div>

        {/* Button Container */}
        <Grid2 container justifyContent="flex-end" spacing={2} className="mt-10" >
        <Grid2 item>

          <Tooltip title="Project must have at least 3 approved documents and three stakeholders to submit for approval.">

            <Button
              variant="contained"
              color="secondary"
              onClick={project.approved_for_commissioning ? handleSubmitForCommissioning : handleSubmitForApproval}
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

        {approvedDocsModalOpen && (
            <AddApprovedDocumentModal
              open={approvedDocsModalOpen}
              onClose={handleApprovedDocsModalClose}
              projectId={projectId}
            />
          )}

          {stakeholderModalOpen && (
            <AddStakeholderModal
              open={stakeholderModalOpen}
              onClose={handleStakeholderModalClose}
              projectId={projectId}
            />
          )}


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
            <Typography>{project.approved_docs > 0 ? "Yes" : "No"}</Typography>


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
            {stakeholders.length >= 0 ? (
              <Typography>
                {stakeholders.length} Stakeholder(s) added.
              </Typography>
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
          {/* {Object.keys(project.approved_docs || {}).length > 0 ? (
          //   <List>
          //     {Object.entries(project.approved_docs).map(([key, url]) => (
          //       <ListItem key={key} divider>
          //         <ListItemText primary={key.replace(/_/g, " ")} />
          //         <Button
          //           variant="outlined"
          //           color="primary"
          //           href={url}
          //           target="_blank"
          //           rel="noopener noreferrer"
          //         >
          //           View Document
          //         </Button>
          //       </ListItem>
          //     ))}
          //   </List>
          // ) : (
          //   <Typography>No approved documents uploaded yet.</Typography>
          // )} */}
          <List>
          {documentFields.map((doc) => (
            <ListItem key={doc.key}>
              <ListItemText
                primary={`${doc.label}:`}
                secondary={
                  project[doc.key] ? (
                    <a href={project[doc.key]} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  ) : (
                    'Not available'
                  )
                }
              />
            </ListItem>
          ))}
        </List>
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
