import { Component, ErrorInfo, ReactNode } from "react";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
  title?: string;
}

interface State {
  hasError: boolean;
}

export class ChartErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Chart error:", error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-[300px] flex flex-col items-center justify-center text-center p-6 bg-destructive/5 rounded-lg border border-destructive/20">
          <div className="bg-destructive/10 p-3 rounded-full mb-2 w-fit">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="text-lg font-medium text-destructive mb-2">
            Erro ao carregar gráfico
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mb-4">
            Ocorreu um erro inesperado ao renderizar esta visualização.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={this.handleReset}
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
