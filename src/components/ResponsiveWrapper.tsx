
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

const ResponsiveWrapper = ({ children, className = "" }: ResponsiveWrapperProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? "px-2" : "px-4"} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
