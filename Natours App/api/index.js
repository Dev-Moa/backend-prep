import * as fs from "fs/promises";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

app.use(express.json());

// variables
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const devdata = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(await fs.readFile(devdata, "utf-8"));

// route handlers

const getAllTours = (req, res) => {
  return res
    .status(200)
    .json({ status: "success", result: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  // not found
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

const createTour = async (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);
  tours.push(newTour);

  await fs.writeFile(devdata, JSON.stringify(tours));

  return res.status(201).json({
    status: "sucess",
    data: {
      tour: newTour,
    },
  });
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  // not found
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  tours[tour.id] = { ...tours[tour.id], ...req.body };

  res.status(200).json({
    status: "success",
    data: {
      tour: tours[tour.id],
    },
  });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  tours.filter((tour) => tour.id !== id);

  return res.status(200).json({
    status: "success",
    message: "Deleted",
  });
};

// routes
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id/", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id/", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id/").get(getTour).patch(updateTour).delete(deleteTour)


app.listen(PORT, () => {
  console.log("app is running on", PORT);
});
