import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import IconChevronDownForMuiSelect from '@/components/icon/IconChevronDownForMuiSelect'
import '@/styles/GlobalToolBar.scss'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import moment from 'moment'
import { VIEW_OPTIONS, GMT_OPTIONS } from '@/const'

import { CalendarView } from '@/types'
import { capitalized, getCountryFlagSVGByTimeZoneName } from '@/utils/utils'

const GlobalToolBar = ({ view, timeZoneName, setView, onTodayClick, setTimeZoneName }: {
    view: CalendarView,
    timeZoneName: string,
    setView: React.Dispatch<React.SetStateAction<CalendarView>>,
    onTodayClick: () => void
    setTimeZoneName: React.Dispatch<React.SetStateAction<string>>,
}) => {
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

    const onChangeView = useCallback((event: SelectChangeEvent): void => {
        setView(event.target.value as CalendarView)
    }, [setView])

    const onChangeTimeZone = useCallback((event: SelectChangeEvent): void => {
        setTimeZoneName(event.target.value as string)
    }, [setTimeZoneName])

    return (
        <div className='global-tool-bar'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }}>
                <FormControl sx={{ m: 1, width: '25%' }}>
                    <TextField id="outlined-basic" label="Search Plan" size="small" className="mui-customize" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%', maxWidth: '90px', minWidth: '60px' }}>
                    <Button variant="contained" size="small" className="mui-customize color-primary" onClick={onTodayClick}>
                        Today
                    </Button>
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%', maxWidth: '130px', minWidth: '60px' }}>
                    <InputLabel id="demo-simple-select-label" className="mui-customize"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="mui-customize select-box"
                        value={view}
                        label="View"
                        size="small"
                        IconComponent={(props) => (<IconChevronDownForMuiSelect props={props} />)}
                        onChange={onChangeView}
                    >
                        <MenuItem disabled value="">
                            <em>view</em>
                        </MenuItem>
                        {VIEW_OPTIONS.map((option) => {
                            return (<MenuItem key={option.id} value={option.value}>{capitalized(option.text)}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '20%', maxWidth: '230px', minWidth: '60px' }}>
                    <InputLabel id="demo-simple-select-label" className="mui-customize"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="mui-customize select-box"
                        value={timeZoneName}
                        label="time zone"
                        size="small"
                        IconComponent={(props) => (<IconChevronDownForMuiSelect props={props} />)}
                        onChange={onChangeTimeZone}
                    >
                        <MenuItem disabled value="">
                            <em>time zone</em>
                        </MenuItem>
                        {GMT_OPTIONS().map((option) => {
                            return (<MenuItem key={option.id} value={option.value}>{`${getCountryFlagSVGByTimeZoneName(option.text)} ${option.text}`}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%', maxWidth: '90px', minWidth: '60px' }}>
                    <Button variant="contained" size="small" className="mui-customize" onClick={onTodayClick}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className="icon-box" >
                            <FontAwesomeIcon icon={faShare} className="icon-share" color="#B4B3B3" />
                            Share
                        </Box>
                    </Button>
                </FormControl>
                <FormControl sx={{ m: 1, width: '10%', maxWidth: '90px', minWidth: '60px' }}>
                    <IconButton className="icon-btn" >
                        <FontAwesomeIcon icon={faEllipsis} className="icon-ellipsis" color="#8B8989" />
                    </IconButton>
                </FormControl>
            </Box>
        </div>
    )
}

export default GlobalToolBar