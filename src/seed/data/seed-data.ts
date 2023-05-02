interface SeedRoom {
  name: string;
  description: string;
  slug: string;
}

interface SeedRooms {
  rooms: SeedRoom[];
}

export const initialRooms: SeedRooms = {
  rooms: [
    {
      description: 'Room for relax and have fun',
      name: 'Room of Joy',
      slug: 'room_of_joy',
    },
    {
      description: 'Cozy room for two',
      name: 'Love Nest',
      slug: 'love_nest',
    },
    {
      description: 'Luxurious room with a view',
      name: 'Sky Suite',
      slug: 'sky_suite',
    },
    {
      description: 'Spacious room with a king size bed',
      name: 'Royal Chamber',
      slug: 'royal_chamber',
    },
    {
      description: 'Charming room with a fireplace',
      name: 'Fireside Retreat',
      slug: 'fireside_retreat',
    },
    {
      description: 'Quaint room with a vintage feel',
      name: 'Retro Room',
      slug: 'retro_room',
    },
    {
      description: 'Bright and airy room with lots of natural light',
      name: 'Sunny Side',
      slug: 'sunny_side',
    },
    {
      description: 'Room with a rustic feel',
      name: 'Woodland Cabin',
      slug: 'woodland_cabin',
    },
    {
      description: 'Minimalist room with a modern touch',
      name: 'Sleek Sanctuary',
      slug: 'sleek_sanctuary',
    },
    {
      description: 'Room with an ocean view',
      name: 'Beachfront Bliss',
      slug: 'beachfront_bliss',
    },
    {
      description: 'Room with a garden view',
      name: 'Garden Hideaway',
      slug: 'garden_hideaway',
    },
    {
      description: 'Room with a city view',
      name: 'Urban Oasis',
      slug: 'urban_oasis',
    },
    {
      description: 'Room with a mountain view',
      name: 'Mountain Retreat',
      slug: 'mountain_retreat',
    },
    {
      description: 'Room with a pool view',
      name: 'Poolside Paradise',
      slug: 'poolside_paradise',
    },
    {
      description: 'Room with a balcony',
      name: 'Balcony Bliss',
      slug: 'balcony_bliss',
    },
    {
      description: 'Room with a jacuzzi',
      name: 'Jacuzzi Joy',
      slug: 'jacuzzi_joy',
    },
    {
      description: 'Room with a sauna',
      name: 'Sauna Sanctuary',
      slug: 'sauna_sanctuary',
    },
    {
      description: 'Room with a fireplace and a view',
      name: 'Mountain Lodge',
      slug: 'mountain_lodge',
    },
    {
      description: 'Room with a loft bed',
      name: 'Lofty Living',
      slug: 'lofty_living',
    },
    {
      description: 'Room with a garden terrace',
      name: 'Terrace Retreat',
      slug: 'terrace_retreat',
    },
  ],
};

interface SeedUser {
  email: string;
  password: string;
  fullname: string;
  isActive: boolean;
}

interface SeedUsers {
  users: SeedUser[];
}

// export const initialUsers: SeedUsers = {
//   users: []
// };

export const initialUsers: SeedUsers = {
  users: []
}


for (let i = 0; i < 10; i++) {
  const user: SeedUser = {
    email: `user${i}@example.com`,
    password: "MyPassword123",
    fullname: `User ${i}`,
    isActive: true
  };
  initialUsers.users.push(user);
}


