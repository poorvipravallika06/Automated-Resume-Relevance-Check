import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload, FileText, TrendingUp, Users, BookOpen, Target, Award, MessageSquare, Share2, Star, Lightbulb, Building, Heart, AlertTriangle, CheckCircle } from 'lucide-react';

interface RoleTransitionAnalysis {
  currentRole: string;
  quitReason: string;
  reasonCategory: 'Career Growth' | 'Work-Life Balance' | 'Compensation' | 'Company Culture' | 'Job Satisfaction' | 'Other';
  recommendation: 'Stay' | 'Transition' | 'Consider Options';
  stayReasons: string[];
  transitionOpportunities: {
    title: string;
    company: string;
    matchScore: number;
    benefits: string[];
  }[];
  actionPlan: string[];
}

interface SkillShare {
  id: string;
  skill: string;
  description: string;
  teacher: string;
  rating: number;
  points: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolledCount: number;
}

interface ReskillAnalysis {
  currentRole: string;
  dreamCompany: string;
  dreamRole: string;
  feasibilityScore: number;
  skillGaps: string[];
  developmentPlan: {
    skill: string;
    priority: 'High' | 'Medium' | 'Low';
    timeframe: string;
    resources: string[];
  }[];
  companyInsights: {
    culture: string;
    requirements: string[];
    benefits: string[];
  };
}

