/**
 * Utility functions for auto-populating node data based on parent groups
 */

import { NodeType, NodeData } from '../types';

/**
 * Generates a unique value for a node based on its type and parent context
 * @param nodeType - The type of node being created
 * @param parentNode - The parent node data (if nested)
 * @param parentNodeId - The parent node ID (if nested)
 * @param existingNodes - Array of existing nodes to ensure uniqueness
 * @returns A generated value string
 */
export const generateNodeValue = (
  nodeType: NodeType,
  parentNode?: NodeData,
  parentNodeId?: string,
  existingNodes: Array<{ data: NodeData }> = []
): string => {
  switch (nodeType) {
    case 'region':
      // Prefer a fresh region from a short curated list, then fall back to incremental
      const regions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'];
      const existingRegions = existingNodes
        .filter(n => n.data.type === 'region')
        .map(n => n.data.value)
        .filter(Boolean) as string[];
      
      const availableRegions = regions.filter(r => !existingRegions.includes(r));
      return availableRegions[0] || `us-east-${existingRegions.length + 1}`;

    case 'availabilityZone':
      // Generate AZ name based on parent region, reuse letters a-f per region
      if (parentNode?.value && parentNodeId) {
        // Extract region prefix (e.g., "us-east-1" from "us-east-1")
        const regionValue = parentNode.value;
        const existingAZs = existingNodes
          .filter(n => n.data.type === 'availabilityZone' && n.data.parentId === parentNodeId)
          .map(n => n.data.value)
          .filter(Boolean) as string[];
        
        const azLetters = ['a', 'b', 'c', 'd', 'e', 'f'];
        // Extract used letters from existing AZs (e.g., "a" from "us-east-1a")
        const usedLetters = existingAZs
          .map(az => {
            const parts = az.split('-');
            return parts[parts.length - 1]?.replace(/^\d+/, '') || '';
          })
          .filter(Boolean);
        
        const availableLetter = azLetters.find(letter => !usedLetters.includes(letter)) || azLetters[existingAZs.length];
        
        // Return format: us-east-1a, us-east-1b, etc.
        return `${regionValue}${availableLetter}`;
      }
      return 'us-east-1a';

    case 'vpc':
      // Generate VPC ID like vpc-123, vpc-456, etc.
      const existingVPCs = existingNodes
        .filter(n => n.data.type === 'vpc')
        .map(n => n.data.value)
        .filter(Boolean) as string[];
      
      const vpcNumbers = existingVPCs
        .map(vpc => parseInt(vpc.split('-')[1] || '0'))
        .filter(n => !isNaN(n));
      
      const nextVPCNumber = vpcNumbers.length > 0 
        ? Math.max(...vpcNumbers) + 1 
        : 123;
      
      return `vpc-${nextVPCNumber}`;

    case 's3':
      // S3 buckets don't need auto-population, but we can add a default name
      return 'my-bucket';

    case 'ec2':
      // EC2 instances can have default names
      return 'i-1234567890abcdef0';

    default:
      return '';
  }
};

/**
 * Determines if a node type can be nested inside another node type
 * @param childType - The type of node being added
 * @param parentType - The type of parent node
 * @returns True if the child can be nested in the parent
 */
export const canNestIn = (childType: NodeType, parentType: NodeType): boolean => {
  const nestingRules: Record<NodeType, NodeType[]> = {
    region: ['availabilityZone'],
    availabilityZone: ['vpc'],
    vpc: ['s3', 'ec2'],
    s3: [],
    ec2: [],
  };

  return nestingRules[parentType]?.includes(childType) || false;
};

