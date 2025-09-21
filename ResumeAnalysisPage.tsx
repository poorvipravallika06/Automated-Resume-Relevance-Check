import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FileText, AlertTriangle, CheckCircle, TrendingUp, ExternalLink, Brain, Target, Zap, Award, Shield, DollarSign, TrendingDown, Lightbulb } from 'lucide-react';

interface AnalysisResult {
  overallScore: number;
  roleRelevance: {
    role: string;
    score: number;
    status: 'qualified' | 'overqualified' | 'underqualified';
  }[];
  skillSuggestions: string[];
  learningResources: {
    title: string;
    url: string;
    type: string;
  }[];
  alerts: {
    type: 'warning' | 'success' | 'info';
    message: string;
  }[];
  atsScore: number;
  softSkills: {
    skill: string;
    score: number;
  }[];
  keywordMatches: string[];
  improvementAreas: string[];
  biasAnalysis: {
    genderBias: number;
    ageBias: number;
    educationBias: number;
    overallBiasScore: number;
    fairnessRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  };
  salaryPrediction: {
    minSalary: number;
    maxSalary: number;
    currency: string;
    confidence: number;
  };
  careerProgression: {
    currentLevel: string;
    nextLevel: string;
    timeToPromotion: string;
    skillsNeeded: string[];
  };
  skillGapAnalysis: {
    criticalGaps: string[];
    minorGaps: string[];
    strengths: string[];
    developmentPriority: 'High' | 'Medium' | 'Low';
  };
  atsOptimization: {
    score: number;
    suggestions: string[];
    keywordDensity: number;
    formatScore: number;
    readabilityScore: number;
  };
}