export default function EmployeeFlowPage() {
  const [activeTab, setActiveTab] = useState('transition');
  
  // Role Transition State
  const [transitionFile, setTransitionFile] = useState<File | null>(null);
  const [quitReason, setQuitReason] = useState('');
  const [transitionAnalysis, setTransitionAnalysis] = useState<RoleTransitionAnalysis | null>(null);
  const [isAnalyzingTransition, setIsAnalyzingTransition] = useState(false);
  
  // Skill Sharing State
  const [userPoints, setUserPoints] = useState(1250);
  const [skillShares] = useState<SkillShare[]>([
    {
      id: '1',
      skill: 'React Development',
      description: 'Learn modern React patterns and hooks',
      teacher: 'Sarah Chen',
      rating: 4.8,
      points: 150,
      duration: '2 hours',
      level: 'Intermediate',
      enrolledCount: 24
    },
    {
      id: '2',
      skill: 'Data Analysis with Python',
      description: 'Master pandas and data visualization',
      teacher: 'Mike Johnson',
      rating: 4.9,
      points: 200,
      duration: '3 hours',
      level: 'Beginner',
      enrolledCount: 18
    },
    {
      id: '3',
      skill: 'Project Management',
      description: 'Agile methodologies and team leadership',
      teacher: 'Lisa Wang',
      rating: 4.7,
      points: 180,
      duration: '1.5 hours',
      level: 'Advanced',
      enrolledCount: 31
    }
  ]);
  
  // Re-skilling State
  const [reskillFile, setReskillFile] = useState<File | null>(null);
  const [dreamCompany, setDreamCompany] = useState('');
  const [dreamRole, setDreamRole] = useState('');
  const [reskillAnalysis, setReskillAnalysis] = useState<ReskillAnalysis | null>(null);
  const [isAnalyzingReskill, setIsAnalyzingReskill] = useState(false);
  
  const transitionFileRef = useRef<HTMLInputElement>(null);
  const reskillFileRef = useRef<HTMLInputElement>(null);

  // Role Transition Handlers
  const handleTransitionFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setTransitionFile(file);
      setTransitionAnalysis(null);
    }
  };

  const analyzeRoleTransition = async () => {
    if (!transitionFile || !quitReason) return;

    setIsAnalyzingTransition(true);
    
    setTimeout(() => {
      const mockResult: RoleTransitionAnalysis = {
        currentRole: 'Software Developer',
        quitReason: quitReason,
        reasonCategory: quitReason.toLowerCase().includes('growth') ? 'Career Growth' : 
                      quitReason.toLowerCase().includes('balance') ? 'Work-Life Balance' :
                      quitReason.toLowerCase().includes('pay') ? 'Compensation' : 'Job Satisfaction',
        recommendation: quitReason.toLowerCase().includes('growth') ? 'Transition' : 'Consider Options',
        stayReasons: [
          'Strong technical foundation in current role',
          'Established relationships with team members',
          'Upcoming project opportunities for skill development',
          'Company investment in your professional growth'
        ],
        transitionOpportunities: [
          {
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            matchScore: 92,
            benefits: ['Higher salary', 'Leadership opportunities', 'Remote work', 'Stock options']
          },
          {
            title: 'Full Stack Developer',
            company: 'Innovation Labs',
            matchScore: 87,
            benefits: ['Flexible hours', 'Learning budget', 'Modern tech stack', 'Career mentorship']
          }
        ],
        actionPlan: [
          'Schedule a career discussion with your current manager',
          'Explore internal growth opportunities and projects',
          'Update your skills portfolio and LinkedIn profile',
          'Network with professionals in your target companies',
          'Consider negotiating current role improvements before leaving'
        ]
      };
      
      setTransitionAnalysis(mockResult);
      setIsAnalyzingTransition(false);
    }, 3000);
  };

  // Re-skilling Handlers
  const handleReskillFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setReskillFile(file);
      setReskillAnalysis(null);
    }
  };

  const analyzeReskilling = async () => {
    if (!reskillFile || !dreamCompany || !dreamRole) return;

    setIsAnalyzingReskill(true);
    
    setTimeout(() => {
      const mockResult: ReskillAnalysis = {
        currentRole: 'Software Developer',
        dreamCompany: dreamCompany,
        dreamRole: dreamRole,
        feasibilityScore: 78,
        skillGaps: [
          'Machine Learning Algorithms',
          'Data Pipeline Architecture',
          'Cloud Platform Expertise',
          'Statistical Analysis',
          'Business Intelligence Tools'
        ],
        developmentPlan: [
          {
            skill: 'Machine Learning',
            priority: 'High',
            timeframe: '6-8 months',
            resources: ['Coursera ML Course', 'Kaggle Competitions', 'Python for ML']
          },
          {
            skill: 'Cloud Platforms (AWS/Azure)',
            priority: 'High',
            timeframe: '4-6 months',
            resources: ['AWS Certification', 'Azure Fundamentals', 'Cloud Architecture Patterns']
          },
          {
            skill: 'Data Visualization',
            priority: 'Medium',
            timeframe: '3-4 months',
            resources: ['Tableau Training', 'D3.js Tutorial', 'Power BI Certification']
          }
        ],
        companyInsights: {
          culture: 'Innovation-focused, collaborative environment with emphasis on continuous learning and data-driven decision making',
          requirements: ['5+ years experience', 'ML/AI expertise', 'Cloud platform knowledge', 'Team leadership skills'],
          benefits: ['Competitive salary', 'Stock options', 'Learning budget', 'Flexible work arrangements', 'Health benefits']
        }
      };
      
      setReskillAnalysis(mockResult);
      setIsAnalyzingReskill(false);
    }, 3500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Stay': return 'text-green-600';
      case 'Transition': return 'text-blue-600';
      case 'Consider Options': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full border-b border-purple-light/20 bg-dark-surface">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-purple-bright">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-paragraph text-sm">Back to Home</span>
            </Link>
            <div className="font-heading font-bold text-2xl text-white">
              EMPLOYEE HUB
            </div>
            <div className="w-20"></div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-dark-surface py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-black text-white mb-6">
            Employee Growth & Development
          </h1>
          <p className="font-paragraph text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools for career transition analysis, skill sharing, and personalized re-skilling
            to accelerate your professional growth and development.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-dark-surface-2">
              <TabsTrigger value="transition" className="font-paragraph text-white data-[state=active]:bg-purple-bright data-[state=active]:text-white">
                Role Transition
              </TabsTrigger>
              <TabsTrigger value="skill-sharing" className="font-paragraph text-white data-[state=active]:bg-purple-bright data-[state=active]:text-white">
                Skill Sharing
              </TabsTrigger>
              <TabsTrigger value="reskilling" className="font-paragraph text-white data-[state=active]:bg-purple-bright data-[state=active]:text-white">
                Re-skilling
              </TabsTrigger>
            </TabsList>

            {/* Role Transition Tab */}
            <TabsContent value="transition" className="space-y-6">
              {!transitionAnalysis && (
                <div className="space-y-6">
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-purple-bright" />
                      Role Transition Analysis
                    </h3>
                    <p className="font-paragraph text-muted-foreground mb-6">
                      Upload your resume and share your reasons for considering a role change. Get personalized advice on whether to stay or transition.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="font-paragraph text-sm font-semibold text-white mb-2 block">
                          Why are you considering leaving your current role?
                        </label>
                        <Textarea
                          placeholder="Share your reasons (e.g., lack of growth opportunities, work-life balance, compensation, company culture, etc.)"
                          value={quitReason}
                          onChange={(e) => setQuitReason(e.target.value)}
                          className="bg-dark-surface-2 border-purple-light/30 text-white placeholder:text-muted-foreground focus:border-purple-bright"
                          rows={4}
                        />
                      </div>

                      <div className="border-2 border-dashed border-purple-light/30 rounded-lg p-6 text-center">
                        <Upload className="w-12 h-12 mx-auto text-purple-bright mb-4" />
                        <h4 className="font-heading text-lg font-semibold text-white mb-2">Upload Current Resume</h4>
                        <p className="font-paragraph text-sm text-muted-foreground mb-4">
                          We'll analyze your current position and skills
                        </p>
                        
                        <input
                          ref={transitionFileRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleTransitionFileSelect}
                          className="hidden"
                        />
                        
                        <Button
                          onClick={() => transitionFileRef.current?.click()}
                          className="bg-purple-bright text-white hover:bg-purple-bright/90 font-paragraph"
                        >
                          Choose File
                        </Button>

                        {transitionFile && (
                          <div className="flex items-center justify-center space-x-2 mt-3 text-white">
                            <FileText className="w-4 h-4" />
                            <span className="font-paragraph text-sm">{transitionFile.name}</span>
                          </div>
                        )}
                      </div>

                      {transitionFile && quitReason && (
                        <Button
                          onClick={analyzeRoleTransition}
                          disabled={isAnalyzingTransition}
                          className="w-full bg-gradient-primary text-white hover:opacity-90 font-paragraph"
                          size="lg"
                        >
                          {isAnalyzingTransition ? 'Analyzing...' : 'Analyze Role Transition'}
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              {/* Transition Analysis Loading */}
              {isAnalyzingTransition && (
                <Card className="p-8 text-center bg-dark-surface border-purple-light/30">
                  <div className="space-y-6">
                    <div className="w-16 h-16 mx-auto bg-purple-bright/10 rounded-lg flex items-center justify-center animate-pulse">
                      <TrendingUp className="w-8 h-8 text-purple-bright" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white mb-2">
                        Analyzing Your Situation
                      </h3>
                      <p className="font-paragraph text-muted-foreground mb-4">
                        Evaluating your reasons and exploring the best path forward...
                      </p>
                      <Progress value={75} className="w-full max-w-md mx-auto" />
                    </div>
                  </div>
                </Card>
              )}

              {/* Transition Analysis Results */}
              {transitionAnalysis && (
                <div className="space-y-6">
                  {/* Recommendation Overview */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <div className="text-center space-y-4">
                      <h3 className="font-heading text-2xl font-bold text-white">
                        Transition Recommendation
                      </h3>
                      <div className="space-y-2">
                        <Badge className="text-lg px-4 py-2 bg-purple-bright/10 text-purple-bright border-purple-bright/30">
                          {transitionAnalysis.reasonCategory}
                        </Badge>
                        <div className={`text-3xl font-black ${getRecommendationColor(transitionAnalysis.recommendation)}`}>
                          {transitionAnalysis.recommendation}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Reasons to Stay */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h4 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-green-500" />
                      Reasons to Consider Staying
                    </h4>
                    <div className="space-y-3">
                      {transitionAnalysis.stayReasons.map((reason, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="font-paragraph text-sm text-white">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Transition Opportunities */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h4 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-purple-bright" />
                      Alternative Opportunities
                    </h4>
                    <div className="space-y-4">
                      {transitionAnalysis.transitionOpportunities.map((opportunity, index) => (
                        <div key={index} className="p-4 bg-dark-surface-2/50 border border-purple-light/20 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h5 className="font-heading font-semibold text-white">{opportunity.title}</h5>
                              <p className="font-paragraph text-sm text-muted-foreground">{opportunity.company}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-bright">{opportunity.matchScore}%</div>
                              <div className="font-paragraph text-xs text-muted-foreground">Match Score</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="outline" className="border-purple-bright/50 text-purple-bright">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Action Plan */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h4 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-purple-bright" />
                      Recommended Action Plan
                    </h4>
                    <div className="space-y-3">
                      {transitionAnalysis.actionPlan.map((action, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-dark-surface-2/50 rounded-lg">
                          <div className="w-6 h-6 bg-purple-bright/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-purple-bright">{index + 1}</span>
                          </div>
                          <p className="font-paragraph text-sm text-white">{action}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Button
                    onClick={() => {
                      setTransitionFile(null);
                      setTransitionAnalysis(null);
                      setQuitReason('');
                    }}
                    variant="outline"
                    className="w-full border-purple-bright text-purple-bright hover:bg-purple-bright hover:text-white"
                  >
                    Analyze Another Situation
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Skill Sharing Tab */}
            <TabsContent value="skill-sharing" className="space-y-6">
              {/* User Points Display */}
              <Card className="p-6 bg-gradient-primary text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="font-heading text-xl font-bold">Your Learning Points</h3>
                      <p className="font-paragraph text-sm text-white/80">Earned by teaching and learning</p>
                    </div>
                  </div>
                  <div className="text-3xl font-black">{userPoints}</div>
                </div>
              </Card>

              {/* Share Your Skills */}
              <Card className="p-6 bg-dark-surface border-purple-light/30">
                <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-purple-bright" />
                  Share Your Skills
                </h3>
                <p className="font-paragraph text-muted-foreground mb-6">
                  Teach others and earn points while building your reputation as a subject matter expert.
                </p>
                <Button className="bg-purple-bright text-white hover:bg-purple-bright/90 font-paragraph">
                  Create Skill Session
                </Button>
              </Card>

              {/* Available Skill Shares */}
              <Card className="p-6 bg-dark-surface border-purple-light/30">
                <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-bright" />
                  Learn from Colleagues
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillShares.map((share) => (
                    <div key={share.id} className="p-4 bg-dark-surface-2/50 border border-purple-light/20 rounded-lg">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-heading font-semibold text-white">{share.skill}</h4>
                          <p className="font-paragraph text-xs text-muted-foreground">by {share.teacher}</p>
                        </div>
                        
                        <p className="font-paragraph text-sm text-muted-foreground line-clamp-2">
                          {share.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-purple-bright text-purple-bright" />
                            ))}
                            <span className="font-paragraph text-xs text-muted-foreground ml-1">{share.rating}</span>
                          </div>
                          <Badge className={getLevelColor(share.level)}>
                            {share.level}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <span className="font-paragraph text-xs">{share.duration}</span>
                            <span className="font-paragraph text-xs">•</span>
                            <span className="font-paragraph text-xs">{share.enrolledCount} enrolled</span>
                          </div>
                          <div className="flex items-center space-x-1 text-purple-bright">
                            <Award className="w-3 h-3" />
                            <span className="font-paragraph text-xs font-semibold">{share.points} pts</span>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm"
                          className="w-full bg-purple-bright text-white hover:bg-purple-bright/90 font-paragraph"
                        >
                          Join Session
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Re-skilling Tab */}
            <TabsContent value="reskilling" className="space-y-6">
              {!reskillAnalysis && (
                <div className="space-y-6">
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-purple-bright" />
                      Dream Company & Role Analysis
                    </h3>
                    <p className="font-paragraph text-muted-foreground mb-6">
                      Specify your target company and role to receive a personalized skill development roadmap.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="font-paragraph text-sm font-semibold text-white mb-2 block">
                          Dream Company
                        </label>
                        <Input
                          placeholder="e.g., Google, Microsoft, Tesla"
                          value={dreamCompany}
                          onChange={(e) => setDreamCompany(e.target.value)}
                          className="bg-dark-surface-2 border-purple-light/30 text-white placeholder:text-muted-foreground focus:border-purple-bright"
                        />
                      </div>
                      <div>
                        <label className="font-paragraph text-sm font-semibold text-white mb-2 block">
                          Target Role
                        </label>
                        <Input
                          placeholder="e.g., Data Scientist, Product Manager"
                          value={dreamRole}
                          onChange={(e) => setDreamRole(e.target.value)}
                          className="bg-dark-surface-2 border-purple-light/30 text-white placeholder:text-muted-foreground focus:border-purple-bright"
                        />
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-purple-light/30 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 mx-auto text-purple-bright mb-4" />
                      <h4 className="font-heading text-lg font-semibold text-white mb-2">Upload Current Resume</h4>
                      <p className="font-paragraph text-sm text-muted-foreground mb-4">
                        We'll analyze your current skills against your target role
                      </p>
                      
                      <input
                        ref={reskillFileRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleReskillFileSelect}
                        className="hidden"
                      />
                      
                      <Button
                        onClick={() => reskillFileRef.current?.click()}
                        className="bg-purple-bright text-white hover:bg-purple-bright/90 font-paragraph"
                      >
                        Choose File
                      </Button>

                      {reskillFile && (
                        <div className="flex items-center justify-center space-x-2 mt-3 text-white">
                          <FileText className="w-4 h-4" />
                          <span className="font-paragraph text-sm">{reskillFile.name}</span>
                        </div>
                      )}
                    </div>

                    {reskillFile && dreamCompany && dreamRole && (
                      <Button
                        onClick={analyzeReskilling}
                        disabled={isAnalyzingReskill}
                        className="w-full bg-gradient-primary text-white hover:opacity-90 font-paragraph"
                        size="lg"
                      >
                        {isAnalyzingReskill ? 'Analyzing...' : 'Analyze Re-skilling Path'}
                      </Button>
                    )}
                  </Card>
                </div>
              )}

              {/* Re-skilling Analysis Loading */}
              {isAnalyzingReskill && (
                <Card className="p-8 text-center bg-dark-surface border-purple-light/30">
                  <div className="space-y-6">
                    <div className="w-16 h-16 mx-auto bg-purple-bright/10 rounded-lg flex items-center justify-center animate-pulse">
                      <Target className="w-8 h-8 text-purple-bright" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white mb-2">
                        Creating Your Re-skilling Plan
                      </h3>
                      <p className="font-paragraph text-muted-foreground mb-4">
                        Analyzing company requirements and mapping your skill development journey...
                      </p>
                      <Progress value={80} className="w-full max-w-md mx-auto" />
                    </div>
                  </div>
                </Card>
              )}

              {/* Re-skilling Analysis Results */}
              {reskillAnalysis && (
                <div className="space-y-6">
                  {/* Feasibility Overview */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <div className="text-center space-y-4">
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {reskillAnalysis.dreamRole} at {reskillAnalysis.dreamCompany}
                      </h3>
                      <div className="space-y-2">
                        <div className="text-4xl font-black text-purple-bright">
                          {reskillAnalysis.feasibilityScore}%
                        </div>
                        <p className="font-paragraph text-muted-foreground">Transition Feasibility</p>
                      </div>
                    </div>
                  </Card>

                  {/* Company Insights */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h4 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-purple-bright" />
                      Company Insights
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-paragraph font-semibold text-white mb-2">Culture & Environment</h5>
                        <p className="font-paragraph text-sm text-muted-foreground">{reskillAnalysis.companyInsights.culture}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-paragraph font-semibold text-white mb-2">Key Requirements</h5>
                        <div className="flex flex-wrap gap-2">
                          {reskillAnalysis.companyInsights.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="border-purple-bright/50 text-purple-bright">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-paragraph font-semibold text-white mb-2">Benefits & Perks</h5>
                        <div className="flex flex-wrap gap-2">
                          {reskillAnalysis.companyInsights.benefits.map((benefit, index) => (
                            <Badge key={index} className="bg-green-500/10 text-green-400 border-green-500/20">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Skill Gaps */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h4 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-red-500" />
                      Skill Gaps to Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {reskillAnalysis.skillGaps.map((gap, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="font-paragraph text-sm text-white">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Development Plan */}
                  <Card className="p-6 bg-dark-surface border-purple-light/30">
                    <h4 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-purple-bright" />
                      Personalized Development Plan
                    </h4>
                    <div className="space-y-4">
                      {reskillAnalysis.developmentPlan.map((plan, index) => (
                        <div key={index} className="p-4 bg-dark-surface-2/50 border border-purple-light/20 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h5 className="font-heading font-semibold text-white">{plan.skill}</h5>
                              <Badge className={getPriorityColor(plan.priority)}>
                                {plan.priority} Priority
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="font-paragraph text-sm text-muted-foreground">Timeline</div>
                              <div className="font-paragraph font-semibold text-white">{plan.timeframe}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h6 className="font-paragraph font-semibold text-white mb-2">Recommended Resources:</h6>
                            <div className="flex flex-wrap gap-2">
                              {plan.resources.map((resource, idx) => (
                                <Badge key={idx} variant="outline" className="border-purple-bright/50 text-purple-bright">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        setReskillFile(null);
                        setReskillAnalysis(null);
                        setDreamCompany('');
                        setDreamRole('');
                      }}
                      variant="outline"
                      className="flex-1 border-purple-bright text-purple-bright hover:bg-purple-bright hover:text-white"
                    >
                      Analyze Another Path
                    </Button>
                    <Link to="/learning-resources" className="flex-1">
                      <Button className="w-full bg-purple-bright text-white hover:bg-purple-bright/90 font-paragraph">
                        Explore Learning Resources
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}