import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import '@/styles/GlobalHeader.scss'

import GlobalHeaderUser from '@/components/common/GlobalHeaderUser'
import GlobalHeaderLogo from '@/components/common/GlobalHeaderLogo'
import AddTripBtn from '@/components/common/AddTripBtn'
import SearchPlanInput from '@/components/common/SearchPlanInput'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { EventListItem } from '@/types'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import IconButton from '@mui/material/IconButton'

const GlobalHeader = ({ 
    eventItem,
    updateEventItem,
    onCreateEvent,
    isHomePage
}: { 
    eventItem?: EventListItem,
    updateEventItem?: (eventItem: EventListItem) => void,
    onCreateEvent?: () => void,
    isHomePage: boolean
}) => {
    const [isEditEventTitle, setIsEditEventTitle] = useState<boolean>(false)
    const [eventTitle, setEventTitle] = useState<string>(eventItem?.title || '')

    const onClickEventTitle = useCallback(() => {
        setIsEditEventTitle(true)
    }, [isEditEventTitle, setIsEditEventTitle])

    useEffect(() => {
        setEventTitle(eventItem?.title || '')
    }, [eventItem])

    const onChangeTitle = useCallback((
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEventTitle(event.target.value)
    }, [eventItem, eventTitle, setEventTitle, isEditEventTitle, setIsEditEventTitle])

    const onUpdateTitle = useCallback((): void => {
        updateEventItem({
            ...eventItem,
            title: eventTitle,
        })
        // setEventTitle(event.target.value)
    }, [eventItem, eventTitle, setEventTitle, updateEventItem, isEditEventTitle, setIsEditEventTitle])

    const onClickAwayEventTitle = useCallback((): void => {
        setIsEditEventTitle(false)
    }, [eventItem, eventTitle, setEventTitle, updateEventItem, setIsEditEventTitle])

    const headerLogo = useCallback((): JSX.Element => {
        if (!isEditEventTitle) return <Button
            onClick={onClickEventTitle}
            className='global-header-title'
            sx={{
                borderRadius: '12px',
                ':hover': {
                    bgcolor: '#EBE8E8',
                },
            }}
        >
            {eventTitle}
        </Button>
        else return <ClickAwayListener onClickAway={onClickAwayEventTitle}>
            <FormControl sx={{ m: 1 }}>
                <TextField
                    className="title-input"
                    label="Title"
                    variant="standard"
                    placeholder="Add title"
                    value={eventTitle}
                    onChange={(e) => { onChangeTitle(e) }}
                    onBlur={(e) => { onUpdateTitle(e) }}
                />
            </FormControl>
        </ClickAwayListener>
    }, [eventTitle, setEventTitle, isEditEventTitle, setIsEditEventTitle])

    const addTipBtn = useCallback((): JSX.Element => {
        if (isHomePage) return <AddTripBtn onCreateEvent={onCreateEvent} />
    }, [isHomePage, onCreateEvent])

    const searchPlanInput = useCallback((): JSX.Element => {
        if (isHomePage) return <SearchPlanInput />
    }, [isHomePage])

    const returnBtn = useCallback((): JSX.Element => {
        if (!isHomePage) return <IconButton className="btn-back" href='/home' >
            <FontAwesomeIcon icon={faChevronLeft} className="icon-back" color="#676565" aria-label="previous" />
        </IconButton>
    }, [isHomePage])

    return (
        <div className='global-header'>
            <Box sx={{ display: 'flex', width: '100%', height: '50px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} gap={1}>
                    {returnBtn()}
                    {headerLogo()}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                    {addTipBtn()}
                    {searchPlanInput()}
                    <GlobalHeaderUser />
                </Box>
            </Box>
        </div>
    )
}

export default GlobalHeader