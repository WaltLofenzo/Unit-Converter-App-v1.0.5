import GenericConverterCard from "@/components/GenericConverterCard";
import ThemeToggle from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LENGTH_UNITS,
  VOLUME_UNITS,
  TEMPERATURE_UNITS,
  WEIGHT_UNITS,
  TIME_UNITS,
  SPEED_UNITS,
  convertLength,
  convertVolume,
  convertTemperature,
  convertWeight,
  convertTime,
  convertSpeed,
} from "@/lib/converter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl font-bold text-center underline">
              Will's Unit Converter
            </CardTitle>
            <Tabs defaultValue="distance" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
                <TabsTrigger value="distance" className="font-bold" data-testid="tab-distance">
                  Distance
                </TabsTrigger>
                <TabsTrigger value="volume" className="font-bold" data-testid="tab-volume">
                  Volume
                </TabsTrigger>
                <TabsTrigger value="temperature" className="font-bold" data-testid="tab-temperature">
                  Temperature
                </TabsTrigger>
                <TabsTrigger value="weight" className="font-bold" data-testid="tab-weight">
                  Weight
                </TabsTrigger>
                <TabsTrigger value="time" className="font-bold" data-testid="tab-time">
                  Time
                </TabsTrigger>
                <TabsTrigger value="speed" className="font-bold" data-testid="tab-speed">
                  Speed
                </TabsTrigger>
              </TabsList>
              <TabsContent value="distance" className="mt-6">
                <GenericConverterCard
                  units={LENGTH_UNITS}
                  defaultFromUnit="meters"
                  defaultToUnit="feet"
                  convertFn={convertLength}
                />
              </TabsContent>
              <TabsContent value="volume" className="mt-6">
                <GenericConverterCard
                  units={VOLUME_UNITS}
                  defaultFromUnit="liters"
                  defaultToUnit="gallons"
                  convertFn={convertVolume}
                />
              </TabsContent>
              <TabsContent value="temperature" className="mt-6">
                <GenericConverterCard
                  units={TEMPERATURE_UNITS}
                  defaultFromUnit="celsius"
                  defaultToUnit="fahrenheit"
                  convertFn={convertTemperature}
                />
              </TabsContent>
              <TabsContent value="weight" className="mt-6">
                <GenericConverterCard
                  units={WEIGHT_UNITS}
                  defaultFromUnit="kilograms"
                  defaultToUnit="pounds"
                  convertFn={convertWeight}
                />
              </TabsContent>
              <TabsContent value="time" className="mt-6">
                <GenericConverterCard
                  units={TIME_UNITS}
                  defaultFromUnit="hours"
                  defaultToUnit="minutes"
                  convertFn={convertTime}
                />
              </TabsContent>
              <TabsContent value="speed" className="mt-6">
                <GenericConverterCard
                  units={SPEED_UNITS}
                  defaultFromUnit="miles per hour"
                  defaultToUnit="kilometers per hour"
                  convertFn={convertSpeed}
                />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
}
