import { Box } from "@mui/material";
import React from "react";
import OrderComp from "../../components/OrderComp";
import Header from "../../components/Header";

const Dashboard = () => {

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PEDIDOS" subtitle="Pedidos actualmente activos" />
            </Box>

            {/* GRID & CHARTS */}
            <OrderComp/>
        </Box>
    );
};

export default Dashboard;