import { useState } from 'react';
import { Mail, MailOpen, Trash2, Reply, Clock, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function MessagesView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hi Alex, I\'m interested in collaborating on a React project. Could we schedule a call to discuss the details?',
      timestamp: new Date('2024-01-15T10:30:00'),
      read: false
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      message: 'Hello! I saw your portfolio and I\'m impressed with your work. We have an opening for a senior frontend developer. Would you be interested?',
      timestamp: new Date('2024-01-14T15:45:00'),
      read: false
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@startup.io',
      message: 'Great work on the e-commerce platform! I\'d love to learn more about the tech stack you used. Could you share some insights?',
      timestamp: new Date('2024-01-13T09:15:00'),
      read: true
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@agency.com',
      message: 'Hi Alex, we\'re looking for a freelance developer for a 3-month project. The tech stack includes React, Node.js, and PostgreSQL. Interested?',
      timestamp: new Date('2024-01-12T14:20:00'),
      read: true
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@email.com',
      message: 'Loved your task management app! The UI is so clean and intuitive. Do you offer consultation services for UI/UX improvements?',
      timestamp: new Date('2024-01-11T11:00:00'),
      read: true
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const handleMarkAsRead = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const handleDelete = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    toast.success('Message deleted successfully');
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    toast.success('Reply sent successfully!');
    setReplyText('');
    setSelectedMessage(null);
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !message.read) ||
                         (filter === 'read' && message.read);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(msg => !msg.read).length;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Manage contact form submissions ({unreadCount} unread)
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    All ({messages.length})
                  </Button>
                  <Button
                    variant={filter === 'unread' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('unread')}
                  >
                    Unread ({unreadCount})
                  </Button>
                  <Button
                    variant={filter === 'read' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('read')}
                  >
                    Read ({messages.length - unreadCount})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  !message.read ? 'border-primary/50 bg-primary/5' : ''
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {message.read ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Mail className="h-4 w-4 text-primary" />
                      )}
                      <h3 className="font-semibold">{message.name}</h3>
                      {!message.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(message.timestamp)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(message.id);
                        }}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                  <p className="text-sm line-clamp-2">{message.message}</p>
                </CardContent>
              </Card>
            ))}
            
            {filteredMessages.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No messages found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search criteria' : 'No messages match the selected filter'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Messages</span>
                <Badge variant="outline">{messages.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Unread</span>
                <Badge variant="secondary">{unreadCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">This Week</span>
                <Badge variant="outline">
                  {messages.filter(msg => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return msg.timestamp > weekAgo;
                  }).length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  messages.forEach(msg => {
                    if (!msg.read) handleMarkAsRead(msg.id);
                  });
                  toast.success('All messages marked as read');
                }}
              >
                <MailOpen className="mr-2 h-4 w-4" />
                Mark All as Read
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedMessage.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(selectedMessage.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Reply</label>
                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button onClick={handleReply}>
                  <Reply className="mr-2 h-4 w-4" />
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}