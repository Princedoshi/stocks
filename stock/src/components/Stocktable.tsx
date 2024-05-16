import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface StockData {
  'Meta Data': {
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Interval': string;
    '6. Time Zone': string;
  };
  'Time Series (5min)': {
    [timestamp: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
}

interface Props {
  stockData: StockData['Time Series (5min)'];
}


const StockTable: React.FC<Props> = ({ stockData }) => {
  const stockEntries = Object.entries(stockData);

  return (
    <TableContainer component={Paper} className="mt-4">
      <Table className="min-w-max">
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Timestamp</TableCell>
            <TableCell className="font-bold">Open</TableCell>
            <TableCell className="font-bold">High</TableCell>
            <TableCell className="font-bold">Low</TableCell>
            <TableCell className="font-bold">Close</TableCell>
            <TableCell className="font-bold">Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockEntries.map(([timestamp, data]) => (
            <TableRow key={timestamp}>
              <TableCell>{timestamp}</TableCell>
              <TableCell>{data['1. open']}</TableCell>
              <TableCell>{data['2. high']}</TableCell>
              <TableCell>{data['3. low']}</TableCell>
              <TableCell>{data['4. close']}</TableCell>
              <TableCell>{data['5. volume']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
