import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { AppBar, Box, styled } from '@mui/material'

const StyledAppBar = styled(AppBar)((theme) => ({
    backgroundColor: theme.theme.palette.secondary.main,
}))

const StyledToolBar = styled(Box)((theme) => theme.theme.mixins.toolbar)

const NavBar = () => {
    return (
        <>
            <StyledAppBar>
                <Toolbar>
                    <Typography variant="h5" component="h1">
                        Application
                    </Typography>
                </Toolbar>
            </StyledAppBar>
            <StyledToolBar />
        </>
    )
}

export default NavBar
