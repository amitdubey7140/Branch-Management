import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexAnnotations, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexResponsive, ApexStates, ApexStroke, ApexTheme, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export interface ChartOptions{
    series: ApexAxisChartSeries|ApexNonAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    annotations?: ApexAnnotations;
    colors?: string[];
    dataLabels: ApexDataLabels;
    stroke?: ApexStroke;
    labels: string[];
    legend?: ApexLegend;
    fill: ApexFill;
    tooltip: ApexTooltip;
    plotOptions?: ApexPlotOptions;
    responsive?: ApexResponsive[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    grid?: ApexGrid;
    states?: ApexStates;
    subtitle?: ApexTitleSubtitle;
    theme?: ApexTheme;
}

