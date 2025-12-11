import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ConnectionMode,
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
import DemoScreen from './components/Demo/DemoScreen';

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
  const [viewMode, setViewMode] = useState<'diagram' | 'demo'>('diagram');
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

  // Memoize node and edge type maps to keep stable references for React Flow
  const memoNodeTypes = useMemo(() => nodeTypes, []);
  const memoEdgeTypes = useMemo(() => edgeTypes, []);

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
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white shadow-sm">
        <span className="text-sm font-semibold text-gray-700">View:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('diagram')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              viewMode === 'diagram'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Diagram Builder
          </button>
          <button
            onClick={() => setViewMode('demo')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              viewMode === 'demo'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Demo UI
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0">
        {viewMode === 'demo' ? (
          <DemoScreen />
        ) : (
          <div className="h-full w-full flex">
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
                connectionMode={ConnectionMode.Loose}
                nodeTypes={memoNodeTypes}
                edgeTypes={memoEdgeTypes}
                fitView
                attributionPosition="bottom-left"
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>
          </div>
        )}
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

