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

const GlobalHeader = ({ eventItem, setEventItem }: { eventItem?: EventListItem, setEventItem: React.Dispatch<React.SetStateAction<EventListItem>> }) => {
    const [isEditEventTitle, setIsEditEventTitle] = useState<boolean>(false)
    const [eventTitle, setEventTitle] = useState<string>(eventItem?.title || '')

    const onClickEventTitle = useCallback(() => {
        setIsEditEventTitle(true)
    }, [isEditEventTitle, setIsEditEventTitle])

    const onChangeTitle = useCallback((
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEventItem({
            ...eventItem,
            title: event.target.value,
        })
        setEventTitle(event.target.value)
    }, [eventItem, eventTitle, setEventTitle, setEventItem, setIsEditEventTitle])

    const onClickAwayEventTitle = useCallback((): void => {
        setIsEditEventTitle(false)
    }, [eventItem, eventTitle, setEventTitle, setEventItem, setIsEditEventTitle])

    const headerLogo = useCallback((): JSX.Element => {
        if (eventItem && !isEditEventTitle) return <Button
            onClick={onClickEventTitle}
            className='global-header-title'
            sx={{
                borderRadius: '12px',
                ':hover': {
                    bgcolor: '#EBE8E8',
                },
            }}
        >
            {eventItem.title}
        </Button>
        else if (eventItem && isEditEventTitle) return <ClickAwayListener onClickAway={onClickAwayEventTitle}>
            <FormControl sx={{ m: 1, width: '30%' }}>
                <TextField
                    className="title-input"
                    label="Title"
                    variant="standard"
                    placeholder="Add title"
                    value={eventItem.title}
                    onChange={(e) => { onChangeTitle(e) }}
                />
            </FormControl>
        </ClickAwayListener>
    }, [eventItem, isEditEventTitle, setIsEditEventTitle])

    return (
        <div className='global-header'>
            <Box sx={{ display: 'flex', width: '100%', height: '50px', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconButton className="btn-back" href='/home' >
                    <FontAwesomeIcon icon={faChevronLeft} className="icon-back" color="#676565" aria-label="previous" />
                </IconButton>
                <GlobalHeaderLogo />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {headerLogo()}
                </Box>
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