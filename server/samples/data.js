const ambers = [
  {
    id: '1',
    user_id: '1',
    created_at: '2022-11-05 08:14:17+09',
    updated_at: '2022-11-05 08:14:17+09',
    title: 'Amber',
    body: 'Orange Amber Gemstone',
    tags: [
      'nodejs',
      'graphql',
      'postresql'
    ],
    thumbnail_url: './assets/thumbnail_amber_1.jpg',
    image_urls: [
      './assets/amber_1.jpg',
      './assets/amber_2.jpg',
      './assets/amber_3.jpg'
    ],
    like: 7
  },
  {
    id: '2',
    user_id: '2',
    created_at: '2022-11-05 08:24:12+09',
    updated_at: '2022-11-05 08:24:12+09',
    title: 'Alex',
    body: 'I am Alex',
    tags: [
      'persona'
    ],
    thumbnail_url: './assets/thumbnail_profile.jpg',
    image_urls: [
      './assets/profile.jpg',
    ],
    like: 10
  },
  {
    id: '3',
    user_id: '1',
    created_at: '2022-11-05 09:12:00+09',
    updated_at: '2022-11-05 09:12:00+09',
    title: 'Golden Hour',
    body: 'Golden Hour 2022',
    tags: [
      'concert'
    ],
    thumbnail_url: './assets/thumbnail_golden_hour.jpg',
    image_urls: [
      './assets/golden_hour.jpg',
      './assets/golden_hour_2022.jpg'
    ],
    like: 7
  }
]

const users = [
  {
    id: '1',
    name: 'itssungho',
    email: 'itssungho@cmx.com',
    password: '1111',
    phone: '000-111-1111'
  },
  {
    id: '2',
    name: 'alejandro',
    email: 'alejandro@cmx.com',
    password: '2222',
    phone: '000-777-7777'
  }
]

module.exports = { ambers, users }
