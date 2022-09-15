import express from 'express'
import cors from 'cors'
import {PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hours-string-to-minutes'
import { convertMintesToHourString } from './utils/convert-minutes-string-to-hours'

const app = express()
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient()

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return response.json(games)
})

app.get('/ads', (request, response) => {
    return response.json([])
})

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {             
            gameId,
            name: body.name,
            yearsPLaying: body.yearsPLaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            UseVoiceChannel: body.UseVoiceChannel,
            createdAt: body.createdAt,
        }
    })

    return response.status(201).json(ad)
});

app.get('/games/:id/ads', async (request, response) => {
    const gameID = request.params.id
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            UseVoiceChannel: true,
            yearsPLaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameID
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMintesToHourString(ad.hourStart)
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })
    return response.json({
        discord: ad.discord
    })
})

app.listen(3333)