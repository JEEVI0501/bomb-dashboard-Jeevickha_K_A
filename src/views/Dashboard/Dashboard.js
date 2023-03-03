import React,{useMemo} from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import Page from '../../components/Page';
import { Helmet } from 'react-helmet';
import {Button, Card} from '@material-ui/core';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import CountUp from 'react-countup';
// import { useTable } from 'react-table';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import { Box, CardContent, Typography, Grid, Paper} from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { roundAndFormatNumber } from '../../0x';
import moment from 'moment';
import { Alert } from '@material-ui/lab';


const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb.money | Dashboard';
// const data = [
//     {
//         icon:
//     }
// ]
const Dashboard = () => {
    const TVL = useTotalValueLocked();
    const bombStats = useBombStats();
    const bShareStats = usebShareStats();
    const tBondStats = useBondStats();
    const currentEpoch = useCurrentEpoch();
    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
    const { to } = useTreasuryAllocationTimes();
    const cashStat = useCashPriceInEstimatedTWAP();
    const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
      const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );        
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
      const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);

    return(
        <Page>
            <BackgroundImage />
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            
            <Grid container >
                
                <Box p={10} style={{textAlign: 'center',color:'white',backgroundColor: 'rgba(35,40,75, 0.5)',width:'100%'}}>
                    <p style={{position: 'relative'}}> 
                        Bomb Finance Summary</p>
                <Grid container spacing={2} display="flex" justifyContent='space-between'>
                <Table style={{width:'150px',right:'0px'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">current Supply</TableCell>
                            <TableCell align="center">Total Supply</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">$BOMB</TableCell>
                            <TableCell align="center">{roundAndFormatNumber(bombCirculatingSupply, 2)}</TableCell>
                            <TableCell align="center">{roundAndFormatNumber(bombTotalSupply, 2)}</TableCell>
                            <TableCell align="center">{bombPriceInBNB ? bombPriceInBNB : '-.----'}</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">$BSHARE</TableCell>
                            <TableCell align="center">{roundAndFormatNumber(bShareCirculatingSupply, 2)}</TableCell>
                            <TableCell align="center">{roundAndFormatNumber(bShareTotalSupply, 2)}</TableCell>
                            <TableCell align="center">{bSharePriceInDollars ? bSharePriceInDollars : '-.--'}</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell align="center">$BBOND</TableCell>
                            <TableCell align="center">{roundAndFormatNumber(tBondCirculatingSupply, 2)}</TableCell>
                            <TableCell align="center">{roundAndFormatNumber(tBondTotalSupply, 2)}</TableCell>
                            <TableCell align="center">{roundAndFormatNumber(tBondTotalSupply, 2)}</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Grid item xs={12} sm={4} style={{right:'0px'}}>
                    <Grid>
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Next Epoch</Typography>
                    <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                    </Grid>
                    <Grid>
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Current Epoch</Typography>
                    <Typography>{Number(currentEpoch)}</Typography>
                    </Grid>
                    <Grid>
                    <h2>TVL</h2>
                    <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
                    </Grid>
                    <Grid>
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>
                        BOMB PEG <small>(TWAP)</small>
                    </Typography>
                    <Typography>{scalingFactor} BTC</Typography>    
                    </Grid>
                </Grid>  
                </Grid>
                </Box>
                
            </Grid>
            <Grid item xs={12} sm={4} display="Flex">
                <Grid>
                    <div style={{padding:'40px 0px 20px 0px',right:'0px'}}><a href='#' style={{color:'#9EE6FF'}}>Read Investment Stratergy</a></div>
                    <Box style={{backgroundColor: 'rgba(158, 230, 255, 0.5)',width: '646px',height: '40px',textAlign: 'center'}}>
                    Invest Now
                    </Box>
                    <Box justifyContent="space-between" display="flex" style = {{marginTop:'20px'}}>
                        <Box border={1} p={2} style={{width:'45%',marginLeft:'2px',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>Chat on Discord</Box>
                        <Box border={1} p={2} style={{width:'45%',marginRight:'2px',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>Read Docs</Box>
                    </Box>
                    <Grid>
                        <Box border={1} p={2} mt={2}>Big Box</Box>
                    </Grid>
                </Grid>
                <Grid item container spacing={3}>
                    <Box>Latest News</Box>
                </Grid>
            </Grid>
        </Page>
    )

}

export default Dashboard;