
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeMessageProps {
  onDismiss: () => void;
}

const WelcomeMessage = ({ onDismiss }: WelcomeMessageProps) => {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-blue-100">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-blue-700">Welcome to ChattyResume</CardTitle>
        <CardDescription>Your AI-powered resume builder</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4">
          ChattyResume helps you create professional resumes through a simple conversation. Here's how it works:
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          <li>Answer questions about your experience and skills</li>
          <li>Our AI will help format your information professionally</li>
          <li>Preview your resume and make any adjustments</li>
          <li>Download your resume as a PDF or print it directly</li>
        </ol>
        <p className="text-sm text-gray-600 mb-6">
          Your information never leaves your device - all processing happens in your browser for complete privacy.
        </p>
        <div className="flex justify-end">
          <Button onClick={onDismiss}>
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeMessage;