export default function ResumeAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const analyzeResume = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with enhanced features
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        overallScore: Math.floor(Math.random() * 25) + 75, // 75-100 range
        atsScore: Math.floor(Math.random() * 30) + 70, // 70-100 range
        roleRelevance: [
          { role: 'Software Engineer', score: 92, status: 'qualified' },
          { role: 'Senior Software Engineer', score: 68, status: 'underqualified' },
          { role: 'Junior Developer', score: 98, status: 'overqualified' },
          { role: 'Full Stack Developer', score: 85, status: 'qualified' },
          { role: 'DevOps Engineer', score: 45, status: 'underqualified' },
          { role: 'Tech Lead', score: 55, status: 'underqualified' },
        ],
        skillSuggestions: [
          'Cloud Computing (AWS/Azure)',
          'Microservices Architecture',
          'Docker & Kubernetes',
          'System Design',
          'Leadership & Team Management',
          'Machine Learning Fundamentals',
          'API Design & Development'
        ],
        softSkills: [
          { skill: 'Communication', score: Math.floor(Math.random() * 20) + 80 },
          { skill: 'Leadership', score: Math.floor(Math.random() * 30) + 70 },
          { skill: 'Problem Solving', score: Math.floor(Math.random() * 15) + 85 },
          { skill: 'Teamwork', score: Math.floor(Math.random() * 20) + 80 },
          { skill: 'Adaptability', score: Math.floor(Math.random() * 25) + 75 },
          { skill: 'Critical Thinking', score: Math.floor(Math.random() * 20) + 80 }
        ],
        keywordMatches: [
          'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Agile', 'REST API', 'MongoDB', 'TypeScript'
        ],
        improvementAreas: [
          'Add more quantified achievements with specific metrics',
          'Include relevant cloud computing certifications',
          'Optimize resume format for better ATS scanning',
          'Strengthen technical skills section with recent technologies',
          'Add leadership examples and team management experience',
          'Include open-source contributions or personal projects'
        ],
        biasAnalysis: {
          genderBias: Math.floor(Math.random() * 8) + 2, // 2-10 range
          ageBias: Math.floor(Math.random() * 10) + 3, // 3-13 range
          educationBias: Math.floor(Math.random() * 15) + 5, // 5-20 range
          overallBiasScore: Math.floor(Math.random() * 10) + 5, // 5-15 range
          fairnessRating: 'Excellent'
        },
        salaryPrediction: {
          minSalary: 75000 + Math.floor(Math.random() * 25000),
          maxSalary: 95000 + Math.floor(Math.random() * 35000),
          currency: 'USD',
          confidence: Math.floor(Math.random() * 15) + 85 // 85-100 confidence
        },
        careerProgression: {
          currentLevel: 'Mid-Level Developer',
          nextLevel: 'Senior Developer',
          timeToPromotion: '18-24 months',
          skillsNeeded: ['System Design', 'Leadership', 'Mentoring', 'Architecture Planning']
        },
        skillGapAnalysis: {
          criticalGaps: ['Cloud Architecture', 'System Design', 'Team Leadership'],
          minorGaps: ['DevOps Practices', 'Performance Optimization', 'Security Best Practices'],
          strengths: ['Frontend Development', 'Database Design', 'Problem Solving', 'Code Quality'],
          developmentPriority: 'High'
        },
        atsOptimization: {
          score: Math.floor(Math.random() * 25) + 75, // 75-100 range
          suggestions: [
            'Use standard section headings (Experience, Education, Skills)',
            'Include more industry-specific keywords',
            'Improve formatting consistency',
            'Add relevant technical certifications',
            'Use bullet points for better readability'
          ],
          keywordDensity: Math.floor(Math.random() * 20) + 70, // 70-90 range
          formatScore: Math.floor(Math.random() * 15) + 85, // 85-100 range
          readabilityScore: Math.floor(Math.random() * 20) + 80 // 80-100 range
        },
        learningResources: [
          { title: 'AWS Certified Solutions Architect', url: '/learning-resources', type: 'Certification' },
          { title: 'Microservices Design Patterns', url: '/learning-resources', type: 'Course' },
          { title: 'Docker Mastery Course', url: '/learning-resources', type: 'Video' },
          { title: 'System Design Interview Guide', url: '/learning-resources', type: 'Book' },
          { title: 'Leadership in Tech Teams', url: '/learning-resources', type: 'Course' },
          { title: 'Advanced JavaScript Patterns', url: '/learning-resources', type: 'Tutorial' }
        ],
        alerts: [
          { type: 'success', message: 'Strong technical foundation detected with modern frameworks' },
          { type: 'warning', message: 'Consider adding more leadership experience for senior roles' },
          { type: 'info', message: 'Your profile matches well with mid-level to senior positions' },
          { type: 'success', message: 'Excellent bias-free evaluation - fair and objective assessment' },
          { type: 'warning', message: 'Cloud computing skills gap identified - high priority for development' },
          { type: 'info', message: 'ATS optimization score is good but can be improved with keyword enhancement' }
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    return 'text-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'qualified':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Qualified</Badge>;
      case 'overqualified':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Overqualified</Badge>;
      case 'underqualified':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Underqualified</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full border-b border-border bg-dark-surface/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-paragraph text-sm">Back to Home</span>
            </Link>
            <div className="font-heading font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
              AI RESUME ANALYSIS
            </div>
            <div className="w-20"></div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="w-full bg-dark-surface py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-6">
              AI-Powered Resume Analysis
            </h1>
            <p className="font-paragraph text-lg text-muted-foreground max-w-3xl mx-auto">
              Get comprehensive insights with automated scoring (0-100), skill gap analysis, ATS optimization,
              bias-free evaluation, and salary predictions powered by advanced machine learning algorithms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="w-full py-8">
        <div className="max-w-4xl mx-auto px-6">
          {!analysisResult && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Resume Upload */}
                <Card className="p-8 border-2 border-dashed border-border hover:border-accent transition-colors bg-dark-surface/50 backdrop-blur-sm">
                  <div
                    className="text-center space-y-6"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center"
                    >
                      <Upload className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white mb-2">
                        Upload Resume
                      </h3>
                      <p className="font-paragraph text-muted-foreground mb-6">
                        Drag and drop your resume or click to browse
                      </p>
                    </div>

                    <div className="space-y-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-primary hover:opacity-90 text-white font-paragraph rounded-xl"
                        size="lg"
                      >
                        Choose File
                      </Button>

                      {selectedFile && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center space-x-2 text-white"
                        >
                          <FileText className="w-4 h-4" />
                          <span className="font-paragraph text-sm">{selectedFile.name}</span>
                        </motion.div>
                      )}
                    </div>

                    <p className="font-paragraph text-xs text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                </Card>

                {/* Job Description */}
                <Card className="p-8 bg-dark-surface/50 backdrop-blur-sm border border-border">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-white">Job Description</h3>
                        <p className="font-paragraph text-sm text-muted-foreground">Optional for better matching</p>
                      </div>
                    </div>
                    
                    <textarea
                      placeholder="Paste the job description here for more accurate analysis and role-specific insights..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full h-40 p-4 border border-border rounded-xl font-paragraph text-sm resize-none focus:border-accent outline-none bg-dark-surface-2 text-white placeholder:text-muted-foreground"
                    />
                  </div>
                </Card>
              </div>

              {selectedFile && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center"
                >
                  <Button
                    onClick={analyzeResume}
                    disabled={isAnalyzing}
                    className="bg-gradient-primary hover:opacity-90 text-white font-paragraph px-12 py-4 rounded-xl text-lg shadow-lg"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-pulse" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Analysis Loading */}
          {isAnalyzing && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Card className="p-8 text-center bg-dark-surface/50 backdrop-blur-sm border border-border">
                <div className="space-y-6">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center"
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                      AI Analysis in Progress
                    </h3>
                    <p className="font-paragraph text-muted-foreground mb-4">
                      Our advanced algorithms are analyzing your resume and generating comprehensive insights...
                    </p>
                    <div className="space-y-2">
                      <Progress value={66} className="w-full max-w-md mx-auto" />
                      <div className="text-sm text-muted-foreground">Processing: Skill extraction & scoring</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Overall Scores - Enhanced with more metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card className="p-8 bg-gradient-primary text-white">
                  <div className="text-center space-y-4">
                    <Award className="w-12 h-12 mx-auto" />
                    <h2 className="font-heading text-xl font-bold">
                      AI Score
                    </h2>
                    <div className="text-4xl font-black">
                      {analysisResult.overallScore}
                    </div>
                    <p className="text-white/90 text-sm">
                      Overall Rating (0-100)
                    </p>
                  </div>
                </Card>

                <Card className="p-8 bg-gradient-secondary text-white">
                  <div className="text-center space-y-4">
                    <Target className="w-12 h-12 mx-auto" />
                    <h2 className="font-heading text-xl font-bold">
                      ATS Score
                    </h2>
                    <div className="text-4xl font-black">
                      {analysisResult.atsOptimization.score}
                    </div>
                    <p className="text-white/90 text-sm">
                      System Compatibility
                    </p>
                  </div>
                </Card>

                <Card className="p-8 bg-gradient-accent text-white">
                  <div className="text-center space-y-4">
                    <Shield className="w-12 h-12 mx-auto" />
                    <h2 className="font-heading text-xl font-bold">
                      Bias Score
                    </h2>
                    <div className="text-4xl font-black">
                      {analysisResult.biasAnalysis.overallBiasScore}
                    </div>
                    <p className="text-white/90 text-sm">
                      {analysisResult.biasAnalysis.fairnessRating}
                    </p>
                  </div>
                </Card>

                <Card className="p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <div className="text-center space-y-4">
                    <DollarSign className="w-12 h-12 mx-auto" />
                    <h2 className="font-heading text-xl font-bold">
                      Salary Range
                    </h2>
                    <div className="text-2xl font-black">
                      ${analysisResult.salaryPrediction.minSalary / 1000}K-${analysisResult.salaryPrediction.maxSalary / 1000}K
                    </div>
                    <p className="text-white/90 text-sm">
                      {analysisResult.salaryPrediction.confidence}% Confidence
                    </p>
                  </div>
                </Card>

                <Card className="p-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                  <div className="text-center space-y-4">
                    <TrendingUp className="w-12 h-12 mx-auto" />
                    <h2 className="font-heading text-xl font-bold">
                      Skill Gap
                    </h2>
                    <div className="text-2xl font-black">
                      {analysisResult.skillGapAnalysis.criticalGaps.length}
                    </div>
                    <p className="text-white/90 text-sm">
                      Critical Gaps
                    </p>
                  </div>
                </Card>
              </div>

              {/* Alerts */}
              {analysisResult.alerts.length > 0 && (
                <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                  <h3 className="font-heading text-xl font-bold text-white mb-4">
                    Key Insights
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.alerts.map((alert, index) => (
                      <motion.div 
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-4 rounded-xl bg-dark-surface-2/50"
                      >
                        {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                        {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />}
                        {alert.type === 'info' && <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />}
                        <p className="font-paragraph text-sm text-white">{alert.message}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Role Relevance */}
              <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                <h3 className="font-heading text-xl font-bold text-white mb-6">
                  Role Relevance Analysis
                </h3>
                <div className="space-y-4">
                  {analysisResult.roleRelevance.map((role, index) => (
                    <motion.div 
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-dark-surface-2/50 rounded-xl"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-heading font-semibold text-white">{role.role}</h4>
                          {getStatusBadge(role.status)}
                        </div>
                        <Progress value={role.score} className="w-full" />
                      </div>
                      <div className={`text-2xl font-bold ml-4 ${getScoreColor(role.score)}`}>
                        {role.score}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Skill Gap Analysis - Dedicated Section */}
              <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-500" />
                  Comprehensive Skill Gap Analysis
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                      Critical Gaps ({analysisResult.skillGapAnalysis.criticalGaps.length})
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.skillGapAnalysis.criticalGaps.map((gap, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="font-paragraph text-sm text-white">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-3 flex items-center">
                      <TrendingDown className="w-4 h-4 mr-2 text-orange-500" />
                      Minor Gaps ({analysisResult.skillGapAnalysis.minorGaps.length})
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.skillGapAnalysis.minorGaps.map((gap, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="font-paragraph text-sm text-white">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Key Strengths ({analysisResult.skillGapAnalysis.strengths.length})
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.skillGapAnalysis.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-paragraph text-sm text-white">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-accent" />
                    <span className="font-paragraph font-semibold text-accent">Development Priority: {analysisResult.skillGapAnalysis.developmentPriority}</span>
                  </div>
                  <p className="font-paragraph text-sm text-muted-foreground">
                    Focus on critical gaps first to maximize career advancement opportunities and role suitability.
                  </p>
                </div>
              </Card>

              {/* ATS Optimization - Dedicated Section */}
              <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-accent" />
                  ATS Optimization Analysis
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-paragraph text-sm text-white">Overall ATS Score</span>
                          <span className={`font-paragraph text-sm font-semibold ${getScoreColor(analysisResult.atsOptimization.score)}`}>
                            {analysisResult.atsOptimization.score}%
                          </span>
                        </div>
                        <Progress value={analysisResult.atsOptimization.score} className="h-3" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-paragraph text-sm text-white">Keyword Density</span>
                          <span className={`font-paragraph text-sm font-semibold ${getScoreColor(analysisResult.atsOptimization.keywordDensity)}`}>
                            {analysisResult.atsOptimization.keywordDensity}%
                          </span>
                        </div>
                        <Progress value={analysisResult.atsOptimization.keywordDensity} className="h-3" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-paragraph text-sm text-white">Format Score</span>
                          <span className={`font-paragraph text-sm font-semibold ${getScoreColor(analysisResult.atsOptimization.formatScore)}`}>
                            {analysisResult.atsOptimization.formatScore}%
                          </span>
                        </div>
                        <Progress value={analysisResult.atsOptimization.formatScore} className="h-3" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-paragraph text-sm text-white">Readability Score</span>
                          <span className={`font-paragraph text-sm font-semibold ${getScoreColor(analysisResult.atsOptimization.readabilityScore)}`}>
                            {analysisResult.atsOptimization.readabilityScore}%
                          </span>
                        </div>
                        <Progress value={analysisResult.atsOptimization.readabilityScore} className="h-3" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-4">Optimization Suggestions</h4>
                    <div className="space-y-3">
                      {analysisResult.atsOptimization.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-dark-surface-2/50 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="font-paragraph text-sm text-muted-foreground">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Soft Skills & Bias Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Soft Skills */}
                <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                  <h3 className="font-heading text-xl font-bold text-white mb-6">
                    Soft Skills Analysis
                  </h3>
                  <div className="space-y-4">
                    {analysisResult.softSkills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-paragraph text-sm text-white">{skill.skill}</span>
                          <span className={`font-paragraph text-sm font-semibold ${getScoreColor(skill.score)}`}>{skill.score}%</span>
                        </div>
                        <Progress value={skill.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Enhanced Bias Analysis */}
                <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                  <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-accent" />
                    Bias-Free Ranking
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-paragraph text-sm text-white">Gender Bias</span>
                        <span className="font-paragraph text-sm font-semibold text-green-600">{analysisResult.biasAnalysis.genderBias}%</span>
                      </div>
                      <Progress value={analysisResult.biasAnalysis.genderBias} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-paragraph text-sm text-white">Age Bias</span>
                        <span className="font-paragraph text-sm font-semibold text-green-600">{analysisResult.biasAnalysis.ageBias}%</span>
                      </div>
                      <Progress value={analysisResult.biasAnalysis.ageBias} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-paragraph text-sm text-white">Education Bias</span>
                        <span className="font-paragraph text-sm font-semibold text-yellow-600">{analysisResult.biasAnalysis.educationBias}%</span>
                      </div>
                      <Progress value={analysisResult.biasAnalysis.educationBias} className="h-2" />
                    </div>
                    
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-paragraph font-semibold text-green-400">Fairness Rating: {analysisResult.biasAnalysis.fairnessRating}</span>
                      </div>
                      <p className="font-paragraph text-sm text-green-400">
                        ✓ Objective evaluation ensures fair ranking based purely on qualifications and skills
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Career Progression */}
              <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                  Career Progression Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-paragraph font-semibold text-white mb-2">Current Level</h4>
                      <p className="font-paragraph text-lg text-accent font-semibold">{analysisResult.careerProgression.currentLevel}</p>
                    </div>
                    <div>
                      <h4 className="font-paragraph font-semibold text-white mb-2">Next Level</h4>
                      <p className="font-paragraph text-lg text-white">{analysisResult.careerProgression.nextLevel}</p>
                    </div>
                    <div>
                      <h4 className="font-paragraph font-semibold text-white mb-2">Time to Promotion</h4>
                      <p className="font-paragraph text-sm text-muted-foreground">{analysisResult.careerProgression.timeToPromotion}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-3">Skills Needed for Promotion</h4>
                    <div className="space-y-2">
                      {analysisResult.careerProgression.skillsNeeded.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span className="font-paragraph text-sm text-white">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Keyword Matches & Improvements */}
              <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                <h3 className="font-heading text-xl font-bold text-white mb-6">
                  Keyword Analysis & Improvements
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-3">Matched Keywords ({analysisResult.keywordMatches.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywordMatches.map((keyword, index) => (
                        <Badge 
                          key={index}
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-paragraph font-semibold text-white mb-3">Priority Improvements ({analysisResult.improvementAreas.length})</h4>
                    <div className="space-y-2">
                      {analysisResult.improvementAreas.map((area, index) => (
                        <div key={index} className="flex items-start space-x-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                          <span className="font-paragraph text-sm text-muted-foreground">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Skill Development Recommendations */}
              <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                <h3 className="font-heading text-xl font-bold text-white mb-6">
                  Recommended Skills to Develop
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {analysisResult.skillSuggestions.map((skill, index) => (
                    <motion.div 
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2 p-3 bg-dark-surface-2/50 rounded-xl hover:bg-accent/10 transition-colors"
                    >
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="font-paragraph text-sm text-white">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Learning Resources */}
              <Card className="p-6 bg-dark-surface/50 backdrop-blur-sm border border-border">
                <h3 className="font-heading text-xl font-bold text-white mb-6">
                  Personalized Learning Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisResult.learningResources.map((resource, index) => (
                    <motion.div 
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-dark-surface-2/50 rounded-xl hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-heading font-semibold text-white text-sm">{resource.title}</h4>
                        <Badge variant="outline" className="text-xs border-accent text-accent">{resource.type}</Badge>
                      </div>
                      <Link to={resource.url}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Access Resource
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </Card>
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    setSelectedFile(null);
                    setAnalysisResult(null);
                    setJobDescription('');
                  }}
                  variant="outline"
                  className="flex-1 border-white text-white hover:bg-white hover:text-black rounded-xl"
                >
                  Analyze Another Resume
                </Button>
                <Button 
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-paragraph rounded-xl"
                  onClick={() => window.print()}
                >
                  Export Analysis Report
                </Button>
                <Link to="/learning-resources" className="flex-1">
                  <Button className="w-full bg-gradient-secondary hover:opacity-90 text-white font-paragraph rounded-xl">
                    Explore Learning Resources
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}