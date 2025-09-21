import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Mentors } from '@/entities/mentors';
import { ArrowLeft, Search, Video, DollarSign, Clock, ExternalLink, Star } from 'lucide-react';

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentors[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentors[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    let filtered = mentors;

    if (searchTerm) {
      filtered = filtered.filter(mentor => 
        mentor.mentorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedExpertise) {
      filtered = filtered.filter(mentor => 
        mentor.expertise?.toLowerCase().includes(selectedExpertise.toLowerCase())
      );
    }

    setFilteredMentors(filtered);
  }, [searchTerm, selectedExpertise, mentors]);

  const fetchMentors = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Mentors>('mentors');
      setMentors(items);
      setFilteredMentors(items);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueExpertiseAreas = () => {
    const expertiseSet = new Set<string>();
    mentors.forEach(mentor => {
      if (mentor.expertise) {
        mentor.expertise.split(',').forEach(area => {
          expertiseSet.add(area.trim());
        });
      }
    });
    return Array.from(expertiseSet);
  };

  const handleBookSession = (mentor: Mentors) => {
    if (mentor.bookingLink) {
      window.open(mentor.bookingLink, '_blank');
    }
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
              FIND MENTORS
            </div>
            <div className="w-20"></div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-black text-primary mb-6">
            Connect with Industry Experts
          </h1>
          <p className="font-paragraph text-lg text-primary/70 max-w-3xl mx-auto mb-8">
            Get personalized guidance from experienced professionals. Book one-on-one sessions
            or start with a trial to accelerate your career growth.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
              <Input
                type="text"
                placeholder="Search mentors by name, expertise, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg font-paragraph border-2 border-primary/20 focus:border-neonaccent"
              />
            </div>

            {/* Expertise Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedExpertise === '' ? 'default' : 'outline'}
                onClick={() => setSelectedExpertise('')}
                className={selectedExpertise === '' ? 'bg-neonaccent text-primary' : 'border-primary/20 text-primary hover:border-neonaccent'}
                size="sm"
              >
                All Expertise
              </Button>
              {getUniqueExpertiseAreas().slice(0, 6).map((expertise) => (
                <Button
                  key={expertise}
                  variant={selectedExpertise === expertise ? 'default' : 'outline'}
                  onClick={() => setSelectedExpertise(expertise)}
                  className={selectedExpertise === expertise ? 'bg-neonaccent text-primary' : 'border-primary/20 text-primary hover:border-neonaccent'}
                  size="sm"
                >
                  {expertise}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-primary/70">Loading mentors...</div>
            </div>
          ) : filteredMentors.length === 0 ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-primary/70 mb-4">
                {searchTerm || selectedExpertise ? 'No mentors found matching your criteria' : 'No mentors available'}
              </div>
              {(searchTerm || selectedExpertise) && (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedExpertise('');
                  }}
                  variant="outline"
                  className="border-neonaccent text-neonaccent hover:bg-neonaccent hover:text-primary"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMentors.map((mentor) => (
                <Card 
                  key={mentor._id} 
                  className="p-6 border-2 border-primary/10 hover:border-neonaccent transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Profile Section */}
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        {mentor.profilePicture ? (
                          <Image 
                            src={mentor.profilePicture}
                            alt={`${mentor.mentorName} profile`}
                            width={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neonaccent/10 flex items-center justify-center">
                            <span className="font-heading text-xl font-bold text-neonaccent">
                              {mentor.mentorName?.charAt(0) || 'M'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-xl font-bold text-primary mb-1">
                          {mentor.mentorName}
                        </h3>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-neonaccent text-neonaccent" />
                          ))}
                          <span className="font-paragraph text-xs text-primary/60 ml-2">4.9 (127 reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    {mentor.expertise && (
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.split(',').slice(0, 3).map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs border-neonaccent/50 text-neonaccent"
                          >
                            {skill.trim()}
                          </Badge>
                        ))}
                        {mentor.expertise.split(',').length > 3 && (
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary/60">
                            +{mentor.expertise.split(',').length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Bio */}
                    {mentor.bio && (
                      <p className="font-paragraph text-sm text-primary/70 line-clamp-3">
                        {mentor.bio}
                      </p>
                    )}

                    {/* Pricing and Trial */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-neonaccent" />
                          <span className="font-paragraph text-sm text-primary">
                            ${mentor.hourlyRate || 50}/hour
                          </span>
                        </div>
                        {mentor.hasTrialSession && (
                          <Badge className="bg-neonaccent/10 text-neonaccent border-neonaccent/30">
                            <Clock className="w-3 h-3 mr-1" />
                            Trial Available
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        {mentor.hasTrialSession && (
                          <Button 
                            variant="outline"
                            className="w-full border-neonaccent text-neonaccent hover:bg-neonaccent hover:text-primary font-paragraph"
                            onClick={() => handleBookSession(mentor)}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Book Free Trial
                          </Button>
                        )}
                        
                        <Button 
                          className="w-full bg-neonaccent text-primary hover:bg-neonaccent/90 font-paragraph"
                          onClick={() => handleBookSession(mentor)}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-primary text-primary-foreground py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Connect with the right mentor today and get personalized guidance to achieve your professional goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/career-guidance">
              <Button 
                size="lg"
                className="bg-neonaccent text-primary hover:bg-neonaccent/90 font-paragraph"
              >
                Explore Career Paths
              </Button>
            </Link>
            <Link to="/resume-analysis">
              <Button 
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-paragraph"
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