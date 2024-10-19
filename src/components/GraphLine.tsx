"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with a label";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function GraphLine() {
  // mudar de index para o nome da data
  const [activeDot, setActiveDot] = useState<number[]>([]); // Estado para armazenar o ponto ativo
  const [hoverDot, setHoverDot] = useState<number | null>(null); // Estado para armazenar o ponto ativo

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              onClick={(e) => console.log("aa", e)}
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}

              // content={(e) => {
              //   console.log(e);

              //   return <div>a</div>;
              // }}
            /> */}
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={(dotProps) => {
                const { cx, cy, index: num } = dotProps;
                const index = num + 1;
                const isActive = activeDot.find((e) => e === index); // Verifica se o ponto atual é o ativo
                const isHover = hoverDot === index;

                return (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r={isActive || isHover ? (isHover && !isActive ? 6 : 8) : 4} // Aumenta o raio do ponto ativo
                    fill={isActive ? "red" : "var(--color-desktop)"} // Muda a cor do ponto ativo
                    onMouseEnter={() => {
                      setHoverDot(index);
                    }}
                    onClick={() => {
                      if (isActive) {
                        setActiveDot([]);
                      } else {
                        setActiveDot([...activeDot, index]); // Define o ponto ativo ao passar o mouse
                      }
                      console.log(dotProps.payload.month);
                      console.log("Dot:", index);
                    }}
                    onMouseLeave={() => {
                      setHoverDot(null); // Restaura o estado ao sair do hover
                    }}
                  />
                );
              }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
