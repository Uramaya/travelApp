"use client"
import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import '@/styles/GlobalHeader.scss'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Link from 'next/link'

const AddTripBtn = ({onCreateEvent}: {onCreateEvent: () => void}) => {
    const onAddTripClick = () => {
        // when click the add trip button
        onCreateEvent()
    }

    return (
        <Box className="save-btn-wrapper" >
            <FormControl sx={{ m: 1, width: '10%', maxWidth: '90px', minWidth: '60px' }}>
                <Button variant="contained" size="small" className="mui-customize color-primary" onClick={onAddTripClick}>
                    Add Trip
                </Button>
            </FormControl>
        </Box>
    )
}

export default AddTripBtn