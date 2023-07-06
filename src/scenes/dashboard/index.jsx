import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import OrderComp from "../../components/OrderComp";
import Header from "../../components/Header";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Bienvenido a tu dashboard" />
            </Box>

            {/* GRID & CHARTS */}
            <OrderComp/>
        </Box>
    );
};

export default Dashboard;
