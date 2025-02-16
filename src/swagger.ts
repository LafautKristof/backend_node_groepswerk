// import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Groepswerk API",
            version: "1.0.0",
            description: "Groepswerk API",
        },
        servers: [
            process.env.NODE_ENV !== "production"
                ? {
                      url: "http://localhost:3000/api",
                      description: "Development server",
                  }
                : {
                      url: "https://groepswerk.onrender.com/api",
                      description: "Production server",
                  },
        ],
        components: {
            schemas: {
                Mouse: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                        color: { type: "array", items: { type: "string" } },
                        dpi: { type: "number" },
                        description: { type: "string" },
                        images: { type: "array", items: { type: "string" } },
                        raters: { type: "number" },
                        points: { type: "number" },
                    },
                },
                VideoCard: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                        chipset: { type: "string" },
                        memory: { type: "string" },
                        color: { type: "string" },
                        length: { type: "boolean" },
                        images: { type: "array", items: { type: "string" } },
                        description: { type: "string" },
                        raters: { type: "number" },
                        points: { type: "number" },
                    },
                },
                ComputerScreen: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        brand: { type: "string" },
                        price: { type: "number" },
                        size: { type: "string" },
                        resolution: { type: "string" },
                        refresh_rate: { type: "string" },
                        panel: { type: "string" },
                        response_time: { type: "string" },
                        connectivity: {
                            type: "array",
                            items: { type: "string" },
                        },
                        description: { type: "string" },
                        images: { type: "array", items: { type: "string" } },
                        raters: { type: "number" },
                        points: { type: "number" },
                    },
                },
                Ram: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                        capacity: { type: "string" },
                        speed: { type: "string" },
                        type: { type: "string" },
                        latency: { type: "string" },
                        rgb: { type: "boolean" },
                        description: { type: "string" },
                        images: { type: "array", items: { type: "string" } },
                        raters: { type: "number" },
                        points: { type: "number" },
                    },
                },
                Keyboard: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        brand: { type: "string" },
                        price: { type: "number" },
                        type: { type: "string" },
                        switches: { type: "string" },
                        connectivity: { type: "string" },
                        rgb: { type: "boolean" },
                        description: { type: "string" },
                        images: { type: "array", items: { type: "string" } },
                        raters: { type: "number" },
                        points: { type: "number" },
                    },
                },
                Headphone: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                        color: { type: "string" },
                        noise_canceling: { type: "boolean" },
                        description: { type: "string" },
                        images: { type: "array", items: { type: "string" } },
                        raters: { type: "number" },
                        points: { type: "number" },
                    },
                },
            },
        },
    },
};

// export const specs = swaggerJSDoc(options);
