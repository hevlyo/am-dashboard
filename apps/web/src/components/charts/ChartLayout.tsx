import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartErrorBoundary } from "./ChartErrorBoundary";
import { BarChart3 } from "lucide-react";

interface ChartLayoutProps {
  readonly title: string;
  readonly description: string;
  readonly isLoading: boolean;
  readonly isEmpty: boolean;
  readonly emptyMessage: string;
  readonly children: ReactNode;
  readonly contentClassName?: string;
}

export function ChartLayout({
  title,
  description,
  isLoading,
  isEmpty,
  emptyMessage,
  children,
  contentClassName = "pl-0 pb-0",
}: Readonly<ChartLayoutProps>) {
  if (isLoading) {
    return (
      <Card className="col-span-1 h-[400px] animate-pulse border shadow-sm">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-32 bg-muted rounded" />
        </CardHeader>
        <CardContent className="h-[300px] bg-muted/20 m-6 rounded" />
      </Card>
    );
  }

  const renderContent = () => {
    if (isEmpty) {
      return (
        <div className="h-[300px] flex flex-col items-center justify-center text-center p-6">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <BarChart3 className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            Sem dados disponíveis
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {emptyMessage}
          </p>
        </div>
      );
    }

    return children;
  };

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={contentClassName}>
        <ChartErrorBoundary title={title}>
          {renderContent()}
        </ChartErrorBoundary>
      </CardContent>
    </Card>
  );
}
