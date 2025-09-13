import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Lightbulb, Plus, Minus } from 'lucide-react'

interface Node {
  id: string
  x: number
  y: number
  text: string
  color: string
}

interface Connection {
  id: string
  from: string
  to: string
}

export function CreateMindMap() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', x: 200, y: 150, text: 'Main Idea', color: '#3b82f6' }
  ])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)

  const addNode = () => {
    const newNode: Node = {
      id: Date.now().toString(),
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      text: 'New Node',
      color: '#6b7280'
    }
    setNodes([...nodes, newNode])
  }

  const addConnection = () => {
    if (isConnecting) {
      // Cancel connection mode
      setIsConnecting(false)
      setConnectionStart(null)
    } else {
      // Start connection mode
      setIsConnecting(true)
    }
  }

  const handleNodeClick = (nodeId: string) => {
    if (isConnecting) {
      if (!connectionStart) {
        // First node selected for connection
        setConnectionStart(nodeId)
      } else if (connectionStart !== nodeId) {
        // Second node selected - create connection
        const newConnection: Connection = {
          id: Date.now().toString(),
          from: connectionStart,
          to: nodeId
        }
        setConnections([...connections, newConnection])
        setIsConnecting(false)
        setConnectionStart(null)
      } else {
        // Same node clicked - cancel connection
        setIsConnecting(false)
        setConnectionStart(null)
      }
    } else {
      setSelectedNode(nodeId)
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isConnecting) {
      setIsConnecting(false)
      setConnectionStart(null)
    }
    setSelectedNode(null)
  }

  const updateNodeText = (nodeId: string, text: string) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, text } : node
    ))
  }

  const updateNodeColor = (nodeId: string, color: string) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, color } : node
    ))
  }

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId))
    setConnections(connections.filter(conn => 
      conn.from !== nodeId && conn.to !== nodeId
    ))
    setSelectedNode(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Create Mind Map</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg border-2 border-blue-500 min-h-[600px]">
          {/* Top Navigation */}
          <div className="bg-black text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-6 w-6" />
                <span className="text-xl font-bold">MindMap Builder</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/pricing" className="hover:text-gray-300">Pricing</Link>
              </nav>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="flex h-[500px]">
            {/* Left Tools Panel */}
            <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
              <h3 className="font-semibold text-gray-800 mb-4">Tools</h3>
              <div className="space-y-3">
                <Button 
                  onClick={addNode}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Node
                </Button>
                <Button 
                  onClick={addConnection}
                  variant={isConnecting ? "default" : "outline"}
                  className={`w-full ${
                    isConnecting 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "border-gray-400 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  {isConnecting ? "Cancel Connection" : "Add Line"}
                </Button>
              </div>

              {/* Node Properties */}
              {selectedNode && (
                <div className="mt-6 p-4 bg-white border border-gray-300 rounded">
                  <h4 className="font-semibold text-gray-800 mb-3">Node Properties</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Text:</label>
                      <Input
                        value={nodes.find(n => n.id === selectedNode)?.text || ''}
                        onChange={(e) => updateNodeText(selectedNode, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Color:</label>
                      <div className="flex gap-2 mt-1">
                        {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                          <button
                            key={color}
                            onClick={() => updateNodeColor(selectedNode, color)}
                            className={`w-6 h-6 rounded border-2 ${
                              nodes.find(n => n.id === selectedNode)?.color === color 
                                ? 'border-gray-800' 
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <Button 
                      onClick={() => deleteNode(selectedNode)}
                      variant="destructive"
                      size="sm"
                      className="w-full"
                    >
                      Delete Node
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-white relative">
              <div className="p-4 border-b border-gray-300">
                <h3 className="font-semibold text-gray-800">Mind Map Canvas</h3>
                {isConnecting && (
                  <p className="text-sm text-blue-600 mt-1">
                    {connectionStart ? 'Click another node to connect' : 'Click a node to start connection'}
                  </p>
                )}
              </div>
              <div 
                className="relative w-full h-full cursor-crosshair"
                onClick={handleCanvasClick}
              >
                {/* Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {connections.map(conn => {
                    const fromNode = nodes.find(n => n.id === conn.from)
                    const toNode = nodes.find(n => n.id === conn.to)
                    if (!fromNode || !toNode) return null
                    
                    return (
                      <line
                        key={conn.id}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#6b7280"
                        strokeWidth="2"
                      />
                    )
                  })}
                </svg>

                {/* Nodes */}
                {nodes.map(node => (
                  <div
                    key={node.id}
                    className={`absolute w-24 h-12 rounded-lg border-2 cursor-pointer flex items-center justify-center text-xs font-medium transition-all ${
                      selectedNode === node.id 
                        ? 'border-blue-500 shadow-lg scale-105' 
                        : 'border-gray-400'
                    } ${
                      isConnecting && connectionStart === node.id 
                        ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
                        : ''
                    } ${
                      isConnecting && !connectionStart 
                        ? 'hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50' 
                        : ''
                    }`}
                    style={{
                      left: node.x - 48,
                      top: node.y - 24,
                      backgroundColor: node.color,
                      color: 'white'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNodeClick(node.id)
                    }}
                  >
                    {node.text}
                  </div>
                ))}

                {nodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <p className="text-lg">Your mind map canvas is here.</p>
                      <p>Start building your ideas.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-black text-white p-4 rounded-b-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold mb-2">Links</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>Privacy Policy</div>
                  <div>Terms of Service</div>
                  <div>Contact Us</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>Email: support@mindmapbuilder.com</div>
                  <div>Phone: +1 (XXX) XXX-XXXX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
