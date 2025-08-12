import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, FileText, Building2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContractUploadModalProps {
  trigger?: React.ReactNode;
}

interface UploadFormData {
  files: File[];
  industry: string;
}

export function ContractUploadModal({ trigger }: ContractUploadModalProps) {
  const [formData, setFormData] = useState<UploadFormData>({
    files: [],
    industry: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, files }));
  };

  const handleIndustryChange = (value: string) => {
    setFormData(prev => ({ ...prev, industry: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.files.length) {
      toast({
        title: "No files selected",
        description: "Please select at least one contract document to upload.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.industry) {
      toast({
        title: "Industry required",
        description: "Please select an industry for your contract.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with actual API integration
    try {
      const formDataToSend = new FormData();
      formData.files.forEach((file, index) => {
        formDataToSend.append(`contract_${index}`, file);
      });
      formDataToSend.append('industry', formData.industry);

      // TODO: Replace with actual API endpoint
      console.log('Uploading contracts:', {
        files: formData.files.map(f => f.name),
        industry: formData.industry
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Contracts uploaded successfully!",
        description: `Uploaded ${formData.files.length} contract(s) for ${formData.industry} industry.`,
      });

      // Reset form and close modal
      setFormData({ files: [], industry: '' });
      setIsOpen(false);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your contracts. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload Contracts
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Upload Contract Documents
          </DialogTitle>
          <DialogDescription>
            Upload your contract documents or images and select the relevant industry for processing.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Contract Documents
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
                onChange={handleFileChange}
                className="hidden"
                id="contract-upload"
              />
              <label
                htmlFor="contract-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {formData.files.length > 0 
                    ? `${formData.files.length} file(s) selected`
                    : 'Click to upload or drag and drop'
                  }
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  PDF, DOC, DOCX, JPG, PNG, TIFF (max 10MB each)
                </span>
              </label>
            </div>
            
            {formData.files.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Selected files:</p>
                <div className="space-y-1">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                      <span className="truncate text-slate-700 dark:text-slate-300">{file.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{formatFileSize(file.size)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Industry
            </label>
            <Select onValueChange={handleIndustryChange} value={formData.industry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Garments">Garments</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.files.length || !formData.industry}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Contracts
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
