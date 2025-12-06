import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useDiagramBuilder } from './hooks/useDiagramBuilder';
import Palette from './components/Palette/Palette';
import {
  RegionNode,
  AvailabilityZoneNode,
  VPCNode,
  S3Node,
  EC2Node,
} from './components/CustomNodes';
import EdgeControls from './components/EdgeControls/EdgeControls';
import { PaletteItem } from './types';

// Register custom node types
const nodeTypes = {
  region: RegionNode,
  availabilityZone: AvailabilityZoneNode,
  vpc: VPCNode,
  s3: S3Node,
  ec2: EC2Node,
};

// Register custom edge type
const edgeTypes = {
  custom: EdgeControls,
};

/**
 * Main App Component
 * Interactive Cloud Architecture Diagram Builder
 */
const App: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    onPaletteDragStart,
  } = useDiagramBuilder();

  const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null);

  const onInit = useCallback((instance: any) => {
    setReactFlowInstance(instance);
  }, []);

  const handlePaletteDragStart = useCallback(
    (event: React.DragEvent, item: PaletteItem) => {
      onPaletteDragStart(event, item.type);
    },
    [onPaletteDragStart]
  );

  return (
    <div className="h-screen w-screen flex">
      {/* Left Sidebar - Node Palette */}
      <Palette onDragStart={handlePaletteDragStart} />

      {/* Right Side - React Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={(e) => onDrop(e, reactFlowInstance)}
          onDragOver={onDragOver}
          onInit={onInit}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

/**
 * App with ReactFlowProvider wrapper
 */
const AppWithProvider: React.FC = () => {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
};

export default AppWithProvider;

