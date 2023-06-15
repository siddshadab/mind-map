const intialState = {
  nodes: [],
};

const POST_NODES = "mind-map/POST_NODES";
const DELETE_NODE = "mind-map/DELETE_NODE"; // New action type for deleting a node

export const postNodes = (nodes) => ({
  type: POST_NODES,
  payload: nodes,
});

export const deleteNode = (nodeId) => ({
  // Action creator for deleting a node
  type: DELETE_NODE,
  payload: nodeId,
});

const nodesReducer = (state = intialState, action) => {
  switch (action.type) {
    case POST_NODES:
      return { ...state, nodes: [...state.nodes, action.payload] };

    case DELETE_NODE:
      const updatedNodes = state.nodes.filter(
        (node) => node.unique_id !== action.payload
      );
      return { ...state, nodes: updatedNodes };

    default:
      return state;
  }
};

export default nodesReducer;
