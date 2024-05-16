import { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


interface WishlistItem {
  stockSymbol: string;
  latestTimeSeriesData: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`https://stock-backend-nj95.onrender.com/api/wishlist/wishlist/${userData.user._id}`);
        const data = await response.json();
        if (response.ok) {
          setWishlist(data.stocks);
        } else {
          console.error('Error fetching wishlist:', data.message);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [userData.user._id]);

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-4 text-center">
        Your Wishlist
      </Typography>
      {wishlist.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stock Symbol</TableCell>
                <TableCell>Open</TableCell>
                <TableCell>High</TableCell>
                <TableCell>Low</TableCell>
                <TableCell>Close</TableCell>
                <TableCell>Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlist.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell>{stock.stockSymbol}</TableCell>
                  <TableCell>{stock.latestTimeSeriesData['1. open']}</TableCell>
                  <TableCell>{stock.latestTimeSeriesData['2. high']}</TableCell>
                  <TableCell>{stock.latestTimeSeriesData['3. low']}</TableCell>
                  <TableCell>{stock.latestTimeSeriesData['4. close']}</TableCell>
                  <TableCell>{stock.latestTimeSeriesData['5. volume']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" className="text-center">
          Your wishlist is empty.
        </Typography>
      )}
    </div>
  );
};

export default Wishlist;
