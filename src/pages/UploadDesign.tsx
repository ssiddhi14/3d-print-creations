import { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CustomRequest } from '@/lib/types';
import { toast } from 'sonner';

export default function UploadDesign() {
  const { addCustomRequest } = useStore();
  const [form, setForm] = useState({ name: '', email: '', description: '', fileName: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const req: CustomRequest = {
      id: 'CR-' + Date.now().toString(36).toUpperCase(),
      name: form.name,
      email: form.email,
      description: form.description,
      fileName: form.fileName || undefined,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    addCustomRequest(req);
    setForm({ name: '', email: '', description: '', fileName: '' });
    toast.success('Custom print request submitted! We\'ll get back to you soon.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-display text-3xl font-bold">Upload Your Design</h1>
          <p className="mt-2 text-muted-foreground">Have a 3D model or an idea? Share it with us and we'll bring it to life.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">Name *</label>
            <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your name" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email *</label>
            <input type="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Describe your design *</label>
            <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Tell us about your idea, dimensions, colors, materials..." rows={5}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">3D File (optional)</label>
            <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Supports STL, OBJ, 3MF files</p>
              <input type="text" value={form.fileName} onChange={e => setForm(prev => ({ ...prev, fileName: e.target.value }))}
                placeholder="Enter file name or URL" className="mx-auto mt-3 w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-center text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <button type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            <Send className="h-4 w-4" /> Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
