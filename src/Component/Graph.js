import React, { useEffect, useState } from "react";
import { Group } from "@vx/group";
import { BarGroup } from "@vx/shape";
import { scaleLinear, scaleBand, scaleOrdinal } from "@vx/scale";
import { AxisBottom } from "@vx/axis";
import { timeParse, timeFormat } from "d3-time-format";
import { useTooltip, useTooltipInPortal } from "@vx/tooltip";
import { localPoint } from "@vx/event";

// We'll make some helpers to get at the data we want
const x = (d) => d.dateString;
const y = (d) => +d.temp;
export default function Graph(props) {
  // console.log(props);
  // console.log(cityTemperature[3]);
  const width = 800;
  const height = 300;
  let data = props.data;

  const [totalCities, setTotalCities] = useState(props.cities.length);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    let keysAtStart = props.cities
      .slice(props.cities.length > 2 ? props.slice.length - 3 : 0)
      .map((value) => {
        return value.name;
      });
    setKeys(keysAtStart);
  }, []);

  useEffect(() => {
    if (props.cities.length !== totalCities) {
      let keysAtStart = props.cities
        .slice(props.cities.length > 2 ? props.cities.length - 3 : 0)
        .map((value) => {
          return value.name;
        });
      setKeys(keysAtStart);
      setTotalCities(props.cities.length);
    }
  });

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
  const blue = "#aeeef8";
  const green = "#e5fd3d";
  const purple = "#9caff6";
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

  const cityScale = scaleBand({
    domain: keys,
    padding: 0.1,
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y)) + 5],
  });

  const colorScale = scaleOrdinal({
    domain: keys,
    range: [blue, green, purple],
  });

  const format = timeFormat("%d %b");
  const parseDate = timeParse("%Y-%m-%d");
  const formatDate = (date) => format(parseDate(date));

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data));

  // handle tooltip
  const handleMouseOver = (event, key, value) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: { key, value },
    });
  };

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });
  // Finally we'll embed it all in an SVG

  // update scale output dimensions
  xScale.rangeRound([0, xMax]);
  cityScale.rangeRound([0, xScale.bandwidth()]);
  yScale.range([yMax, 0]);

  return (
    <>
      <svg ref={containerRef} width={width} height={height}>
        <Group >
          <BarGroup
            data={data}
            keys={keys}
            height={yMax}
            x0={x}
            x0Scale={xScale}
            x1Scale={cityScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barGroups) => {
              return barGroups.map((barGroup) => (
                <Group
                  key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                  left={barGroup.x0}
                >
                  {barGroup.bars.map((bar) => {
                    return (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx={4}
                        onMouseOver={(e) =>
                          handleMouseOver(e, bar.key, bar.value)
                        }
                        onMouseOut={hideTooltip}
                        // onClick={() => {
                        //   if (!events) return;
                        //   const { key, value } = bar;
                        //   alert(JSON.stringify({ key, value }));
                        // }}
                      />
                    );
                  })}
                </Group>
              ));
            }}
          </BarGroup>
        </Group>
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
          <strong>{tooltipData.key}:{tooltipData.value}</strong>
        </TooltipInPortal>
      )}
    </>
  );
}
