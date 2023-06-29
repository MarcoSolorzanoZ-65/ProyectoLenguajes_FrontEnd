import React, { useState, useEffect } from 'react';
import {Box, Typography} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { getFetch } from "../../commons/ApiMethods";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const Clients = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        {
            field: "categoryName",
            headerName: "Category",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box
                        width="25%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            row.categoryName === "user"
                                ? colors.greenAccent[600]
                                : colors.greenAccent[600]
                        }
                        borderRadius="4px">
                        {row.categoryName ? (
                            <PersonIcon />
                        ) : (
                            <PersonIcon />
                        )}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {row.categoryName ? 'Cliente' : 'Cliente'}
                        </Typography>
                    </Box>
                );
            },
        },
        { field: "email", headerName: "Email", flex: 1 },
    ];


    const [contents, setContents] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getFetch('categories').then((data) => {
            const users = data
                .filter(category => category.category_name === "User")
                .reduce((acc, category) => {
                return [...acc, ...category.users.map(user => ({ categoryId: category.id, categoryName: category.category_name, ...user }))]
            }, [])
            setContents(users)
            setLoading(false)
        })
    }, [])

    return (
        <Box m="20px">
            <Header
                title="CLIENTES"
                subtitle="Lista de clientes registrados en el sistema"
            />
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {loading ? "Cargando..." :
                    <DataGrid
                        rows={contents}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                }
            </Box>
        </Box>
    );
};

export default Clients;
