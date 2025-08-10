import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Eye } from 'lucide-react';

interface PageData {
  title: string;
  content: string;
  meta_description: string;
  slug: string;
  last_modified: string;
}

const DEFAULT_PAGES = [
  { slug: 'home', title: 'Home Page', description: 'Main landing page content' },
  { slug: 'about', title: 'About Us', description: 'Hospital information and team' },
  { slug: 'services', title: 'Services', description: 'Medical services overview' },
  { slug: 'contact', title: 'Contact', description: 'Contact information and form' },
  { slug: 'blog', title: 'Blog', description: 'Blog listing page' }
];

export const PageEditor = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [pageData, setPageData] = useState<PageData>({
    title: '',
    content: '',
    meta_description: '',
    slug: '',
    last_modified: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedPage) {
      loadPageData(selectedPage);
    }
  }, [selectedPage]);

  const loadPageData = async (slug: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading page data:', error);
        toast({
          title: "Error",
          description: "Failed to load page data",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setPageData(data);
      } else {
        // Initialize with default data for new page
        const defaultPage = DEFAULT_PAGES.find(p => p.slug === slug);
        setPageData({
          title: defaultPage?.title || '',
          content: `<h1>${defaultPage?.title || 'Page Title'}</h1>\n<p>Add your content here...</p>`,
          meta_description: defaultPage?.description || '',
          slug: slug,
          last_modified: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading page data:', error);
      toast({
        title: "Error",
        description: "Failed to load page data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('pages')
        .upsert({
          ...pageData,
          last_modified: new Date().toISOString()
        });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Page saved successfully!",
      });
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${pageData.title}</title>
          <meta name="description" content="${pageData.meta_description}">
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1, h2, h3 { color: #333; }
            p { line-height: 1.6; }
          </style>
        </head>
        <body>
          ${pageData.content}
        </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Page Editor</h2>
        <p className="text-muted-foreground">
          Edit website pages with real-time updates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Page to Edit</CardTitle>
          <CardDescription>
            Choose a page to edit its content, title, and meta description.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="page-select">Page</Label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a page to edit" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_PAGES.map(page => (
                  <SelectItem key={page.slug} value={page.slug}>
                    {page.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPage && (
            <>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="ml-2">Loading page data...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={pageData.title}
                      onChange={(e) => setPageData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter page title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Input
                      id="meta-description"
                      value={pageData.meta_description}
                      onChange={(e) => setPageData(prev => ({ ...prev, meta_description: e.target.value }))}
                      placeholder="Enter meta description for SEO"
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground">
                      {pageData.meta_description.length}/160 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Page Content</Label>
                    <Textarea
                      id="content"
                      value={pageData.content}
                      onChange={(e) => setPageData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter HTML content"
                      className="min-h-[400px] font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can use HTML tags to format your content.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSave} 
                      disabled={saving}
                      className="btn-hero"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Page
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={handlePreview}
                      className="hover-lift"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>

                  {pageData.last_modified && (
                    <p className="text-xs text-muted-foreground">
                      Last modified: {new Date(pageData.last_modified).toLocaleDateString()} at {new Date(pageData.last_modified).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};