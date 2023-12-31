import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { tokens } from "../theme";
import { getFetch, putFetch } from "../commons/ApiMethods";
import "./OrderComp.css";
const OrderComp = () => {
    const columns = [
        {
            field: "name",
            headerName: "Product Name",
            flex: 1,
            headerClassName: "blackColumnHeader",
        },
        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
            headerClassName: "blackColumnHeader",
        },
    ];

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [undoOrderData, setUndoOrderData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getFetch("orders").then((data) => {
            setOrderData(data);
            setLoading(false);
        });
    }, []);

    const handleSetOrderStatus = async (orderId) => {
        const updatedOrderData = orderData.map((order) => {
            if (order.id === orderId) {
                const updatedOrder = { ...order, order_status: 0 };
                setUndoOrderData((prevUndoOrderData) => [
                    ...prevUndoOrderData,
                    { ...order, order_status: 1 },
                ]);
                putFetch(`orders/${orderId}`, { order_status: 5 })
                    .then((response) => {
                        if (response.success) {
                            console.log("Order status updated successfully.");
                        } else {
                            console.log("Failed to update order status.");
                        }
                    })
                    .catch((error) => {
                        console.log("An error occurred while updating order status:", error);
                    });
                return updatedOrder;
            }
            return order;
        });
        setOrderData(updatedOrderData);
    };

    const handleUndoOrder = () => {
        if (undoOrderData.length > 0) {
            const lastOrder = undoOrderData[undoOrderData.length - 1];
            const updatedUndoOrderData = undoOrderData.slice(0, -1);
            setOrderData((prevOrderData) => {
                return prevOrderData.map((order) => {
                    if (order.id === lastOrder.id) {
                        return { ...order, order_status: 1 };
                    }
                    return order;
                });
            });
            setUndoOrderData(updatedUndoOrderData);
            putFetch(`orders/${lastOrder.id}`, { order_status: 1 })
                .then((response) => {
                    if (response.success) {
                        console.log("Order status undone successfully.");
                    } else {
                        console.log("Failed to undo order status.");
                    }
                })
                .catch((error) => {
                    console.log("An error occurred while undoing order status:", error);
                });
        }
    };

    const filteredOrderData = orderData
        .filter((order) => order.order_status === 1)
        .slice(0, 5);

    return (
        <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gridAutoRows="400px" gap="20px" borderRadius={0} >
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
            ) : filteredOrderData.length === 0 ? (
                <Box
                    gridColumn="span 4"
                    bgcolor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography>No hay ningun pedido activo...</Typography>
                </Box>
            ) : (
                filteredOrderData.map((order) => (
                    <Box
                        key={order.id}
                        gridColumn="span 2"
                        bgcolor={
                            order.order_status === 1
                                ? "green"
                                : order.order_status === 2
                                    ? "yellow"
                                    : order.order_status === 3
                                        ? "red"
                                        : colors.primary[400]
                        }
                        p={2}
                        borderRadius={8}
                    >
                        <Typography variant="h6" style={{ color: "black" }}>Cliente: {order.order_name}</Typography>
                        <DataGrid
                            rows={order.products}
                            columns={columns.map((column) => ({
                                ...column,
                                valueGetter: (params) => params.row[column.field],
                            }))}
                            hideFooter={true}
                            getRowClassName={(params) => "blackRowText"}
                        />
                        <Button
                            variant="contained"
                            onClick={() => handleSetOrderStatus(order.id)}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            Marcar como Entregado
                        </Button>
                    </Box>
                ))
            )}
            <Box
                gridColumn="span 2"
                bgcolor={colors.primary[400]}
                p={2}
                borderRadius={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Button variant="contained" onClick={handleUndoOrder}>
                    Deshacer
                </Button>
            </Box>
        </Box>
    );
};

export default OrderComp;