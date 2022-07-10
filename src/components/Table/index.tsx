import React, { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCota } from "../../hooks/cotas";

export default function AcccessibleTable() {
    const { cotas } = useCota();


    const valorTotal = useMemo(() => {
        const filterPagos = cotas.filter(c => c.status === 'PAGO');
        return (filterPagos.length * 5).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }, [cotas]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, maxHeight: '800px' }} aria-label="caption table">
                <caption>
                    <span style={{ marginRight: "10px" }}><strong>total:</strong> {cotas.length}</span>
                    <span><strong>valor:</strong> {valorTotal}</span>
                </caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Cota</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="center">Data cadastro</TableCell>
                        <TableCell align="center">Data atualização</TableCell>
                        <TableCell align="center">Situação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cotas.map((row: any) => (
                        <TableRow key={row.cota}>
                            <TableCell align="center" component="th" scope="row">
                                {row.cota}
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell align="center">{row.dataHora}</TableCell>
                            <TableCell align="center">{row.dataAtualizacao}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}