import React from "react";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import SlopeChart from "../../../../components/charts/common/SlopeChart.js";

export default function TotalNacimientos({
  nacimientosData,
  selectedYear,
  handleYearChange,
  ...rest
}) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Función para agrupar los datos por meses
  const groupDataByMonth = (data) => {
    const groupedData = {};
    data.forEach(item => {
      const month = new Date(item.date).toLocaleString('default', { month: 'short' });
      if (!groupedData[month]) {
        groupedData[month] = {
          prcp: [],
          tavg: []
        };
      }
      groupedData[month].prcp.push(item.prcp);
      groupedData[month].tavg.push(item.tavg);
    });
    return groupedData;
  };

  // Filtrar y preparar datos agrupados para el gráfico
  const chartData = Object.entries(groupDataByMonth(nacimientosData)).map(([month, values]) => ({
    month,
    prcp: values.prcp.reduce((acc, curr) => acc + curr, 0) / values.prcp.length, 
    tavg: values.tavg.reduce((acc, curr) => acc + curr, 0) / values.tavg.length 
  }));

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Datos de Clima
        </Text>
        <Select value={selectedYear} onChange={handleYearChange}>
          <option value="2023">2023</option>
        </Select>
      </Flex>
      <Box h="350px" mt="auto">
        <SlopeChart data={chartData} />
      </Box>
    </Card>
  );
}