import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { NodeData } from '../../types';

interface S3NodeData extends NodeData {
  type: 's3';
}

/**
 * Custom S3 Node Component
 * Displays an S3 bucket with green cylindrical icon style
 */
const S3Node: React.FC<NodeProps<S3NodeData>> = ({ data, id, selected }) => {
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
        color="#22c55e"
        isVisible={selected}
        minWidth={120}
        minHeight={100}
      />
      
      {/* S3 Icon representation - cylindrical bucket */}
      <div className="flex items-center justify-center mb-2">
        <div className="w-12 h-16 bg-green-500 rounded-t-lg relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-green-600 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-700 rounded-b-lg"></div>
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

export default S3Node;

