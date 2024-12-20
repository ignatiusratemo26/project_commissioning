import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination,Menu,MenuItem,TextField,Button,Badge,IconButton,
} from "@mui/material";
import { Add, FilterList, MoreVert } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import { useNavigate, Navigate } from "react-router-dom";
import CreateProjectModal from "./CreateProjectModal";
import { UserContext } from "../../UserContext";

export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleMenuClick = (event, projectId) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentProjectId(projectId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentProjectId(null);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleView = () => {
    navigate(`/projects/view/${currentProjectId}`);
  };

  const handleEdit = () => {
    navigate(`/projects/edit/${currentProjectId}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects/");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-2">
          <IconButton>
            <FilterList />
          </IconButton>
          <TextField
            placeholder="Search..."
            variant="outlined"
            className="w-full md:w-auto"
            style={{ minWidth: "200px", maxWidth: "300px" }}
          />
        </div>
        <Button
          className="w-full md:w-auto"
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          Create New Project
        </Button>
        <CreateProjectModal open={modalOpen} handleClose={handleCloseModal} />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>SCOPE</TableCell>
              <TableCell>COUNTY</TableCell>
              <TableCell>CONSTITUENCY</TableCell>
              <TableCell>PLOT NO.</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.scope}</TableCell>
                <TableCell>{project.location?.county || "N/A"}</TableCell>
                <TableCell>{project.location?.constituency || "N/A"}</TableCell>
                <TableCell>{project.location?.plot_number || "N/A"}</TableCell>
                <TableCell>
                  {project.approved_for_commissioning && (
                    <Badge
                      badgeContent="Approved for Commissioning"
                      color="success"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#4caf50",
                          color: "#fff",
                          padding: "4px 8px",
                          paddingY: "16px",
                          borderRadius: "12px",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  )}
                  {project.approved_for_occupancy && (
                    <Badge
                      badgeContent="Occupancy Approved"
                      color="primary"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#2196f3",
                          color: "#fff",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          paddingY: "16px",
                          fontWeight: "bold",
                          marginLeft: "8px",
                        },
                      }}
                    />
                  )}
                  {!project.approved_for_commissioning &&
                    !project.approved_for_occupancy && "Pending"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, project.id)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleView}>View</MenuItem>
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={projects.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
