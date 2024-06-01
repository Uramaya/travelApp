import { Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import { EventList, EventListItem } from '@/types'
const userTimeZone = moment.tz.guess(true)

export const ONGOING: EventListItem[] = [
  {
    id: 1,
    title: 'Trip to Taiwan',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Moye Chen',
      mail: 'moye@gmail.com',
      language: 'english',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdKYe00NaD5SQjIMvXYPssq0r1dXJggL3ZIg&s',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Japan",
        "short_name": "JP",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://static01.nyt.com/images/2022/05/19/opinion/firstpersonPromo/firstpersonPromo-superJumbo.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTekG4V9rCS4V4BgYxTBVVu7PqT2prfW8vKzA&s',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://thepinoyofw.com/wp-content/uploads/2021/07/taiwan.jpg',
  },
  {
    id: 2,
    title: 'Trip to Thailand',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Peggy Ortiz',
      mail: 'peggy@gmail.com',
      language: 'english',
      icon: 'https://i.pinimg.com/736x/1a/8e/7c/1a8e7c59a9967bb28890d5b18f6189fc.jpg',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Vietnam",
        "short_name": "VN",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRursG7vSDEwq-6GxaXzzgY_p5NmBqW1Ntr_Q&s',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://qph.cf2.quoracdn.net/main-qimg-39ecd399eb034c0139054b518d52d5d5-lq',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://www.siamtraveller.com/wp-content/uploads/2017/09/Northern-Thailand-Scenic-View-05.jpg',
  },
]

export const RECENT: EventListItem[] = [
  {
    id: 1,
    title: 'Trip to Shanghai',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Jessy Evans',
      mail: 'moye@gmail.com',
      language: 'english',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdKYe00NaD5SQjIMvXYPssq0r1dXJggL3ZIg&s',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Japan",
        "short_name": "JP",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://images.inc.com/uploaded_files/image/1920x1080/getty_624206636_200013332000928034_376810.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTekG4V9rCS4V4BgYxTBVVu7PqT2prfW8vKzA&s',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://thepinoyofw.com/wp-content/uploads/2021/07/taiwan.jpg',
  },
  {
    id: 2,
    title: 'Trip to Switzerland',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Peggy Ortiz',
      mail: 'peggy@gmail.com',
      language: 'english',
      icon: 'https://i.pinimg.com/736x/1a/8e/7c/1a8e7c59a9967bb28890d5b18f6189fc.jpg',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Vietnam",
        "short_name": "VN",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6K_0tuPMdpV7xHVEqo4TvfpWIk-GkEE5Tr34yZoOjo6mT42LIxUf0QCu2IH2xjfvOtt4&usqp=CAU',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://divineyouwellness.com/wp-content/uploads/2021/11/signs-of-an-Inteligent-person.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5lrTnuzty3a8b3UBukQWHxQB08R693AAl7Q&s',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOiyxpdZmSQEY0hrTegdTNxnoJZHad8oikNQ&s',
  },
  {
    id: 3,
    title: 'Trip to Netherland',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Peggy Ortiz',
      mail: 'peggy@gmail.com',
      language: 'english',
      icon: 'https://i.pinimg.com/736x/1a/8e/7c/1a8e7c59a9967bb28890d5b18f6189fc.jpg',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Vietnam",
        "short_name": "VN",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6K_0tuPMdpV7xHVEqo4TvfpWIk-GkEE5Tr34yZoOjo6mT42LIxUf0QCu2IH2xjfvOtt4&usqp=CAU',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://divineyouwellness.com/wp-content/uploads/2021/11/signs-of-an-Inteligent-person.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5lrTnuzty3a8b3UBukQWHxQB08R693AAl7Q&s',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://globalgrasshopper.com/wp-content/uploads/2013/10/Keukenhof-Gardens-1-1000x667.jpg',
  },
  {
    id: 4,
    title: 'Trip to Roma',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Peggy Ortiz',
      mail: 'peggy@gmail.com',
      language: 'english',
      icon: 'https://i.pinimg.com/736x/1a/8e/7c/1a8e7c59a9967bb28890d5b18f6189fc.jpg',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Vietnam",
        "short_name": "VN",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'hhttps://static.ffx.io/images/$zoom_0.747%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_70%2C$y_0/t_crop_custom/q_86%2Cf_auto/e60e21ce90910be320ff9788c6c48e63a6c5c597',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://images.squarespace-cdn.com/content/v1/5811246737c581e3d863f020/1514670194571-9YWHQITTW2PJ2M4RMZFY/Happiest+person+in+the+world%21.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://i.pinimg.com/474x/0a/cc/c9/0accc9517d71bb1c96c6a64813772cba.jpg',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRsp2QPEyY8cLHgsL6Lb9_vBVqDcem5pC8rA&s',
  },
]

export const EXPLORE: EventListItem[] = [
  {
    id: 1,
    title: 'Trip to Japan',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Lisa Elizabeth',
      mail: 'lisa@gmail.com',
      language: 'english',
      icon: 'https://static01.nyt.com/images/2022/05/19/opinion/firstpersonPromo/firstpersonPromo-superJumbo.jpg',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Japan",
        "short_name": "JP",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://static01.nyt.com/images/2022/05/19/opinion/firstpersonPromo/firstpersonPromo-superJumbo.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTekG4V9rCS4V4BgYxTBVVu7PqT2prfW8vKzA&s',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/003/318/medium/_E5_AF_8C_E5_A3_AB_E5_B1_B1.jpg?2017',
  },
  {
    id: 2,
    title: 'Trip to Vietnam',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Lisa Elizabeth',
      mail: 'lisa@gmail.com',
      language: 'english',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&s',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Vietnam",
        "short_name": "VN",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRursG7vSDEwq-6GxaXzzgY_p5NmBqW1Ntr_Q&s',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://qph.cf2.quoracdn.net/main-qimg-39ecd399eb034c0139054b518d52d5d5-lq',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://26326763.fs1.hubspotusercontent-eu1.net/hub/26326763/hubfs/Imported%20sitepage%20images/Detain_Waterfall_Vietnam_Shutterstock_-1.jpg?width=1200&length=1200&name=Detain_Waterfall_Vietnam_Shutterstock_-1.jpg',
  },
  {
    id: 3,
    title: 'Trip to Hongkong',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Lisa Elizabeth',
      mail: 'lisa@gmail.com',
      language: 'english',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&s',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "China",
        "short_name": "CH",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRursG7vSDEwq-6GxaXzzgY_p5NmBqW1Ntr_Q&s',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://qph.cf2.quoracdn.net/main-qimg-39ecd399eb034c0139054b518d52d5d5-lq',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/http://images.ntmllc.com/v4/destination/Hong-Kong/Hong-Kong-city/112086_SCN_HongKong_iStock466733790_Z8C705/Hong-Kong-Scenery.jpg?tr=w-780%2Ch-437%2Cfo-auto',
  },
  {
    id: 4,
    title: 'Trip to Hongkong',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Lisa Elizabeth',
      mail: 'lisa@gmail.com',
      language: 'english',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&s',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Vietnam",
        "short_name": "VN",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRursG7vSDEwq-6GxaXzzgY_p5NmBqW1Ntr_Q&s',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://qph.cf2.quoracdn.net/main-qimg-39ecd399eb034c0139054b518d52d5d5-lq',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/http://images.ntmllc.com/v4/destination/Hong-Kong/Hong-Kong-city/112086_SCN_HongKong_iStock466733790_Z8C705/Hong-Kong-Scenery.jpg?tr=w-780%2Ch-437%2Cfo-auto',
  },
  {
    id: 5,
    title: 'Trip to Turkey',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Carolyn Lopez',
      mail: 'carolyn@gmail.com',
      language: 'english',
      icon: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Turkey",
        "short_name": "TK",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRursG7vSDEwq-6GxaXzzgY_p5NmBqW1Ntr_Q&s',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://qph.cf2.quoracdn.net/main-qimg-39ecd399eb034c0139054b518d52d5d5-lq',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/12/Istanbul-cityscape.jpg',
  },
  {
    id: 6,
    title: 'Trip to Spain',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Marie Harris',
      mail: 'carolyn@gmail.com',
      language: 'english',
      icon: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/12/Istanbul-cityscape.jpg',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Turkey",
        "short_name": "TK",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRursG7vSDEwq-6GxaXzzgY_p5NmBqW1Ntr_Q&s',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://qph.cf2.quoracdn.net/main-qimg-39ecd399eb034c0139054b518d52d5d5-lq',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://globalgrasshopper.com/wp-content/uploads/2024/03/Valencia-View.jpg',
  },
  {
    id: 7,
    title: 'Trip to Argentine',
    start: new Date(),
    end: new Date(),
    author: {
      id: 1,
      name: 'Jorge Rivera',
      mail: 'carolyn@gmail.com',
      language: 'english',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6drkEV_Ztv25N4_9QoIFddH9iR7NMbHcLA&s',
      timeZoneName: 'Asia/Tokyo'
  },
    watch: 216,
    like: 152,
    address: [
      { "long_name": "48", "short_name": "48", "types": ["street_number"] },
      {
        "long_name": "Pirrama Road",
        "short_name": "Pirrama Rd",
        "types": ["route"],
      },
      {
        "long_name": "Pyrmont",
        "short_name": "Pyrmont",
        "types": ["locality", "political"],
      },
      {
        "long_name": "City of Sydney",
        "short_name": "City of Sydney",
        "types": ["administrative_area_level_2", "political"],
      },
      {
        "long_name": "New South Wales",
        "short_name": "NSW",
        "types": ["administrative_area_level_1", "political"],
      },
      {
        "long_name": "Turkey",
        "short_name": "TK",
        "types": ["country", "political"],
      },
      {
        "long_name": "2009",
        "short_name": "2009",
        "types": ["postal_code"],
      },
    ],
    users: [
      {
        id: 1,
        name: 'Lisa Elizabeth',
        mail: 'lisa@gmail.com',
        language: 'english',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRursG7vSDEwq-6GxaXzzgY_p5NmBqW1Ntr_Q&s',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 2,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg',
        timeZoneName: 'Asia/Tokyo'
      },
      {
        id: 3,
        name: 'James Wilson',
        mail: 'james@gmail.com',
        language: 'english',
        icon: 'https://qph.cf2.quoracdn.net/main-qimg-39ecd399eb034c0139054b518d52d5d5-lq',
        timeZoneName: 'Asia/Tokyo'
      }
    ],
    mainImage: 'https://www.buenosairesfreewalks.com/wp-content/uploads/2017/01/DSC_0411-960x520.jpg',
  },
]

export const EVENTLIST: EventList = {
  ongoing: ONGOING,
  recent: RECENT,
  explore: EXPLORE,
}