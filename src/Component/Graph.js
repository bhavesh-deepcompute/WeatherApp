import React from "react";
import { Group } from "@vx/group";
import { Bar } from "@vx/shape";
import { scaleLinear, scaleBand } from "@vx/scale";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { timeParse, timeFormat } from "d3-time-format";
import { useTooltip, useTooltipInPortal } from "@vx/tooltip";
import { localPoint } from "@vx/event";

// We'll make some helpers to get at the data we want
const x = (d) => d.dateString;
const y = (d) => +d.temp;
export default function Graph(props) {
  const width = 800;
  const height = 300;
  let data = props.data;

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  // Define the graph dimensions and margins
  const orange = "#fc2e1c";
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
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
  const formatDate = (date) => format(parseDate(date));

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  // handle tooltip
  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum,
    });
  };

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  })
  // Finally we'll embed it all in an SVG

  return (
    <>
    <svg ref={containerRef} width={width} height={height}>
      <Group>
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Bar
              key={`bar-${i}`}
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              onMouseOver={(e) => handleMouseOver(e,d.temp)}
              onMouseOut={hideTooltip}
              width={xScale.bandwidth()}
              fill={orange}
            />
          );
        })}
      </Group>
      <AxisLeft
        right={xMax + margin.left}
        left={margin.right}
        scale={yScale}
        stroke={orange}
        tickStroke={orange}
        tickLabelProps={() => ({
          fill: orange,
          dy: -5,
          fontSize: 11,
          textAnchor: "middle",
        })}
      />
      <AxisBottom
        top={yMax}
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
    {tooltipOpen && (
      <TooltipInPortal
        // set this to random so it correctly updates with parent bounds
        key={Math.random()}
        top={tooltipTop}
        left={tooltipLeft}
      >
        Data value <strong>{tooltipData}</strong>
      </TooltipInPortal>
    )}
    </>
  );
}
