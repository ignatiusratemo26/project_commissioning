// ProjectCards.js
import React from "react";
import { Card, CardContent, Typography, ListItem, ListItemText } from "@mui/material";

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
          
          <Typography>Issued: {occupancyCertificate ? 'Yes' : 'No'}</Typography>
            {occupancyCertificate ? (
                <Typography>View Certificate: <a href={
                    occupancyCertificate
                    } target="_blank" rel="noopener noreferrer">View Document</a></Typography>
                    
          ) : (
            <Typography>No Occupancy Certificate issued yet.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectCards;
