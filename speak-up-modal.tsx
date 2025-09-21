import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, MessageSquare, AlertTriangle, Lightbulb, Bug, Heart } from 'lucide-react';

interface SpeakUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SpeakUpData) => void;
}

interface SpeakUpData {
  type: 'feedback' | 'suggestion' | 'bug' | 'complaint' | 'appreciation';
  title: string;
  message: string;
  email?: string;
  anonymous: boolean;
}

const feedbackTypes = [
  { id: 'feedback', label: 'General Feedback', icon: MessageSquare, color: 'bg-blue-500' },
  { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'bg-yellow-500' },
  { id: 'bug', label: 'Bug Report', icon: Bug, color: 'bg-red-500' },
  { id: 'complaint', label: 'Complaint', icon: AlertTriangle, color: 'bg-orange-500' },
  { id: 'appreciation', label: 'Appreciation', icon: Heart, color: 'bg-green-500' },
];

export function SpeakUpModal({ isOpen, onClose, onSubmit }: SpeakUpModalProps) {
  const [selectedType, setSelectedType] = useState<SpeakUpData['type']>('feedback');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        type: selectedType,
        title,
        message,
        email: anonymous ? undefined : email,
        anonymous,
      });
      
      // Reset form
      setTitle('');
      setMessage('');
      setEmail('');
      setAnonymous(false);
      setSelectedType('feedback');
      onClose();
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTypeData = feedbackTypes.find(type => type.id === selectedType);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-dark-surface border-dark-surface-3 text-white max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Speak Up</h2>
                <p className="font-paragraph text-sm text-muted-foreground">Share your thoughts with us</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-white hover:bg-dark-surface-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type Selection */}
            <div className="space-y-3">
              <Label className="text-white font-paragraph">What would you like to share?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id as SpeakUpData['type'])}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedType === type.id
                          ? 'border-accent bg-accent/10'
                          : 'border-dark-surface-3 bg-dark-surface-2 hover:border-accent/50'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-8 h-8 ${type.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-paragraph text-xs text-white text-center">
                          {type.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white font-paragraph">
                Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder={`Brief title for your ${selectedTypeData?.label.toLowerCase()}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-dark-surface-2 border-dark-surface-3 text-white placeholder:text-muted-foreground focus:border-accent"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white font-paragraph">
                Message <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Please provide details about your feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-dark-surface-2 border-dark-surface-3 text-white placeholder:text-muted-foreground focus:border-accent resize-none"
                required
              />
              <div className="text-xs text-muted-foreground">
                {message.length}/500 characters
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 text-accent bg-dark-surface-2 border-dark-surface-3 rounded focus:ring-accent focus:ring-2"
              />
              <Label htmlFor="anonymous" className="text-white font-paragraph">
                Submit anonymously
              </Label>
            </div>

            {/* Email (if not anonymous) */}
            {!anonymous && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-paragraph">
                  Email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dark-surface-2 border-dark-surface-3 text-white placeholder:text-muted-foreground focus:border-accent"
                />
                <p className="text-xs text-muted-foreground">
                  We'll use this to follow up if needed
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-dark-surface-3 text-white hover:bg-dark-surface-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent/90 text-white font-paragraph"
                disabled={isSubmitting || !title.trim() || !message.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </form>

          {/* Privacy Notice */}
          <div className="mt-6 p-4 bg-dark-surface-2 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Privacy Notice:</strong> Your feedback helps us improve our platform. 
              We treat all submissions confidentially and use them solely for product enhancement purposes.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}