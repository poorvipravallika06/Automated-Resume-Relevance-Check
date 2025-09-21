import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Accreditations } from '@/entities/accreditations';
import { ArrowLeft, Search, Award, Target, BookOpen, ExternalLink } from 'lucide-react';

export default function AccreditationsPage() {
  const [accreditations, setAccreditations] = useState<Accreditations[]>([]);
  const [filteredAccreditations, setFilteredAccreditations] = useState<Accreditations[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccreditations();
  }, []);

  useEffect(() => {
    let filtered = accreditations;

    if (searchTerm) {
      filtered = filtered.filter(accreditation => 
        accreditation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accreditation.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accreditation.accreditationType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(accreditation => 
        accreditation.accreditationType?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    setFilteredAccreditations(filtered);
  }, [searchTerm, selectedType, accreditations]);

  const fetchAccreditations = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Accreditations>('accreditations');
      setAccreditations(items);
      setFilteredAccreditations(items);
    } catch (error) {
      console.error('Error fetching accreditations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueTypes = () => {
    const typeSet = new Set<string>();
    accreditations.forEach(accreditation => {
      if (accreditation.accreditationType) {
        typeSet.add(accreditation.accreditationType);
      }
    });
    return Array.from(typeSet);
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Certification': 'bg-blue-100 text-blue-800 border-blue-200',
      'Badge': 'bg-green-100 text-green-800 border-green-200',
      'Diploma': 'bg-purple-100 text-purple-800 border-purple-200',
      'Certificate': 'bg-orange-100 text-orange-800 border-orange-200',
      'Award': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
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
              ACCREDITATIONS
            </div>
            <div className="w-20"></div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-dark-surface py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-black text-white mb-6">
            Professional Accreditations
          </h1>
          <p className="font-paragraph text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore industry-recognized certifications, badges, and credentials to validate your skills
            and advance your career with trusted accreditation programs.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search accreditations by name, type, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg font-paragraph bg-dark-surface-2 border-purple-light/30 text-white placeholder:text-muted-foreground focus:border-purple-bright"
              />
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedType === '' ? 'default' : 'outline'}
                onClick={() => setSelectedType('')}
                className={selectedType === '' ? 'bg-purple-bright text-white' : 'border-purple-light/30 text-white hover:border-purple-bright bg-dark-surface-2'}
                size="sm"
              >
                All Types
              </Button>
              {getUniqueTypes().map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ? 'bg-purple-bright text-white' : 'border-purple-light/30 text-white hover:border-purple-bright bg-dark-surface-2'}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations Grid */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-primary/70">Loading accreditations...</div>
            </div>
          ) : filteredAccreditations.length === 0 ? (
            <div className="text-center py-12">
              <div className="font-paragraph text-lg text-primary/70 mb-4">
                {searchTerm || selectedType ? 'No accreditations found matching your criteria' : 'No accreditations available'}
              </div>
              {(searchTerm || selectedType) && (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('');
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
              {filteredAccreditations.map((accreditation) => (
                <Card 
                  key={accreditation._id} 
                  className="p-6 border-2 border-primary/10 hover:border-neonaccent transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Badge Image */}
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        {accreditation.badgeImage ? (
                          <Image 
                            src={accreditation.badgeImage}
                            alt={`${accreditation.name} badge`}
                            width={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neonaccent/10 flex items-center justify-center">
                            <Award className="w-12 h-12 text-neonaccent" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-2">
                      <h3 className="font-heading text-xl font-bold text-primary">
                        {accreditation.name}
                      </h3>
                      {accreditation.accreditationType && (
                        <Badge className={getTypeColor(accreditation.accreditationType)}>
                          {accreditation.accreditationType}
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    {accreditation.description && (
                      <p className="font-paragraph text-sm text-primary/70 text-center line-clamp-3">
                        {accreditation.description}
                      </p>
                    )}

                    {/* Earning Criteria */}
                    {accreditation.earningCriteria && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-neonaccent" />
                          <span className="font-paragraph text-sm font-semibold text-primary">Earning Criteria</span>
                        </div>
                        <p className="font-paragraph text-xs text-primary/70 pl-6">
                          {accreditation.earningCriteria}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-4">
                      <Button 
                        className="w-full bg-neonaccent text-primary hover:bg-neonaccent/90 font-paragraph"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        Start Earning
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full border-primary/20 text-primary hover:border-neonaccent hover:text-neonaccent font-paragraph"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Accreditations */}
      <section className="w-full bg-primary text-primary-foreground py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-6">
              Most Popular Accreditations
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of professionals who have advanced their careers with these industry-leading certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured items */}
            {[
              {
                title: 'AWS Certified Solutions Architect',
                type: 'Cloud Certification',
                participants: '50,000+',
                icon: '☁️'
              },
              {
                title: 'Google Data Analytics Certificate',
                type: 'Data Science',
                participants: '75,000+',
                icon: '📊'
              },
              {
                title: 'Scrum Master Certification',
                type: 'Project Management',
                participants: '30,000+',
                icon: '🎯'
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 bg-primary-foreground text-primary">
                <div className="text-center space-y-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="font-heading text-lg font-bold mb-1">{item.title}</h3>
                    <p className="font-paragraph text-sm text-primary/70">{item.type}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-paragraph text-sm text-primary/70">{item.participants} enrolled</span>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-neonaccent text-primary hover:bg-neonaccent/90 font-paragraph"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary mb-6">
            Ready to Validate Your Skills?
          </h2>
          <p className="font-paragraph text-lg text-primary/70 mb-8 max-w-2xl mx-auto">
            Start your accreditation journey today and showcase your expertise to employers worldwide
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
            <Link to="/learning-resources">
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph"
              >
                Find Learning Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}