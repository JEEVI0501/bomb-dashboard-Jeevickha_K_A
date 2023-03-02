import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import Page from '../../components/Page';
import { Helmet } from 'react-helmet';
import {Button, Card} from '@material-ui/core';
// import { useTable } from 'react-table';
import { Box, CardContent, Typography, Grid, Paper} from '@material-ui/core';

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

    return(
        <Page>
            <BackgroundImage />
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <Grid item xs={24} sm={20}>
                <Paper style={{ backgroundColor: 'rgba(35,40,75, 0.5)'}}>
                    <Box p={12} style={{textAlign: 'center',color:'white',backgroundColor: 'transparent'}}>
                        <p style={{position: 'relative'}}> 
                        Bomb Finance Summary
                         {/* <span style={{ 
                            position: 'absolute',
                            bottom: '-10px',
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'white',
                        }} /> */}
                       </p>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={20}>
                <Box style={{width: '646px',height: '40px',textAlign: 'center'}}>
                <div style={{padding:'20px 0px 20px 0px',right:'0px'}}><a href='#' style={{color:'#9EE6FF'}}>Read Investment Stratergy</a></div>
                <Box style={{backgroundColor: 'rgba(158, 230, 255, 0.2)',width: '646px',height: '40px'}}>
                    Invest Now
                </Box>
                <Box justifyContent="space-between" display="flex" style = {{marginTop:'20px'}}>
                    <Box border={1} p={2} style={{width:'45%',marginLeft:'2px',backgroundColor:'rgba(255, 255, 255, 0.2)'}}>Chat on Discord</Box>
                    <Box border={1} p={2} style={{width:'45%',marginRight:'2px',backgroundColor:'rgba(255, 255, 255, 0.2)'}}>Read Docs</Box>
                </Box>
                <Box border={1} p={2} mt={2}>Big Box</Box>
                </Box>
            </Grid>
        </Page>
    )

}

export default Dashboard;