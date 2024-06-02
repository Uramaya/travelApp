"use client"
import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import '@/styles/mui/EventCard.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faCalendar, faEye, faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons"
import { numDigits, getCalendarEventPopoverTimeLabel, getUSerInfoById } from '@/utils/utils'
import { All_USERS } from '@/const'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import IconDefaultUser from '@/components/icon/IconDefaultUser'
import IconButton from '@mui/material/IconButton'
import { EventListItem, UserInfo } from '@/types'
import { getEventCardDateLabel, getEventCardLocationLabel } from '@/utils/utils'

const EventCard = ({ eventItem, isExplore = false }: { eventItem: EventListItem, isExplore?: boolean }) => {
    const [overLikeBtn, setOverLikeBtn] = useState(false)

    // when click the lick button
    const onLike = (): void => {
    }

    const userChip = useCallback((user: UserInfo | undefined): JSX.Element => {
        if (!user) return
        if (!user.icon) return <Chip
            className="mui-customize event-card-user-chip"
            key={user.id}
            label={user.name}
            icon={<IconDefaultUser width="25px" height="25px" iconSize="14px" />}
            onMouseDown={(e) => e.stopPropagation()}
        />
        else return <Chip
            className="mui-customize event-card-user-chip"
            key={user.id}
            label={user.name}
            avatar={<Avatar alt={user.name}
                src={user.icon}
            />}
            onMouseDown={(e) => e.stopPropagation()}
        />
    }, [eventItem])

    const toolbar = useCallback((): JSX.Element => {
        if (isExplore) return <Box sx={{ display: 'flex' }} gap={1} className="even-card-tool-bar">
            <Box sx={{ display: 'flex', alignItems: 'center' }} gap={0.5}>
                <FontAwesomeIcon icon={faEye} className="icon" color="#A2A2A2" />
                <div className='icon-title'>{eventItem.watch}</div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                <IconButton
                    className='tool-bar-icon-btn'
                    onClick={onLike}
                    onMouseOver={() => setOverLikeBtn(true)}
                    onMouseLeave={() => setOverLikeBtn(false)}
                >
                    <FontAwesomeIcon icon={overLikeBtn ? faHeart : faHeartOutline} className="icon" color="#1B1B1B" />
                </IconButton>
                <div className='icon-title icon-title-like'>{eventItem.like}</div>
            </Box>
        </Box>
        else return <Box sx={{ display: 'flex' }} gap={1.5} className="even-card-tool-bar">
            <Box sx={{ display: 'flex', alignItems: 'center' }} gap={0.5}>
                {eventItem.users.map((user) => {
                    if(user.icon) return <Box
                        component="img"
                        sx={{
                            height: 18,
                            width: 18,
                            borderRadius: '100%',
                            objectFit: 'cover',
                        }}
                        src={user.icon}
                    />
                    else return <IconDefaultUser width="18px" height="18px" iconSize="12px" />
                })}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                <IconButton
                    className='tool-bar-icon-btn'
                    onClick={onLike}
                    onMouseOver={() => setOverLikeBtn(true)}
                    onMouseLeave={() => setOverLikeBtn(false)}
                >
                    <FontAwesomeIcon icon={overLikeBtn ? faHeart : faHeartOutline} className="icon" color="#1B1B1B" />
                </IconButton>
            </Box>
        </Box>
    }, [eventItem, overLikeBtn, setOverLikeBtn])

    return (
        <Card sx={{ width: '30%', minWidth: '340px' }} className='mui-customize event-card' >
            <CardActionArea href={`/event/${eventItem.id}`}>
                <CardMedia
                    component="img"
                    height="160"
                    image={eventItem.mainImage}
                    alt="green iguana"
                />
                <CardContent>
                    <div className='event-card-title'>
                        {eventItem.title}
                    </div>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} gap={1} >
                        <FontAwesomeIcon icon={faLocationDot} className="icon" color="#A2A2A2" />
                        <div className='icon-title'>{getEventCardLocationLabel(eventItem.address)}</div>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start', marginTop: '6px' }} gap={1} >
                        <FontAwesomeIcon icon={faCalendar} className="icon" color="#A2A2A2" />
                        <div className='icon-title'>{getEventCardDateLabel(eventItem.start, eventItem.end)}</div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }} className='title-content-wrapper title-user-content-wrapper' >
                        {userChip(eventItem.author)}
                        {toolbar()}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default EventCard