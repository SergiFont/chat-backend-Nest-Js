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
  description: string;
  images: string[];
  username: string;
}

interface SeedUsers {
  users: SeedUser[];
}

export const initialUsers: SeedUsers = {
  users: [
    {
      description: "I'm a happy person",
      images: ['image1.jpg', 'image2.hpg'],
      username: 'Sergi',
    },
    {
      description: "I'm a freelance developer",
      images: ['image3.jpg', 'image4.hpg'],
      username: 'David',
    },
    {
      description: 'I love traveling and photography',
      images: ['image5.jpg', 'image6.hpg'],
      username: 'Anna',
    },
    {
      description: "I'm a fitness enthusiast",
      images: ['image7.jpg', 'image8.hpg'],
      username: 'Max',
    },
    {
      description: "I'm a foodie and a chef",
      images: ['image9.jpg', 'image10.hpg'],
      username: 'Linda',
    },
    {
      description: "I'm a musician",
      images: ['image11.jpg', 'image12.hpg'],
      username: 'Tom',
    },
    {
      description: "I'm a gamer",
      images: ['image13.jpg', 'image14.hpg'],
      username: 'Sam',
    },
    {
      description: "I'm a writer",
      images: ['image15.jpg', 'image16.hpg'],
      username: 'Alice',
    },
    {
      description: "I'm a fashion designer",
      images: ['image17.jpg', 'image18.hpg'],
      username: 'Nina',
    },
    {
      description: "I'm a software engineer",
      images: ['image19.jpg', 'image20.hpg'],
      username: 'Mark',
    },
    {
      description: "I'm a yoga instructor",
      images: ['image21.jpg', 'image22.hpg'],
      username: 'Yvonne',
    },
    {
      description: "I'm an artist",
      images: ['image23.jpg', 'image24.hpg'],
      username: 'Oliver',
    },
    {
      description: "I'm a dog lover",
      images: ['image25.jpg', 'image26.hpg'],
      username: 'Sarah',
    },
    {
      description: "I'm a cat person",
      images: ['image27.jpg', 'image28.hpg'],
      username: 'Grace',
    },
    {
      description: "I'm a teacher",
      images: ['image29.jpg', 'image30.hpg'],
      username: 'John',
    },
    {
      description: "I'm a dancer",
      images: ['image31.jpg', 'image32.hpg'],
      username: 'Sara',
    },
    {
      description: "I'm a football fan",
      images: ['image33.jpg', 'image34.hpg'],
      username: 'Peter',
    },
    {
      description: "I'm a bookworm",
      images: ['image35.jpg', 'image36.hpg'],
      username: 'Jane',
    },
  ],
};
