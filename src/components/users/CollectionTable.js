import React, {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/material';
import { CircularProgress, Typography} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';



export default function CollectionTable() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);  
    const [page, setPage] = useState(0);
    
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const { t } = useTranslation(); 

    

    useEffect(() => {
        UserGet()
      }, []);
      const UserGet = () => {
        fetch("http://localhost:4000/users")
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok'); 
            }
            return res.json();
          })
          .then(
            (result) => {
              setItems(result);
              setFilteredItems(result); 
              setLoading(false);  
            },
            (error) => {
              setError(error);    
              setLoading(false);  
            }
          );
      }

      const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    
        if (value.length >= 3) {
          const filtered = items.filter((item) =>
            `${item.firstName} ${item.lastName}`.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredItems(filtered);
        } else {
          setFilteredItems(items); 
        }
      };

      const clearSearch = () => {
        setSearchTerm('');
        setFilteredItems(items);
      };
      

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  
    };
    
    const UserDelete = id => {
      const myHeaders = new Headers();
      myHeaders.append("X-API-Key", "{{token}}");

      const raw = "";

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`http://localhost:4000/users/delete/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alert(result['message'])
          if (result['status'] === 'ok') {
              UserGet();
          }
        })
        .catch((error) => console.error(error));
    }
    if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
        );
    }
    if (error) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography variant="h6" color="error">
              Error: {error.message}
            </Typography>
          </Box>
        );
    }
  return (
    <Box>
      <Box display="flex" justifyContent={"end"} mb={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" }, 
          alignItems: "center",
          mt: { sm: 1 }
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 0 },  width: { xs: "100%", sm: "auto" } }}>
          <TextField
            label={t("searchbyname")}
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              minWidth: { xs: "100%", sm: "auto" }, 
            }}
          />
        </Box>
        <Box sx={{ height: "56px" }}>
          <Button variant="outlined" onClick={clearSearch} sx={{ height: "100%" }}>
            {t("clear")}
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: { xs: '100%', sm: '100%', md: 650 }, width: '100%' }} aria-label="simple table">        
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">{t('firstname')}</TableCell>
            <TableCell align="right">{t('lastname')}</TableCell>
            <TableCell align="right">{t('age')}</TableCell>
            <TableCell align="right">{t('action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">
              <ButtonGroup variant="outlined" aria-label="Basic button group">
          
                <Button onClick={() => UserDelete(row.id)}>{t('delete')}</Button>
              </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
    </Box>
  );
}
