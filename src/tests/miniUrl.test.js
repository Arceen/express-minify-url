const request = require("supertest");
const express = require("express");
const miniUrlRouter = require("../routes/miniUrl/miniUrl.route");
const miniUrlService = require("../services/miniUrl.service");
const { validOriginalUrl } = require("../utils/regex");

jest.mock("../services/miniUrl.service");
jest.mock("../utils/regex");

const app = express();
app.use(express.json());
app.use("/", miniUrlRouter);

describe("Mini URL Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /:miniUrl", () => {
    it("should redirect to the original URL if it exists", async () => {
      const originalUrl = "https://example.com";
      miniUrlService.getOriginalUrl.mockReturnValue(originalUrl);

      const response = await request(app).get("/abc123");
      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(originalUrl);
      expect(miniUrlService.getOriginalUrl).toHaveBeenCalledWith("abc123");
    });

    it("should return 400 if the URL does not exist", async () => {
      miniUrlService.getOriginalUrl.mockReturnValue(null);
      const response = await request(app).get("/nonexistent");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Internal Server Error!");
      expect(miniUrlService.getOriginalUrl).toHaveBeenCalledWith("nonexistent");
    });
  });

  describe("POST /", () => {
    it("should return the minified URL for a valid original URL", async () => {
      const originalUrl = "https://example.com";
      const minifiedUrl = "abc123";
      miniUrlService.getMinifiedUrl.mockResolvedValue(minifiedUrl);
      validOriginalUrl.mockReturnValue(true);
      const response = await request(app).post("/").send({ url: originalUrl });
      //   console.log(response.status);
      //   console.log(response.boyd);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        status: 201,
        message: "URL Minification Successful!",
        data: minifiedUrl,
      });
      expect(miniUrlService.getMinifiedUrl).toHaveBeenCalledWith(originalUrl);
    });

    it("should return 400 if no URL is provided", async () => {
      const response = await request(app).post("/").send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("No Url Provided!");
      expect(miniUrlService.getMinifiedUrl).not.toHaveBeenCalled();
    });

    it("should return 400 for an invalid URL", async () => {
      validOriginalUrl.mockReturnValue(false);

      const invalidUrl = "i-am-invalid";

      const response = await request(app).post("/").send({ url: invalidUrl });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid Url Provided!");
      expect(validOriginalUrl).toHaveBeenCalledWith(invalidUrl);
      expect(miniUrlService.getMinifiedUrl).not.toHaveBeenCalled();
    });
  });
});
