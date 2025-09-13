import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Brain, Mail, Copy, Users, MessageCircle } from 'lucide-react'

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
}

export function Collaboration() {
  const { id } = useParams()
  const [shareLink, setShareLink] = useState(`https://mindmapbuilder.com/collaborate/${id}`)
  const [permission, setPermission] = useState<'view' | 'edit'>('view')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Alex', message: "Let's finalize this map.", timestamp: new Date() },
    { id: '2', user: 'Jamie', message: "Sure, I'm adding my notes.", timestamp: new Date() },
    { id: '3', user: 'Sam', message: 'Reviewing the changes now.', timestamp: new Date() },
  ])

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    // You could add a toast notification here
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: 'You',
        message: newMessage,
        timestamp: new Date()
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">MindMap Builder</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="hover:text-gray-300">Home</a>
              <a href="/create" className="hover:text-gray-300">Create Mind Map</a>
              <a href="#templates" className="hover:text-gray-300">Templates</a>
              <a href="#collaboration" className="hover:text-gray-300">Collaboration</a>
              <a href="#about" className="hover:text-gray-300">About Us</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Share & Permissions Panel */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Share & Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generate Link */}
              <div>
                <h4 className="font-semibold text-white mb-2">Generate Link</h4>
                <div className="space-y-2">
                  <Input
                    value={shareLink}
                    readOnly
                    className="bg-gray-700 border-gray-600 text-gray-100"
                    placeholder="Generated Link"
                  />
                  <Button 
                    onClick={copyLink}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-600" />

              {/* Set Permissions */}
              <div>
                <h4 className="font-semibold text-white mb-3">Set Permissions</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="permission"
                      value="view"
                      checked={permission === 'view'}
                      onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
                      className="text-blue-500"
                    />
                    <span className="text-gray-300">View Only</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="permission"
                      value="edit"
                      checked={permission === 'edit'}
                      onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
                      className="text-blue-500"
                    />
                    <span className="text-gray-300">Edit</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mind Map Panel */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Mind Map</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full bg-gray-700 rounded-lg relative overflow-hidden">
                {/* Mind Map Visualization */}
                <div className="absolute inset-0 p-4">
                  <svg className="w-full h-full">
                    {/* Central blob */}
                    <ellipse
                      cx="50%"
                      cy="50%"
                      rx="80"
                      ry="60"
                      fill="#1f2937"
                      stroke="#374151"
                      strokeWidth="2"
                    />
                    
                    {/* Connection lines */}
                    <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#ef4444" strokeWidth="3" />
                    <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#f59e0b" strokeWidth="3" />
                    <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#10b981" strokeWidth="3" />
                    <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#3b82f6" strokeWidth="3" />
                    <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#8b5cf6" strokeWidth="3" />
                    <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#ec4899" strokeWidth="3" />
                    
                    {/* Nodes */}
                    <circle cx="20%" cy="20%" r="15" fill="#ef4444" />
                    <circle cx="80%" cy="20%" r="15" fill="#f59e0b" />
                    <circle cx="20%" cy="80%" r="15" fill="#10b981" />
                    <circle cx="80%" cy="80%" r="15" fill="#3b82f6" />
                    <circle cx="50%" cy="10%" r="15" fill="#8b5cf6" />
                    <circle cx="50%" cy="90%" r="15" fill="#ec4899" />
                    
                    {/* Icons in nodes */}
                    <text x="20%" y="20%" textAnchor="middle" dy="0.35em" className="text-xs fill-white">👤</text>
                    <text x="80%" y="20%" textAnchor="middle" dy="0.35em" className="text-xs fill-white">🏠</text>
                    <text x="20%" y="80%" textAnchor="middle" dy="0.35em" className="text-xs fill-white">💡</text>
                    <text x="80%" y="80%" textAnchor="middle" dy="0.35em" className="text-xs fill-white">📊</text>
                    <text x="50%" y="10%" textAnchor="middle" dy="0.35em" className="text-xs fill-white">🎯</text>
                    <text x="50%" y="90%" textAnchor="middle" dy="0.35em" className="text-xs fill-white">⚡</text>
                  </svg>
                </div>
              </div>
              
              <div className="mt-4">
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Invite via Gmail
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chat Panel */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium text-white">{msg.user}:</div>
                      <div className="text-sm text-gray-300">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  onClick={sendMessage}
                  className="bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-400">
              © 2023 MindMap Builder. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#terms" className="hover:text-gray-300">Terms of Service</a>
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
