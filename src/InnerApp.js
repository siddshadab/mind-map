import {Grid } from "@mui/material";
import Tree from "react-d3-tree";
import uuid from "react-uuid";

const SideNav = () => {
  return (
    <Grid
      item
      container
      direction="column"
      sx={{
        height: "100%",
      }}
    >
      <Grid item>Past Project 1</Grid>
      <Grid item>Past Project 2</Grid>
      <Grid item>Past Project 3</Grid>
    </Grid>
  );
};

const MainNode = ({ orgChart, setOrgChart }) => {
  const addChild = (node, parentId) => {
    return {
      ...node,
      parentId,
      children: node.children.map((child) => addChild(child, node.id)),
    };
  };

  const handleAddChild = (event, nodeId) => {
    setOrgChart((prev) => {
      const updatedChart = [...prev];
      const parentNode = findNodeById(updatedChart, nodeId);

      if (parentNode) {
        const newChild = {
          id: uuid(),
          name: "",
          parentId: parentNode.id,
          children: [],
        };

        parentNode.children.push(addChild(newChild, parentNode.id));
      }

      return updatedChart;
    });
  };

  // Recursive function to find a node by its id
  const findNodeById = (nodes, targetId) => {
    for (let node of nodes) {
      if (node.id === targetId) {
        return node;
      }
      if (node.children.length > 0) {
        const foundNode = findNodeById(node.children, targetId);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };

  const handleInputChange = (event, nodeDatum) => {
    setOrgChart((prev) => {
      const updatedChart = [...prev];
      const nodeIndex = updatedChart.findIndex(
        (item) => item.id === nodeDatum.id
      );

      if (nodeIndex !== -1) {
        updatedChart[nodeIndex] = {
          ...updatedChart[nodeIndex],
          name: event.target?.value,
        };
      } else {
        // Find the node recursively
        const findNode = (nodes, targetId) => {
          for (let node of nodes) {
            if (node.id === targetId) {
              return node;
            }
            if (node.children.length > 0) {
              const foundNode = findNode(node.children, targetId);
              if (foundNode) {
                return foundNode;
              }
            }
          }
          return null;
        };

        const targetNode = findNode(updatedChart, nodeDatum.id);

        if (targetNode) {
          targetNode.name = event.target?.value;
        }
      }

      return updatedChart;
    });
  };

  const handleDeleteChild = (childId) => {
    setOrgChart((prevChart) => {
      const deleteNode = (nodes, targetId) => {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.id === targetId) {
            nodes.splice(i, 1); // Remove the node from the array
            return true;
          }
          if (node.children && node.children.length > 0) {
            const foundNode = deleteNode(node.children, targetId);
            if (foundNode) {
              return true;
            }
          }
        }
        return false;
      };

      const updatedChart = [...prevChart]; // Create a shallow copy of the chart

      deleteNode(updatedChart, childId); // Delete the node

      return updatedChart;
    });
  };

  const renderCustomNodeElement = ({ nodeDatum }) => {
    const isParentNode = nodeDatum.children && nodeDatum.children.length > 0;

    // Calculate the dimensions based on the content
    const contentWidth = 80;
    const contentHeight = 70;

    // Calculate the total height based on the content and buttons
    const totalHeight = contentHeight + 40;

    return (
      <g>
        <circle r={30} fill={isParentNode ? "blue" : "green"} />
        <g>
          <foreignObject
            x={-contentWidth / 2}
            y={34}
            width={contentWidth}
            height={totalHeight}
            // onClick={() => handleDeleteChild(nodeDatum.id)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                value={nodeDatum.name}
                style={{
                  width: "80px",
                  border: "none",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderBottom: "1px dotted #000",
                  outline: "none",
                  "&:focus": {
                    border: "none",
                    borderBottom: "1px solid #000",
                  },
                }}
                onChange={(e) => handleInputChange(e, nodeDatum)}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginTop: "0.5rem",
                }}
              >
                <button onClick={(e) => handleAddChild(e, nodeDatum.id)}>
                  +
                </button>
                <button onClick={(e) => handleDeleteChild(nodeDatum.id)}>
                  -
                </button>
              </div>
            </div>
          </foreignObject>
        </g>
      </g>
    );
  };

  return (
    <>
      <Tree data={orgChart} renderCustomNodeElement={renderCustomNodeElement} />
    </>
  );
};

export { MainNode };
const InnerApp = () => {
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        item
        xl={1.5}
        lg={1.5}
        md={1.6}
        sm={1.5}
        xs={1}
        sx={{
          height: "100%",
          borderRadius: "8px",
          border: "1px solid #d9d9d9",
          background: "#f1f3f5",
        }}
      >
        <SideNav />
      </Grid>
      <Grid
        item
        xl={10}
        lg={10}
        md={10}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MainNode />
      </Grid>
    </Grid>
  );
};

export default InnerApp;
