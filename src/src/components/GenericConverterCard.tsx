import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp } from "lucide-react";

interface GenericConverterCardProps<T extends string> {
  units: readonly T[];
  defaultFromUnit: T;
  defaultToUnit: T;
  convertFn: (value: number, from: T, to: T) => number;
}

export default function GenericConverterCard<T extends string>({
  units,
  defaultFromUnit,
  defaultToUnit,
  convertFn,
}: GenericConverterCardProps<T>) {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<T>(defaultFromUnit);
  const [toUnit, setToUnit] = useState<T>(defaultToUnit);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value === "" || value === "-" || value === ".") {
      setResult(null);
      setError("");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      setResult(null);
      return;
    }

    setError("");
    const converted = convertFn(numValue, fromUnit, toUnit);
    setResult(converted);
  }, [value, fromUnit, toUnit, convertFn]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleConvert = () => {
    // Blur the input to dismiss mobile keyboard
    inputRef.current?.blur();
    
    // Scroll to result section
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <div className="space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-unit" className="text-sm font-bold uppercase tracking-wide">
                From Unit
              </Label>
              <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as T)}>
                <SelectTrigger id="from-unit" data-testid="select-from-unit" className="font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit} data-testid={`option-from-${unit}`} className="font-bold">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              size="icon"
              variant="outline"
              onClick={handleSwap}
              className="rounded-full h-10 w-10"
              data-testid="button-swap"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="to-unit" className="text-sm font-bold uppercase tracking-wide">
                To Unit
              </Label>
              <Select value={toUnit} onValueChange={(v) => setToUnit(v as T)}>
                <SelectTrigger id="to-unit" data-testid="select-to-unit" className="font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit} data-testid={`option-to-${unit}`} className="font-bold">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value-input" className="text-sm font-bold uppercase tracking-wide">
              Value to Convert
            </Label>
            <Input
              ref={inputRef}
              id="value-input"
              type="number"
              placeholder=""
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConvert();
                }
              }}
              className="text-xl text-right font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              data-testid="input-value"
            />
          </div>
          
          {/* Mobile-only Convert Button */}
          <div className="block md:hidden">
            <Button 
              onClick={handleConvert}
              className="w-full font-bold"
              size="lg"
              data-testid="button-convert-mobile"
            >
              Convert
            </Button>
          </div>
        </div>

        <div ref={resultRef} className="pt-4 border-t">
          {error ? (
            <div className="text-center py-8">
              <p className="text-sm font-bold text-destructive" data-testid="text-error">
                {error}
              </p>
            </div>
          ) : result !== null ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Result
              </p>
              <div className="space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-result">
                  {result.toFixed(4)}
                </p>
                <p className="text-lg font-bold text-muted-foreground">
                  <span className="font-bold">{value || "0"}</span> {fromUnit} ={" "}
                  <span className="font-bold text-foreground">{result.toFixed(4)}</span> {toUnit}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm font-bold text-muted-foreground" data-testid="text-empty">
                Enter a value to see the conversion
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t space-y-3">
          <p className="text-sm font-bold uppercase tracking-wide text-center">
            Supported Units
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {units.map((unit) => (
              <Badge
                key={unit}
                variant="secondary"
                className="text-xs"
                data-testid={`badge-unit-${unit}`}
              >
                {unit}
              </Badge>
            ))}
          </div>
        </div>
    </div>
  );
}
