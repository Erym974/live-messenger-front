import { faker } from "@faker-js/faker";

const fakeConversations = [
    {
        id: 1,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Lily Turner', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 2,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Ethan Mitchell', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 3,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Ava Thompson', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 4,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Noah Williams', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 5,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Sophia Anderson', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 6,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Liam Clark', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 7,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Isabella Walker', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 8,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Mason Adams', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 9,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'Mia Parker', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    },
    {
        id: 10,
        name: 'Le nom de mon groupe',
        picture: '/ressources/profile_picture.jpg',
        group: false,
        members : [
            { name: 'James Young', picture: '/ressources/profile_picture.jpg', status: 'online' },
        ],
        messages: [
          {content: 'Salut', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Comment vas-tu ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Hey !', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais bien merci et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Je vais aussi très bien. Quoi de neuf ?', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Oh rien de spécial, je cuisine et toi ?', date: '12/12/2020', sender: 'participant', name: 'Alice Doe', status: "seen"},
          {content: 'Rien non plus !', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "seen"},
          {content: 'Miam. Ca me donne faim', date: '12/12/2020', sender: 'me', name: 'John Doe', status: "sended"},
        ]
    }
]

const fakeHistory = [
    {id: 1, name: "Lily Turner", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 2, name: "Ethan Mitchell", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 3, name: "Ava Thompson", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 4, name: "Noah Williams", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 5, name: "Sophia Anderson", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 6, name: "Liam Clark", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 7, name: "Isabella Walker", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 8, name: "Mason Adams", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 9, name: "Mia Parker", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()},
    {id: 10, name: "James Young", lastMessage: "Miam. Ca me donne faim", picture: faker.image.avatar()}
]

const fakeFriends = fakeHistory.map((friend, index) => {

    const random = (max = 100) => Math.floor(Math.random() * max);

    return {
        id: index + 1,
        profilePicture: "https://picsum.photos/200",
        coverPicture: "https://picsum.photos/960/540",
        firstname: friend.name.split(" ")[0],
        lastname: friend.name.split(" ")[1],
        description: faker.lorem.sentence(),
        email: `${friend.name.split(" ")[0]}-${friend.name.split(" ")[1]}@gmail.com`,
        mutual: random(),
        since: "10/02/2020",
        friend: true,
    }
})

export { fakeConversations, fakeHistory, fakeFriends };
