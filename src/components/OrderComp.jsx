import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { tokens } from "../theme";
import { getFetch } from "../commons/ApiMethods";

const OrderComp = () => {
    const columns = [
        { field: "id", headerName: "Order ID", flex: 1 }
    ];

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getFetch('orders').then((data) => {
            setOrderData(data);
            setLoading(false);
        });
    }, []);

    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="200px"
            gap="20px"
        >
            {loading ? (
                <Box
                    gridColumn="span 4"
                    bgcolor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography>Cargando...</Typography>
                </Box>
            ) : orderData.length === 0 ? (
                <Box
                    gridColumn="span 4"
                    bgcolor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography>No data available</Typography>
                </Box>
            ) : (
                orderData.map((order) => (
                    <Box
                        key={order.id}
                        gridColumn="span 2"
                        bgcolor={colors.primary[400]}
                        p={2}
                        borderRadius={8}
                    >
                        <Typography variant="h6">Order ID: {order.id}</Typography>
                        <Typography>No products available for this order</Typography>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default OrderComp;
