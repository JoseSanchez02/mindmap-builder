import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Lightbulb, ArrowRight } from 'lucide-react'

export function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with mind mapping',
      features: [
        'Up to 3 mind maps',
        'Basic node and connection tools',
        'Local storage only',
        'Community support',
        'Basic templates'
      ],
      limitations: [
        'No real-time collaboration',
        'No cloud sync',
        'Limited export options'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Pro',
      price: '$5',
      period: 'per month',
      description: 'Ideal for individuals and small teams',
      features: [
        'Unlimited mind maps',
        'Advanced node and connection tools',
        'Cloud sync and backup',
        'Real-time collaboration (up to 5 users)',
        'Premium templates',
        'Export to PDF, PNG, SVG',
        'Priority support',
        'Custom colors and themes'
      ],
      limitations: [],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Team',
      price: '$10',
      period: 'per month',
      description: 'Perfect for larger teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited collaborators',
        'Advanced sharing controls',
        'Team management dashboard',
        'Custom branding',
        'API access',
        'Advanced analytics',
        'White-label options',
        'Dedicated support',
        'Custom integrations'
      ],
      limitations: [],
      buttonText: 'Start Team Trial',
      buttonVariant: 'default' as const,
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">MindMap Builder</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/create" className="hover:text-gray-300">Create</Link>
            <a href="#how-it-works" className="hover:text-gray-300">How it works</a>
            <a href="#help" className="hover:text-gray-300">Help</a>
            <Link to="/pricing" className="text-yellow-400 font-semibold">Pricing</Link>
          </nav>
          <Button variant="outline" className="border-gray-600 text-gray-100 hover:bg-gray-800">
            Sign in
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-100 mb-6">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Start free and upgrade as you grow. All plans include our core mind mapping features.
        </p>
        <div className="flex justify-center">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button className="px-4 py-2 rounded-md bg-gray-700 text-white text-sm">
              Monthly
            </button>
            <button className="px-4 py-2 rounded-md text-gray-400 text-sm hover:text-white">
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative bg-gray-800 border-gray-700 ${
                plan.popular ? 'border-yellow-500 ring-2 ring-yellow-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <CardDescription className="text-gray-400 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button 
                  asChild
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                      : plan.buttonVariant === 'outline'
                      ? 'border-gray-600 text-gray-100 hover:bg-gray-700'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Link to="/create">{plan.buttonText}</Link>
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-start space-x-2">
                          <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-400 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-gray-400 text-sm">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400 text-sm">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-400 text-sm">
                Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">
            Ready to start building mind maps?
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already creating amazing mind maps with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link to="/create">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-100 hover:bg-gray-700">
              <Link to="/">Learn More</Link>
            </Button>
          </div>
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
