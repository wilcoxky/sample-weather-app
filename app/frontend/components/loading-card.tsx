import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const LoadingCard = () => {
  return (
    <Card className="w-full max-w-md text-center p-8">
      <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      <p className="mt-4">Fetching weather data...</p>
    </Card>
  );
};
