import { FC } from "react";
import { Slider } from "@/components/ui/slider";
import { Thermometer, PencilRuler, Scale } from "lucide-react";

interface TemperatureControlProps {
  temperature: number;
  onTemperatureChange: (value: number) => void;
}

const TemperatureControl: FC<TemperatureControlProps> = ({
  temperature,
  onTemperatureChange,
}) => {
  // Convert temperature (0-1) to percentage for display
  const temperaturePercent = Math.round(temperature * 100);

  // Calculate appropriate label based on temperature
  const getTemperatureLabel = () => {
    if (temperature < 0.3) return "Formal";
    if (temperature < 0.7) return "Balanced";
    return "Creative";
  };

  return (
    <div className="bg-background rounded-lg shadow-sm border p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Thermometer className="h-4 w-4 mr-2 text-primary" />
          <span className="font-medium text-sm">AI Temperature</span>
        </div>
        <span className="text-xs font-medium bg-primary/10 px-2 py-1 rounded-full text-primary">
          {getTemperatureLabel()} ({temperaturePercent}%)
        </span>
      </div>
      
      <div className="px-2 pb-1">
        <Slider
          value={[temperature]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={(values) => onTemperatureChange(values[0])}
          className="my-1"
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
        <div className="flex items-center">
          <Scale className="h-3 w-3 mr-1" />
          <span>Formal</span>
        </div>
        <div className="flex items-center">
          <PencilRuler className="h-3 w-3 mr-1" />
          <span>Creative</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureControl;