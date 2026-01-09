import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const ChartContainer = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Price Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
          <div className="text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-3 text-lg font-medium text-muted-foreground">
              Chart will load here
            </p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              Candlestick chart coming in Phase 2
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
