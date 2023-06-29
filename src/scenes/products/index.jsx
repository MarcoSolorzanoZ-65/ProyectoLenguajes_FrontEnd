import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { getFetch } from "../../commons/ApiMethods";
import Header from "../../components/Header";
import FlashOn from "@mui/icons-material/FlashOn";
import FlashOff from "@mui/icons-material/FlashOff";

const Product = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Product Name", flex: 1 },
        { field: "desc", headerName: "Description", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            filterable: true,
            renderCell: ({ row }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            row.status
                                ? colors.greenAccent[600]
                                : colors.redAccent[600]
                        }
                        borderRadius="4px"
                    >
                        {row.status ? (
                            <FlashOn />
                        ) : (
                            <FlashOff />
                        )}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {row.status ? 'Habilitado' : 'Deshabilitado'}
                        </Typography>
                    </Box>
                );
            },
        },
        { field: "total_sales", headerName: "Total Sales", flex: 1 },
    ];

    const [invoiceData, setInvoiceData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getFetch('menus').then((data) => {
            const specificMenuProducts = data
                .filter(menu => menu.name === "Menu Disponible")
                .reduce((acc, menu) => {
                    return [...acc, ...menu.products.map(product => ({ menuId: menu.id, menuName: menu.name, ...product }))]
                }, [])
            setInvoiceData(specificMenuProducts)
            setLoading(false)
        })
    }, [])


    return (
        <Box m="20px">
            <Header title="PRODUCTOS" subtitle="List of Invoice Balances" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                {loading ? "Cargando..." :
                    <DataGrid
                        checkboxSelection
                        rows={invoiceData}
                        columns={columns}
                    />
                }
            </Box>
        </Box>
    );
};

export default Product;
