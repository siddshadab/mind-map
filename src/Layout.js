import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/user";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NODE_ENDPOINT } from "./config";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentNode, setCurrentNode] = useState(
    useSelector((state) => state.nodes.nodes)
  );

  const handleLogout = async () => {
    dispatch(setToken(false));
    navigate("/auth");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleMenuOpen = (event, nodeId) => {
    setAnchorEl(event.currentTarget);
    setSelectedNodeId(nodeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNodeId(null);
  };

  const fetchNodes = async () => {
    const userEmail = localStorage.getItem("email");

    try {
      // Make an API call to fetch data based on the email ID
      const response = await fetch(`${NODE_ENDPOINT}/getByEmail/${userEmail}`);
      const data = await response.json();
      const convertedData = data.map((item) => {
        const parsedData = JSON.parse(item.data);
        const children = parsedData.map((child) => ({
          id: child.id,
          name: child.name,
          mapName: child.mapName,
          children: child.children,
        }));

        return {
          id: item.id,
          name: item.name,
          mapName: item.mapName,
          children: children,
        };
      });
      setCurrentNode(convertedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call the fetchNodes function when the component mounts
    fetchNodes();
  }, []);
  const handleDeleteNode = () => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this Map?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // Filter out the node with the selectedNodeId
            fetch(`${NODE_ENDPOINT}/deleteById/${selectedNodeId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.ok) {
                  // Handle success response
                  console.log("Node deleted successfully");
                  toast.success("Node deleted successfully.");
                  // const updatedNodes = currentNode.filter(
                  //   (node) => node.unique_id !== selectedNodeId
                  // );
                  // dispatch(deleteNode(selectedNodeId));

                  // // Update the currentNode state with the updatedNodes
                  // setCurrentNode(updatedNodes);
                  fetchNodes();

                  // Perform any additional actions or updates after deletion
                } else {
                  // Handle error response
                  console.error("Error deleting node");
                  toast.error("Error deleting node.");
                }
              })
              .catch((error) => {
                // Handle network error
                toast.error("Network error:", error);
                console.error("Network error:", error);
              });

            handleMenuClose();

            // Show toast notification for successful deletion
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleEditNode = () => {
    // Perform edit logic here using the selectedNodeId
    // ...
    handleMenuClose();
  };

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: "1.44rem 1.88rem" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#000",
            fontFamily: "Roboto",
          }}
        >
          Your MindMaps
        </Typography>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto", marginRight: "1rem" }}>
            <button className="create-btn" onClick={() => navigate("/New")}>
              +
            </button>
          </div>
          <div style={{ width: "134px" }}>
            <button
              className="create-btn"
              onClick={() => handleLogout()}
              sx={{
                p: "1.44rem 1.88rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </Grid>
      <Grid
        item
        container
        direction="column"
        sx={{ height: "100%", p: "2.44rem 2.88rem" }}
        alignItems="center"
      >
        {Array.isArray(currentNode) && currentNode.length ? (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    height: "92px",
                    background: "#f8f8fA",
                    borderRadius: "8px",
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentNode.map((node, nt) => (
                  <TableRow
                    key={nt}
                    sx={{
                      height: "82px",
                    }}
                    hover
                  >
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/List/${node.id}`)}
                    >
                      {node.mapName}
                    </TableCell>
                    <TableCell align="right">
                      <MoreHorizIcon
                        sx={{
                          fill: "#000",
                          cursor: "pointer",
                        }}
                        onClick={(event) => handleMenuOpen(event, node.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              height: "800px",
              justifyContent: "center",
            }}
          >
            Looks like you don't have any mindmaps yet.
            <p>All Your Mind Maps Would Appear Here!</p>
            <button className="create-btn" onClick={() => navigate("/New")}>
              Create New
            </button>
          </Box>
        )}
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditNode}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteNode}>Delete</MenuItem>
      </Menu>
      <ToastContainer />
    </Grid>
  );
};

export default Layout;
