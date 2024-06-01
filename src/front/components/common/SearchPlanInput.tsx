"use client"
import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeftLong, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Box from '@mui/material/Box'
import '@/styles/GlobalHeader.scss'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

const SearchPlanInput = ({ left = '-92px', top = '28px' }: { formWidth?: string, left?: string, top?: string }) => {
    return (
        <Box>
            <FormControl sx={{ marginTop: '-16px' }} className='search-input'>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="icon-magnifying-glass"
                    color="#676565"
                    style={{ left: `${left}`, top: `${top}` }}
                />
                <TextField
                    id="id-search-plan"
                    label="Search Plan"
                    size="small"
                    className="mui-customize"
                    InputLabelProps={{
                        style: {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '100%',
                            paddingLeft: '18px',
                        }
                    }}
                />
            </FormControl>
        </Box>
    )
}

export default SearchPlanInput