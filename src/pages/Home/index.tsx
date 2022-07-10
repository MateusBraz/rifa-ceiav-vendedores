import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import Header from "../../components/Layout/Header";
import { useCota } from "../../hooks/cotas";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "../../components/Table";

const Home: React.FC = function () {
    const { vendedores, getFilter, refreshListCotas } = useCota();
    const [vendedor, setVendedor] = useState(0);
    const [status, setStatus] = useState('TODOS');

    useEffect(() => {
        if (vendedor === 0) {
            refreshListCotas();
            return;
        }

        getFilter(vendedor, status === 'TODOS' ? '' : status);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vendedor, status]);

    return (
        <Content>
            <Header />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                }}
            >
                <FormControl fullWidth>
                    <InputLabel>Vendedor</InputLabel>

                    <Select
                        style={{ width: "100%", margin: "0 0 10px 0" }}
                        labelId="vendedor"
                        id="vendedor"
                        label="Situação"
                        value={vendedor}
                        onChange={(e) => setVendedor(Number(e.target.value))}
                    >
                        {vendedores.map(v => (<MenuItem key={v.id} value={v.id}>{v.nome}</MenuItem>))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Situação</InputLabel>

                    <Select
                        style={{ width: "100%", margin: "0 0 10px 0" }}
                        labelId="status"
                        id="status"
                        label="Situação"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="TODOS">TODOS</MenuItem>
                        <MenuItem value="RESERVADO">RESERVADO</MenuItem>
                        <MenuItem value="PAGO">PAGO</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                }}>
                <Table />
            </div>
        </Content>
    );
}

export default Home;