import { Views } from 'react-big-calendar'
import { useMemo, useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment-timezone'
import { SelectOption } from '@/types/index'
// select options for calendar view in the calendar tool bar
export const VIEW_OPTIONS: SelectOption[] = [
    { id: Views.MONTH , value: Views.MONTH, text: Views.MONTH },
    { id: Views.WEEK, value: Views.WEEK, text: Views.WEEK },
    { id: Views.DAY, value: Views.DAY, text: Views.DAY },
]

// select options for time zone in the calendar tool bar
export const GMT_OPTIONS: () => SelectOption[] = () => {
    const zones = moment.tz.names() // get all time zone name list
    if(!zones || !zones.length) return []
    return zones.map((zone, index) => {
        return {
            id: index,
            value: zone,
            text: zone,
        } as SelectOption
        
    })
}
