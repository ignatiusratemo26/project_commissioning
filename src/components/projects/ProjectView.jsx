import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Typography,
  Button,
  IconButton,
  Grid,
  Badge,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const ProjectView = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
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

  if (!project) return <div>Loading...</div>;

  return (
    <Paper className="p-6">
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Project Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Name:</Typography>
          <Typography>{project.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Scope:</Typography>
          <Typography>{project.scope}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">County:</Typography>
          <Badge color="primary">{project.location.county}</Badge>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Constituency:</Typography>
          <Typography>{project.location.constituency}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Plot No:</Typography>
          <Typography>{project.location.plot_number}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Approved Docs:</Typography>
          <Typography>{Object.keys(project.approved_docs).length > 0 ? "Yes" : "No"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProjectView;
