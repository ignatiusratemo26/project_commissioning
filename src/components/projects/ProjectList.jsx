// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Menu,
//   MenuItem,
//   Checkbox,
// } from '@mui/material';
// import { TextField, Button, Badge, Select, IconButton } from '@mui/material';
// import { ChevronLeft, ChevronRight, Add, FilterList } from '@mui/icons-material';
// import Paper from '@mui/material/Paper';
// import { MoreVert, Info, Edit, Delete } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import CreateProjectModal from './CreateProjectModal';


// export default function ProjectList() {
//   const [selectedRows, setSelectedRows] = useState([]);

//   const [modalOpen, setModalOpen] = useState(false);

  
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
//   const [currentProjectId, setCurrentProjectId] = useState(null);
//   const navigate = useNavigate();

//   const handleMenuClick = (event, projectId) => {
//     setMenuAnchorEl(event.currentTarget);
//     setCurrentProjectId(projectId);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchorEl(null);
//     setCurrentProjectId(null);
//   };

//   const handleOpenModal = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);

//   const handleView = () => {
//     navigate(`/projects/${currentProjectId}`);
//   };

//   const handleEdit = () => {
//     console.log(`Edit project with ID: ${currentProjectId}`);
//   };

//   const handleDelete = () => {
//     console.log(`Delete project with ID: ${currentProjectId}`);
//   };

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get("/projects/");
//         setProjects(response.data);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Open":
//         return "primary";
//       case "Paid":
//         return "success";
//       case "Inactive":
//         return "default";
//       case "Due":
//         return "error";
//       default:
//         return "default";
//     }
//   };

//   const handlePageChange = (_event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className="w-full p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex gap-2">
//           <IconButton>
//             <FilterList />
//           </IconButton>
//           <TextField
//             placeholder="Search..."
//             variant="outlined"
//             size="small"
//             style={{ width: 300 }}
//           />
//         </div>
//         <Button variant="contained" startIcon={<Add />} onClick={handleOpenModal}>
//           Create New Project
//         </Button>

//         <CreateProjectModal open={modalOpen} handleClose={handleCloseModal} />
//       </div>



//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox />
//               </TableCell>
//               <TableCell>#</TableCell>
//               <TableCell>NAME</TableCell>
//               <TableCell>SCOPE</TableCell>
//               <TableCell>COUNTY</TableCell>
//               <TableCell>CONSTITUENCY</TableCell>
//               <TableCell>PLOT NO.</TableCell>
//               <TableCell>APPROVED DOCS</TableCell>
//               <TableCell>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {projects
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((project) => (
//                 <TableRow key={project.id}>
//                   <TableCell padding="checkbox">
//                     <Checkbox />
//                   </TableCell>
//                   <TableCell>{project.id}</TableCell>
//                   <TableCell>
//                     <div>
//                       {project.name}
//                       <div style={{ fontSize: "small", color: "gray" }}>
//                         {project.projectId}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>{project.scope}</TableCell>
//                   <TableCell>
//                     <Badge color={getStatusColor(project.location.county)}>
//                       {project.location.county}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{project.location.constituency}</TableCell>
//                   <TableCell>{project.location.plot_number}</TableCell>
//                   <TableCell>
//                     {Object.keys(project.approved_docs).length > 0
//                       ? "Yes"
//                       : "No"}
//                   </TableCell>
//                   <TableCell>
//                   <IconButton onClick={(e) => handleMenuClick(e, project.id)}>
//                     <MoreVert />
//                   </IconButton>
//                   <Menu
//                       anchorEl={menuAnchorEl}
//                       open={Boolean(menuAnchorEl)}
//                       onClose={handleMenuClose}
//                     >
//                       <MenuItem onClick={handleView}>View</MenuItem>
//                       <MenuItem onClick={handleEdit}>Edit</MenuItem>
//                       <MenuItem onClick={handleDelete}>Delete</MenuItem>
//                     </Menu>
//                 </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <div className="flex items-center justify-between mt-4">
//         <TablePagination
//           component="div"
//           count={projects.length}
//           page={page}
//           onPageChange={handlePageChange}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  Checkbox,
} from '@mui/material';
import { TextField, Button, Badge, IconButton } from '@mui/material';
import { Add, FilterList, MoreVert } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import CreateProjectModal from './CreateProjectModal';

export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const navigate = useNavigate();

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
    console.log(`View project with ID: ${currentProjectId}`);
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

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <IconButton>
            <FilterList />
          </IconButton>
          <TextField placeholder="Search..." variant="outlined" size="small" style={{ width: 300 }} />
        </div>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenModal}>
          Create New Project
        </Button>
        <CreateProjectModal open={modalOpen} handleClose={handleCloseModal} />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>#</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>SCOPE</TableCell>
              <TableCell>COUNTY</TableCell>
              <TableCell>CONSTITUENCY</TableCell>
              <TableCell>PLOT NO.</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
              <TableRow key={project.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.scope}</TableCell>
                <TableCell>{project.location?.county || "N/A"}</TableCell>
                <TableCell>{project.location?.constituency || "N/A"}</TableCell>
                <TableCell>{project.location?.plot_number || "N/A"}</TableCell>
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
