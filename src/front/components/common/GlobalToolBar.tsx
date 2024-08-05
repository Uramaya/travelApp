import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import { faEllipsis, faTrashCan } from "@fortawesome/free-solid-svg-icons"
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
import SearchPlanInput from '@/components/common/SearchPlanInput'
import Popover from '@mui/material/Popover';

import { CalendarView } from '@/types'
import { capitalized, getCountryFlagSVGByTimeZoneName } from '@/utils/utils'

const GlobalToolBar = ({
    view,
    timeZoneName,
    setView,
    onTodayClick,
    setTimeZoneName,
    onDeleteEvent,
}: {
    view: CalendarView,
    timeZoneName: string,
    setView: React.Dispatch<React.SetStateAction<CalendarView>>,
    onTodayClick: () => void,
    setTimeZoneName: React.Dispatch<React.SetStateAction<string>>,
    onDeleteEvent: () => void,
}) => {
    const onChangeView = useCallback((event: SelectChangeEvent): void => {
        setView(event.target.value as CalendarView)
    }, [setView])

    const onChangeTimeZone = useCallback((event: SelectChangeEvent): void => {
        setTimeZoneName(event.target.value as string)
    }, [setTimeZoneName])

    const [anchorEventMenu, setAnchorEventMenu] = useState<null | HTMLButtonElement>(null);

    const onOpenEventMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEventMenu(event.currentTarget);
    };

    const onCloseEventMenu = () => {
        setAnchorEventMenu(null);
    };

    const onDelete = (): void => {
        onDeleteEvent()
    }

    const openEventMenu = Boolean(anchorEventMenu);
    const idEventMenu = openEventMenu ? 'event-menu-popup' : undefined;

    return (
        <div className='global-tool-bar'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }}>
                <Box sx={{ marginRight: '10px' }}><SearchPlanInput /></Box>
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
                    <IconButton className="icon-btn" aria-describedby={idEventMenu} onClick={onOpenEventMenu}>
                        <FontAwesomeIcon icon={faEllipsis} className="icon-ellipsis" color="#8B8989" />
                    </IconButton>
                    <Popover
                        id={idEventMenu}
                        open={openEventMenu}
                        anchorEl={anchorEventMenu}
                        onClose={onCloseEventMenu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        className='event-menu-popover'
                    >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} gap={1.5} className='event-menu-popover-item' >
                            <FontAwesomeIcon icon={faTrashCan} className="icon-ellipsis" color="#8B8989" />
                            <span>delete event</span>
                        </Box>
                    </Popover>
                </FormControl>
            </Box>
        </div>
    )
}

export default GlobalToolBar