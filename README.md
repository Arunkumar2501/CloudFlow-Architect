# Interactive Cloud Architecture Diagram Builder

A production-ready React application for building interactive cloud architecture diagrams using React Flow and Tailwind CSS. This application allows users to dynamically create, connect, and manage cloud infrastructure components in a visual diagram format.

## 🚀 Features

### Core Functionality
- **Drag-and-Drop Node Palette**: Left sidebar with draggable cloud components
- **Interactive Canvas**: React Flow canvas for building architecture diagrams
- **Node Management**: Create, drag, and delete nodes dynamically
- **Edge Connections**: Connect nodes with customizable action labels
- **Auto-Population**: Automatic data generation based on node hierarchy
- **Validation**: Prevents invalid connections (self-connections, optional cycle prevention)

### Supported Node Types
1. **Region** - AWS Region container (e.g., `us-east-1`)
2. **Availability Zone** - Availability Zone container (e.g., `us-east-1a`)
3. **VPC** - Virtual Private Cloud container (e.g., `vpc-123`)
4. **Amazon S3** - S3 bucket node
5. **Amazon EC2** - EC2 instance node

### Edge Actions
Each edge supports four action types via dropdown:
- **READ** - Read operation
- **WRITE** - Write operation
- **DELETE** - Delete operation
- **EXECUTE** - Execute operation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

## 🛠️ Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode

Start the development server:
```bash
npm start
```

The application will open automatically in your browser at `http://localhost:3000`.

### Build for Production

Create an optimized production build:
```bash
 npm run build
```

The build folder will contain the optimized production files.

## 📁 Project Structure

```
src/
├── components/
│   ├── CustomNodes/
│   │   ├── RegionNode.tsx          # Region node component
│   │   ├── AvailabilityZoneNode.tsx # Availability Zone node component
│   │   ├── VPCNode.tsx              # VPC node component
│   │   ├── S3Node.tsx               # S3 node component
│   │   ├── EC2Node.tsx              # EC2 node component
│   │   └── index.ts                 # Node exports
│   ├── Palette/
│   │   └── Palette.tsx              # Node palette component
│   └── EdgeControls/
│       └── EdgeControls.tsx         # Custom edge with dropdown
├── hooks/
│   └── useDiagramBuilder.ts        # Main diagram builder hook
├── utils/
│   ├── nodeDataGenerator.ts        # Auto-population logic
│   └── validation.ts                # Connection validation
├── types/
│   └── index.ts                    # TypeScript type definitions
├── constants/
│   └── paletteItems.ts             # Palette configuration
├── App.tsx                          # Main application component
├── index.tsx                        # Application entry point
└── index.css                        # Global styles
```

## 🎯 Usage Guide

### Creating Nodes

1. **From the Palette**: 
   - Locate the node type you want in the left sidebar
   - Click and drag the node from the palette to the canvas
   - Release to drop the node

2. **Auto-Population**:
   - When you drop a node inside a parent node (e.g., Availability Zone inside Region), the node automatically gets populated with relevant data
   - Region nodes get values like `us-east-1`
   - Availability Zones get values like `us-east-1a` (based on parent region)
   - VPCs get values like `vpc-123`

### Connecting Nodes

1. **Create a Connection**:
   - Hover over a node to see connection handles
   - Click and drag from a source handle to a target handle
   - Release to create the connection

2. **Change Edge Action**:
   - Click on the dropdown in the middle of an edge
   - Select the desired action (READ, WRITE, DELETE, EXECUTE)

### Deleting Nodes and Edges

- **Delete Node**: Click the red ✖ button in the top-right corner of any node
- **Delete Edge**: Click the red ✖ button that appears below the edge dropdown

### Node Hierarchy

The application supports a hierarchical structure:
- **Region** can contain **Availability Zones**
- **Availability Zone** can contain **VPCs**
- **VPC** can contain **S3** and **EC2** nodes

Attempting to nest nodes incorrectly will show a validation error.

## 🎨 Styling

The application uses **Tailwind CSS** for all styling:
- AWS-inspired color scheme
- Responsive layout
- Clean, modern UI
- Custom node components with distinct visual styles

### Color Scheme
- **Region**: Blue header (`bg-blue-600`)
- **Availability Zone**: Gray header (`bg-gray-500`)
- **VPC**: Purple header (`bg-purple-600`)
- **S3**: Green cylindrical icon (`bg-green-500`)
- **EC2**: Orange square with circuit pattern (`bg-orange-500`)

## 🔧 Customization

### Adding New Node Types

1. **Add to Types** (`src/types/index.ts`):
   ```typescript
   export type NodeType = 'region' | 'availabilityZone' | 'vpc' | 's3' | 'ec2' | 'yourNewType';
   ```

2. **Create Node Component** (`src/components/CustomNodes/YourNewNode.tsx`):
   - Follow the pattern of existing node components
   - Export from `index.ts`

3. **Add to Palette** (`src/constants/paletteItems.ts`):
   ```typescript
   {
     type: 'yourNewType',
     label: 'Your New Node',
   }
   ```

4. **Register in App.tsx**:
   ```typescript
   const nodeTypes = {
     // ... existing types
     yourNewType: YourNewNode,
   };
   ```

5. **Update Auto-Population** (`src/utils/nodeDataGenerator.ts`):
   - Add case in `generateNodeValue` function
   - Update `canNestIn` function if needed

### Modifying Validation Rules

Edit `src/utils/validation.ts` to customize:
- Self-connection prevention
- Cycle detection
- Additional validation rules

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Code Quality

- **TypeScript**: Full type safety throughout the application
- **Comments**: Comprehensive inline documentation
- **Clean Architecture**: Modular, extensible code structure
- **Best Practices**: React hooks, functional components, proper state management

## 🐛 Troubleshooting

### Common Issues

1. **Nodes not appearing**:
   - Ensure React Flow styles are imported: `import 'reactflow/dist/style.css';`
   - Check browser console for errors

2. **Drag and drop not working**:
   - Verify `onDragOver` handler is properly set
   - Check that `reactFlowInstance` is initialized

3. **Edge dropdown not visible**:
   - Ensure custom edge type is registered
   - Check that `foreignObject` is properly positioned

## 📚 Technologies Used

- **React** (v18.2.0) - UI library
- **React Flow** (v11.10.4) - Diagram/flowchart library
- **Tailwind CSS** (v3.4.0) - Utility-first CSS framework
- **TypeScript** (v5.3.3) - Type safety
- **Create React App** - Build tooling

## 🔗 Reference Links

- [React Flow Documentation](https://reactflow.dev/learn)
- [React Flow Drag and Drop Example](https://reactflow.dev/examples/interaction/drag-and-drop)
- [React Flow Tailwind Styling](https://reactflow.dev/examples/styling/tailwind)
- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)

## 📄 License

This project is created as a take-home assessment for Madatcloud.

## 👤 Author

Built as part of a technical assessment demonstrating proficiency in:
- React and React Flow
- Tailwind CSS
- TypeScript
- Drag-and-drop systems
- Interactive diagram builders

---

**Note**: This application is production-ready and includes error handling, validation, and a clean, extensible architecture suitable for real-world use.

