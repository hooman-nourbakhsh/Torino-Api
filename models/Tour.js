require("dotenv").config();

const { readData, writeData } = require("../utils/fileHandler");
const { v4: uuidv4 } = require("uuid");

const TOURS_FILE = "Tours/index.json";
const PORT = process.env.PORT || 6501;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const getAllTours = async () => {
  let tours = await readData(TOURS_FILE);

  tours = tours.map((tour) => {
    if (tour?.image && !tour.image.startsWith("http")) {
      tour.image = `${BASE_URL}${tour.image}`;
    }
    return tour;
  });

  return tours;
};

const getTourById = async (id) => {
  const tours = await readData(TOURS_FILE);
  let data = tours.find((tour) => tour.id === id);
  if (data?.image && !data.image.startsWith("http")) {
    data.image = `${BASE_URL}${data.image}`;
  }
  return data;
};

const createTour = async (tourData) => {
  const tours = await readData(TOURS_FILE);
  const newTour = { id: uuidv4(), ...tourData };
  tours.push(newTour);
  await writeData(TOURS_FILE, tours);
  return newTour;
};

const updateTour = async (id, updatedData) => {
  const tours = await readData(TOURS_FILE);
  const index = tours.findIndex((tour) => tour.id === id);
  if (index === -1) return null;
  tours[index] = { ...tours[index], ...updatedData };
  await writeData(TOURS_FILE, tours);
  return tours[index];
};

const deleteTour = async (id) => {
  let tours = await readData(TOURS_FILE);
  const tourIndex = tours.findIndex((tour) => tour.id === id);
  if (tourIndex === -1) return null;
  const deletedTour = tours.splice(tourIndex, 1)[0];
  await writeData(TOURS_FILE, tours);
  return deletedTour;
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
