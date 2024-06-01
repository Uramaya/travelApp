import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import '@/styles/GlobalHeader.scss'

import GlobalHeaderUser from '@/components/common/GlobalHeaderUser'
import GlobalHeaderLogo from '@/components/common/GlobalHeaderLogo'
import AddTripBtn from '@/components/common/AddTripBtn'
import SearchPlanInput from '@/components/common/SearchPlanInput'

const GlobalHeader = () => {
    
    return (
        <div className='global-header'>
            <Box sx={{ display: 'flex', width: '100%', height: '50px', alignItems: 'center', justifyContent: 'space-between' }}>
                <GlobalHeaderLogo />

                <Box sx={{ display: 'flex', alignItems: 'center' }} gap={2.5}>
                    <AddTripBtn />
                    <SearchPlanInput />
                    <GlobalHeaderUser />
                </Box>
            </Box>
        </div>
    )
}

export default GlobalHeader