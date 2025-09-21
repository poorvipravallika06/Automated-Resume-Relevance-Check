import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { AuthModal } from '@/components/ui/auth-modal';
import { SpeakUpModal } from '@/components/ui/speak-up-modal';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Briefcase, Shield, TrendingUp, Brain, Target, BarChart3, FileText, User, MessageSquare, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSpeakUpModal, setShowSpeakUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = async (email: string, password: string) => {
    // Simulate login - in real app, this would call an authentication service
    console.log('Login attempt:', { email, password });
    setCurrentUser({ name: email.split('@')[0], email });
    setIsLoggedIn(true);
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    // Simulate signup - in real app, this would call an authentication service
    console.log('Signup attempt:', { email, password, name });
    setCurrentUser({ name, email });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleSpeakUp = async (data: any) => {
    // Simulate feedback submission - in real app, this would send to backend
    console.log('Feedback submitted:', data);
    // You could show a success toast here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full border-b border-border bg-dark-surface/80 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="font-heading font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent"
            >
              INNOMATICS RESEARCH LABS
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/career-guidance" className="font-paragraph text-sm text-white hover:text-accent transition-colors">
                CAREER GUIDANCE
              </Link>
              <Link to="/resume-analysis" className="font-paragraph text-sm text-white hover:text-accent transition-colors">
                RESUME ANALYSIS
              </Link>
              <Link to="/mentors" className="font-paragraph text-sm text-white hover:text-accent transition-colors">
                FIND MENTORS
              </Link>
              <Link to="/accreditations" className="font-paragraph text-sm text-white hover:text-accent transition-colors">
                ACCREDITATIONS
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Speak Up Button */}
              <Button
                onClick={() => setShowSpeakUpModal(true)}
                variant="outline"
                size="sm"
                className="border-accent text-accent hover:bg-accent hover:text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Speak Up
              </Button>
              
              {/* Auth Section */}
              {isLoggedIn && currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-paragraph text-sm text-white">{currentUser.name}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-accent hover:bg-accent/90 text-white font-paragraph"
                  size="sm"
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section - Animated Landing */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="font-heading text-6xl font-black bg-gradient-primary bg-clip-text text-transparent leading-tight">
                AI-Powered Resume Relevance Check System
              </h1>
              <p className="font-paragraph text-xl text-muted-foreground mt-6 leading-relaxed">
                Revolutionary automated platform for intelligent resume analysis, candidate ranking, 
                and bias-free recruitment. Transform your hiring process with cutting-edge AI technology.
              </p>
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-white font-paragraph px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Brain className="w-5 h-5 mr-2" />
                Start AI Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-paragraph px-8 py-4 rounded-xl transition-all duration-300"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-muted-foreground">Resumes Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-muted-foreground">Companies Trust Us</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-primary p-8 rounded-3xl shadow-2xl"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-paragraph">AI Analysis Active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white/20 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                      />
                    </div>
                    <div className="text-white/80 text-sm">Resume Relevance: 85%</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="text-cyan-300 text-xs">Skills Match</div>
                      <div className="text-white font-bold">92%</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="text-purple-300 text-xs">ATS Score</div>
                      <div className="text-white font-bold">78%</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -top-6 -right-6 bg-dark-surface-2 p-4 rounded-2xl shadow-lg border border-border"
            >
              <FileText className="w-8 h-8 text-accent" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-6 -left-6 bg-dark-surface-2 p-4 rounded-2xl shadow-lg border border-border"
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="w-full bg-dark-surface py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-4">
              Choose Your Access Level
            </h2>
            <p className="font-paragraph text-lg text-muted-foreground max-w-2xl mx-auto">
              Role-based access ensures you get the right tools and insights for your specific needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Student Access */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="p-8 bg-dark-surface-2 border-border hover:border-accent transition-all duration-300 group">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Student</h3>
                    <p className="font-paragraph text-sm text-muted-foreground mb-6">
                      Analyze your resume, get skill gap insights, and receive career guidance
                    </p>
                  </div>
                  <Link to="/employee-flow">
                    <Button className="w-full bg-gradient-secondary hover:opacity-90 text-white font-paragraph rounded-xl">
                      Student Portal
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Recruiter Access */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="p-8 bg-dark-surface-2 border-border hover:border-accent transition-all duration-300 group">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Recruiter</h3>
                    <p className="font-paragraph text-sm text-muted-foreground mb-6">
                      Bulk resume analysis, candidate ranking, and bias-free shortlisting
                    </p>
                  </div>
                  <Link to="/recruiter-flow">
                    <Button className="w-full bg-gradient-accent hover:opacity-90 text-white font-paragraph rounded-xl">
                      Recruiter Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Employee Access */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="p-8 bg-dark-surface-2 border-border hover:border-accent transition-all duration-300 group">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Employee</h3>
                    <p className="font-paragraph text-sm text-muted-foreground mb-6">
                      Career growth feedback, skill development, and internal mobility insights
                    </p>
                  </div>
                  <Link to="/employee-flow">
                    <Button className="w-full bg-gradient-primary hover:opacity-90 text-white font-paragraph rounded-xl">
                      Employee Hub
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Admin Access */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="p-8 bg-dark-surface-2 border-border hover:border-accent transition-all duration-300 group">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Admin</h3>
                    <p className="font-paragraph text-sm text-muted-foreground mb-6">
                      System analytics, placement team dashboards, and comprehensive reporting
                    </p>
                  </div>
                  <Link to="/admin-flow">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white font-paragraph rounded-xl">
                      Admin Console
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-dark-surface-2 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-4">
              Powerful AI-Driven Features
            </h2>
            <p className="font-paragraph text-lg text-muted-foreground max-w-3xl mx-auto">
              Advanced algorithms and machine learning models working together to revolutionize recruitment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Scoring (0-100)",
                description: "Automated relevance scoring with detailed breakdown and confidence metrics",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Target,
                title: "Skill Gap Analysis",
                description: "Identify missing skills and get personalized recommendations for improvement",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: FileText,
                title: "ATS Optimization",
                description: "Keyword suggestions and formatting tips for better ATS compatibility",
                gradient: "from-green-500 to-teal-500"
              },
              {
                icon: TrendingUp,
                title: "Bias-Free Ranking",
                description: "Objective candidate ranking based on skills and qualifications only",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Comprehensive insights and exportable reports for placement teams",
                gradient: "from-indigo-500 to-blue-500"
              },
              {
                icon: Users,
                title: "Bulk Processing",
                description: "Handle thousands of resumes weekly with enterprise-grade scalability",
                gradient: "from-pink-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 bg-dark-surface border-border hover:border-accent transition-all duration-300">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="font-paragraph text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-primary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">
              Ready to Transform Your Recruitment Process?
            </h2>
            <p className="font-paragraph text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join leading organizations using AI-powered resume analysis for smarter hiring decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resume-analysis">
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 font-paragraph px-8 py-4 rounded-xl shadow-lg"
                >
                  Start Free Analysis
                </Button>
              </Link>
              <Link to="/admin-flow">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black font-paragraph px-8 py-4 rounded-xl"
                >
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-dark-surface text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-heading font-bold text-xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                INNOMATICS RESEARCH LABS
              </div>
              <p className="font-paragraph text-sm text-muted-foreground">
                Revolutionizing recruitment with AI-powered resume analysis and intelligent candidate matching
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link to="/career-guidance" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Career Guidance
                </Link>
                <Link to="/resume-analysis" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Resume Analysis
                </Link>
                <Link to="/mentors" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Find Mentors
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Access Portals</h4>
              <div className="space-y-2">
                <Link to="/recruiter-flow" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Recruiter Dashboard
                </Link>
                <Link to="/employee-flow" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Employee Hub
                </Link>
                <Link to="/admin-flow" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Admin Console
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <Link to="/accreditations" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Accreditations
                </Link>
                <Link to="/learning-resources" className="block font-paragraph text-sm text-muted-foreground hover:text-accent">
                  Learning Resources
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="font-paragraph text-sm text-muted-foreground">
              © 2024 Innomatics Research Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      {/* Speak Up Modal */}
      <SpeakUpModal
        isOpen={showSpeakUpModal}
        onClose={() => setShowSpeakUpModal(false)}
        onSubmit={handleSpeakUp}
      />
    </div>
  );
}