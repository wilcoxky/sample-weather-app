import { Card } from "@/components/ui/card";

interface ErrorCardProps {
  error: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ error }) => {
  return (
    <Card className="w-full max-w-md text-center p-8">
      <p className="text-red-500">{error}</p>
    </Card>
  );
};
