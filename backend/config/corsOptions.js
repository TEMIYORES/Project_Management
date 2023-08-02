const allowedOrigins = ["http://localhost:5173/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  optionsStatus: 200,
};

export default corsOptions;
