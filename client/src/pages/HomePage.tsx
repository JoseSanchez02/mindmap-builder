import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Users, FileText, CheckCircle, ArrowRight } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">MindMap Builder</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/create" className="hover:text-gray-300">Create</Link>
            <Link to="/pricing" className="hover:text-gray-300">Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-100 mb-6">
              Easily organize your ideas and unleash creativity!
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Our platform allows seamless idea mapping and collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-700 text-white">
                <Link to="/create">Start now</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
            UPGRADE PLAN
          </span>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <CardTitle className="text-2xl text-white">500K+</CardTitle>
              <CardDescription className="text-gray-400">Active users</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <CardTitle className="text-2xl text-white">2M+</CardTitle>
              <CardDescription className="text-gray-400">Mind maps created</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-gray-400" />
              </div>
              <CardTitle className="text-2xl text-white">10M+</CardTitle>
              <CardDescription className="text-gray-400">Ideas connected</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <ArrowRight className="h-8 w-8 text-gray-400" />
              </div>
              <CardTitle className="text-lg text-white">Try free</CardTitle>
              <CardDescription className="text-gray-400">
                <Button asChild variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <Link to="/pricing">Trial</Link>
                </Button>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-8">
            Start building your mind maps now
          </h2>
          <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-700 text-white">
            <Link to="/create">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">MIND</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>How it</div>
                <div>Using the</div>
                <div>User</div>
                <div>About</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Visual</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Partnership Inquiry</div>
                <div>Privacy Policy</div>
                <div>Terms of</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
