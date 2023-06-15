import { Grid, Box } from "@mui/material";
import { MainNode } from "./InnerApp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postNodes } from "./redux/nodes";
import { useState } from "react";
import uuid from "react-uuid";
import { NODE_ENDPOINT } from "./config";
import { ToastContainer, toast } from "react-toastify";

const NewNode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orgChart, setOrgChart] = useState([
    {
      id: uuid(),
      name: "",
      mapName: "",
      children: [],
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (newValue, index) => {
    setOrgChart((prevOrgChart) => {
      const updatedOrgChart = [...prevOrgChart];
      updatedOrgChart[index] = {
        ...updatedOrgChart[index],
        mapName: newValue,
      };
      return updatedOrgChart;
    });
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const userEmail = localStorage.getItem("email");
      const response = await fetch(NODE_ENDPOINT, {
        // Replace with the actual API endpoint URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uniqueId: uuid(),
          mapName: orgChart.length > 0 ? orgChart[0].mapName : "No Name",
          email: userEmail,
          data: orgChart,
        }),
      });

      if (!response.ok) {
        // Handle API request error
        throw new Error("API request failed");
      }

      const responseData = await response.json();

      // Dispatch the action to update Redux store
      dispatch(postNodes(responseData.data));
      toast.success("Map Saved successfully.");

      setLoading(false);
      navigate("/");
    } catch (error) {
      // Handle error
      console.error(error);
      setLoading(false);
    }
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
        <Box sx={{ flexGrow: 1 }}>
          {orgChart.map((item, index) => (
            <input
              placeholder="Enter your Map name"
              key={item.id}
              value={item.mapName}
              onChange={(e) => handleChange(e.target?.value, index)}
              sx={{
                width: "85%",
                marginLeft: "1rem",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "none",
                outline: "none",
                borderBottom: "1px solid #445366",
                fontSize: "1rem",
                fontWeight: 300,
                paddingBottom: "10px",
                marginTop: "10px",
                color: "white",
                backgroundColor: "transparent",
                "&::placeholder": {
                  color: "#616e7f",
                },
              }}
            />
          ))}
        </Box>
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
            Cancel
          </button>
          <div style={{ width: "100px" }}>
            <button
              className="create-btn"
              onClick={handleSave} // Call handleSave function on button click
            >
              Save
            </button>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </Grid>
  );
};

export default NewNode;
