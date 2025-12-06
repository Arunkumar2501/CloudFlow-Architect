import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { NodeData } from '../../types';

interface VPCNodeData extends NodeData {
  type: 'vpc';
}

/**
 * Custom VPC Node Component
 * Displays a VPC container with purple header
 */
const VPCNode: React.FC<NodeProps<VPCNodeData>> = ({ data, id, selected }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <div
      className={`relative bg-white border-2 border-solid rounded-lg shadow-md min-w-[160px] min-h-[100px] ${
        selected ? 'border-blue-500' : 'border-purple-600'
      }`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Resize handle */}
      <NodeResizer
        color="#9333ea"
        isVisible={selected}
        minWidth={160}
        minHeight={100}
      />
      
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 py-2 rounded-t-md font-semibold text-xs">
        {data.label} {data.value && `- ${data.value}`}
      </div>
      
      {/* Content */}
      <div className="p-3 flex-1">
        {data.value && (
          <div className="text-xs text-gray-600">
            <span className="font-medium">Value:</span> {data.value}
          </div>
        )}
        <div className="text-xs text-gray-500 mt-2">
          Drop S3 or EC2 here
        </div>
      </div>

      {/* Connection handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/* Delete button */}
      {data.onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          title="Delete node"
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default VPCNode;

