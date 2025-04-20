import * as fs from "fs/promises";

const devdata = `./dev-data/data/tours-simple.json`;
const tours = JSON.parse(await fs.readFile(devdata, "utf-8"));

export const getAllTours = (req, res) => {
  return res
    .status(200)
    .json({
      status: "success",
      requestAt: req.reqTime,
      result: tours.length,
      data: { tours },
    });
};

export const getTour = (req, res) => {
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

export const createTour = async (req, res) => {
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

export const updateTour = (req, res) => {
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

export const deleteTour = (req, res) => {
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
