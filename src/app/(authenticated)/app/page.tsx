"use client";
import { memo, useCallback, useMemo } from "react";
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import SelectorNode from "./SelectorNode";

const initialNodes = [
  { id: "1", type: "person", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", type: "person", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "", target: "" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => {
    return { person: SelectorNode };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button>subir arquivo</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
