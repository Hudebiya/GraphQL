import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import axios from 'axios';

async function startServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    const server = new ApolloServer({
        typeDefs: `
        type Product {
            _id: String!
            name: String!
            desc: String!
            image: String!
        }

        type Query {
            getProducts: [Product]
        }     
        `,
        resolvers: {
            Query: {
                getProducts: async () => {
    try {
        const response = await axios.get('https://e-commerce-backend-murex-seven.vercel.app/');
        
        // Console par dekhein ke API asal mein kya data bhej rahi hai
        console.log("Vercel API Data:", response.data);

        // Agar response.data array hai toh wo bhejain, agar response.data.products array hai toh wo, warna empty array []
        if (Array.isArray(response.data)) {
            return response.data;
        } else if (Array.isArray(response.data?.products)) {
            return response.data.products;
        } else if (Array.isArray(response.data?.data)) {
            return response.data.data;
        }

        return []; // Agar kuch na mile toh empty array bhej dega taake error na aaye
    } catch (error) {
        console.error("API Fetch Error:", error.message);
        return [];
    }
}
            }
        }
    });      

    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000/graphql');
    });
}

startServer();