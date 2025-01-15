"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 237, mobile: 120 },
    { month: "May", desktop: 237, mobile: 120 },
    { month: "June", desktop: 186, mobile: 80 },
  { month: "July", desktop: 305, mobile: 200 },
    { month: "August", desktop: 237, mobile: 120 },
    { month: "September", desktop: 237, mobile: 120 },
    { month: "October", desktop: 237, mobile: 120 },
    { month: "November", desktop: 237, mobile: 120 },
    { month: "December", desktop: 237, mobile: 120 },
]

const chartConfig = {
  desktop: {
    label: "Completd",
    color: "#2563eb",
  },
  mobile: {
    label: "Ongoing",
    color: "#60a5fa",
  },
} 
 function Chart() {
     return (
         <div className="mt-5">
             <span>Work Time</span>
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
             </ChartContainer>
             </div>
  )
}

export default Chart