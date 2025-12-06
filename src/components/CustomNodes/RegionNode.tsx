import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { NodeData } from '../../types';

interface RegionNodeData extends NodeData {
  type: 'region';
}

/**
 * Custom Region Node Component
 * Displays a region container with AWS-style blue header
 */
const RegionNode: React.FC<NodeProps<RegionNodeData>> = ({ data, id, selected }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <div
      className={`relative bg-white border-2 border-dashed rounded-lg shadow-lg min-w-[200px] min-h-[150px] ${
        selected ? 'border-blue-500' : 'border-blue-300'
      }`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Resize handle */}
      <NodeResizer
        color="#3b82f6"
        isVisible={selected}
        minWidth={200}
        minHeight={150}
      />
      
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md font-semibold text-sm">
        {data.label} {data.value && `- ${data.value}`}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1">
        {data.value && (
          <div className="text-xs text-gray-600 mb-2">
            <span className="font-medium">Value:</span> {data.value}
          </div>
        )}
        <div className="text-xs text-gray-500">
          Drop Availability Zones here
        </div>
      </div>

      {/* Connection handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      {/* Delete button */}
      {data.onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          title="Delete node"
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default RegionNode;

