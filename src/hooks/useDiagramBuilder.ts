import { useState, useCallback, useRef } from 'react';
import {
  Node,
  Edge,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from 'reactflow';
import { NodeType, NodeData, EdgeAction, EdgeData } from '../types';
import { generateNodeValue, canNestIn } from '../utils/nodeDataGenerator';
import { validateConnection } from '../utils/validation';

/**
 * Custom hook for managing diagram builder state and logic
 * Keeps all node/edge mutation logic co-located for clarity
 */
export const useDiagramBuilder = () => {
  const [nodes, setNodes] = useState<Node<NodeData>[]>([]);
  const [edges, setEdges] = useState<Edge<EdgeData>[]>([]);
  const nodeIdCounter = useRef(0);

  /**
   * Generates a unique node ID
   */
  const generateNodeId = useCallback(() => {
    nodeIdCounter.current += 1;
    return `node-${nodeIdCounter.current}`;
  }, []);

  /**
   * Handles node changes (drag, select, etc.)
   */
  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  /**
   * Handles edge changes
   */
  const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  /**
   * Handles edge deletion
   */
  const handleEdgeDelete = useCallback((edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  }, []);

  /**
   * Handles edge action change
   */
  const handleEdgeActionChange = useCallback((edgeId: string, action: EdgeAction) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === edgeId ? { ...edge, data: { ...edge.data, action } } : edge
      )
    );
  }, []);

  /**
   * Handles node deletion
   */
  const handleNodeDelete = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    // Also remove connected edges
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, []);

  /**
   * Handles new connections between nodes
   */
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;

      // Validate connection
      const validation = validateConnection(
        connection.source,
        connection.target,
        edges,
        false // Optional: set to true to prevent cycles
      );

      if (!validation.isValid) {
        alert(validation.error);
        return;
      }

      // Create new edge with default action
      const newEdge: Edge<EdgeData> = {
        id: `edge-${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        type: 'custom',
        data: {
          action: 'READ',
          onActionChange: handleEdgeActionChange,
          onDelete: handleEdgeDelete,
        },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edges, handleEdgeActionChange, handleEdgeDelete]
  );

  /**
   * Handles dropping a node from the palette onto the canvas
   */
  const onDrop = useCallback(
    (event: React.DragEvent, reactFlowInstance: any) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!nodeType) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

    // Find the innermost (most specific) parent node containing the drop point
      const containingNodes = nodes
        .map((node) => {
          const nodeElement = document.querySelector(`[data-id="${node.id}"]`);
          if (!nodeElement) return null;
          const rect = nodeElement.getBoundingClientRect();
          const containsPoint =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
          
          if (containsPoint) {
            return {
              node,
              area: rect.width * rect.height,
            };
          }
          return null;
        })
        .filter((item): item is { node: Node<NodeData>; area: number } => item !== null);

      // Select the innermost node (smallest area = most nested)
      const parentNode = containingNodes.length > 0
        ? containingNodes.reduce((smallest, current) =>
            current.area < smallest.area ? current : smallest
          ).node
        : undefined;

      // Check if nesting is allowed
      if (parentNode && !canNestIn(nodeType, parentNode.data.type)) {
        alert(`Cannot nest ${nodeType} inside ${parentNode.data.type}`);
        return;
      }

      // Generate node data
      const nodeId = generateNodeId();
      const nodeValue = generateNodeValue(
        nodeType,
        parentNode?.data,
        parentNode?.id,
        nodes.map((n) => ({ data: n.data }))
      );

      const nodeLabels: Record<NodeType, string> = {
        region: 'Region',
        availabilityZone: 'Availability Zone',
        vpc: 'VPC',
        s3: 'Amazon S3',
        ec2: 'Amazon EC2',
      };

      // Set initial dimensions for each node type
      const nodeDimensions: Record<NodeType, { width: number; height: number }> = {
        region: { width: 300, height: 250 },
        availabilityZone: { width: 250, height: 200 },
        vpc: { width: 220, height: 180 },
        s3: { width: 150, height: 140 },
        ec2: { width: 150, height: 140 },
      };

      const newNode: Node<NodeData> = {
        id: nodeId,
        type: nodeType,
        position,
        width: nodeDimensions[nodeType].width,
        height: nodeDimensions[nodeType].height,
        data: {
          label: nodeLabels[nodeType],
          type: nodeType,
          value: nodeValue,
          parentId: parentNode?.id,
          onDelete: handleNodeDelete,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, generateNodeId, handleNodeDelete]
  );

  /**
   * Handles drag over event to allow dropping
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  /**
   * Handles drag start from palette
   */
  const onPaletteDragStart = useCallback((event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    onPaletteDragStart,
  };
};

