import { AxiosHttpClient } from "../axios-hhtp-client";
import axios from "axios";
import faker from "faker";
import { HttpPostParams } from "@/data/protocols/http";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResponse = {
  data: faker.random.objectElement(),
  status: faker.random.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResponse);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return the correct statusCode and Body", async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data,
    });
  });
});
