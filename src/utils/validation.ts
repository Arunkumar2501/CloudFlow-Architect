/**
 * Validation utilities for node connections and diagram integrity
 */

import { Node, Edge } from 'reactflow';

/**
 * Checks if connecting two nodes would create a self-connection
 * @param sourceNodeId - ID of the source node
 * @param targetNodeId - ID of the target node
 * @returns True if it's a self-connection
 */
export const isSelfConnection = (sourceNodeId: string, targetNodeId: string): boolean => {
  return sourceNodeId === targetNodeId;
};

/**
 * Checks if adding an edge would create a cycle in the graph
 * @param sourceNodeId - ID of the source node
 * @param targetNodeId - ID of the target node
 * @param edges - Array of existing edges
 * @returns True if adding this edge would create a cycle
 */
export const wouldCreateCycle = (
  sourceNodeId: string,
  targetNodeId: string,
  edges: Edge[]
): boolean => {
  // Simple cycle detection using DFS
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const hasCycle = (nodeId: string): boolean => {
    if (recursionStack.has(nodeId)) {
      return true; // Cycle detected
    }

    if (visited.has(nodeId)) {
      return false;
    }

    visited.add(nodeId);
    recursionStack.add(nodeId);

    // Check all outgoing edges from this node
    const outgoingEdges = edges.filter(edge => edge.source === nodeId);
    for (const edge of outgoingEdges) {
      if (hasCycle(edge.target)) {
        return true;
      }
    }

    // If we're checking for a new edge, also check if target leads back to source
    if (nodeId === targetNodeId) {
      const targetOutgoing = edges.filter(edge => edge.source === targetNodeId);
      for (const edge of targetOutgoing) {
        if (edge.target === sourceNodeId || hasCycle(edge.target)) {
          return true;
        }
      }
    }

    recursionStack.delete(nodeId);
    return false;
  };

  return hasCycle(sourceNodeId);
};

/**
 * Validates if a connection between two nodes is allowed
 * @param sourceNodeId - ID of the source node
 * @param targetNodeId - ID of the target node
 * @param edges - Array of existing edges
 * @param preventCycles - Whether to prevent cycles (optional)
 * @returns Object with isValid flag and error message if invalid
 */
export const validateConnection = (
  sourceNodeId: string,
  targetNodeId: string,
  edges: Edge[],
  preventCycles: boolean = false
): { isValid: boolean; error?: string } => {
  if (isSelfConnection(sourceNodeId, targetNodeId)) {
    return {
      isValid: false,
      error: 'Cannot connect a node to itself',
    };
  }

  if (preventCycles && wouldCreateCycle(sourceNodeId, targetNodeId, edges)) {
    return {
      isValid: false,
      error: 'This connection would create a cycle',
    };
  }

  return { isValid: true };
};

