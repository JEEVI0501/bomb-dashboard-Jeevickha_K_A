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
import { getDisplayBalance } from '../../utils/formatBalance';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useFetchBombAPR from '../../hooks/useFetchBombAPR';
import useStakedTotalBombBalance from '../../hooks/useTotalStakedBombBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBombFinance from '../../hooks/useBombFinance';
import useShareStats from '../../hooks/usebShareStats';
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
    const totalStaked = useTotalStakedOnBoardroom();
    const xbombPrintApr = useFetchBombAPR();
    const stakedTotalBombBalance = useStakedTotalBombBalance();
    const bombFinance = useBombFinance();
    const shareStats = useShareStats();
    const bondStat = useBondStats();

    const bondBalance = useTokenBalance(bombFinance?.BBOND);

    const bombTotalStaked = Number(stakedTotalBombBalance / 1000000000000000000).toFixed(0);

    const xbombPrintAprNice = useMemo(() => (xbombPrintApr ? Number(xbombPrintApr).toFixed(2) : null), [xbombPrintApr]);
    const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
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
    const sharePriceInDollars = useMemo(
    () => (shareStats ? Number(shareStats.priceInDollars).toFixed(2) : null),
    [shareStats],
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
            <Box spacing={2} container display="Flex">
                <Grid spacing={6}>
                    <div style={{padding:'40px 0px 20px 0px',right:'0px'}}><a href='#' style={{color:'#9EE6FF'}}>Read Investment Stratergy</a></div>
                    <Box style={{backgroundColor: 'rgba(158, 230, 255, 0.5)',width: '646px',height: '40px',textAlign: 'center',right:'0px'}}>
                    Invest Now
                    </Box>
                    <Box justifyContent="space-between" display="flex" style = {{marginTop:'20px'}}>
                        <Box border={1} p={2} style={{width:'45%',marginLeft:'2px',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>Chat on Discord</Box>
                        <Box border={1} p={2} style={{width:'45%',marginRight:'2px',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>Read Docs</Box>
                    </Box>
                    <Grid style={{marginTop:'20px',marginRight:'20px', color:'white',backgroundColor: 'rgba(35,40,75, 0.5)',width:'100%'}}>
                        <Box border={1} display='flex'>
                                <Grid>
                                <p>Broadroom<span><Button>Recommended</Button></span></p>
                                <p>Stake BSHARE and earn BOMB every epoch</p>
                                </Grid>
                                <Grid>
                                    <h2>TVL : <span>
                                    <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" /></span></h2>
                                </Grid>
                        </Box>
                        <Grid style={{color:'white',backgroundColor: 'rgba(35,40,75, 0.5)',width:'100%'}}>
                            <Grid style={{textAlign:'right'}}>
                                <p>Total Staked:{getDisplayBalance(totalStaked)}</p>
                            </Grid>
                            <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center" style={{textalign:'left'}}>
                                <Grid item>
                                    <p>Daily Returns:</p>
                                    <p>2%</p>
                                </Grid>
                                <Grid item>
                                    <p>Your Stake</p>
                                    <p>124.21</p>
                                    <p>124.21</p>
                                </Grid>
                                <Grid item>
                                    <p>Earned:</p>
                                    <p>6.4413</p>
                                    <p>6.4413</p>
                                </Grid>
                                <Grid justifyContent="center" alignItems="center">
                                    <Grid container spacing={2} display="flex">
                                        <Grid>
                                            <Button>Deposit</Button>
                                        </Grid>
                                        <Grid>
                                            <Button>Deposit</Button>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <Button>claim Rewards</Button>
                                    </Grid>
                                </Grid>
                               
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'40px',marginLeft:'20px',textAlign: 'center',color:'white',backgroundColor: 'rgba(35,40,75, 0.5)',width:'100%'}}>
                    <h3>Latest News</h3>
                </Grid>
            </Box>
            {/* <Grid container display="flex" justifyContent="space-between" style={{marginTop:'20px',marginRight:'20px', color:'white',backgroundColor: 'rgba(35,40,75, 0.5)',width:'100%'}}>
            <div container  style={{ display: 'flex' }}>
              <h2>BOMB -BTCB</h2>
              <Button
                variant="contained"
                style={{ height: '20px', borderRadius: '0px', marginLeft: '12px', background: 'green' }}
              >
                Recommended
              </Button>
            </div>
            <div>
              <h4>TVL: $1,008,430</h4>
            </div>
          </Grid> */}

          <Grid style={{marginTop:'20px',marginRight:'20px', color:'white',backgroundColor: 'rgba(35,40,75, 0.5)',width:'100%'}}>
            <Box justifyContent='space-between' display="flex" >
                <Grid display="flex">
                    <h2>Bomb Farms</h2>
                    <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
                </Grid>
                <Grid>
                    <Button>claim Rewards</Button>
                </Grid>
            </Box>
            <Box style={{padding:'20px'}}>
                <Grid display="flex">
                    <h3>BOMB-BTCB</h3>
                    <Button>Recommended</Button>
                </Grid>
                <Grid>
                    <h2>TVL : <span>
                    <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" /></span></h2>
                </Grid>
            </Box>
            <Box>
                <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center" style={{textalign:'left'}}>
                                <Grid item>
                                    <p>Daily Returns:</p>
                                    <p>{xbombPrintAprNice}%</p>
                                </Grid>
                                <Grid item>
                                    <p>Your Stake</p>
                                    <p>{roundAndFormatNumber(bombTotalStaked)}</p>
                                    <p>${roundAndFormatNumber(Number(bombPriceInDollars), 2)}</p>
                                </Grid>
                                <Grid item>
                                    <p>Earned:</p>
                                    <p></p>
                                    <p>{getDisplayBalance(bondBalance)}</p>
                                </Grid>
                                <Grid justifyContent="center" alignItems="center">
                                    <Grid container spacing={2} display="flex">
                                        <Grid>
                                            <Button>Deposit</Button>
                                        </Grid>
                                        <Grid>
                                            <Button>Withdraw</Button>
                                        </Grid>
                                    
                                        <Grid>
                                            <Button>claim Rewards</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                               
                </Grid>
            </Box>
            <Box style={{padding:'20px'}}>
                <Grid display="flex">
                    <h3>BSHARE-BNB</h3>
                    <Button>Recommended</Button>
                </Grid>
                <Grid>
                    <h2>TVL : <span>
                    <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" /></span></h2>
                </Grid>
            </Box>
            <Box >
                <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center" style={{textalign:'left'}}>
                                <Grid item>
                                    <p>Daily Returns:</p>
                                    <p>2%</p>
                                </Grid>
                                <Grid item>
                                    <p>Your Stake</p>
                                    <p>124.21</p>
                                    <p>${roundAndFormatNumber(Number(sharePriceInDollars), 2)}</p>
                                </Grid>
                                <Grid item>
                                    <p>Earned:</p>
                                    <p>6.4413</p>
                                    <p>6.4413</p>
                                </Grid>
                                <Grid justifyContent="center" alignItems="center">
                                    <Grid container spacing={2} display="flex">
                                        <Grid>
                                            <Button>Deposit</Button>
                                        </Grid>
                                        <Grid>
                                            <Button>Deposit</Button>
                                        </Grid>
                                    
                                        <Grid>
                                            <Button>claim Rewards</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                               
                </Grid>
            </Box>
          </Grid>
          <Grid style={{marginTop:'20px',marginRight:'20px', color:'white',backgroundColor: 'rgba(35,40,75, 0.5)',width:'100%'}}>
            <Box>
                <h3>Bonds</h3>
                <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>

            </Box>
            <Grid conatiner spacing={3} display="flex" >
                <Grid item>
                    <p>Current Price: (Bomb)^2</p>
                    <p>BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB</p>
                </Grid>
                <Grid item>
                    <p>Available to redeem: </p>
                    <p></p>
                </Grid>
                <Grid item>
                    <Grid container display="flex">
                        <Grid>
                            <p>Purchase BBond</p>
                            <p>Bomb is over peg</p>
                        </Grid>
                        <Grid>
                            <Button>purchase</Button>
                        </Grid>
                    </Grid>
                    <Grid display="flex">
                        <Grid>
                            <p>Redeem Bomb</p>
                        </Grid>
                        <Grid>
                            <Button>Redeem</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Page>
    )

}

export default Dashboard;