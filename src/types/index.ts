/**
 * Type definitions for the Cloud Architecture Diagram Builder
 */

export type NodeType = 'region' | 'availabilityZone' | 'vpc' | 's3' | 'ec2';

export type EdgeAction = 'READ' | 'WRITE' | 'DELETE' | 'EXECUTE';

export interface NodeData {
  label: string;
  type: NodeType;
  value?: string; // Auto-populated value (e.g., us-east-1, us-east-1a, vpc-123)
  parentId?: string; // ID of parent node if nested
  onDelete?: (nodeId: string) => void; // Callback for deleting nodes
}

export interface CustomNode extends NodeData {
  id: string;
}

export interface EdgeData {
  action: EdgeAction;
  onActionChange?: (edgeId: string, action: EdgeAction) => void; // Callback for changing edge action
  onDelete?: (edgeId: string) => void; // Callback for deleting edges
}

export interface PaletteItem {
  type: NodeType;
  label: string;
  icon?: string;
}

