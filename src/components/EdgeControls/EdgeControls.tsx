import React from 'react';
import { EdgeProps, getBezierPath, BaseEdge, EdgeLabelRenderer } from 'reactflow';
import { EdgeAction } from '../../types';

interface EdgeControlsData {
  action: EdgeAction;
  onActionChange?: (edgeId: string, action: EdgeAction) => void;
  onDelete?: (edgeId: string) => void;
}

/**
 * Custom Edge Component with Action Dropdown
 * Displays a Tailwind-styled select dropdown in the middle of the edge
 * Keeps action + delete logic on the edge data to avoid prop drilling
 */
const EdgeControls: React.FC<EdgeProps<EdgeControlsData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (data?.onActionChange) {
      data.onActionChange(id, e.target.value as EdgeAction);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data?.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: selected ? '#3b82f6' : '#9ca3af',
          strokeWidth: 2,
        }}
      />
      
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {/* Action dropdown in the middle of the edge */}
          <div className="flex flex-col items-center gap-1">
            <select
              value={data?.action || 'READ'}
              onChange={handleActionChange}
              className="px-2 py-1 text-xs bg-white border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="READ">READ</option>
              <option value="WRITE">WRITE</option>
              <option value="DELETE">DELETE</option>
              <option value="EXECUTE">EXECUTE</option>
            </select>
            
            {/* Delete button */}
            {data?.onDelete && (
              <button
                onClick={handleDelete}
                className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors cursor-pointer"
                title="Delete edge"
              >
                ✖
              </button>
            )}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default EdgeControls;

