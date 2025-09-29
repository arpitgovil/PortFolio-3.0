import { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL.',
      image: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?w=400',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      githubUrl: 'https://github.com/alexjohnson/ecommerce',
      demoUrl: 'https://ecommerce-demo.alexjohnson.dev',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?w=400',
      technologies: ['Next.js', 'TypeScript', 'MongoDB'],
      githubUrl: 'https://github.com/alexjohnson/task-manager',
      demoUrl: 'https://tasks.alexjohnson.dev',
      featured: true
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    technologies: [],
    githubUrl: '',
    demoUrl: '',
    featured: false
  });

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      githubUrl: '',
      demoUrl: '',
      featured: false
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      image: formData.image || 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?w=400',
      technologies: formData.technologies || [],
      githubUrl: formData.githubUrl || '',
      demoUrl: formData.demoUrl || '',
      featured: formData.featured || false
    };

    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? projectData : p));
      toast.success('Project updated successfully');
    } else {
      setProjects(prev => [...prev, projectData]);
      toast.success('Project added successfully');
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast.success('Project deleted successfully');
  };

  const handleTechnologiesChange = (value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, technologies }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects Management</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleDelete(project.id)}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                {project.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{project.technologies.length - 3}</Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3" />
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Project title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Project description"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                value={formData.technologies?.join(', ')}
                onChange={(e) => handleTechnologiesChange(e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured">Featured project</Label>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>
                {editingProject ? 'Update' : 'Add'} Project
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}