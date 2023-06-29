import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useEffect, useState } from 'react';
import { getFetch } from "../commons/ApiMethods";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [maxSales, setMaxSales] = useState(0);

  useEffect(() => {
    getFetch('menus').then((fetchedData) => {
      const allMenus = [...new Set(fetchedData.map(menu => menu.name))];
      setKeys(allMenus);
      console.log(allMenus);

      const specificMenuProducts = fetchedData
          .reduce((acc, menu) => {
            return [
              ...acc,
              ...menu.products.map(product => ({
                user: product.name,
                ...allMenus.reduce((menuSales, menuName) => {
                  menuSales[menuName] = menu.name === menuName ? product.total_sales : 0;
                  return menuSales;
                }, {})
              }))
            ]
          }, []);

      setData(specificMenuProducts);

      const maxSalesValue = Math.max(...specificMenuProducts.map(product => product.sales));
      setMaxSales(maxSalesValue);
    });
  }, []);

  const tickValues = Array.from({ length: maxSales + 1 }, (_, index) => index);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={keys}
      indexBy="user"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.1}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "user",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food",
        legendPosition: "middle",
        legendOffset: -40,
        format: value => isNaN(value) ? "" : value.toFixed(0),
        tickValues,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
