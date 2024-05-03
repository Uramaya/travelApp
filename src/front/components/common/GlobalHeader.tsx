import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import '@/styles/GlobalHeader.scss'

import GlobalHeaderUser from '@/components/common/GlobalHeaderUser'
import GlobalHeaderLogo from '@/components/common/GlobalHeaderLogo'

const GlobalHeader = () => {
    
    return (
        <div className='global-header'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '50px', alignItems: 'center', justifyContent: 'space-between' }}>
                <GlobalHeaderLogo />
                <GlobalHeaderUser />
            </Box>
        </div>
    )
}

export default GlobalHeader