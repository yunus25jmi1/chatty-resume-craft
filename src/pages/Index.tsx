
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/ChatInterface";
import ResumePreview from "@/components/ResumePreview";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
import { useIsMobile } from "@/hooks/use-mobile";
import { enhanceResumeWithAI } from "@/utils/geminiApi";
import { toast } from "sonner";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useKeyShortcuts } from "@/hooks/use-key-shortcuts";
import WelcomeMessage from "@/components/WelcomeMessage";

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

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experiences: [],
    education: [],
    skills: ''
  });
  const [activeTab, setActiveTab] = useState("chat");
  const [dataCollected, setDataCollected] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useIsMobile();
  
  useKeyShortcuts([
    {
      key: "p",
      ctrl: true,
      action: () => {
        if (dataCollected) {
          window.print();
        }
      },
    },
    {
      key: "Tab",
      ctrl: true,
      action: () => {
        if (dataCollected) {
          setActiveTab(activeTab === "chat" ? "preview" : "chat");
        }
      },
    },
  ]);

  const handleDataCollected = async (data: ResumeData) => {
    setIsEnhancing(true);
    try {
      const enhancedData = await enhanceResumeWithAI(data);
      setResumeData(enhancedData as ResumeData);
      setDataCollected(true);
      setActiveTab("preview");
      toast.success("Resume created successfully!");
    } catch (error) {
      console.error("Error enhancing resume:", error);
      toast.error("There was an error processing your resume. Please try again.");
      setResumeData(data);
      setDataCollected(true);
      setActiveTab("preview");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-slate-900 text-gray-100">
      <header className="border-b border-white/10 bg-slate-900/50 shadow-md py-4">
        <ResponsiveWrapper>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <AnimatedLogo className="mb-1 md:mb-0" />
            <p className="text-gray-400 text-xs md:text-sm">Build your professional resume with AI assistance - no signup required</p>
          </div>
        </ResponsiveWrapper>
      </header>

      <main className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'} py-4 md:py-8 flex flex-col h-[calc(100vh-120px)]`}>
        {showWelcome ? (
          <div className="flex items-center justify-center flex-1">
            <WelcomeMessage onDismiss={() => setShowWelcome(false)} />
          </div>
        ) : (
          <>
            <Card className="flex-1 flex flex-col overflow-hidden bg-slate-800/50 border-white/10">
              <Tabs 
                defaultValue="chat" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col"
              >
                <div className="px-2 md:px-4 pt-2 md:pt-4">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-blue-600">Chat Interface</TabsTrigger>
                    <TabsTrigger value="preview" disabled={!dataCollected} className="data-[state=active]:bg-blue-600">Resume Preview</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="chat" className="flex-1 overflow-hidden">
                  <CardContent className="p-0 h-full">
                    <ChatInterface onDataCollected={handleDataCollected} />
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="preview" className="flex-1 overflow-hidden">
                  <CardContent className="p-0 h-full">
                    <ResumePreview resumeData={resumeData} />
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
            
            <footer className="mt-4 md:mt-8 text-center text-gray-400 text-xs md:text-sm px-2">
              <p className="mb-1">
                ChattyResume uses AI to help create professional resumes. Your data is never stored on our servers.
              </p>
              <div className="flex justify-center space-x-4 text-xs">
                <span>Keyboard shortcuts: </span>
                <span><kbd className="px-1 py-0.5 bg-gray-700 rounded border border-gray-600">Ctrl+Tab</kbd> Switch tabs</span>
                <span><kbd className="px-1 py-0.5 bg-gray-700 rounded border border-gray-600">Ctrl+P</kbd> Print</span>
              </div>
            </footer>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
