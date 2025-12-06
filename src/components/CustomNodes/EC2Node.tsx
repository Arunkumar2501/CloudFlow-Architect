import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { NodeData } from '../../types';

interface EC2NodeData extends NodeData {
  type: 'ec2';
}

/**
 * Custom EC2 Node Component
 * Displays an EC2 instance with orange square icon style
 */
const EC2Node: React.FC<NodeProps<EC2NodeData>> = ({ data, id, selected }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <div
      className={`relative bg-white border-2 rounded-lg shadow-md p-4 min-w-[120px] min-h-[100px] ${
        selected ? 'border-blue-500' : 'border-gray-300'
      }`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Resize handle */}
      <NodeResizer
        color="#f97316"
        isVisible={selected}
        minWidth={120}
        minHeight={100}
      />
      {/* EC2 Icon representation - square with circuit board pattern */}
      <div className="flex items-center justify-center mb-2">
        <div className="w-12 h-12 bg-orange-500 rounded relative">
          {/* Circuit board pattern */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="w-8 h-0.5 bg-orange-700"></div>
            <div className="w-0.5 h-8 bg-orange-700 mt-1"></div>
            <div className="absolute top-1 left-1 w-2 h-2 bg-orange-300 rounded-sm"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-orange-300 rounded-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Label */}
      <div className="text-center font-semibold text-sm text-gray-800">
        {data.label}
      </div>
      
      {/* Value if present */}
      {data.value && (
        <div className="text-xs text-gray-600 text-center mt-1">
          {data.value}
        </div>
      )}

      {/* Connection handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/* Delete button */}
      {data.onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          title="Delete node"
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default EC2Node;

