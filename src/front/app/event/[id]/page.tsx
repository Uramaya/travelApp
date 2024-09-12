"use client"
import Event from "@/components/page/Event"
import { useRouter, useParams } from 'next/navigation'

const EventPage = () => {
    const router = useRouter()
    const { id } = useParams()
    return (
        <Event id={id} />
    )
}

export default EventPage