import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, Download, Target, Star, Zap, FileText, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: any[];
}

export function ResultsModal({ open, onOpenChange, results }: ResultsModalProps) {
  const [selectedRecommendations, setSelectedRecommendations] = useState<{[key: string]: boolean}>({});
  const [selectAllByPriority, setSelectAllByPriority] = useState<{[key: number]: boolean}>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const getRiskBadgeVariant = (riskScore: number) => {
    if (riskScore >= 7) return "destructive";
    if (riskScore >= 4) return "secondary";
    return "default";
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore >= 7) return "High Risk";
    if (riskScore >= 4) return "Medium Risk";
    return "Low Risk";
  };

  const getRiskIcon = (riskScore: number) => {
    if (riskScore >= 7) return <AlertTriangle className="w-4 h-4" />;
    if (riskScore >= 4) return <Info className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getPriorityIcon = (priority: number) => {
    if (priority === 1) return <Star className="w-4 h-4 text-red-500" />;
    if (priority === 2) return <Target className="w-4 h-4 text-orange-500" />;
    return <Zap className="w-4 h-4 text-blue-500" />;
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return "from-red-500 to-red-600";
    if (priority === 2) return "from-orange-500 to-orange-600";
    return "from-blue-500 to-blue-600";
  };

  const getSelectedCount = () => {
    return Object.values(selectedRecommendations).filter(Boolean).length;
  };

  const getPriorityGroups = () => {
    const groups: {[key: number]: number} = {};
    results.forEach(result => {
      result.analysis_result?.document_analysis?.improvement_recommendations?.forEach((rec: any) => {
        groups[rec.priority] = (groups[rec.priority] || 0) + 1;
      });
    });
    return groups;
  };

  const handleRecommendationToggle = (resultId: string, index: number) => {
    const key = `${resultId}-${index}`;
    setSelectedRecommendations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectAllByPriority = (priority: number, checked: boolean) => {
    setSelectAllByPriority(prev => ({ ...prev, [priority]: checked }));
    
    const updates: {[key: string]: boolean} = {};
    results.forEach(result => {
      result.analysis_result?.document_analysis?.improvement_recommendations?.forEach((rec: any, index: number) => {
        if (rec.priority === priority) {
          updates[`${result.id}-${index}`] = checked;
        }
      });
    });
    
    setSelectedRecommendations(prev => ({ ...prev, ...updates }));
  };

  const downloadResults = async (format: 'pdf' | 'doc') => {
    setIsDownloading(true);
    
    try {
      // Filter results to include only selected recommendations
      const filteredData = results.map(result => ({
        ...result,
        analysis_result: {
          ...result.analysis_result,
          document_analysis: {
            ...result.analysis_result.document_analysis,
            improvement_recommendations: result.analysis_result.document_analysis.improvement_recommendations
              .filter((_, index) => selectedRecommendations[`${result.id}-${index}`])
          }
        }
      }));

      if (format === 'pdf') {
        await downloadPDF(filteredData);
      } else {
        await downloadDOC(filteredData);
      }

      toast({
        title: "Download Complete",
        description: `Your analysis results have been downloaded as ${format.toUpperCase()}.`,
      });
      
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadPDF = async (data: any[]) => {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const maxWidth = pdf.internal.pageSize.width - (margin * 2);
    
    // Title
    pdf.setFontSize(20);
    pdf.setFont(undefined, 'bold');
    pdf.text('Contract Analysis Report', margin, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 20;

    data.forEach((result, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }

      // Contract Header
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text(`Contract ${index + 1}: ${result.original_filename}`, margin, yPosition);
      yPosition += 10;
      
      // Risk Score
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      const riskScore = result.analysis_result.document_analysis.overall_risk_score;
      pdf.text(`Risk Score: ${riskScore}/10 (${getRiskLevel(riskScore)})`, margin, yPosition);
      yPosition += 15;

      // Executive Summary
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Executive Summary', margin, yPosition);
      yPosition += 8;
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const summary = result.analysis_result.document_analysis.executive_summary;
      pdf.text(`Priority Level: ${summary.priority_level}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Critical Issues: ${summary.critical_issues_count}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Missing Clauses: ${summary.missing_clauses_count}`, margin, yPosition);
      yPosition += 15;

      // Risk Assessment
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Risk Assessment', margin, yPosition);
      yPosition += 10;

      ['High', 'Medium', 'Low'].forEach(severity => {
        const risks = result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === severity);
        if (risks.length > 0) {
          pdf.setFontSize(12);
          pdf.setFont(undefined, 'bold');
          pdf.text(`${severity} Risk Issues`, margin, yPosition);
          yPosition += 8;

          risks.forEach((risk, idx) => {
            if (yPosition > pageHeight - 30) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            pdf.text(`${idx + 1}. ${risk.category}`, margin + 5, yPosition);
            yPosition += 6;
            const descLines = pdf.splitTextToSize(`Description: ${risk.description}`, maxWidth - 10);
            pdf.text(descLines, margin + 5, yPosition);
            yPosition += descLines.length * 5;
            const impactLines = pdf.splitTextToSize(`Impact: ${risk.potential_impact}`, maxWidth - 10);
            pdf.text(impactLines, margin + 5, yPosition);
            yPosition += impactLines.length * 5 + 5;
          });
          yPosition += 5;
        }
      });

      // Missing Critical Clauses
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Missing Critical Clauses', margin, yPosition);
      yPosition += 10;

      const missingClauses = result.analysis_result.document_analysis.missing_critical_clauses;
      if (missingClauses.length > 0) {
        missingClauses.forEach((clause, idx) => {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.setFontSize(10);
          pdf.setFont(undefined, 'normal');
          pdf.text(`${idx + 1}. ${clause.clause_name}`, margin + 5, yPosition);
          yPosition += 6;
          const reasonLines = pdf.splitTextToSize(`Reason: ${clause.reason}`, maxWidth - 10);
          pdf.text(reasonLines, margin + 5, yPosition);
          yPosition += reasonLines.length * 5;
          const importanceLines = pdf.splitTextToSize(`Importance: ${clause.importance}`, maxWidth - 10);
          pdf.text(importanceLines, margin + 5, yPosition);
          yPosition += importanceLines.length * 5;
          const suggestedTextLines = pdf.splitTextToSize(`Suggested Text: ${clause.suggested_text}`, maxWidth - 10);
          pdf.text(suggestedTextLines, margin + 5, yPosition);
          yPosition += suggestedTextLines.length * 5 + 5;
        });
      } else {
        pdf.setFontSize(10);
        pdf.text('No missing critical clauses identified', margin + 5, yPosition);
        yPosition += 10;
      }

      // Selected Improvement Recommendations
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Selected Improvement Recommendations', margin, yPosition);
      yPosition += 10;

      const recommendations = result.analysis_result.document_analysis.improvement_recommendations;
      if (recommendations.length > 0) {
        recommendations.forEach((rec: any, recIndex: number) => {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.setFontSize(11);
          pdf.setFont(undefined, 'bold');
          pdf.text(`${recIndex + 1}. Priority ${rec.priority} - ${rec.category}`, margin + 5, yPosition);
          yPosition += 8;
          pdf.setFontSize(10);
          pdf.setFont(undefined, 'normal');
          const descLines = pdf.splitTextToSize(`Description: ${rec.description}`, maxWidth - 10);
          pdf.text(descLines, margin + 5, yPosition);
          yPosition += descLines.length * 5;
          const justLines = pdf.splitTextToSize(`Justification: ${rec.justification}`, maxWidth - 10);
          pdf.text(justLines, margin + 5, yPosition);
          yPosition += justLines.length * 5;
          if (rec.suggested_implementation) {
            const implLines = pdf.splitTextToSize(`Implementation: ${rec.suggested_implementation}`, maxWidth - 10);
            pdf.text(implLines, margin + 5, yPosition);
            yPosition += implLines.length * 5;
          }
          yPosition += 5;
        });
      } else {
        pdf.setFontSize(10);
        pdf.text('No selected improvement recommendations', margin + 5, yPosition);
        yPosition += 10;
      }

      // Compliance Check
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Compliance Assessment', margin, yPosition);
      yPosition += 10;

      const compliance = result.analysis_result.document_analysis.compliance_check;
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const industryLines = pdf.splitTextToSize(`Industry Standards: ${compliance.industry_standards}`, maxWidth - 10);
      pdf.text(industryLines, margin + 5, yPosition);
      yPosition += industryLines.length * 5;
      const regulatoryLines = pdf.splitTextToSize(
        `Regulatory Requirements: ${compliance.regulatory_requirements}`,
        maxWidth - 10
      );
      pdf.text(regulatoryLines, margin + 5, yPosition);
      yPosition += regulatoryLines.length * 5;
      const bestPracticesLines = pdf.splitTextToSize(`Best Practices: ${compliance.best_practices}`, maxWidth - 10);
      pdf.text(bestPracticesLines, margin + 5, yPosition);
      yPosition += bestPracticesLines.length * 5 + 10;
    });

    pdf.save(`contract-analysis-report-${Date.now()}.pdf`);
  };

  const downloadDOC = async (data: any[]) => {
    let htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Contract Analysis Report</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .contract { margin-bottom: 40px; border-bottom: 2px solid #ccc; padding-bottom: 20px; }
            .contract-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; }
            .risk-score { background: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 15px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 16px; font-weight: bold; color: #444; margin-bottom: 10px; border-bottom: 1px solid #ddd; }
            .recommendation { margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-left: 4px solid #007acc; }
            .priority-1 { border-left-color: #dc3545; }
            .priority-2 { border-left-color: #fd7e14; }
            .priority-3 { border-left-color: #007acc; }
            .rec-header { font-weight: bold; margin-bottom: 5px; }
            .rec-desc { margin-bottom: 5px; }
            .rec-just { font-style: italic; color: #666; }
            .risk-item { margin-bottom: 10px; padding: 10px; background: #f9f9f9; border-left: 4px solid #ccc; }
            .risk-high { border-left-color: #dc3545; }
            .risk-medium { border-left-color: #fd7e14; }
            .risk-low { border-left-color: #28a745; }
            .clause-item { margin-bottom: 10px; padding: 10px; background: #fef5e7; border-left: 4px solid #f39c12; }
            .compliance-item { margin-bottom: 10px; padding: 10px; background: #f0f0f0; border-left: 4px solid #6c757d; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Contract Analysis Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
    `;

    data.forEach((result, index) => {
      const riskScore = result.analysis_result.document_analysis.overall_risk_score;
      const summary = result.analysis_result.document_analysis.executive_summary;
      const compliance = result.analysis_result.document_analysis.compliance_check;

      htmlContent += `
        <div class="contract">
          <div class="contract-title">Contract ${index + 1}: ${result.original_filename}</div>
          
          <div class="risk-score">
            <strong>Risk Assessment:</strong> ${riskScore}/10 (${getRiskLevel(riskScore)})
          </div>

          <div class="section">
            <div class="section-title">Executive Summary</div>
            <p><strong>Priority Level:</strong> ${summary.priority_level}</p>
            <p><strong>Critical Issues:</strong> ${summary.critical_issues_count}</p>
            <p><strong>Missing Clauses:</strong> ${summary.missing_clauses_count}</p>
          </div>

          <div class="section">
            <div className="section-title">Risk Assessment</div>
      `;

      ['High', 'Medium', 'Low'].forEach(severity => {
        const risks = result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === severity);
        if (risks.length > 0) {
          htmlContent += `
            <div class="section-title">${severity} Risk Issues</div>
            ${risks.map((risk, idx) => `
              <div class="risk-item risk-${severity.toLowerCase()}">
                <div class="rec-header">${idx + 1}. ${risk.category}</div>
                <div class="rec-desc">Description: ${risk.description}</div>
                <div class="rec-just">Impact: ${risk.potential_impact}</div>
                <div>Likelihood: ${risk.likelihood}</div>
              </div>
            `).join('')}
          `;
        }
      });

      htmlContent += `
          </div>

          <div class="section">
            <div class="section-title">Missing Critical Clauses</div>
      `;

      const missingClauses = result.analysis_result.document_analysis.missing_critical_clauses;
      if (missingClauses.length > 0) {
        htmlContent += missingClauses.map((clause, idx) => `
          <div class="clause-item">
            <div class="rec-header">${idx + 1}. ${clause.clause_name}</div>
            <div class="rec-desc">Reason: ${clause.reason}</div>
            <div class="rec-just">Importance: ${clause.importance}</div>
            <div>Suggested Text: ${clause.suggested_text}</div>
          </div>
        `).join('');
      } else {
        htmlContent += '<p>No missing critical clauses identified</p>';
      }

      htmlContent += `
          </div>

          <div class="section">
            <div class="section-title">Selected Improvement Recommendations</div>
      `;

      const recommendations = result.analysis_result.document_analysis.improvement_recommendations;
      if (recommendations.length > 0) {
        htmlContent += recommendations.map((rec, recIndex) => `
          <div class="recommendation priority-${rec.priority}">
            <div class="rec-header">${recIndex + 1}. Priority ${rec.priority} - ${rec.category}</div>
            <div class="rec-desc">Description: ${rec.description}</div>
            <div class="rec-just">Justification: ${rec.justification}</div>
            ${rec.suggested_implementation ? `<div>Implementation: ${rec.suggested_implementation}</div>` : ''}
          </div>
        `).join('');
      } else {
        htmlContent += '<p>No selected improvement recommendations</p>';
      }

      htmlContent += `
          </div>

          <div class="section">
            <div class="section-title">Compliance Assessment</div>
            <div class="compliance-item">
              <div class="rec-header">Industry Standards</div>
              <div>${compliance.industry_standards}</div>
            </div>
            <div class="compliance-item">
              <div class="rec-header">Regulatory Requirements</div>
              <div>${compliance.regulatory_requirements}</div>
            </div>
            <div class="compliance-item">
              <div class="rec-header">Best Practices</div>
              <div>${compliance.best_practices}</div>
            </div>
          </div>
        </div>
      `;
    });

    htmlContent += `
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contract-analysis-report-${Date.now()}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!results.length) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Contract Analysis Results</DialogTitle>
          <DialogDescription>
            Detailed analysis and risk assessment for your uploaded contracts
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {result.original_filename}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={getRiskBadgeVariant(result.analysis_result.document_analysis.overall_risk_score)}
                      className="flex items-center gap-1"
                    >
                      {getRiskIcon(result.analysis_result.document_analysis.overall_risk_score)}
                      {getRiskLevel(result.analysis_result.document_analysis.overall_risk_score)}
                    </Badge>
                    <Badge variant="outline">
                      Score: {result.analysis_result.document_analysis.overall_risk_score}/10
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Executive Summary */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Executive Summary</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Priority Level:</span>
                        <p className="text-sm mt-1">{result.analysis_result.document_analysis.executive_summary.priority_level}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Critical Issues:</span>
                        <p className="text-sm mt-1">{result.analysis_result.document_analysis.executive_summary.critical_issues_count} issues identified</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Missing Clauses:</span>
                        <p className="text-sm mt-1">{result.analysis_result.document_analysis.executive_summary.missing_clauses_count} missing critical clauses</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Risk Assessment</h4>
                    {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'High').length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">High Risk Issues</h5>
                        <div className="space-y-2">
                          {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'High').map((risk, idx) => (
                            <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                              <p className="text-sm font-medium text-red-800 dark:text-red-300">{risk.category}</p>
                              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{risk.description}</p>
                              <p className="text-xs text-red-700 dark:text-red-300 mt-1 font-medium">Impact: {risk.potential_impact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Medium').length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2">Medium Risk Issues</h5>
                        <div className="space-y-2">
                          {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Medium').map((risk, idx) => (
                            <div key={idx} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">{risk.category}</p>
                              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">{risk.description}</p>
                              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1 font-medium">Impact: {risk.potential_impact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Low').length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Low Risk Issues</h5>
                        <div className="space-y-2">
                          {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Low').slice(0, 3).map((risk, idx) => (
                            <div key={idx} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                              <p className="text-sm font-medium text-green-800 dark:text-green-300">{risk.category}</p>
                              <p className="text-xs text-green-600 dark:text-green-400 mt-1">{risk.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Missing Critical Clauses & Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Missing Critical Clauses */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">Missing Critical Clauses</h4>
                    {result.analysis_result.document_analysis.missing_critical_clauses.length > 0 ? (
                      <div className="space-y-2">
                        {result.analysis_result.document_analysis.missing_critical_clauses.map((clause, idx) => (
                          <div key={idx} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                            <p className="text-sm font-medium text-orange-800 dark:text-orange-300">{clause.clause_name}</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">{clause.reason}</p>
                            <span className="text-xs px-2 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full mt-2 inline-block">
                              {clause.importance}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No missing critical clauses identified</p>
                    )}
                  </div>

                  {/* Improvement Recommendations with Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-base">Improvement Recommendations</h4>
                      <p className="text-xs text-slate-500">Select for report</p>
                    </div>
                    <div className="flex gap-2 mb-3">
                      {Object.entries(getPriorityGroups()).sort(([a], [b]) => Number(a) - Number(b)).map(([priority, count]) => (
                        <div key={priority} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                          <Switch
                            checked={selectAllByPriority[Number(priority)] || false}
                            onCheckedChange={(checked) => handleSelectAllByPriority(Number(priority), checked)}
                            className="scale-75"
                          />
                          <span>P{priority} ({count})</span>
                        </div>
                      ))}
                    </div>
                    {result.analysis_result.document_analysis.improvement_recommendations && result.analysis_result.document_analysis.improvement_recommendations.length > 0 ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {result.analysis_result.document_analysis.improvement_recommendations
                          .sort((a, b) => a.priority - b.priority)
                          .map((rec, idx) => {
                            const originalIndex = result.analysis_result.document_analysis.improvement_recommendations.indexOf(rec);
                            const isSelected = selectedRecommendations[`${result.id}-${originalIndex}`] || false;
                            
                            return (
                              <div 
                                key={originalIndex} 
                                className={`p-3 rounded-lg border transition-all duration-200 ${
                                  isSelected 
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700' 
                                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <Checkbox
                                    checked={isSelected}
                                    onCheckedChange={() => handleRecommendationToggle(result.id, originalIndex)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className={`w-4 h-4 rounded bg-gradient-to-r ${getPriorityColor(rec.priority)} flex items-center justify-center`}>
                                        <span className="text-xs text-white font-bold">{rec.priority}</span>
                                      </div>
                                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                        {rec.category}
                                      </span>
                                      {isSelected && (
                                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                                          ✓ Selected
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">{rec.description}</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{rec.justification}</p>
                                    {rec.suggested_implementation && (
                                      <div className="mt-2">
                                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Implementation:</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{rec.suggested_implementation}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No improvement recommendations available</p>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Compliance Check */}
                <div>
                  <h4 className="font-semibold text-base mb-3">Compliance Assessment</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <ScrollArea className="max-h-[200px] p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Industry Standards:</span>
                      <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{result.analysis_result.document_analysis.compliance_check.industry_standards}</p>
                    </ScrollArea>
                    <ScrollArea className="max-h-[200px] p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Regulatory Requirements:</span>
                      <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{result.analysis_result.document_analysis.compliance_check.regulatory_requirements}</p>
                    </ScrollArea>
                    <ScrollArea className="max-h-[200px] p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Best Practices:</span>
                      <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{result.analysis_result.document_analysis.compliance_check.best_practices}</p>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {getSelectedCount() === 0 ? (
                "Select recommendations to enable download"
              ) : (
                `${getSelectedCount()} recommendations selected`
              )}
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {getSelectedCount()} selected
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => downloadResults('pdf')}
              disabled={isDownloading || getSelectedCount() === 0}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download PDF
            </Button>
            <Button 
              onClick={() => downloadResults('doc')}
              disabled={isDownloading || getSelectedCount() === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download DOC
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
