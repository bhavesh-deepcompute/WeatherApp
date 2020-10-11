import React from "react";
import { letterFrequency } from "@vx/mock-data";
import { Group } from "@vx/group";
import { Bar } from "@vx/shape";
import { scaleLinear, scaleBand } from "@vx/scale";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { timeParse, timeFormat } from "d3-time-format";
import cityTemperature, {
  CityTemperature,
} from "@vx/mock-data/lib/mocks/cityTemperature";

// Define the graph dimensions and margins
const width = 800;
const height = 300;
const orange = "#fc2e1c";
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = (d) => d.dateString;
const y = (d) => +d.temp;
export default function Graph(props) {
  let data = props.data;

  console.log(props.data);
  console.log(cityTemperature[3]);
  // And then scale the graph by our data
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y)) + 5],
  });

  const format = timeFormat("%d %b");
  const parseDate = timeParse("%Y-%m-%d");
  const formatDate = (date) => {
    console.log(date);
    return format(parseDate(date));
  };
  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  // Finally we'll embed it all in an SVG

  return (
    <svg width={width} height={height}>
      <Group>
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Bar
              key={`bar-${i}`}
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill={orange}
            />
          );
        })}
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        scale={xScale}
        tickFormat={formatDate}
        stroke={orange}
        tickStroke={orange}
        tickLabelProps={() => ({
          fill: orange,
          fontSize: 11,
          textAnchor: "middle",
        })}
      />
    </svg>
  );
}
