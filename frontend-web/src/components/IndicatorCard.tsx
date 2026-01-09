import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IndicatorCardProps {
  title: string;
  description: string;
}

const IndicatorCard = ({ title, description }: IndicatorCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Coming Soon
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 flex h-8 items-center justify-center rounded bg-muted/50">
          <span className="text-xl font-bold text-muted-foreground/50">--</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndicatorCard;
