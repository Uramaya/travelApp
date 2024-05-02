import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem';
import '@/styles/CalendarToolBar.scss'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import moment from 'moment'

import { CalendarView } from '@/types'

const GlobalToolBar = ({ view, setView, onTodayClick }: { view: CalendarView, setView: React.Dispatch<React.SetStateAction<CalendarView>>, onTodayClick: () => void }) => {
    // const [weekDay, setWeekDay] = useState<string>('')
    // const [label, setLabel] = useState(moment(date).format('MM YYYY'))
    // // set label 
    // useEffect(() => {
    //     const weekDay = moment(date).format('ddd')
    //     setWeekDay(weekDay)
    // }, [date, setWeekDay])

    // // set weekday 
    // useEffect(() => {
    //     const label = moment(date).format('MMM YYYY')
    //     setLabel(label)
    // }, [date, setLabel])

    // const calendarLabel = useCallback((): JSX.Element => {
    //     if (view === Views.DAY) return <div className='label-day'>
    //         <div className='label-week'>{weekDay}</div>
    //         <div className='label'>{label}</div>
    //     </div>
    //     else return <div className='label'>
    //         {label}
    //     </div>
    // }, [view, label, weekDay])

    const onChangeView = useCallback((view: CalendarView): void => {
        setView(view)
    }, [setView])


    return (
        <div className='global-tool-bar'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, width: '25%' }}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%' }}>
                    <Button variant="contained" size="small" className="" onClick={onTodayClick}>
                        Today
                    </Button>
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%' }}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={view}
                        label="Age"
                        // onChange={onChangeView}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%' }}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={view}
                        label="Age"
                        // onChange={onChangeView}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%' }}>
                    <Button variant="contained" size="small" className="" onClick={onTodayClick}>
                        Today
                    </Button>
                </FormControl>
            </Box>
        </div>
    )
}

export default GlobalToolBar