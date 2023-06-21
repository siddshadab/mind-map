import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { MainNode } from "./InnerApp";
import { useNavigate, useParams } from "react-router-dom";
import { NODE_ENDPOINT } from "./config";
import { ToastContainer, toast } from "react-toastify";


const NodeDet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orgChart, setOrgChart] = useState([]);
  const [data,setData] = useState();
  const [loading, setLoading] = useState(true);
  const [currentNode, setCurrentNode] = useState(null);

  // Fetch nodes data from API
  useEffect(() => {
    console.log("Unique Id ", id);
    const fetchNodes = async () => {
      try {
        const response = await fetch(`${NODE_ENDPOINT}/getById/${id}`);
        const data = await response.json();
        console.log("data ", data);
        setCurrentNode(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNodes();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
  
    try {
      const response = await fetch(`${NODE_ENDPOINT}/${id}`, {
        // Replace with the actual API endpoint URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Update the properties with the desired changes
          mapName: orgChart.length > 0 ? orgChart[0].mapName : "No Name",
          data: orgChart,
        }),
      });
  
      if (!response.ok) {
        // Handle API request error
        throw new Error("API request failed");
      }
  
      // Handle the successful update response
      toast.success("Map updated successfully.");
      setLoading(false);
      navigate("/");
    } catch (error) {
      // Handle error
      console.error(error);
      setLoading(false);
    }
  };
  // Set data and orgChart when currentNode or unique_id changes
  useEffect(() => {
    if (currentNode) {
      setData(currentNode);
      setOrgChart(JSON.parse(currentNode.data));
      setLoading(false);
    }
  }, [currentNode, id, data]);

  return !loading ? (
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
          {currentNode.mapName ? currentNode.mapName : "Map Details"}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction={"column"}
        sx={{ height: "100%" }}
        alignItems="center"
      >
        <Box
          sx={{
            height: "600px",
            width: "100%",
          }}
        >
          <MainNode orgChart={orgChart} setOrgChart={setOrgChart} />
        </Box>
      </Grid>
      <Box
        sx={{
          width: "100%",
          borderRadius: "8px",
          p: "1rem 1rem 1rem 0",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "15%", gap: "0.5rem" }}>
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <div style={{ width: "100px" }}>
            <button
              className="create-btn"
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
            </button>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </Grid>
  ) : (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default NodeDet;
