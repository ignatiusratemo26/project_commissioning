// ProjectCards.js
import React from "react";
import { Card, CardContent, Typography, ListItem, ListItemText, Button } from "@mui/material";

const ProjectCards = ({ project, stakeholders, occupancyCertificate }) => {
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
    <>
      {/* Card for Approved Documents */}
      <Card sx={{ marginTop: 3 }} elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Approved Documents</Typography>
          {/* List approved documents */}
          {documentFields.map((doc) => (
            <ListItem key={doc.key}>
              <ListItemText primary={`${doc.label}:`} secondary={
                project[doc.key] ? (
                  <a href={project[doc.key]} target="_blank" rel="noopener noreferrer">View Document</a> 
                ) : ('Not available')
              } />
            </ListItem>
          ))}
        </CardContent>
      </Card>

      {/* Card for Stakeholders */}
      <Card sx={{ marginTop: 3 }} elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Stakeholders</Typography>
          {stakeholders.length > 0 ? (
            <>
              {stakeholders.map((stakeholder) => (
                <ListItem key={stakeholder.id} divider>
                  <ListItemText primary={`${stakeholder.name} - ${stakeholder.role}`} />
                  <ListItemText secondary={stakeholder.email} />
                  <ListItemText secondary={stakeholder.phone_number} />
                </ListItem>
              ))}
            </>
          ) : (
            <Typography>No stakeholders added yet.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Card for Occupancy Certificate */}
      <Card sx={{ marginTop: 3 }} elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Occupancy Certificate</Typography>
          
          <Typography>Issued: {occupancyCertificate !== null ? 'Yes' : 'No'}</Typography>
            {occupancyCertificate ? (
                <Typography>
                View Certificate: 
                <Button
                  variant="contained"
                  color="secondary"
                  component="a"
                  href={occupancyCertificate.certificate_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ ml: 1 }}
                >
                  Open
                </Button>
              </Typography>

          ) : (
            <Typography>No Occupancy Certificate issued yet.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectCards;
