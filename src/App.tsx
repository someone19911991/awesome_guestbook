import React, { useState } from 'react'
import VisitorsTable from "./components/VisitorsTable";
import AddVisitorForm from './components/AddVisitorForm'
import { Grid, Box} from '@mui/material'
import {IVisitor} from './interfaces'
import NavBar from './components/NavBar'
import useLSVisitors from './hooks/useLSVisitors'

const App = () => {
    const [visitors, setVisitors] = useState<Array<IVisitor>>([])
    const currentVisitors = useLSVisitors(visitors)

    return (
        <Box>
            <NavBar />
            <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={4}>
                    <AddVisitorForm setVisitors={setVisitors} visitors={currentVisitors} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <VisitorsTable visitors={currentVisitors} setVisitors={setVisitors}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default App;