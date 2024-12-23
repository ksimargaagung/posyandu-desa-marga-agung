"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { getCombinedLayananPerBulan } from "./action";

const chartConfig = {
  pemeriksaanIbuAnak: {
    label: "Pemeriksaan Ibu & Anak",
    color: "hsl(var(--chart-1))",
  },
  pemeriksaanLansia: {
    label: "Pemeriksaan Lansia",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartDemo3() {
  const [chartData, setChartData] = useState<
    { bulan: string; pemeriksaanIbuAnak: number; pemeriksaanLansia: number }[]
  >([]);
  const [tren, setTren] = useState<"meningkat" | "menurun" | "stabil">(
    "stabil"
  );

  useEffect(() => {
    async function fetchData() {
      const response = await getCombinedLayananPerBulan();
      if (response.success) {
        // Filter data: hanya tampilkan jika salah satu nilai > 0
        const filteredData = response.data.filter(
          (item: { pemeriksaanIbuAnak: number; pemeriksaanLansia: number }) =>
            item.pemeriksaanIbuAnak > 0 || item.pemeriksaanLansia > 0
        );

        setChartData(filteredData);

        // Hitung tren dari dua bulan terakhir
        if (filteredData.length >= 2) {
          const lastMonth = filteredData[filteredData.length - 1];
          const previousMonth = filteredData[filteredData.length - 2];

          const totalLastMonth =
            lastMonth.pemeriksaanIbuAnak + lastMonth.pemeriksaanLansia;
          const totalPreviousMonth =
            previousMonth.pemeriksaanIbuAnak + previousMonth.pemeriksaanLansia;

          if (totalLastMonth > totalPreviousMonth) {
            setTren("meningkat");
          } else if (totalLastMonth < totalPreviousMonth) {
            setTren("menurun");
          } else {
            setTren("stabil");
          }
        }
      } else {
        console.error("Gagal memuat data chart:", response.error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Jumlah Pemeriksaan Layanan</CardTitle>
        <CardDescription>Periode Januari - Desember</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="pemeriksaanIbuAnak"
              fill="hsl(var(--chart-1))"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="pemeriksaanLansia"
              fill="hsl(var(--chart-2))"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {tren === "meningkat" && (
            <>
              Tren pemeriksaan meningkat bulan ini{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          )}
          {tren === "menurun" && (
            <>
              Tren pemeriksaan menurun bulan ini{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
          {tren === "stabil" && (
            <>
              Tren pemeriksaan stabil{" "}
              <Minus className="h-4 w-4 text-yellow-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total pemeriksaan layanan ibu & anak dan lansia per bulan
        </div>
      </CardFooter>
    </Card>
  );
}
