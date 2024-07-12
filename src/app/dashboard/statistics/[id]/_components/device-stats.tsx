import { GetDeviceInfoType } from "@/app/api/stats/device/route";
import {
  Card,
  CardContent,
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
import { DateRangePicker } from "@/components/ui/date-range-picker";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { DateToUTCDate } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, lastDayOfMonth, startOfMonth } from "date-fns";
import { TrendingUp } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { toast } from "sonner";

interface Props {
  id: string;
}

const DeviceStats = ({ id }: Props) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: lastDayOfMonth(new Date()),
  });

  const { isFetching, data } = useQuery<GetDeviceInfoType>({
    queryKey: ["device-stats", dateRange.from, dateRange.to],
    queryFn: () =>
      fetch(
        `/api/stats/device?from=${DateToUTCDate(
          dateRange.from
        )}&to=${DateToUTCDate(dateRange.to)}&id=${id}`
      ).then((res) => res.json()),
  });

  console.log(data);

  const chartData = [
    {
      device: "Desktop",
      visitors: 50,
      fill: "var(--color-chrome)",
    },
    {
      device: "Mobile",
      visitors: 10,
      fill: "var(--color-safari)",
    },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <section className="w-full flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center">
          <CardTitle>Pie Chart - Device Info</CardTitle>
          <div>
            <DateRangePicker
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
              showCompare={false}
              onUpdate={(values) => {
                const { from, to } = values.range;

                // we update the date range only if both dates are set

                if (!from || !to) {
                  return;
                }

                if (differenceInDays(to, from) > 365) {
                  toast.error(
                    `The selected date range is too big. Max allowed range is ${365} days`
                  );
                  return;
                }

                setDateRange({ from, to });
              }}
            />
          </div>
        </section>
      </CardHeader>
      <div className="p-4">
        <SkeletonWrapper isLoading={isFetching} fullWidth={false}>
          <CardContent className="flex-1 pb-0 ">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data?.chartData}
                  dataKey="visitors"
                  nameKey="device"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {data?.totalVisitors}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors from{" "}
              <span className="font-semibold">
                {moment(dateRange.from).format("ll")} -{" "}
                {moment(dateRange.to).format("ll")}
              </span>
            </div>
          </CardFooter>
        </SkeletonWrapper>
      </div>
    </Card>
  );
};

export default DeviceStats;
