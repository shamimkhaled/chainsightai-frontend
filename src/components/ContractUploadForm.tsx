import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadFormData {
  files: File[];
  industry: string;
}

interface ContractUploadFormProps {
  onUpload: (data: UploadFormData) => void;
  isLoading: boolean;
  isProcessing: boolean;
}

export function ContractUploadForm({ onUpload, isLoading, isProcessing }: ContractUploadFormProps) {
  const [formData, setFormData] = useState<UploadFormData>({
    files: [],
    industry: ''
  });
  const { toast } = useToast();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, DOC, or DOCX files only.",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Please upload files smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, files }));
  };

  const handleIndustryChange = (value: string) => {
    setFormData(prev => ({ ...prev, industry: value }));
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.files.length || !formData.industry) {
      toast({
        title: "Missing information",
        description: "Please select files and industry before uploading.",
        variant: "destructive"
      });
      return;
    }
    
    onUpload(formData);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* File Upload */}
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="contract-upload-hero"
          disabled={isProcessing}
          multiple
        />
        <label
          htmlFor="contract-upload-hero"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="w-8 h-8 text-slate-400" aria-hidden="true" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {formData.files.length > 0 
              ? `${formData.files.length} file(s) selected`
              : 'Click to upload contract(s)'
            }
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-500">
            PDF, DOC, DOCX (max 10MB each)
          </span>
        </label>
      </div>

      {/* Selected Files */}
      {formData.files.length > 0 && (
        <div className="space-y-2">
          {formData.files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
              <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                {file.name} ({formatFileSize(file.size)})
              </span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700 text-sm"
                aria-label={`Remove ${file.name}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Industry Selection */}
      <Select onValueChange={handleIndustryChange} value={formData.industry} disabled={isProcessing}>
        <SelectTrigger className="h-10" aria-label="Select industry">
          <SelectValue placeholder="Select industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="IT">IT</SelectItem>
          <SelectItem value="Construction">Construction</SelectItem>
          <SelectItem value="Garments">Garments</SelectItem>
          <SelectItem value="General">General</SelectItem>
        </SelectContent>
      </Select>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={
          isLoading || 
          isProcessing ||
          !formData.files.length || 
          !formData.industry
        }
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
            Analyzing...
          </>
        ) : isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" aria-hidden="true" />
            Analyze Contract
          </>
        )}
      </Button>
    </div>
  );
}
