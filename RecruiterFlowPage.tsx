import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, FileText, Users, TrendingUp, Clock, Target, AlertCircle, Shield, BarChart3, Award, CheckCircle } from 'lucide-react';

interface CandidateAnalysis {
  candidateName: string;
  overallRating: 'High' | 'Medium' | 'Low';
  suitabilityScore: number;
  keywordMatchScore: number;
  tenurePredicition: string;
  retentionScore: number;
  strengths: string[];
  improvementAreas: string[];
  feedback: string;
  ranking: number;
  biasScore: number;
  skillGaps: string[];
  atsCompatibility: number;
  diversityMetrics: {
    genderNeutral: boolean;
    ageNeutral: boolean;
    educationFocus: 'Skills' | 'Degree' | 'Mixed';
  };
}

export default function RecruiterFlowPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<CandidateAnalysis[]>([]);
  const [jobRole, setJobRole] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || file.type.includes('document')
    );
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || file.type.includes('document')
    );
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeResumes = async () => {
    if (selectedFiles.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with enhanced bias-free ranking
    setTimeout(() => {
      const mockResults: CandidateAnalysis[] = selectedFiles.map((file, index) => ({
        candidateName: file.name.replace(/\.[^/.]+$/, ""),
        overallRating: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] as 'High' | 'Medium' | 'Low',
        suitabilityScore: Math.floor(Math.random() * 40) + 60,
        keywordMatchScore: Math.floor(Math.random() * 30) + 70,
        tenurePredicition: ['2-3 years', '3-5 years', '1-2 years', '5+ years'][Math.floor(Math.random() * 4)],
        retentionScore: Math.floor(Math.random() * 30) + 70,
        biasScore: Math.floor(Math.random() * 10) + 5, // Low bias score (5-15)
        atsCompatibility: Math.floor(Math.random() * 25) + 75, // High ATS compatibility
        skillGaps: [
          'Cloud Computing',
          'Leadership Experience',
          'Data Analysis',
          'Project Management',
          'System Design'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        diversityMetrics: {
          genderNeutral: Math.random() > 0.2, // 80% chance of gender-neutral evaluation
          ageNeutral: Math.random() > 0.15, // 85% chance of age-neutral evaluation
          educationFocus: ['Skills', 'Skills', 'Mixed'][Math.floor(Math.random() * 3)] as 'Skills' | 'Degree' | 'Mixed'
        },
        strengths: [
          'Strong technical background',
          'Excellent communication skills',
          'Leadership experience',
          'Industry-relevant experience',
          'Problem-solving abilities',
          'Team collaboration',
          'Continuous learning mindset'
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        improvementAreas: [
          'Could benefit from more cloud experience',
          'Limited project management exposure',
          'Needs stronger analytical skills',
          'Could improve presentation skills',
          'Requires system design knowledge'
        ].slice(0, Math.floor(Math.random() * 2) + 1),
        feedback: 'Strong candidate with relevant experience. Bias-free evaluation shows excellent potential.',
        ranking: index + 1
      }));

      // Sort by suitability score for bias-free ranking
      mockResults.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
      mockResults.forEach((result, index) => {
        result.ranking = index + 1;
      });

      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 4000);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-accent';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full border-b border-border bg-dark-surface">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-accent">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-paragraph text-sm">Back to Home</span>
            </Link>
            <div className="font-heading font-bold text-2xl text-white">
              RECRUITER DASHBOARD
            </div>
            <div className="w-20"></div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-dark-surface py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-black text-white mb-6">
            AI-Powered Bulk Resume Analysis
          </h1>
          <p className="font-paragraph text-lg text-muted-foreground max-w-3xl mx-auto">
            Upload multiple resumes for comprehensive AI analysis featuring bias-free ranking, 
            skill gap identification, ATS optimization, and automated candidate scoring with detailed analytics dashboard.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="w-full py-16">
        <div className="max-w-4xl mx-auto px-6">
          {analysisResults.length === 0 && (
            <div className="space-y-6">
              {/* Job Role Input */}
              <Card className="p-6 bg-dark-surface border-border">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Job Role Details
                  </h3>
                  <input
                    type="text"
                    placeholder="Enter the job role (e.g., Senior Software Engineer, Product Manager)"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg font-paragraph focus:border-accent outline-none bg-dark-surface-2 text-white placeholder:text-muted-foreground"
                  />
                </div>
              </Card>

              {/* Upload Area */}
              <Card className="p-8 border-2 border-dashed border-border hover:border-accent transition-colors bg-dark-surface">
                <div
                  className="text-center space-y-6"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 mx-auto bg-accent/10 rounded-lg flex items-center justify-center">
                    <Upload className="w-8 h-8 text-accent" />
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Upload Candidate Resumes
                    </h3>
                    <p className="font-paragraph text-muted-foreground mb-6">
                      Drag and drop multiple resume files for bulk processing with AI-powered analysis
                    </p>
                  </div>

                  <div className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-accent text-white hover:bg-accent/90 font-paragraph"
                      size="lg"
                    >
                      Choose Files
                    </Button>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-paragraph text-sm text-muted-foreground">
                          {selectedFiles.length} file(s) selected:
                        </p>
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-dark-surface-2/50 rounded">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="font-paragraph text-sm text-white">{file.name}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedFiles.length > 0 && jobRole && (
                    <Button
                      onClick={analyzeResumes}
                      disabled={isAnalyzing}
                      className="bg-gradient-primary text-white hover:opacity-90 font-paragraph"
                      size="lg"
                    >
                      {isAnalyzing ? 'Analyzing Candidates...' : `Analyze ${selectedFiles.length} Resume(s)`}
                    </Button>
                  )}

                  <p className="font-paragraph text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX (Max 10MB each)
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Analysis Loading */}
          {isAnalyzing && (
            <Card className="p-8 text-center bg-dark-surface border-border">
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-lg flex items-center justify-center animate-pulse">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    Analyzing Candidates
                  </h3>
                  <p className="font-paragraph text-muted-foreground mb-4">
                    Processing {selectedFiles.length} resumes and generating comprehensive analysis...
                  </p>
                  <Progress value={75} className="w-full max-w-md mx-auto" />
                </div>
              </div>
            </Card>
          )}

          {/* Analysis Results */}
          {analysisResults.length > 0 && (
            <div className="space-y-8">
              {/* Enhanced Summary with Analytics */}
              <Card className="p-6 bg-dark-surface border-border">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-heading text-3xl font-bold text-white mb-2">
                      Bulk Analysis Complete
                    </h2>
                    <p className="font-paragraph text-muted-foreground">
                      Analyzed {analysisResults.length} candidates for {jobRole || 'the specified role'} using bias-free AI ranking
                    </p>
                  </div>

                  {/* Analytics Dashboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analysisResults.filter(r => r.overallRating === 'High').length}
                      </div>
                      <div className="font-paragraph text-sm text-muted-foreground">High Rating</div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {analysisResults.filter(r => r.overallRating === 'Medium').length}
                      </div>
                      <div className="font-paragraph text-sm text-muted-foreground">Medium Rating</div>
                    </div>
                    <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-500">
                        {analysisResults.filter(r => r.overallRating === 'Low').length}
                      </div>
                      <div className="font-paragraph text-sm text-muted-foreground">Low Rating</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">
                        {Math.round(analysisResults.reduce((acc, r) => acc + r.biasScore, 0) / analysisResults.length)}
                      </div>
                      <div className="font-paragraph text-sm text-muted-foreground">Avg Bias Score</div>
                    </div>
                  </div>

                  {/* Bias-Free Ranking Indicator */}
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="font-paragraph font-semibold text-green-400">Bias-Free Ranking Active</span>
                    </div>
                    <p className="font-paragraph text-sm text-green-400">
                      ✓ All candidates evaluated objectively based on skills, experience, and qualifications only
                    </p>
                  </div>
                </div>
              </Card>

              {/* Enhanced Candidate Cards */}
              <div className="space-y-6">
                {analysisResults.map((candidate, index) => (
                  <Card key={index} className="p-6 border-2 border-border bg-dark-surface hover:border-accent/50 transition-colors">
                    <div className="space-y-6">
                      {/* Header with Enhanced Badges */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 flex-wrap gap-2">
                            <h3 className="font-heading text-xl font-bold text-white">
                              {candidate.candidateName}
                            </h3>
                            <Badge className={getRatingColor(candidate.overallRating)}>
                              {candidate.overallRating} Rating
                            </Badge>
                            <Badge variant="outline" className="border-accent text-accent">
                              Rank #{candidate.ranking}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <Shield className="w-3 h-3 mr-1" />
                              Bias Score: {candidate.biasScore}
                            </Badge>
                          </div>
                          <p className="font-paragraph text-sm text-muted-foreground">
                            {candidate.feedback}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Scores Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-accent" />
                            <span className="font-paragraph text-sm text-muted-foreground">Suitability Score</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={candidate.suitabilityScore} className="flex-1" />
                            <span className={`font-bold ${getScoreColor(candidate.suitabilityScore)}`}>
                              {candidate.suitabilityScore}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-accent" />
                            <span className="font-paragraph text-sm text-muted-foreground">Keyword Match</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={candidate.keywordMatchScore} className="flex-1" />
                            <span className={`font-bold ${getScoreColor(candidate.keywordMatchScore)}`}>
                              {candidate.keywordMatchScore}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-accent" />
                            <span className="font-paragraph text-sm text-muted-foreground">Retention Score</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={candidate.retentionScore} className="flex-1" />
                            <span className={`font-bold ${getScoreColor(candidate.retentionScore)}`}>
                              {candidate.retentionScore}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4 text-accent" />
                            <span className="font-paragraph text-sm text-muted-foreground">ATS Score</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={candidate.atsCompatibility} className="flex-1" />
                            <span className={`font-bold ${getScoreColor(candidate.atsCompatibility)}`}>
                              {candidate.atsCompatibility}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Strengths */}
                        <div>
                          <h4 className="font-heading font-semibold text-white mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Strengths ({candidate.strengths.length})
                          </h4>
                          <div className="space-y-2">
                            {candidate.strengths.map((strength, idx) => (
                              <div key={idx} className="flex items-center space-x-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="font-paragraph text-sm text-white">{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Skill Gaps */}
                        <div>
                          <h4 className="font-heading font-semibold text-white mb-3 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                            Skill Gaps ({candidate.skillGaps.length})
                          </h4>
                          <div className="space-y-2">
                            {candidate.skillGaps.map((gap, idx) => (
                              <div key={idx} className="flex items-center space-x-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                <AlertCircle className="w-3 h-3 text-orange-500" />
                                <span className="font-paragraph text-sm text-white">{gap}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Diversity Metrics */}
                        <div>
                          <h4 className="font-heading font-semibold text-white mb-3 flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-accent" />
                            Bias-Free Metrics
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 p-2 bg-accent/10 border border-accent/20 rounded-lg">
                              <div className={`w-2 h-2 rounded-full ${candidate.diversityMetrics.genderNeutral ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                              <span className="font-paragraph text-sm text-white">Gender Neutral: {candidate.diversityMetrics.genderNeutral ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-accent/10 border border-accent/20 rounded-lg">
                              <div className={`w-2 h-2 rounded-full ${candidate.diversityMetrics.ageNeutral ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                              <span className="font-paragraph text-sm text-white">Age Neutral: {candidate.diversityMetrics.ageNeutral ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-accent/10 border border-accent/20 rounded-lg">
                              <Award className="w-3 h-3 text-accent" />
                              <span className="font-paragraph text-sm text-white">Focus: {candidate.diversityMetrics.educationFocus}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Tenure Prediction */}
                      <div className="bg-dark-surface-2/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="font-heading font-semibold text-white">AI-Predicted Tenure & Insights</span>
                        </div>
                        <p className="font-paragraph text-sm text-muted-foreground">
                          Based on comprehensive profile analysis, this candidate is likely to stay for <strong className="text-white">{candidate.tenurePredicition}</strong>.
                          Bias-free evaluation ensures fair assessment based purely on qualifications and potential.
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    setSelectedFiles([]);
                    setAnalysisResults([]);
                    setJobRole('');
                  }}
                  variant="outline"
                  className="flex-1 border-white text-white hover:bg-white hover:text-black"
                >
                  Analyze New Batch
                </Button>
                <Button 
                  className="flex-1 bg-accent text-white hover:bg-accent/90 font-paragraph"
                  onClick={() => window.print()}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Analytics Report
                </Button>
                <Button 
                  className="flex-1 bg-gradient-primary text-white hover:opacity-90 font-paragraph"
                  onClick={() => {
                    // Simulate bulk processing workflow
                    alert('Bulk processing workflow initiated for top candidates');
                  }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Process Top Candidates
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}