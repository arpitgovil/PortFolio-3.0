import { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

export function AboutManager() {
  const [aboutData, setAboutData] = useState({
    name: 'ARPIT GOVIL',
    profession: 'Full-Stack Developer',
    tagline: 'I create modern, responsive web applications with clean code and beautiful user experiences.',
    bio: `With over 5 years of experience in web development, I specialize in creating modern, scalable applications using the latest technologies. I'm passionate about clean code, user experience, and solving complex problems with elegant solutions.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community through blog posts and talks.`,
    profileImage: 'https://images.unsplash.com/photo-1731951039706-0e793240bb32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg5MDQ2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS', 'Git'],
    email: 'alex@alexjohnson.dev',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    toast.success('About information updated successfully!');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !aboutData.skills.includes(newSkill.trim())) {
      setAboutData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setAboutData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(Boolean);
    setAboutData(prev => ({ ...prev, skills }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">About Me Management</h1>
          <p className="text-muted-foreground">Update your personal information and skills</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={aboutData.name}
                  onChange={(e) => setAboutData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={aboutData.profession}
                  onChange={(e) => setAboutData(prev => ({ ...prev, profession: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Textarea
                  id="tagline"
                  value={aboutData.tagline}
                  onChange={(e) => setAboutData(prev => ({ ...prev, tagline: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={aboutData.bio}
                  onChange={(e) => setAboutData(prev => ({ ...prev, bio: e.target.value }))}
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={aboutData.email}
                  onChange={(e) => setAboutData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={aboutData.phone}
                  onChange={(e) => setAboutData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={aboutData.location}
                  onChange={(e) => setAboutData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Image and Skills */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
                  <img
                    src={aboutData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Image URL</Label>
                <Input
                  id="profileImage"
                  value={aboutData.profileImage}
                  onChange={(e) => setAboutData(prev => ({ ...prev, profileImage: e.target.value }))}
                  placeholder="https://example.com/profile.jpg"
                />
              </div>

              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Image
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  value={aboutData.skills.join(', ')}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Current Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {aboutData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Click on a skill to remove it
                </p>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} variant="outline">
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}