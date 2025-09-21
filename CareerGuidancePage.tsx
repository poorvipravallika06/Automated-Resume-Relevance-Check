import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CareerPaths } from '@/entities/careerpaths';
import { ArrowLeft, Search, Clock, Target, Workflow, TrendingUp } from 'lucide-react';

export default function CareerGuidancePage() {
  const [searchDomain, setSearchDomain] = useState('');
  const [careerPaths, setCareerPaths] = useState<CareerPaths[]>([]);
  const [filteredPaths, setFilteredPaths] = useState<CareerPaths[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPaths | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareerPaths();
  }, []);

  useEffect(() => {
    if (searchDomain) {
      const filtered = careerPaths.filter(path => 
        path.domainName?.toLowerCase().includes(searchDomain.toLowerCase())
      );
      setFilteredPaths(filtered);
    } else {
      setFilteredPaths(careerPaths);
    }
  }, [searchDomain, careerPaths]);

  const fetchCareerPaths = async () => {
    try {
      const { items } = await BaseCrudService.getAll<CareerPaths>('careerpaths');
      setCareerPaths(items);
      setFilteredPaths(items);
    } catch (error) {
      console.error('Error fetching career paths:', error);
    } finally {
      setLoading(false);
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
              CAREER GUIDANCE
            </div>
            <div className="w-20"></div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-dark-surface py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-black text-white mb-6">
            Discover Your Career Path
          </h1>
          <p className="font-paragraph text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore detailed career roadmaps, methodologies, and timelines for your domain of interest.
            Get personalized guidance to navigate your professional journey.
          </p>
          
          {/* Search Section */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your domain of interest (e.g., Software Development, Data Science, Marketing)"
                value={searchDomain}
                onChange={(e) => setSearchDomain(e.target.value)}
                className="pl-12 py-4 text-lg font-paragraph bg-dark-surface-2 border-purple-light/30 text-white placeholder:text-muted-foreground focus:border-purple-bright"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths Grid */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-muted-foreground">Loading career paths...</div>
            </div>
          ) : filteredPaths.length === 0 ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-muted-foreground mb-4">
                {searchDomain ? `No career paths found for "${searchDomain}"` : 'No career paths available'}
              </div>
              {searchDomain && (
                <Button 
                  onClick={() => setSearchDomain('')}
                  variant="outline"
                  className="border-purple-bright text-purple-bright hover:bg-purple-bright hover:text-white"
                >
                  Show All Paths
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPaths.map((path) => (
                <Card 
                  key={path._id} 
                  className="p-6 bg-dark-surface border-purple-light/30 hover:border-purple-bright transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedPath(path)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-bright/10 rounded-lg flex items-center justify-center group-hover:bg-purple-bright/20 transition-colors">
                        <Target className="w-6 h-6 text-purple-bright" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-white">
                        {path.domainName}
                      </h3>
                    </div>
                    
                    {path.flowchart && (
                      <div className="bg-dark-surface-2/50 p-4 rounded-lg">
                        <Image 
                          src={path.flowchart}
                          alt={`${path.domainName} career flowchart`}
                          width={300}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {path.careerScope && (
                        <p className="font-paragraph text-sm text-muted-foreground line-clamp-3">
                          {path.careerScope}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-purple-bright text-white hover:bg-purple-bright/90 font-paragraph"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPath(path);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detailed View Modal */}
      {selectedPath && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg border-2 border-purple-light/30">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-3xl font-bold text-white">
                  {selectedPath.domainName}
                </h2>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedPath(null)}
                  className="border-purple-light/30 text-white hover:bg-purple-light hover:text-white"
                >
                  Close
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Flowchart */}
                {selectedPath.flowchart && (
                  <div className="space-y-4">
                    <h3 className="font-heading text-xl font-semibold text-white flex items-center">
                      <Workflow className="w-5 h-5 mr-2 text-purple-bright" />
                      Career Flowchart
                    </h3>
                    <div className="bg-dark-surface-2/50 p-4 rounded-lg">
                      <Image 
                        src={selectedPath.flowchart}
                        alt={`${selectedPath.domainName} detailed flowchart`}
                        width={500}
                        className="w-full h-auto rounded"
                      />
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-6">
                  {selectedPath.careerScope && (
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-white flex items-center mb-3">
                        <Target className="w-5 h-5 mr-2 text-purple-bright" />
                        Career Scope
                      </h3>
                      <p className="font-paragraph text-sm text-muted-foreground leading-relaxed">
                        {selectedPath.careerScope}
                      </p>
                    </div>
                  )}

                  {selectedPath.methodologies && (
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-white flex items-center mb-3">
                        <TrendingUp className="w-5 h-5 mr-2 text-purple-bright" />
                        Methodologies
                      </h3>
                      <p className="font-paragraph text-sm text-muted-foreground leading-relaxed">
                        {selectedPath.methodologies}
                      </p>
                    </div>
                  )}

                  {selectedPath.workflows && (
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-white flex items-center mb-3">
                        <Workflow className="w-5 h-5 mr-2 text-purple-bright" />
                        Workflows
                      </h3>
                      <p className="font-paragraph text-sm text-muted-foreground leading-relaxed">
                        {selectedPath.workflows}
                      </p>
                    </div>
                  )}

                  {selectedPath.timelines && (
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-white flex items-center mb-3">
                        <Clock className="w-5 h-5 mr-2 text-purple-bright" />
                        Timelines
                      </h3>
                      <p className="font-paragraph text-sm text-muted-foreground leading-relaxed">
                        {selectedPath.timelines}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-light/20">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/mentors" className="flex-1">
                    <Button className="w-full bg-purple-bright text-white hover:bg-purple-bright/90 font-paragraph">
                      Find Mentors for {selectedPath.domainName}
                    </Button>
                  </Link>
                  <Link to="/learning-resources" className="flex-1">
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-bright text-purple-bright hover:bg-purple-bright hover:text-white font-paragraph"
                    >
                      Explore Learning Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="w-full bg-gradient-primary text-white py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="font-paragraph text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Connect with industry mentors or analyze your resume to get personalized guidance for your career journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mentors">
              <Button 
                size="lg"
                className="bg-white text-purple-dark hover:bg-white/90 font-paragraph"
              >
                Find a Mentor
              </Button>
            </Link>
            <Link to="/resume-analysis">
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-dark font-paragraph"
              >
                Analyze Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}