import hotelsData from "./helpers/hotels-data.js";
import { filterHotelData } from "../filter-hotel-data.js";

describe("Searching hotel data", function() {
  it("should return everything if query is empty", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      nameSearchTerm: "",
    });
    let names = filteredHotelsData.map(h => h.name);

    expect(names.join()).toEqual("one,two,three,four,five,six");
  });

  it("should return everything if query is all white space", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      nameSearchTerm: `
      `,
    });
    let names = filteredHotelsData.map(h => h.name);

    expect(names.join()).toEqual("one,two,three,four,five,six");
  });

  it("should return based on given search term", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      nameSearchTerm: "e",
    });
    let names = filteredHotelsData.map(h => h.name);

    expect(names.join()).toEqual("one,three,five");
  });

  it("should ignore casing, white space, and special characters in the search term", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      nameSearchTerm: "O é",
    });
    let names = filteredHotelsData.map(h => h.name);

    expect(names.join()).toEqual("one,two,four");
  });
});

describe("Sorting hotel data", function() {
  it("should return given order by default", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      priceSortOrder: "none",
    });
    let prices = filteredHotelsData.map(h => h.price);

    expect(prices.join()).toEqual("120,841,715,155,121,95");
  });

  it("should be able to sort ascending", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      priceSortOrder: "ascending",
    });
    let prices = filteredHotelsData.map(h => h.price);

    expect(prices.join()).toEqual("95,120,121,155,715,841");
  });

  it("should be able to sort descending", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      priceSortOrder: "descending",
    });
    let prices = filteredHotelsData.map(h => h.price);

    expect(prices.join()).toEqual("841,715,155,121,120,95");
  });
});

describe("Filtering hotel data", function() {
  it("should return everything when extreme values are given", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      minStars: 0,
      maxPrice: Infinity,
      minRating: 0,
    });
    let names = filteredHotelsData.map(h => h.name);

    expect(names.join()).toEqual("one,two,three,four,five,six");
  });

  it("should be able to filter by stars", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      minStars: 4,
    });
    let stars = filteredHotelsData.map(h => h.stars);

    expect(stars.join()).toEqual("4,5,5");
  });

  it("should be able to filter by price", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      maxPrice: 200,
    });
    let prices = filteredHotelsData.map(h => h.price);

    expect(prices.join()).toEqual("120,155,121,95");
  });

  it("should be able to filter by rating", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      minRating: 5,
    });
    let ratings = filteredHotelsData.map(h => h.rating);

    expect(ratings.join()).toEqual("7,6,5");
  });
});


describe("Running complex filters on hotel data", function() {
  it("should return everything if query is empty", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      priceSortOrder: "descending",
      nameSearchTerm: "e",
      minStars: 3,
      maxPrice: 800,
      minRating: 3,
    });
    let names = filteredHotelsData.map(h => h.name);

    expect(names.join()).toEqual("three,one");
  });

  it("should return everything if query is empty", function() {
    let filteredHotelsData = filterHotelData({
      hotelsData: hotelsData,
      priceSortOrder: "ascending",
      nameSearchTerm: "t",
      minStars: 3,
      maxPrice: 900,
      minRating: 2,
    });
    let names = filteredHotelsData.map(h => h.name);

    expect(names.join()).toEqual("three,two");
  });
});
