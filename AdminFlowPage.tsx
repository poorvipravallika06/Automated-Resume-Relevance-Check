import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, FileText, Shield, AlertTriangle, CheckCircle, Eye, Settings, Award, Link as LinkIcon } from 'lucide-react';

interface AdminAnalysis {
  fileName: string;
  fakeDetection: {
    isFake: boolean;
    confidence: number;
    suspiciousElements: string[];
    verificationStatus: 'Verified' | 'Suspicious' | 'Flagged';
  };
  versionControl: {
    version: string;
    lastModified: string;
    changes: string[];
    previousVersions: string[];
  };
  atsOptimization: {
    score: number;
    keywordSuggestions: string[];
    formatIssues: string[];
    improvements: string[];
  };
  placementLinking: {
    matchedPositions: {
      title: string;
      company: string;
      matchScore: number;
      requirements: string[];
    }[];
  };
}

export default function AdminFlowPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AdminAnalysis[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
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
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: AdminAnalysis[] = selectedFiles.map((file) => ({
        fileName: file.name,
        fakeDetection: {
          isFake: Math.random() > 0.8,
          confidence: Math.floor(Math.random() * 30) + 70,
          suspiciousElements: Math.random() > 0.5 ? ['Inconsistent dates', 'Unusual formatting'] : [],
          verificationStatus: ['Verified', 'Suspicious', 'Flagged'][Math.floor(Math.random() * 3)] as 'Verified' | 'Suspicious' | 'Flagged'
        },
        versionControl: {
          version: '2.1',
          lastModified: new Date().toLocaleDateString(),
          changes: ['Updated contact information', 'Added recent project'],
          previousVersions: ['v1.0 - Initial', 'v2.0 - Major update']
        },
        atsOptimization: {
          score: Math.floor(Math.random() * 40) + 60,
          keywordSuggestions: ['JavaScript', 'React', 'Node.js', 'AWS', 'Agile'],
          formatIssues: ['Missing contact section', 'Inconsistent bullet points'],
          improvements: ['Add skills section', 'Optimize for ATS scanning', 'Include quantified achievements']
        },
        placementLinking: {
          matchedPositions: [
            {
              title: 'Senior Software Engineer',
              company: 'Tech Corp',
              matchScore: 85,
              requirements: ['5+ years experience', 'React expertise', 'Team leadership']
            },
            {
              title: 'Full Stack Developer',
              company: 'StartupXYZ',
              matchScore: 78,
              requirements: ['JavaScript', 'Node.js', 'Database design']
            }
          ]
        }
      }));
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      setActiveTab('results');
    }, 4000);
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'Suspicious': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Flagged': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-neonaccent';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full border-b border-primary/10">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary hover:text-neonaccent">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-paragraph text-sm">Back to Home</span>
            </Link>
            <div className="font-heading font-bold text-2xl text-primary">
              ADMIN DASHBOARD
            </div>
            <div className="w-20"></div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-black text-primary mb-6">
            Advanced Resume Management
          </h1>
          <p className="font-paragraph text-lg text-primary/70 max-w-3xl mx-auto">
            Comprehensive admin tools for fake detection, version control, ATS optimization,
            and intelligent placement linking with accreditation management.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="upload" className="font-paragraph">Upload & Analyze</TabsTrigger>
              <TabsTrigger value="results" className="font-paragraph">Analysis Results</TabsTrigger>
              <TabsTrigger value="accreditations" className="font-paragraph">Accreditations</TabsTrigger>
              <TabsTrigger value="settings" className="font-paragraph">System Settings</TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card className="p-8 border-2 border-dashed border-primary/20 hover:border-neonaccent transition-colors">
                <div
                  className="text-center space-y-6"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 mx-auto bg-neonaccent/10 rounded-lg flex items-center justify-center">
                    <Upload className="w-8 h-8 text-neonaccent" />
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                      Upload Resumes for Analysis
                    </h3>
                    <p className="font-paragraph text-primary/70 mb-6">
                      Upload multiple resumes for comprehensive admin analysis including fake detection and ATS optimization
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
                      className="bg-neonaccent text-primary hover:bg-neonaccent/90 font-paragraph"
                      size="lg"
                    >
                      Choose Files
                    </Button>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-paragraph text-sm text-primary/70">
                          {selectedFiles.length} file(s) selected:
                        </p>
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-primary/50" />
                              <span className="font-paragraph text-sm">{file.name}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-500 border-red-200 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedFiles.length > 0 && (
                    <Button
                      onClick={analyzeResumes}
                      disabled={isAnalyzing}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph"
                      size="lg"
                    >
                      {isAnalyzing ? 'Analyzing...' : `Analyze ${selectedFiles.length} Resume(s)`}
                    </Button>
                  )}

                  <p className="font-paragraph text-xs text-primary/50">
                    Supported formats: PDF, DOC, DOCX (Max 10MB each)
                  </p>
                </div>
              </Card>

              {/* Analysis Loading */}
              {isAnalyzing && (
                <Card className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="w-16 h-16 mx-auto bg-neonaccent/10 rounded-lg flex items-center justify-center animate-pulse">
                      <Shield className="w-8 h-8 text-neonaccent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-primary mb-2">
                        Running Admin Analysis
                      </h3>
                      <p className="font-paragraph text-primary/70 mb-4">
                        Performing fake detection, version control, and ATS optimization...
                      </p>
                      <Progress value={80} className="w-full max-w-md mx-auto" />
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-8">
              {analysisResults.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="font-paragraph text-primary/70">No analysis results available. Upload resumes to get started.</p>
                </Card>
              ) : (
                <div className="space-y-6">
                  {analysisResults.map((result, index) => (
                    <Card key={index} className="p-6 border-2 border-primary/10">
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading text-xl font-bold text-primary">
                            {result.fileName}
                          </h3>
                          <Badge className={getVerificationColor(result.fakeDetection.verificationStatus)}>
                            {result.fakeDetection.verificationStatus}
                          </Badge>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Fake Detection */}
                          <div className="space-y-4">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <Shield className="w-5 h-5 mr-2 text-neonaccent" />
                              Authenticity Analysis
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-paragraph text-sm text-primary/70">Authenticity Score</span>
                                <span className={`font-bold ${getScoreColor(result.fakeDetection.confidence)}`}>
                                  {result.fakeDetection.confidence}%
                                </span>
                              </div>
                              <Progress value={result.fakeDetection.confidence} />
                              
                              {result.fakeDetection.suspiciousElements.length > 0 && (
                                <div className="space-y-2">
                                  <span className="font-paragraph text-sm text-primary/70">Suspicious Elements:</span>
                                  {result.fakeDetection.suspiciousElements.map((element, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                      <AlertTriangle className="w-3 h-3 text-orange-500" />
                                      <span className="font-paragraph text-xs text-primary/80">{element}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* ATS Optimization */}
                          <div className="space-y-4">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <Eye className="w-5 h-5 mr-2 text-neonaccent" />
                              ATS Optimization
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-paragraph text-sm text-primary/70">ATS Score</span>
                                <span className={`font-bold ${getScoreColor(result.atsOptimization.score)}`}>
                                  {result.atsOptimization.score}%
                                </span>
                              </div>
                              <Progress value={result.atsOptimization.score} />
                              
                              <div className="space-y-2">
                                <span className="font-paragraph text-sm text-primary/70">Keyword Suggestions:</span>
                                <div className="flex flex-wrap gap-1">
                                  {result.atsOptimization.keywordSuggestions.slice(0, 3).map((keyword, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs border-neonaccent/50 text-neonaccent">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Version Control */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Version Control</h4>
                          <div className="bg-secondary/30 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-paragraph text-primary/70">Current Version:</span>
                                <div className="font-paragraph font-semibold text-primary">{result.versionControl.version}</div>
                              </div>
                              <div>
                                <span className="font-paragraph text-primary/70">Last Modified:</span>
                                <div className="font-paragraph font-semibold text-primary">{result.versionControl.lastModified}</div>
                              </div>
                              <div>
                                <span className="font-paragraph text-primary/70">Recent Changes:</span>
                                <div className="font-paragraph text-primary">{result.versionControl.changes.length} updates</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Placement Linking */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary flex items-center">
                            <LinkIcon className="w-5 h-5 mr-2 text-neonaccent" />
                            Matched Positions
                          </h4>
                          <div className="space-y-2">
                            {result.placementLinking.matchedPositions.slice(0, 2).map((position, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                                <div>
                                  <div className="font-paragraph font-semibold text-primary">{position.title}</div>
                                  <div className="font-paragraph text-sm text-primary/70">{position.company}</div>
                                </div>
                                <div className={`text-lg font-bold ${getScoreColor(position.matchScore)}`}>
                                  {position.matchScore}%
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Accreditations Tab */}
            <TabsContent value="accreditations" className="space-y-6">
              <Card className="p-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-neonaccent" />
                  Accreditation Management
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['AWS Certified', 'Google Cloud Professional', 'Microsoft Azure Expert', 'Scrum Master', 'PMP Certified', 'Data Science Certificate'].map((accreditation, index) => (
                    <div key={index} className="p-4 border border-primary/20 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-neonaccent/10 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-neonaccent" />
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-primary">{accreditation}</h4>
                          <p className="font-paragraph text-xs text-primary/70">Active Badge</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 border-neonaccent text-neonaccent hover:bg-neonaccent hover:text-primary">
                          View Badge
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="p-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-6 flex items-center">
                  <Settings className="w-6 h-6 mr-2 text-neonaccent" />
                  System Configuration
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-heading font-semibold text-primary">Detection Thresholds</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-paragraph text-sm text-primary/70">Fake Detection Sensitivity</span>
                          <span className="font-paragraph text-sm font-semibold text-primary">High</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-paragraph text-sm text-primary/70">ATS Optimization Level</span>
                          <span className="font-paragraph text-sm font-semibold text-primary">Standard</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-heading font-semibold text-primary">Alert Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-paragraph text-sm text-primary/70">Suspicious Resume Alerts</span>
                          <span className="font-paragraph text-sm font-semibold text-neonaccent">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-paragraph text-sm text-primary/70">Version Control Notifications</span>
                          <span className="font-paragraph text-sm font-semibold text-neonaccent">Enabled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/10">
                    <Button className="bg-neonaccent text-primary hover:bg-neonaccent/90 font-paragraph">
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}