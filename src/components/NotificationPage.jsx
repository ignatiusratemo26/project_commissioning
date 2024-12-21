import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination,Menu,MenuItem,Badge,
  IconButton,
  Paper,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { UserContext } from "../UserContext";


export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/notifications/");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMenuClick = (event, notificationId) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentNotificationId(notificationId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentNotificationId(null);
  };

  const markAsRead = async () => {
    try {
      await axios.post(`/notifications/${currentNotificationId}/mark_as_read/`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === currentNotificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      handleMenuClose();
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post("/notifications/mark_all_as_read/");
      setNotifications((prev) => prev.map((notification) => ({ ...notification, is_read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={markAllAsRead}
        >
          Mark All as Read
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>MESSAGE</TableCell>
              <TableCell>PROJECT ID</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{notification.id}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>#{notification.project || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      badgeContent={notification.is_read ? "Read" : "Unread"}
                      color={notification.is_read ? "success" : "error"}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: notification.is_read ? "#4caf50" : "#f44336",
                          color: "#fff",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, notification.id)}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={Boolean(menuAnchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={markAsRead}>Mark as Read</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={notifications.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}