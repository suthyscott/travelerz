import { User } from "../models/user.js"
import { Destination } from "../models/destinations.js"

const dummyUser = {
    username: "Bob Wiley",
    password: "password",
    homeLocation: "Utah, USA"
}

const destinationsArray = [
    {
      destName: 'Glasgow',
      country: 'Scotland',
      desc: "Glasgow is one of Scotland's major cities, known for its rich history, vibrant culture, and friendly locals. Explore the stunning architecture, including the Glasgow Cathedral and the Kelvingrove Art Gallery and Museum. Enjoy a stroll along the River Clyde or visit the bustling Buchanan Street for shopping and entertainment.",
      imgURL: 'https://media.architecturaldigest.com/photos/589b71d07713e23d62084b27/16:9/w_2560%2Cc_limit/GettyImages-508260133.jpg',
      userId: 1
    },
    {
      destName: 'London',
      country: 'England',
      desc: "London, the capital city of England, is a diverse and cosmopolitan metropolis. Immerse yourself in the historical landmarks such as the Tower of London and Buckingham Palace. Explore world-class museums like the British Museum and enjoy the lively atmosphere of neighborhoods like Soho and Covent Garden.",
      imgURL: 'https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg',
      userId: 1
    },
    {
      destName: 'Dublin',
      country: 'Ireland',
      desc: "Dublin, the capital city of Ireland, is a city with a rich literary and cultural heritage. Visit Trinity College and see the Book of Kells, explore the historic Dublin Castle, and experience the vibrant atmosphere of Temple Bar with its pubs and live music. Enjoy a stroll along the River Liffey and soak in the city's charm.",
      imgURL: 'https://media.cntraveller.com/photos/611bf0fb7048754865719e3a/4:3/w_1704,h_1278,c_limit/view-of-the-liffey-from-liberty-hall-dublin-ireland-conde-nast-traveller-4feb16-Tara-Morgan.jpg',
      userId: 1
    },
    {
      destName: 'Paris',
      country: 'France',
      desc: "Paris, the capital city of France, is renowned for its art, fashion, and gastronomy. Visit iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Take a leisurely walk along the Seine River and indulge in delicious French cuisine at charming cafes. Paris is a city that captivates with its timeless elegance and romantic ambiance.",
      imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
      userId: 1
    },
    {
      destName: 'Berlin',
      country: 'Germany',
      desc: "Berlin, the capital city of Germany, is a city that seamlessly blends a rich history with modern innovation. Explore the remnants of the Berlin Wall, visit the historic Brandenburg Gate, and immerse yourself in the vibrant art scene. Discover the diverse neighborhoods, each with its unique charm, and experience the dynamic energy of this cosmopolitan city.",
      imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Museumsinsel_Berlin_Juli_2021_1_%28cropped%29.jpg/1200px-Museumsinsel_Berlin_Juli_2021_1_%28cropped%29.jpg',
      userId: 1
    },
    {
      destName: 'Rome',
      country: 'Italy',
      desc: "Rome, the capital city of Italy, is a city steeped in ancient history and architectural wonders. Explore the iconic Colosseum, Roman Forum, and Pantheon. Immerse yourself in the artistry of Vatican City, home to St. Peter's Basilica and the Sistine Chapel. Enjoy a leisurely walk through charming cobblestone streets and savor authentic Italian cuisine at local trattorias.",
      imgURL: 'https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg',
      userId: 1
    }
  ];
  
  export const seedDatabase = async () => {
    await User.create(dummyUser)
    await Destination.bulkCreate(destinationsArray)

    console.log("Your database has been seeded. Kill the terminal, comment out the sequelize.sync line with {force: true} in the main.js and comment in the other sequelize.sync line, then restart the server.")
}
  