
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface PDFGeneratorProps {
  resumeData: Record<string, string>;
  resumeRef: React.RefObject<HTMLDivElement>;
}

const PDFGenerator = ({ resumeData, resumeRef }: PDFGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generatePDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // This is a mock implementation
      // In a real app, we would use jsPDF and html2canvas:
      // const canvas = await html2canvas(resumeRef.current);
      // const imgData = canvas.toDataURL('image/png');
      // const pdf = new jsPDF('p', 'mm', 'a4');
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();
      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.save('resume.pdf');
      
      // Simulating PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className="w-full md:w-auto"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
};

export default PDFGenerator;
