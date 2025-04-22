
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  jobDescription: string;
}

interface Education {
  degree: string;
  institution: string;
  gradYear: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string;
}

interface PDFGeneratorProps {
  resumeData: ResumeData;
  resumeRef: React.RefObject<HTMLDivElement>;
}

const PDFGenerator = ({ resumeData, resumeRef }: PDFGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generatePDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_resume.pdf`);
      
      toast.success("PDF generated successfully!");
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
          <Check className="h-4 w-4 mr-2" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </>
      )}
    </Button>
  );
};

export default PDFGenerator;
