import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { NodeData } from '../../types';

interface AvailabilityZoneNodeData extends NodeData {
  type: 'availabilityZone';
}

/**
 * Custom Availability Zone Node Component
 * Displays an availability zone container with gray header
 */
const AvailabilityZoneNode: React.FC<NodeProps<AvailabilityZoneNodeData>> = ({ data, id, selected }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <div
      className={`relative bg-white border-2 border-dashed rounded-lg shadow-md min-w-[180px] min-h-[120px] ${
        selected ? 'border-blue-500' : 'border-gray-400'
      }`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Resize handle */}
      <NodeResizer
        color="#6b7280"
        isVisible={selected}
        minWidth={180}
        minHeight={120}
      />
      
      {/* Header */}
      <div className="bg-gray-500 text-white px-3 py-2 rounded-t-md font-semibold text-xs">
        {data.label} {data.value && `- ${data.value}`}
      </div>
      
      {/* Content */}
      <div className="p-3 flex-1">
        {data.value && (
          <div className="text-xs text-gray-600 mb-2">
            <span className="font-medium">Value:</span> {data.value}
          </div>
        )}
        <div className="text-xs text-gray-500">
          Drop VPCs here
        </div>
      </div>

      {/* Connection handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

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

export default AvailabilityZoneNode;

