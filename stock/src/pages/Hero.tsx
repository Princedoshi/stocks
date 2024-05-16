///Hero.tsx///

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, TextField, Button, CircularProgress, Card, CardContent } from '@mui/material';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StockTable from '../components/Stocktable';

interface StockData {
  'Meta Data'?: {
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
interface WishlistItem {
  userId: string;
  stockSymbol: string;
  latestTimeSeriesData: { [key: string]: string };
}

const Hero: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const handleSearch = async () => {
    if (!stockSymbol) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=EW5O1LKZLJN91BUQ`
      );
      const data = await response.json();
      if (data && data['Time Series (5min)']) {
        setStockData(data);
      } else {
        throw new Error('No intraday data available');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock price:', error);
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (!stockData || !stockData['Time Series (5min)']) {
      console.error('Stock data is missing or does not contain time series data.');
      return;
    }

    const sortedEntries = Object.entries(stockData['Time Series (5min)']).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
    const latestEntry = sortedEntries.length > 0 ? sortedEntries[0][1] : {};

    const dataToAdd: WishlistItem = {
      userId: userData.user._id,
      stockSymbol: stockSymbol,
      latestTimeSeriesData: latestEntry,
    };

    try {
      const response = await fetch('https://stock-backend-nj95.onrender.com/api/wishlist/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToAdd),
      });

      if (response.ok) {
        const updatedWishlist = await response.json();
        setWishlist(updatedWishlist.stocks);
        toast.success('Added to watchlist');
        console.log('Wishlist updated successfully:', updatedWishlist.stocks);
      } else {
        const errorData = await response.json();
        console.error('Error updating wishlist:', errorData.error);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="flex justify-center items-center">
        <div className="text-center">
          <Typography variant="h4" gutterBottom>
            Stock Information Dashboard
          </Typography>
          <div className="flex items-center justify-center space-x-2">
            <TextField
              label="Enter Stock Symbol"
              variant="outlined"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Add to Watchlist
            </Button>
            {loading && <CircularProgress />}
          </div>
        </div>
      </div>
      {stockData && stockData['Meta Data'] ? (
        <div className="mt-8 text-center">
          <Card>
            <CardContent>
              <Typography variant="h6">Company: {stockData['Meta Data']['2. Symbol']}</Typography>
              <Typography variant="body1">Last Refreshed: {stockData['Meta Data']['3. Last Refreshed']}</Typography>
              <Typography variant="body1">Interval: {stockData['Meta Data']['4. Interval']}</Typography>
              <Typography variant="body1">Time Zone: {stockData['Meta Data']['6. Time Zone']}</Typography>
            </CardContent>
          </Card>
        </div>
      ) : null}
      {stockData && stockData['Time Series (5min)'] ? <StockTable stockData={stockData['Time Series (5min)']} /> : null}
      {wishlist.length > 0 && (
        <div className="mt-8">
          <Typography variant="h5">Wishlist</Typography>
          {wishlist.map((stock, index) => (
            <div key={index} className="mt-4">
              <Typography variant="body1">Stock Symbol: {stock.stockSymbol}</Typography>
              <Typography variant="body2">Latest Time Series Data:</Typography>
              <pre>{JSON.stringify(stock.latestTimeSeriesData, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
