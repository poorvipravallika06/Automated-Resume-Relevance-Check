import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AuthModal } from '@/components/ui/auth-modal';
import { SpeakUpModal } from '@/components/ui/speak-up-modal';
import { BaseCrudService } from '@/integrations';
import { LearningResources } from '@/entities/learningresources';
import { ArrowLeft, Search, BookOpen, Video, FileText, ExternalLink, Star, Clock, User, MessageSquare, LogOut } from 'lucide-react';

export default function LearningResourcesPage() {
  const [resources, setResources] = useState<LearningResources[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResources[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSpeakUpModal, setShowSpeakUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.skillCovered?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(resource => 
        resource.resourceType?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(resource => 
        resource.difficultyLevel?.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedType, selectedDifficulty, resources]);

  const fetchResources = async () => {
    try {
      const { items } = await BaseCrudService.getAll<LearningResources>('learningresources');
      setResources(items);
      setFilteredResources(items);
    } catch (error) {
      console.error('Error fetching learning resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueTypes = () => {
    const typeSet = new Set<string>();
    resources.forEach(resource => {
      if (resource.resourceType) {
        typeSet.add(resource.resourceType);
      }
    });
    return Array.from(typeSet);
  };

  const getUniqueDifficulties = () => {
    const difficultySet = new Set<string>();
    resources.forEach(resource => {
      if (resource.difficultyLevel) {
        difficultySet.add(resource.difficultyLevel);
      }
    });
    return Array.from(difficultySet);
  };

  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'course': return <BookOpen className="w-5 h-5" />;
      case 'article': return <FileText className="w-5 h-5" />;
      case 'book': return <BookOpen className="w-5 h-5" />;
      case 'tutorial': return <Video className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Video': 'bg-red-100 text-red-800 border-red-200',
      'Course': 'bg-blue-100 text-blue-800 border-blue-200',
      'Article': 'bg-green-100 text-green-800 border-green-200',
      'Book': 'bg-purple-100 text-purple-800 border-purple-200',
      'Tutorial': 'bg-orange-100 text-orange-800 border-orange-200',
      'Certification': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleResourceClick = (resource: LearningResources) => {
    if (resource.resourceLink) {
      window.open(resource.resourceLink, '_blank');
    }
  };

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
      {/* Header */}
      <header className="w-full border-b border-border bg-dark-surface">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-accent">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-paragraph text-sm">Back to Home</span>
            </Link>
            <div className="font-heading font-bold text-2xl text-white">
              LEARNING RESOURCES
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
      </header>

      {/* Hero Section */}
      <section className="w-full bg-dark-surface py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-black text-white mb-6">
            Curated Learning Resources
          </h1>
          <p className="font-paragraph text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover high-quality courses, tutorials, articles, and certifications to develop your skills
            and advance your career with expert-recommended learning materials.
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources by title, skill, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg font-paragraph bg-dark-surface-2 border-border text-white placeholder:text-muted-foreground focus:border-accent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="space-y-3">
              {/* Resource Type Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="font-paragraph text-sm text-muted-foreground mr-2">Type:</span>
                <Button
                  variant={selectedType === '' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('')}
                  className={selectedType === '' ? 'bg-accent text-white' : 'border-border text-white hover:border-accent bg-dark-surface-2'}
                  size="sm"
                >
                  All Types
                </Button>
                {getUniqueTypes().map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? 'bg-accent text-white' : 'border-border text-white hover:border-accent bg-dark-surface-2'}
                    size="sm"
                  >
                    {type}
                  </Button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="font-paragraph text-sm text-muted-foreground mr-2">Level:</span>
                <Button
                  variant={selectedDifficulty === '' ? 'default' : 'outline'}
                  onClick={() => setSelectedDifficulty('')}
                  className={selectedDifficulty === '' ? 'bg-accent text-white' : 'border-border text-white hover:border-accent bg-dark-surface-2'}
                  size="sm"
                >
                  All Levels
                </Button>
                {getUniqueDifficulties().map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={selectedDifficulty === difficulty ? 'bg-accent text-white' : 'border-border text-white hover:border-accent bg-dark-surface-2'}
                    size="sm"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-muted-foreground">Loading learning resources...</div>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-muted-foreground mb-4">
                {searchTerm || selectedType || selectedDifficulty ? 'No resources found matching your criteria' : 'No learning resources available'}
              </div>
              {(searchTerm || selectedType || selectedDifficulty) && (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('');
                    setSelectedDifficulty('');
                  }}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <Card 
                  key={resource._id} 
                  className="p-6 bg-dark-surface border-border hover:border-accent transition-all duration-300 cursor-pointer group"
                  onClick={() => handleResourceClick(resource)}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                          {getTypeIcon(resource.resourceType || '')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-lg font-bold text-white line-clamp-2">
                            {resource.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {resource.resourceType && (
                        <Badge className={getTypeColor(resource.resourceType)}>
                          {resource.resourceType}
                        </Badge>
                      )}
                      {resource.difficultyLevel && (
                        <Badge className={getDifficultyColor(resource.difficultyLevel)}>
                          {resource.difficultyLevel}
                        </Badge>
                      )}
                    </div>

                    {/* Skill Covered */}
                    {resource.skillCovered && (
                      <div className="space-y-2">
                        <div className="font-paragraph text-sm font-semibold text-white">Skills Covered:</div>
                        <div className="flex flex-wrap gap-1">
                          {resource.skillCovered.split(',').slice(0, 3).map((skill, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs border-accent/50 text-accent"
                            >
                              {skill.trim()}
                            </Badge>
                          ))}
                          {resource.skillCovered.split(',').length > 3 && (
                            <Badge variant="outline" className="text-xs border-muted-foreground/30 text-muted-foreground">
                              +{resource.skillCovered.split(',').length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {resource.description && (
                      <p className="font-paragraph text-sm text-muted-foreground line-clamp-3">
                        {resource.description}
                      </p>
                    )}

                    {/* Rating and Duration (Mock data) */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                        ))}
                        <span className="font-paragraph text-xs text-muted-foreground ml-1">4.8 (234)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="font-paragraph text-xs">
                          {resource.resourceType === 'Video' ? '2h 30m' : 
                           resource.resourceType === 'Course' ? '8 weeks' :
                           resource.resourceType === 'Article' ? '15 min' : '3h'}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-accent text-white hover:bg-accent/90 font-paragraph"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResourceClick(resource);
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Access Resource
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="w-full bg-dark-surface text-white py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-6">
              Featured Learning Paths
            </h2>
            <p className="font-paragraph text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured learning journeys designed by industry experts to help you master in-demand skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Full Stack Development',
                description: 'Complete path from frontend to backend development',
                resources: '24 resources',
                duration: '12 weeks',
                level: 'Intermediate'
              },
              {
                title: 'Data Science Fundamentals',
                description: 'Master data analysis, visualization, and machine learning',
                resources: '18 resources',
                duration: '10 weeks',
                level: 'Beginner'
              },
              {
                title: 'Cloud Architecture',
                description: 'Design and implement scalable cloud solutions',
                resources: '15 resources',
                duration: '8 weeks',
                level: 'Advanced'
              }
            ].map((path, index) => (
              <Card key={index} className="p-6 bg-dark-surface-2 border-border text-white">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">{path.title}</h3>
                    <p className="font-paragraph text-sm text-muted-foreground">{path.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-paragraph text-muted-foreground">{path.resources}</span>
                      <Badge className={getDifficultyColor(path.level)}>
                        {path.level}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="font-paragraph text-xs">{path.duration}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="w-full bg-accent text-white hover:bg-accent/90 font-paragraph"
                  >
                    Start Learning Path
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-dark-surface-2 py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="font-paragraph text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are advancing their careers with our curated resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/career-guidance">
              <Button 
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 font-paragraph"
              >
                Explore Career Paths
              </Button>
            </Link>
            <Link to="/mentors">
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-paragraph"
              >
                Find a Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>

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